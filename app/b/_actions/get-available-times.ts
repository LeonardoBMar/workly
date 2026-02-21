'use server';

import { db } from '@/lib/db';
import { appointments, services } from '@/lib/schema';
import { and, eq, gte, lt, or } from 'drizzle-orm';

export interface AvailableTimeSlot {
  time: string;
  available: boolean;
  isPast: boolean;
}

export async function getAvailableTimes(
  shopperId: string,
  serviceId: string,
  dateStr: string, // YYYY-MM-DD
): Promise<AvailableTimeSlot[]> {
  const [year, month, day] = dateStr.split('-').map(Number);

  const dayStart = new Date(year, month - 1, day, 0, 0, 0);
  const dayEnd = new Date(year, month - 1, day, 23, 59, 59);

  const dayAppointments = await db
    .select({
      startTime: appointments.startTime,
      endTime: appointments.endTime,
    })
    .from(appointments)
    .where(
      and(
        eq(appointments.userId, shopperId),
        lt(appointments.startTime, dayEnd),
        gte(appointments.endTime, dayStart),
        or(
          eq(appointments.status, 'confirmed'),
          eq(appointments.status, 'pending'),
        ),
      ),
    );

  const serviceRes = await db
    .select({ duration: services.duration })
    .from(services)
    .where(eq(services.id, serviceId))
    .limit(1);

  let duration = 60;
  if (serviceRes[0]) {
    duration = serviceRes[0].duration;
  }

  const baseSlots = [
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
    '21:00',
    '22:00',
  ];

  const availableSlots: AvailableTimeSlot[] = [];
  const now = new Date();

  for (const slot of baseSlots) {
    const [hours, minutes] = slot.split(':').map(Number);
    const slotStart = new Date(year, month - 1, day, hours, minutes);
    const slotEnd = new Date(slotStart.getTime() + duration * 60000);

    let hasConflict = false;
    let isPast = slotStart < now;

    for (const appt of dayAppointments) {
      if (slotStart < appt.endTime && slotEnd > appt.startTime) {
        hasConflict = true;
        break;
      }
    }

    availableSlots.push({
      time: slot,
      available: !hasConflict,
      isPast: isPast,
    });
  }

  return availableSlots;
}
