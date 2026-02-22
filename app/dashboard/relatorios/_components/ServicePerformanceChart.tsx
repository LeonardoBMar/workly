'use client';

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { formatCurrency } from '../_utils/report-formatters';
import type { ServicePerformance } from '../_types/reports';

const COLORS = [
  '#6366f1',
  '#06b6d4',
  '#f59e0b',
  '#10b981',
  '#f43f5e',
  '#8b5cf6',
  '#ec4899',
  '#14b8a6',
];

interface ServicePerformanceChartProps {
  data: ServicePerformance[];
}

export function ServicePerformanceChart({
  data,
}: ServicePerformanceChartProps) {
  if (data.length === 0) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <h3 className="text-sm font-semibold text-slate-900">
          Performance por Serviço
        </h3>
        <div className="mt-6 flex h-64 items-center justify-center rounded-lg border border-dashed border-slate-200">
          <span className="text-xs text-slate-400">Sem dados disponíveis</span>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-slate-900">
          Performance por Serviço
        </h3>
        <p className="mt-0.5 text-xs text-slate-400">
          Distribuição de receita entre serviços
        </p>
      </div>

      <div className="flex flex-col items-center gap-4 sm:gap-6 lg:flex-row">
        <div className="h-40 w-40 shrink-0 sm:h-56 sm:w-56">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={65}
                paddingAngle={3}
                dataKey="revenue"
                nameKey="name"
                strokeWidth={0}
              >
                {data.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const d = payload[0].payload as ServicePerformance;
                    return (
                      <div className="rounded-lg border border-slate-100 bg-white p-3 shadow-xl ring-1 ring-slate-900/5">
                        <p className="mb-1 text-xs font-semibold text-slate-700">
                          {d.name}
                        </p>
                        <p className="text-sm font-bold text-indigo-600">
                          {formatCurrency(d.revenue)}
                        </p>
                        <p className="mt-1 text-[10px] text-slate-400">
                          {d.appointments} atendimentos ·{' '}
                          {d.percentage.toFixed(1)}%
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="w-full flex-1 space-y-2">
          {data.map((s, i) => (
            <div key={s.id} className="flex items-center gap-3">
              <div
                className="h-3 w-3 shrink-0 rounded-full"
                style={{ backgroundColor: COLORS[i % COLORS.length] }}
              />
              <div className="flex min-w-0 flex-1 items-center justify-between">
                <span className="truncate text-xs font-medium text-slate-700">
                  {s.name}
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-slate-900">
                    {formatCurrency(s.revenue)}
                  </span>
                  <span className="w-12 text-right text-[10px] text-slate-400">
                    {s.percentage.toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
