import { useMemo } from 'react';
import {
  startOfDay,
  endOfDay,
  subDays,
  isWithinInterval,
  eachDayOfInterval,
  format,
} from 'date-fns';
import { DashboardData, PeriodFilter, Appointment, Client } from '../_types';

function getDateRanges(period: PeriodFilter) {
  const now = new Date();
  if (period === 'daily') {
    return {
      startCurrent: startOfDay(now),
      endCurrent: endOfDay(now),
      startPrev: startOfDay(subDays(now, 1)),
      endPrev: endOfDay(subDays(now, 1)),
    };
  }
  return {
    startCurrent: startOfDay(subDays(now, 6)),
    endCurrent: endOfDay(now),
    startPrev: startOfDay(subDays(now, 13)),
    endPrev: endOfDay(subDays(now, 7)),
  };
}

function isValidAppointmentInRange(
  appointment: Appointment,
  start: Date,
  end: Date,
) {
  if (appointment.status === 'canceled') return false;
  const d = new Date(appointment.startTime);
  return isWithinInterval(d, { start, end });
}

function calculateRevenue(appointments: Appointment[], start: Date, end: Date) {
  return appointments
    .filter((a) => isValidAppointmentInRange(a, start, end))
    .reduce((sum, a) => sum + Number(a.service?.price || 0), 0);
}

function calculateClients(clients: Client[], start: Date, end: Date) {
  return clients.filter((c) => {
    const d = new Date(c.createdAt);
    return isWithinInterval(d, { start, end });
  }).length;
}

export function useDashboardMetrics(data: DashboardData, period: PeriodFilter) {
  return useMemo(() => {
    if (!data.allAppointments || !data.allClients) {
      return {
        filteredRevenue: data.currentMonthRevenue,
        previousRevenue: data.lastMonthRevenue,
        filteredClients: data.currentMonthClients,
        previousClients: data.lastMonthClients,
        filteredAppointments: data.upcomingAppointments,
      };
    }

    const { startCurrent, endCurrent, startPrev, endPrev } =
      getDateRanges(period);

    const now = new Date();
    const startOfCurrentPeriodForApps =
      period === 'daily' ? startCurrent : startOfDay(now);

    const filteredApps = data.allAppointments
      .filter((a) =>
        isValidAppointmentInRange(a, startOfCurrentPeriodForApps, endCurrent),
      )
      .sort(
        (a, b) =>
          new Date(a.startTime).getTime() - new Date(b.startTime).getTime(),
      )
      .slice(0, 5);

    return {
      filteredRevenue: calculateRevenue(
        data.allAppointments,
        startCurrent,
        endCurrent,
      ),
      previousRevenue: calculateRevenue(
        data.allAppointments,
        startPrev,
        endPrev,
      ),
      filteredClients: calculateClients(
        data.allClients,
        startCurrent,
        endCurrent,
      ),
      previousClients: calculateClients(data.allClients, startPrev, endPrev),
      filteredAppointments:
        filteredApps.length > 0 ? filteredApps : data.upcomingAppointments,
    };
  }, [data, period]);
}

export function useRevenueChartData(data: DashboardData) {
  return useMemo(() => {
    if (!data.allAppointments) return [];
    const now = new Date();
    const start = startOfDay(subDays(now, 6));
    const end = endOfDay(now);

    const days = eachDayOfInterval({ start, end });

    return days.map((day) => {
      const revenue = calculateRevenue(
        data.allAppointments,
        startOfDay(day),
        endOfDay(day),
      );
      return {
        date: format(day, 'dd/MM'),
        revenue,
      };
    });
  }, [data]);
}
