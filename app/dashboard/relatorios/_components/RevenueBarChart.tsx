'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { formatCurrency } from '../_utils/report-formatters';

interface RevenueBarChartProps {
  data: { month: string; revenue: number; appointments: number }[];
}

export function RevenueBarChart({ data }: RevenueBarChartProps) {
  const maxRevenue = Math.max(...data.map((d) => d.revenue), 1);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">
            Receita Mensal
          </h3>
          <p className="mt-0.5 text-xs text-slate-400">
            Evolução da receita ao longo do tempo
          </p>
        </div>
        <div className="flex items-center gap-2 self-end text-xs text-slate-400 sm:self-auto">
          <div className="h-2 w-2 rounded-full bg-indigo-500" />
          Receita
        </div>
      </div>

      <div className="h-48 sm:h-64">
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 5, right: 0, left: -15, bottom: 5 }}
            >
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity={1} />
                  <stop offset="100%" stopColor="#818cf8" stopOpacity={0.8} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#f1f5f9"
                vertical={false}
              />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 9, fill: '#94a3b8' }}
                tickLine={false}
                axisLine={{ stroke: '#e2e8f0' }}
                interval="preserveStartEnd"
              />
              <YAxis
                tick={{ fontSize: 9, fill: '#94a3b8' }}
                tickLine={false}
                axisLine={false}
                width={35}
                tickFormatter={(v) =>
                  v >= 1000 ? `${(v / 1000).toFixed(0)}k` : String(v)
                }
              />
              <Tooltip
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
                        <p className="mt-1 text-[10px] text-slate-400">
                          {payload[0].payload.appointments} agendamentos
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
                cursor={{ fill: '#f1f5f9', radius: 4 }}
              />
              <Bar dataKey="revenue" radius={[6, 6, 0, 0]} maxBarSize={40}>
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill="url(#barGradient)"
                    opacity={0.4 + (entry.revenue / maxRevenue) * 0.6}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-full items-center justify-center rounded-lg border border-dashed border-slate-200">
            <span className="text-xs text-slate-400">
              Sem dados para o gráfico
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
