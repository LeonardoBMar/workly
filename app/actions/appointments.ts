'use server';
import { db } from '@/lib/db';
import { appointments, clients, services } from '@/lib/schema';
import { eq, and } from 'drizzle-orm';
import { getRequiredSession } from '@/lib/get-session';
import { revalidatePath } from 'next/cache';
import {
  appointmentStatusSchema,
  type AppointmentStatus,
} from '@/lib/validation';

export async function getAppointments(date: Date) {
  try {
    const user = await getRequiredSession();

    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const result = await db.query.appointments.findMany({
      where: (appointments, { and, eq, gte, lte }) =>
        and(
          eq(appointments.userId, user.id),
          gte(appointments.startTime, startOfDay),
          lte(appointments.startTime, endOfDay),
        ),
      with: {
        client: true,
        service: true,
      },
      orderBy: (appointments, { asc }) => [asc(appointments.startTime)],
    });

    return { data: result };
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return {
      error:
        error instanceof Error ? error.message : 'Erro ao buscar agendamentos',
    };
  }
}

export async function createAppointment(formData: {
  clientId: string;
  serviceId: string;
  startTime: Date;
  endTime: Date;
  notes?: string;
  status?: AppointmentStatus;
}) {
  try {
    const user = await getRequiredSession();
    const parsedStatus = appointmentStatusSchema.safeParse(
      formData.status ?? 'pending',
    );
    if (!parsedStatus.success) {
      return { error: 'Status de agendamento inválido.' };
    }

    const [ownedClient, ownedService] = await Promise.all([
      db
        .select({ id: clients.id })
        .from(clients)
        .where(
          and(eq(clients.id, formData.clientId), eq(clients.userId, user.id)),
        )
        .limit(1),
      db
        .select({ id: services.id })
        .from(services)
        .where(
          and(
            eq(services.id, formData.serviceId),
            eq(services.userId, user.id),
          ),
        )
        .limit(1),
    ]);

    if (!ownedClient[0] || !ownedService[0]) {
      return { error: 'Cliente ou serviço inválido para este usuário.' };
    }

    const id = crypto.randomUUID();

    await db.insert(appointments).values({
      id,
      userId: user.id,
      clientId: formData.clientId,
      serviceId: formData.serviceId,
      startTime: formData.startTime,
      endTime: formData.endTime,
      notes: formData.notes,
      status: parsedStatus.data,
    });

    revalidatePath('/dashboard/agenda');
    return { success: true };
  } catch (error) {
    console.error('Error creating appointment:', error);
    return {
      error:
        error instanceof Error ? error.message : 'Erro ao criar agendamento',
    };
  }
}

export async function updateAppointmentStatus(id: string, status: string) {
  try {
    const user = await getRequiredSession();
    const parsedStatus = appointmentStatusSchema.safeParse(status);
    if (!parsedStatus.success) {
      return { error: 'Status de agendamento inválido.' };
    }

    await db
      .update(appointments)
      .set({ status: parsedStatus.data })
      .where(and(eq(appointments.id, id), eq(appointments.userId, user.id)));

    revalidatePath('/dashboard/agenda');
    return { success: true };
  } catch (error) {
    console.error('Error updating appointment status:', error);
    return {
      error:
        error instanceof Error
          ? error.message
          : 'Erro ao atualizar status do agendamento',
    };
  }
}

export async function deleteAppointment(id: string) {
  try {
    const user = await getRequiredSession();

    await db
      .delete(appointments)
      .where(and(eq(appointments.id, id), eq(appointments.userId, user.id)));

    revalidatePath('/dashboard/agenda');
    return { success: true };
  } catch (error) {
    console.error('Error deleting appointment:', error);
    return {
      error:
        error instanceof Error ? error.message : 'Erro ao deletar agendamento',
    };
  }
}
