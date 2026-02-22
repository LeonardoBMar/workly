import { db } from '@/lib/db';
import { appointments, clients, services } from '@/lib/schema';
import { eq, desc } from 'drizzle-orm';
import {
  format,
  subMonths,
  startOfMonth,
  endOfMonth,
  isWithinInterval,
} from 'date-fns';
import { ptBR } from 'date-fns/locale';
import type {
  ReportsData,
  MonthlyRevenue,
  ServicePerformance,
  AppointmentReport,
  ClientReport,
  ServiceReport,
} from '../_types/reports';

export async function getReportsData(userId: string): Promise<ReportsData> {
  const [userAppointments, userClients, userServices] = await Promise.all([
    db.query.appointments.findMany({
      where: eq(appointments.userId, userId),
      with: { service: true, client: true },
      orderBy: [desc(appointments.startTime)],
    }),
    db.query.clients.findMany({
      where: eq(clients.userId, userId),
    }),
    db.query.services.findMany({
      where: eq(services.userId, userId),
    }),
  ]);

  // ─── Monthly Revenue (last 12 months) ─────────────────────
  const now = new Date();
  const monthlyRevenue: MonthlyRevenue[] = [];

  for (let i = 11; i >= 0; i--) {
    const monthDate = subMonths(now, i);
    const mStart = startOfMonth(monthDate);
    const mEnd = endOfMonth(monthDate);

    const monthAppts = userAppointments.filter(
      (a) =>
        a.status !== 'canceled' &&
        isWithinInterval(a.startTime, { start: mStart, end: mEnd }),
    );

    monthlyRevenue.push({
      month: format(monthDate, "MMM'/'yy", { locale: ptBR }),
      revenue: monthAppts.reduce(
        (sum, a) => sum + Number(a.service?.price || 0),
        0,
      ),
      appointments: monthAppts.length,
    });
  }

  // ─── Service Performance ────────────────────────────────────
  const validAppointments = userAppointments.filter(
    (a) => a.status !== 'canceled',
  );
  const totalRevenueAll = validAppointments.reduce(
    (sum, a) => sum + Number(a.service?.price || 0),
    0,
  );

  const serviceMap = new Map<
    string,
    { name: string; revenue: number; count: number }
  >();
  for (const a of validAppointments) {
    if (!a.service) continue;
    const existing = serviceMap.get(a.serviceId) || {
      name: a.service.name,
      revenue: 0,
      count: 0,
    };
    existing.revenue += Number(a.service.price || 0);
    existing.count += 1;
    serviceMap.set(a.serviceId, existing);
  }

  const servicePerformance: ServicePerformance[] = Array.from(
    serviceMap.entries(),
  )
    .map(([id, data]) => ({
      id,
      name: data.name,
      revenue: data.revenue,
      appointments: data.count,
      avgTicket: data.count > 0 ? data.revenue / data.count : 0,
      percentage:
        totalRevenueAll > 0 ? (data.revenue / totalRevenueAll) * 100 : 0,
    }))
    .sort((a, b) => b.revenue - a.revenue);

  // ─── Appointment Reports ─────────────────────────────────────
  const appointmentReports: AppointmentReport[] = userAppointments.map((a) => ({
    id: a.id,
    clientName: a.client?.name || 'Desconhecido',
    clientEmail: a.client?.email || null,
    clientPhone: a.client?.phone || null,
    serviceName: a.service?.name || 'Desconhecido',
    servicePrice: Number(a.service?.price || 0),
    startTime: a.startTime.toISOString(),
    endTime: a.endTime.toISOString(),
    status: a.status,
    notes: a.notes,
    createdAt: a.createdAt?.toISOString() ?? new Date().toISOString(),
  }));

  // ─── Client Reports ────────────────────────────────────────
  const clientReports: ClientReport[] = userClients.map((c) => {
    const clientAppts = validAppointments.filter((a) => a.clientId === c.id);
    const lastAppt = clientAppts.sort(
      (a, b) => b.startTime.getTime() - a.startTime.getTime(),
    )[0];

    return {
      id: c.id,
      name: c.name,
      email: c.email,
      phone: c.phone,
      totalAppointments: clientAppts.length,
      totalSpent: clientAppts.reduce(
        (sum, a) => sum + Number(a.service?.price || 0),
        0,
      ),
      lastVisit: lastAppt ? lastAppt.startTime.toISOString() : null,
      createdAt: c.createdAt?.toISOString() ?? new Date().toISOString(),
    };
  });

  // ─── Service Reports ──────────────────────────────────────
  const serviceReports: ServiceReport[] = userServices.map((s) => {
    const sAppts = validAppointments.filter((a) => a.serviceId === s.id);
    return {
      id: s.id,
      name: s.name,
      description: s.description,
      price: Number(s.price),
      duration: s.duration,
      totalAppointments: sAppts.length,
      totalRevenue: sAppts.reduce(
        (sum, a) => sum + Number(a.service?.price || 0),
        0,
      ),
    };
  });

  // ─── Totals ───────────────────────────────────────────────
  const uniqueClients = new Set(validAppointments.map((a) => a.clientId));

  return {
    monthlyRevenue,
    servicePerformance,
    appointmentReports,
    clientReports,
    serviceReports,
    totals: {
      totalRevenue: totalRevenueAll,
      totalAppointments: validAppointments.length,
      avgTicket:
        validAppointments.length > 0
          ? totalRevenueAll / validAppointments.length
          : 0,
      totalClients: uniqueClients.size,
    },
  };
}
