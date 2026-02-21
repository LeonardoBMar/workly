import { DashboardHome } from './_components/DashboardHome';
import { db } from '@/lib/db';
import { getRequiredSession } from '@/lib/get-session';
import { eq, desc } from 'drizzle-orm';
import { appointments, clients, services, shopper } from '@/lib/schema';
import { startOfMonth, endOfMonth, subMonths } from 'date-fns';

export default async function DashboardPage() {
  const user = await getRequiredSession();

  const now = new Date();
  const monthStart = startOfMonth(now);
  const monthEnd = endOfMonth(now);
  const lastMonthStart = startOfMonth(subMonths(now, 1));
  const lastMonthEnd = endOfMonth(subMonths(now, 1));

  // Fetch all appointments for revenue calculation & upcoming list
  const userAppointments = await db.query.appointments.findMany({
    where: eq(appointments.userId, user.id),
    with: {
      service: true,
      client: true,
    },
    orderBy: [desc(appointments.startTime)],
  });

  // Calculate Monthly Revenue
  const currentMonthRevenue = userAppointments
    .filter(
      (a) =>
        a.startTime >= monthStart &&
        a.startTime <= monthEnd &&
        a.status !== 'canceled',
    )
    .reduce((acc, a) => acc + Number(a.service.price), 0);

  const lastMonthRevenue = userAppointments
    .filter(
      (a) =>
        a.startTime >= lastMonthStart &&
        a.startTime <= lastMonthEnd &&
        a.status !== 'canceled',
    )
    .reduce((acc, a) => acc + Number(a.service.price), 0);

  // Appointments count for current month
  const currentMonthAppointments = userAppointments.filter(
    (a) => a.startTime >= monthStart && a.startTime <= monthEnd,
  ).length;

  // New Clients
  const userClients = await db.query.clients.findMany({
    where: eq(clients.userId, user.id),
  });

  const currentMonthClients = userClients.filter(
    (c) => c.createdAt >= monthStart && c.createdAt <= monthEnd,
  ).length;

  const lastMonthClients = userClients.filter(
    (c) => c.createdAt >= lastMonthStart && c.createdAt <= lastMonthEnd,
  ).length;

  // Upcoming Appointments (next 5)
  const upcomingAppointments = userAppointments
    .filter((a) => a.startTime >= now && a.status !== 'canceled')
    .sort((a, b) => a.startTime.getTime() - b.startTime.getTime())
    .slice(0, 5);

  // Check Configuration Status
  const userServices = await db.query.services.findMany({
    where: eq(services.userId, user.id),
    limit: 1,
  });

  const userShopper = await db.query.shopper.findFirst({
    where: eq(shopper.userId, user.id),
  });

  const configStatus = {
    hasAccount: true,
    hasProfile: !!userShopper,
    hasServices: userServices.length > 0,
    hasConnectedCalendar: true, // Mark as true since agenda relies on internal DB here instead of Google for now
  };

  return (
    <DashboardHome
      data={{
        currentMonthRevenue,
        lastMonthRevenue,
        currentMonthAppointments,
        currentMonthClients,
        lastMonthClients,
        upcomingAppointments,
        configStatus,
      }}
    />
  );
}
