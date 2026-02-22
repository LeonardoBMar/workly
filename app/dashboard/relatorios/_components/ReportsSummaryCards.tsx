'use client';

import { DollarSign, CalendarCheck, TrendingUp, Users } from 'lucide-react';
import { formatCurrency } from '../_utils/report-formatters';

interface ReportsSummaryCardsProps {
  totalRevenue: number;
  totalAppointments: number;
  avgTicket: number;
  totalClients: number;
}

const cards = [
  {
    key: 'revenue',
    label: 'Receita Total',
    icon: DollarSign,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-100',
  },
  {
    key: 'appointments',
    label: 'Agendamentos',
    icon: CalendarCheck,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-100',
  },
  {
    key: 'ticket',
    label: 'Ticket Médio',
    icon: TrendingUp,
    color: 'text-violet-600',
    bg: 'bg-violet-50',
    border: 'border-violet-100',
  },
  {
    key: 'clients',
    label: 'Clientes Atendidos',
    icon: Users,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-100',
  },
];

export function ReportsSummaryCards({
  totalRevenue,
  totalAppointments,
  avgTicket,
  totalClients,
}: ReportsSummaryCardsProps) {
  const values: Record<string, string | number> = {
    revenue: formatCurrency(totalRevenue),
    appointments: totalAppointments,
    ticket: formatCurrency(avgTicket),
    clients: totalClients,
  };

  return (
    <div className="grid grid-cols-2 gap-2.5 sm:gap-4 lg:grid-cols-4">
      {cards.map((c, i) => (
        <div
          key={c.key}
          className={`animate-in fade-in slide-in-from-bottom-2 rounded-xl border ${c.border} bg-white p-3 shadow-sm transition-shadow hover:shadow-md sm:p-5`}
          style={{ animationDelay: `${i * 80}ms`, animationFillMode: 'both' }}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-medium tracking-wide text-slate-500 uppercase sm:text-xs">
              {c.label}
            </span>
            <div className={`rounded-lg p-1.5 sm:p-2 ${c.bg}`}>
              <c.icon className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${c.color}`} />
            </div>
          </div>
          <div className="mt-2 text-lg font-bold text-slate-900 sm:mt-3 sm:text-2xl">
            {values[c.key]}
          </div>
        </div>
      ))}
    </div>
  );
}
