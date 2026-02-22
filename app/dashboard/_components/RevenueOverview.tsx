import { MoreHorizontal } from 'lucide-react';
import { formatCurrency } from '../_utils/formatters';
import {
  AreaChart,
  Area,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from 'recharts';
import Link from 'next/link';

interface RevenueOverviewProps {
  currentMonthRevenue: number;
  lastMonthRevenue: number;
  currentMonthAppointments: number;
  chartData: { date: string; revenue: number }[];
}

export function RevenueOverview({
  currentMonthRevenue,
  lastMonthRevenue,
  currentMonthAppointments,
  chartData,
}: RevenueOverviewProps) {
  return (
    <div className="lg:col-span-2">
      <div className="grid grid-cols-1 gap-8 border-b border-slate-100 pb-8 sm:grid-cols-2">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
            Receita total
            <MoreHorizontal className="h-3 w-3" />
          </div>
          <div className="text-2xl font-bold text-slate-900 sm:text-3xl">
            {formatCurrency(currentMonthRevenue)}
          </div>
          <div className="text-xs text-slate-400">Este mês</div>
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
            Mês passado
            <MoreHorizontal className="h-3 w-3" />
          </div>
          <div className="text-2xl font-bold text-slate-900/30 sm:text-3xl">
            {formatCurrency(lastMonthRevenue)}
          </div>
        </div>
      </div>

      <div className="mt-6">
        <div className="relative h-32 w-full">
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ top: 5, right: 0, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#6366f1"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                  activeDot={{ r: 5, strokeWidth: 0, fill: '#6366f1' }}
                />
                <RechartsTooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-lg border border-slate-100 bg-white p-3 shadow-xl ring-1 ring-slate-900/5">
                          <p className="mb-1 text-[10px] font-semibold tracking-wider text-slate-500 uppercase">
                            {label}
                          </p>
                          <p className="text-sm font-bold text-indigo-600">
                            {formatCurrency(Number(payload[0].value))}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                  cursor={{
                    stroke: '#cbd5e1',
                    strokeWidth: 1,
                    strokeDasharray: '4 4',
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex h-full items-center justify-center rounded-lg border border-dashed border-slate-200">
              <span className="text-xs text-slate-400">
                Sem dados para o gráfico
              </span>
            </div>
          )}
        </div>
        {chartData.length > 0 && (
          <div className="mt-2 flex justify-between text-[10px] font-medium text-slate-400">
            <span>{chartData[0]?.date}</span>
            <span>{chartData[chartData.length - 1]?.date}</span>
          </div>
        )}
      </div>

      <div className="mt-12 grid grid-cols-1 gap-8">
        <div className="space-y-4 border-t border-slate-100 pt-8 sm:border-t-0 sm:pt-0">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold tracking-wider text-slate-900 uppercase">
              Agendamentos
            </h3>
            <Link
              href="/dashboard/agenda"
              className="text-xs font-medium text-indigo-600 hover:underline"
            >
              Ver agenda
            </Link>
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-2xl font-bold text-slate-900">
              {currentMonthAppointments}
            </div>
            <div className="h-1 w-8 rounded-full bg-slate-100"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
