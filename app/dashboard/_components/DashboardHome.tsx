'use client';

import { useState } from 'react';
import { DashboardData, PeriodFilter } from '../_types';
import {
  useDashboardMetrics,
  useRevenueChartData,
} from '../_hooks/use-dashboard-metrics';
import { formatCurrency } from '../_utils/formatters';

import { RevenueOverview } from './RevenueOverview';
import { ConfigStatusCard } from './ConfigStatusCard';
import { QuickActionsGrid } from './QuickActionsGrid';
import { RecentAppointmentsCard } from './RecentAppointmentsCard';
import { StatCard } from './StatCard';
import { PeriodFilterButtons } from './PeriodFilterButtons';

import Link from 'next/link';
import { Plus, Edit3, Info, Users, BarChart3 } from 'lucide-react';

export function DashboardHome({ data }: { data: DashboardData }) {
  const [periodFilter, setPeriodFilter] = useState<PeriodFilter>('7d');

  const metrics = useDashboardMetrics(data, periodFilter);
  const chartData = useRevenueChartData(data);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 space-y-8 duration-700">
      <header className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-slate-900 sm:text-2xl">
          Dashboard
        </h1>
      </header>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <RevenueOverview
          currentMonthRevenue={data.currentMonthRevenue} // This continues to respect full month scope
          lastMonthRevenue={data.lastMonthRevenue}
          currentMonthAppointments={data.currentMonthAppointments}
          chartData={chartData}
        />

        <div className="space-y-6">
          <ConfigStatusCard status={data.configStatus} />
          <QuickActionsGrid />
        </div>
      </div>

      <section className="space-y-6">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-xl font-semibold text-slate-900">Visão geral</h2>
          <div className="flex flex-wrap items-center gap-2">
            <PeriodFilterButtons
              periodFilter={periodFilter}
              onPeriodChange={setPeriodFilter}
            />
            <div className="ml-2 flex flex-wrap items-center gap-2 border-l border-slate-200 pl-4">
              <Link
                href="/dashboard/agenda?action=new"
                className="flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2 py-1 text-xs font-medium text-slate-600 shadow-sm hover:bg-slate-50"
              >
                <Plus className="h-3 w-3" /> Adicionar
              </Link>
              <Link
                href="/dashboard/agenda"
                className="flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2 py-1 text-xs font-medium text-slate-600 shadow-sm hover:bg-slate-50"
              >
                <Edit3 className="h-3 w-3" /> Editar
              </Link>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <RecentAppointmentsCard appointments={metrics.filteredAppointments} />

          <StatCard
            title="Faturamento Total"
            value={formatCurrency(metrics.filteredRevenue)}
            subtitle={`${formatCurrency(metrics.previousRevenue)} período anterior`}
            icon={Info}
            action={
              <button className="flex items-center gap-1 rounded bg-slate-100 px-2 py-1 text-[10px] font-bold text-slate-600 transition-colors hover:bg-slate-200">
                <BarChart3 className="h-3 w-3" /> EXPLORAR
              </button>
            }
          />

          <StatCard
            title="Novos Clientes"
            value={metrics.filteredClients}
            subtitle={`${metrics.previousClients} período anterior`}
            icon={Users}
            footerText={periodFilter === '7d' ? 'Últimos 7 dias' : 'Hoje'}
          />
        </div>
      </section>
    </div>
  );
}
