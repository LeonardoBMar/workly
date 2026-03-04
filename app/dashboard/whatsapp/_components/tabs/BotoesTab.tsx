'use client';

import { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  CalendarClock,
  CreditCard,
  Smartphone,
} from 'lucide-react';

interface ButtonConfig {
  id: string;
  label: string;
  description: string;
  action: string;
  icon: any;
  color: string;
  bgColor: string;
  enabled: boolean;
}

const defaultButtons: ButtonConfig[] = [
  {
    id: 'confirmar',
    label: 'Confirmar Presença',
    description:
      'O cliente confirma o agendamento. O status na agenda muda automaticamente para "Confirmado".',
    action: 'Atualiza status → Confirmado',
    icon: CheckCircle2,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    enabled: true,
  },
  {
    id: 'cancelar',
    label: 'Cancelar',
    description:
      'O cliente cancela o agendamento. O horário é liberado automaticamente para outros clientes.',
    action: 'Atualiza status → Cancelado + Libera horário',
    icon: XCircle,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    enabled: true,
  },
  {
    id: 'reagendar',
    label: 'Reagendar',
    description:
      'Redireciona o cliente para a página de reagendamento online com os dados pré-preenchidos.',
    action: 'Abre link de reagendamento',
    icon: CalendarClock,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    enabled: true,
  },
  {
    id: 'pagar',
    label: 'Pagar Agora',
    description:
      'Envia link de pagamento online (Stripe/PIX) para o cliente pagar antecipadamente.',
    action: 'Abre link de pagamento',
    icon: CreditCard,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    enabled: false,
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

export function BotoesTab() {
  const [buttons, setButtons] = useState(defaultButtons);

  const toggleButton = (id: string) => {
    setButtons((prev) =>
      prev.map((b) => (b.id === id ? { ...b, enabled: !b.enabled } : b)),
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4">
        <Smartphone className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
        <div>
          <p className="text-sm font-semibold text-blue-900">
            Botões interativos do WhatsApp
          </p>
          <p className="mt-1 text-xs leading-relaxed text-blue-700">
            Mensagens com botões têm até 3x mais taxa de resposta. Quando o
            cliente clica, a ação é executada automaticamente no sistema.
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {buttons.map((btn) => {
          const Icon = btn.icon;
          return (
            <div
              key={btn.id}
              className={`wa-card rounded-xl border bg-white p-5 transition-all ${
                btn.enabled ? 'border-slate-200' : 'border-slate-100 opacity-50'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${btn.bgColor}`}
                  >
                    <Icon className={`h-5 w-5 ${btn.color}`} />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-semibold text-slate-900">
                      {btn.label}
                    </h3>
                    <p className="text-xs leading-relaxed text-slate-500">
                      {btn.description}
                    </p>
                  </div>
                </div>
                <Toggle
                  enabled={btn.enabled}
                  onChange={() => toggleButton(btn.id)}
                />
              </div>

              <div className="mt-4 border-t border-slate-100 pt-3">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
                    Ação
                  </span>
                  <span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
                    {btn.action}
                  </span>
                </div>
              </div>

              <div className="mt-3 overflow-hidden rounded-lg border border-slate-200 bg-slate-50 p-3">
                <p className="mb-2 text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
                  Preview
                </p>
                <div className="flex justify-center">
                  <div
                    className={`rounded-lg border-2 px-6 py-2 text-sm font-medium transition-colors ${
                      btn.enabled
                        ? `${btn.color} border-current bg-white`
                        : 'border-slate-200 text-slate-400'
                    }`}
                  >
                    {btn.label}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
