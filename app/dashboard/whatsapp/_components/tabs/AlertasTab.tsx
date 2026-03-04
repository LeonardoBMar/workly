'use client';

import { useState } from 'react';
import {
  CheckCircle2,
  Clock,
  XCircle,
  Star,
  UserPlus,
  ChevronRight,
  Zap,
} from 'lucide-react';

interface AlertConfig {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
  bgColor: string;
  borderColor: string;
  enabled: boolean;
  timing?: string;
  timingOptions?: string[];
}

const defaultAlerts: AlertConfig[] = [
  {
    id: 'confirmacao',
    title: 'Confirmação Imediata',
    description: 'Enviado automaticamente logo após o agendamento ser criado.',
    icon: CheckCircle2,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    enabled: true,
    timing: 'Imediato',
  },
  {
    id: 'lembrete_48h',
    title: 'Lembrete — 48h antes',
    description: 'Lembra o cliente dois dias antes do horário agendado.',
    icon: Clock,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    enabled: true,
    timing: '48 horas antes',
    timingOptions: ['72h antes', '48h antes', '24h antes'],
  },
  {
    id: 'lembrete_24h',
    title: 'Lembrete — 24h antes',
    description: 'Lembra o cliente um dia antes do horário agendado.',
    icon: Clock,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    enabled: true,
    timing: '24 horas antes',
    timingOptions: ['48h antes', '24h antes', '12h antes'],
  },
  {
    id: 'lembrete_2h',
    title: 'Lembrete — 2h antes',
    description: 'Lembrete final pouco antes do horário agendado.',
    icon: Clock,
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    enabled: true,
    timing: '2 horas antes',
    timingOptions: ['3h antes', '2h antes', '1h antes', '30min antes'],
  },
  {
    id: 'cancelamento',
    title: 'Cancelamento / Reagendamento',
    description: 'Notifica quando um agendamento é cancelado ou reagendado.',
    icon: XCircle,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    enabled: true,
    timing: 'Imediato',
  },
  {
    id: 'pos_atendimento',
    title: 'Pós-Atendimento',
    description:
      'Agradecimento + pedido de avaliação com link Google/Instagram.',
    icon: Star,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    enabled: false,
    timing: '1 hora após',
    timingOptions: ['30min após', '1h após', '2h após', '24h após'],
  },
  {
    id: 'boas_vindas',
    title: 'Boas-vindas ao Novo Cliente',
    description:
      'Mensagem especial para o primeiro agendamento + instruções pré-serviço.',
    icon: UserPlus,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
    borderColor: 'border-indigo-200',
    enabled: false,
    timing: 'Imediato',
  },
];

function Toggle({
  enabled,
  onChange,
}: {
  enabled: boolean;
  onChange: () => void;
}) {
  return (
    <button
      onClick={onChange}
      className={`toggle-switch relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent ${
        enabled ? 'bg-green-500' : 'bg-slate-200'
      }`}
    >
      <span
        className={`toggle-knob pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-lg ring-0 ${
          enabled ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </button>
  );
}

export function AlertasTab() {
  const [alerts, setAlerts] = useState(defaultAlerts);

  const toggleAlert = (id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, enabled: !a.enabled } : a)),
    );
  };

  const enabledCount = alerts.filter((a) => a.enabled).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50">
            <Zap className="h-5 w-5 text-indigo-600" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">
              {enabledCount} de {alerts.length} alertas ativos
            </p>
            <p className="text-xs text-slate-500">
              Alertas são disparados automaticamente por eventos na agenda
            </p>
          </div>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {alerts.map((alert) => {
          const Icon = alert.icon;
          return (
            <div
              key={alert.id}
              className={`wa-card group rounded-xl border bg-white p-5 ${
                alert.enabled
                  ? `border-l-4 ${alert.borderColor}`
                  : 'border-slate-200 opacity-60'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${alert.bgColor}`}
                  >
                    <Icon className={`h-5 w-5 ${alert.color}`} />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-semibold text-slate-900">
                      {alert.title}
                    </h3>
                    <p className="text-xs leading-relaxed text-slate-500">
                      {alert.description}
                    </p>
                  </div>
                </div>
                <Toggle
                  enabled={alert.enabled}
                  onChange={() => toggleAlert(alert.id)}
                />
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                <div className="flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5 text-slate-400" />
                  {alert.timingOptions ? (
                    <select
                      className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-xs text-slate-600 focus:border-indigo-300 focus:ring-1 focus:ring-indigo-200 focus:outline-none"
                      defaultValue={alert.timing}
                    >
                      {alert.timingOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <span className="text-xs font-medium text-slate-500">
                      {alert.timing}
                    </span>
                  )}
                </div>
                <button className="flex items-center gap-1 text-xs font-medium text-indigo-600 transition-colors hover:text-indigo-700">
                  Editar template
                  <ChevronRight className="h-3 w-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
