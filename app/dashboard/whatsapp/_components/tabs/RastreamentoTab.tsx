'use client';

import {
  Send,
  CheckCheck,
  Eye,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
} from 'lucide-react';

const stats = [
  {
    label: 'Enviadas',
    value: '1.247',
    change: '+12%',
    trend: 'up' as const,
    icon: Send,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
  },
  {
    label: 'Entregues',
    value: '1.198',
    change: '96%',
    trend: 'up' as const,
    icon: CheckCheck,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
  },
  {
    label: 'Lidas',
    value: '987',
    change: '82%',
    trend: 'up' as const,
    icon: Eye,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
    borderColor: 'border-indigo-200',
  },
  {
    label: 'Falhas',
    value: '49',
    change: '-3%',
    trend: 'down' as const,
    icon: AlertTriangle,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
  },
];

const messageLog = [
  {
    id: '1',
    client: 'Lucas Silva',
    phone: '(11) 98765-4321',
    template: 'Lembrete 24h',
    sentAt: '01/03/2026 09:30',
    status: 'read' as const,
  },
  {
    id: '2',
    client: 'Ana Costa',
    phone: '(11) 91234-5678',
    template: 'Confirmação',
    sentAt: '01/03/2026 10:15',
    status: 'delivered' as const,
  },
  {
    id: '3',
    client: 'Pedro Santos',
    phone: '(21) 99876-1234',
    template: 'Lembrete 2h',
    sentAt: '01/03/2026 11:00',
    status: 'sent' as const,
  },
  {
    id: '4',
    client: 'Maria Oliveira',
    phone: '(11) 97654-3210',
    template: 'Pós-Atendimento',
    sentAt: '28/02/2026 16:45',
    status: 'read' as const,
  },
  {
    id: '5',
    client: 'João Pereira',
    phone: '(21) 98888-1111',
    template: 'Lembrete 24h',
    sentAt: '28/02/2026 09:30',
    status: 'failed' as const,
  },
  {
    id: '6',
    client: 'Carla Mendes',
    phone: '(11) 91111-2222',
    template: 'Confirmação',
    sentAt: '28/02/2026 14:20',
    status: 'delivered' as const,
  },
];

const statusLabels = {
  sent: {
    label: 'Enviado',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    icon: '✓',
  },
  delivered: {
    label: 'Entregue',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    icon: '✓✓',
  },
  read: {
    label: 'Lido',
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
    border: 'border-indigo-200',
    icon: '✓✓',
  },
  failed: {
    label: 'Falha',
    color: 'text-red-600',
    bg: 'bg-red-50',
    border: 'border-red-200',
    icon: '✕',
  },
};

export function RastreamentoTab() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className={`count-in count-in-delay-${i + 1} wa-card rounded-xl border bg-white p-5 ${stat.borderColor}`}
            >
              <div className="flex items-center justify-between">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg ${stat.bgColor}`}
                >
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <div
                  className={`flex items-center gap-1 text-xs font-semibold ${
                    stat.trend === 'up' ? 'text-emerald-600' : 'text-red-600'
                  }`}
                >
                  {stat.trend === 'up' ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  {stat.change}
                </div>
              </div>
              <p className="mt-3 text-2xl font-bold text-slate-900">
                {stat.value}
              </p>
              <p className="text-xs text-slate-500">{stat.label} este mês</p>
            </div>
          );
        })}
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              Taxa de Confirmação Mensal
            </h3>
            <p className="text-xs text-slate-500">
              Porcentagem de clientes que confirmaram presença
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-1.5">
            <ArrowUpRight className="h-4 w-4 text-emerald-600" />
            <span className="text-sm font-bold text-emerald-600">78%</span>
          </div>
        </div>
        <div className="mt-4 flex h-48 items-end gap-2 rounded-lg bg-slate-50 p-4">
          {[45, 52, 58, 62, 55, 68, 72, 75, 70, 78, 82, 78].map((val, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-1">
              <div
                className="w-full rounded-t bg-blue-600 transition-all hover:bg-blue-700"
                style={{ height: `${(val / 100) * 140}px` }}
                title={`${val}%`}
              />
              <span className="text-[9px] text-slate-400">
                {
                  [
                    'Jan',
                    'Fev',
                    'Mar',
                    'Abr',
                    'Mai',
                    'Jun',
                    'Jul',
                    'Ago',
                    'Set',
                    'Out',
                    'Nov',
                    'Dez',
                  ][i]
                }
              </span>
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-4 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <span className="h-2.5 w-2.5 rounded-sm bg-indigo-500" />
            Taxa de confirmação (%)
          </span>
          <span>
            Redução de faltas: <strong className="text-emerald-600">32%</strong>
          </span>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white">
        <div className="border-b border-slate-100 p-4">
          <h3 className="text-sm font-semibold text-slate-900">
            Histórico de Mensagens
          </h3>
          <p className="text-xs text-slate-500">Últimas mensagens enviadas</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 text-left">
                <th className="px-4 py-3 text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
                  Cliente
                </th>
                <th className="px-4 py-3 text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
                  Telefone
                </th>
                <th className="px-4 py-3 text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
                  Template
                </th>
                <th className="px-4 py-3 text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
                  Enviado em
                </th>
                <th className="px-4 py-3 text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {messageLog.map((msg) => {
                const status = statusLabels[msg.status];
                return (
                  <tr
                    key={msg.id}
                    className="border-b border-slate-50 transition-colors hover:bg-slate-50"
                  >
                    <td className="px-4 py-3 text-sm font-medium text-slate-900">
                      {msg.client}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-500">
                      {msg.phone}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600">
                      {msg.template}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-500">
                      {msg.sentAt}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold ${status.color} ${status.bg} ${status.border}`}
                      >
                        <span
                          className={
                            msg.status === 'read' ? 'text-blue-500' : ''
                          }
                        >
                          {status.icon}
                        </span>
                        {status.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
