import { useMemo } from 'react';
import { subMonths, isAfter } from 'date-fns';
import type {
  ReportsData,
  ReportPeriod,
  MonthlyRevenue,
  ServicePerformance,
} from '../_types/reports';

function getPeriodMonths(period: ReportPeriod): number | null {
  switch (period) {
    case '3m':
      return 3;
    case '6m':
      return 6;
    case '12m':
      return 12;
    case 'all':
      return null;
  }
}

export function useFilteredReportsData(
  data: ReportsData,
  period: ReportPeriod,
) {
  return useMemo(() => {
    const months = getPeriodMonths(period);
    if (!months) return data;

    const now = new Date();
    const cutoff = subMonths(now, months);

    const filteredMonthlyRevenue = data.monthlyRevenue.slice(-months);

    const filteredAppointments = data.appointmentReports.filter((a) =>
      isAfter(new Date(a.startTime), cutoff),
    );

    const filteredServicePerformance = recalcServicePerformance(
      filteredAppointments,
      data.servicePerformance,
    );

    const validAppts = filteredAppointments.filter(
      (a) => a.status !== 'canceled',
    );
    const totalRevenue = validAppts.reduce((s, a) => s + a.servicePrice, 0);
    const uniqueClients = new Set(validAppts.map((a) => a.clientName));

    return {
      ...data,
      monthlyRevenue: filteredMonthlyRevenue,
      servicePerformance: filteredServicePerformance,
      appointmentReports: filteredAppointments,
      totals: {
        totalRevenue,
        totalAppointments: validAppts.length,
        avgTicket: validAppts.length > 0 ? totalRevenue / validAppts.length : 0,
        totalClients: uniqueClients.size,
      },
    };
  }, [data, period]);
}

function recalcServicePerformance(
  appointments: ReportsData['appointmentReports'],
  originalServices: ServicePerformance[],
): ServicePerformance[] {
  const validAppts = appointments.filter((a) => a.status !== 'canceled');
  const totalRev = validAppts.reduce((s, a) => s + a.servicePrice, 0);

  const map = new Map<string, { revenue: number; count: number }>();
  for (const a of validAppts) {
    const existing = map.get(a.serviceName) || { revenue: 0, count: 0 };
    existing.revenue += a.servicePrice;
    existing.count += 1;
    map.set(a.serviceName, existing);
  }

  return Array.from(map.entries())
    .map(([name, d]) => {
      const orig = originalServices.find((s) => s.name === name);
      return {
        id: orig?.id || name,
        name,
        revenue: d.revenue,
        appointments: d.count,
        avgTicket: d.count > 0 ? d.revenue / d.count : 0,
        percentage: totalRev > 0 ? (d.revenue / totalRev) * 100 : 0,
      };
    })
    .sort((a, b) => b.revenue - a.revenue);
}

export function useMonthlyRevenueChart(monthlyRevenue: MonthlyRevenue[]) {
  return useMemo(() => {
    return monthlyRevenue.map((m) => ({
      month: m.month,
      revenue: m.revenue,
      appointments: m.appointments,
    }));
  }, [monthlyRevenue]);
}
