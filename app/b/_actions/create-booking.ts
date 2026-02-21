'use server';

import { db } from '@/lib/db';
import { appointments, clients, services } from '@/lib/schema';
import { and, eq, gte, lt, or } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function createBooking(
  shopperId: string,
  serviceId: string,
  dateStr: string, // YYYY-MM-DD
  timeStr: string, // HH:MM
  customerName: string,
  customerPhone: string,
) {
  const [year, month, day] = dateStr.split('-').map(Number);
  const [hours, minutes] = timeStr.split(':').map(Number);

  const startTime = new Date(year, month - 1, day, hours, minutes);

  const serviceRes = await db
    .select({ duration: services.duration })
    .from(services)
    .where(eq(services.id, serviceId))
    .limit(1);

  if (!serviceRes[0]) {
    throw new Error('Serviço não encontrado');
  }

  const { duration } = serviceRes[0];
  const endTime = new Date(startTime.getTime() + duration * 60000);

  const overlappingAppointments = await db
    .select({ id: appointments.id })
    .from(appointments)
    .where(
      and(
        eq(appointments.userId, shopperId),
        or(
          eq(appointments.status, 'confirmed'),
          eq(appointments.status, 'pending'),
        ),
        lt(appointments.startTime, endTime),
        gte(appointments.endTime, startTime),
      ),
    )
    .limit(1);

  if (overlappingAppointments.length > 0) {
    throw new Error(
      'Ops! Alguém acabou de reservar esse horário. Por favor, escolha outro.',
    );
  }

  let clientId = '';

  const existingClient = await db
    .select({ id: clients.id })
    .from(clients)
    .where(and(eq(clients.userId, shopperId), eq(clients.phone, customerPhone)))
    .limit(1);

  if (existingClient[0]) {
    clientId = existingClient[0].id;
    await db
      .update(clients)
      .set({ name: customerName })
      .where(eq(clients.id, clientId));
  } else {
    clientId = crypto.randomUUID();
    await db.insert(clients).values({
      id: clientId,
      userId: shopperId,
      name: customerName,
      phone: customerPhone,
    });
  }

  await db.insert(appointments).values({
    id: crypto.randomUUID(),
    userId: shopperId,
    clientId,
    serviceId,
    startTime,
    endTime,
    status: 'pending',
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  revalidatePath('/b/[slug]', 'page');
  return { success: true };
}
