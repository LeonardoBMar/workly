import { db } from '@/lib/db';
import { appointments, clients, services, shopper } from '@/lib/schema';
import { eq, desc } from 'drizzle-orm';
import { startOfMonth, endOfMonth, subMonths } from 'date-fns';
import type { DashboardData, Appointment, Client } from '../_types';

function serializeAppointment(a: any): Appointment {
  return {
    ...a,
    startTime: a.startTime.toISOString(),
    endTime: a.endTime.toISOString(),
    createdAt: a.createdAt?.toISOString() ?? new Date().toISOString(),
    updatedAt: a.updatedAt?.toISOString() ?? new Date().toISOString(),
  };
}

function serializeClient(c: any): Client {
  return {
    ...c,
    createdAt: c.createdAt?.toISOString() ?? new Date().toISOString(),
    updatedAt: c.updatedAt?.toISOString() ?? new Date().toISOString(),
  };
}

export async function getDashboardData(userId: string): Promise<DashboardData> {
  const now = new Date();
  const monthStart = startOfMonth(now);
  const monthEnd = endOfMonth(now);
  const lastMonthStart = startOfMonth(subMonths(now, 1));
  const lastMonthEnd = endOfMonth(subMonths(now, 1));

  const userAppointments = await db.query.appointments.findMany({
    where: eq(appointments.userId, userId),
    with: {
      service: true,
      client: true,
    },
    orderBy: [desc(appointments.startTime)],
  });

  const userClients = await db.query.clients.findMany({
    where: eq(clients.userId, userId),
  });

  const currentMonthRevenue = userAppointments
    .filter(
      (a) =>
        a.startTime >= monthStart &&
        a.startTime <= monthEnd &&
        a.status !== 'canceled',
    )
    .reduce((acc, a) => acc + Number(a.service?.price || 0), 0);

  const lastMonthRevenue = userAppointments
    .filter(
      (a) =>
        a.startTime >= lastMonthStart &&
        a.startTime <= lastMonthEnd &&
        a.status !== 'canceled',
    )
    .reduce((acc, a) => acc + Number(a.service?.price || 0), 0);

  const currentMonthAppointments = userAppointments.filter(
    (a) => a.startTime >= monthStart && a.startTime <= monthEnd,
  ).length;

  const currentMonthClients = userClients.filter(
    (c) => c.createdAt >= monthStart && c.createdAt <= monthEnd,
  ).length;

  const lastMonthClients = userClients.filter(
    (c) => c.createdAt >= lastMonthStart && c.createdAt <= lastMonthEnd,
  ).length;

  const upcomingAppointments = userAppointments
    .filter((a) => a.startTime >= now && a.status !== 'canceled')
    .sort((a, b) => a.startTime.getTime() - b.startTime.getTime())
    .slice(0, 5);

  const [userServices, userShopper] = await Promise.all([
    db.query.services.findMany({
      where: eq(services.userId, userId),
      limit: 1,
    }),
    db.query.shopper.findFirst({
      where: eq(shopper.userId, userId),
    }),
  ]);

  const configStatus = {
    hasAccount: true,
    hasProfile: !!userShopper,
    hasServices: userServices.length > 0,
    hasConnectedCalendar: true,
  };

  return {
    currentMonthRevenue,
    lastMonthRevenue,
    currentMonthAppointments,
    currentMonthClients,
    lastMonthClients,
    upcomingAppointments: upcomingAppointments.map(serializeAppointment),
    configStatus,
    allAppointments: userAppointments.map(serializeAppointment),
    allClients: userClients.map(serializeClient),
  };
}
