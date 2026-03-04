'use client';

import { useState } from 'react';
import {
  CalendarPlus,
  Users,
  UserX,
  Clock,
  MessageSquare,
  ChevronRight,
} from 'lucide-react';

interface FluxoConfig {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
  bgColor: string;
  borderColor: string;
  enabled: boolean;
  timing: string;
  messagePreview: string;
}

const defaultFluxos: FluxoConfig[] = [
  {
    id: 'pos_7dias',
    title: 'Sequência Pós-Atendimento (D+7)',
    description:
      'Envia uma mensagem 7 dias após o atendimento incentivando o cliente a agendar novamente.',
    icon: CalendarPlus,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
    borderColor: 'border-indigo-200',
    enabled: true,
    timing: '7 dias após atendimento',
    messagePreview:
      'Oi {{nome}}! Como foi o {{servico}}? 😊\n\nJá se passaram 7 dias, que tal marcar o próximo?\n\n📅 Agende agora: {{link_reagendamento}}',
  },
  {
    id: 'lista_espera',
    title: 'Lista de Espera Automática',
    description:
      'Quando um horário vaga por cancelamento, avisa automaticamente o próximo cliente na fila.',
    icon: Users,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    enabled: false,
    timing: 'Imediato (ao cancelar)',
    messagePreview:
      'Boa notícia, {{nome}}! 🎉\n\nAbriu vaga no horário que você queria:\n📅 {{data}} às {{hora}}\n💈 {{servico}} com {{profissional}}\n\nDeseja confirmar?',
  },
  {
    id: 'reativacao',
    title: 'Reativação de Cliente Inativo',
    description:
      'Envia mensagem automaticamente para clientes que não visitam há mais de 45 dias.',
    icon: UserX,
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    enabled: true,
    timing: '45 dias sem visita',
    messagePreview:
      'Ei {{nome}}, faz tempo! 👋\n\nFaz {{dias_inativo}} dias que não te vemos por aqui. Sentimos sua falta!\n\n🔥 Temos horários disponíveis essa semana.\n\n📅 Agende: {{link_reagendamento}}',
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

export function FluxosTab() {
  const [fluxos, setFluxos] = useState(defaultFluxos);
  const [expandedId, setExpandedId] = useState<string | null>('pos_7dias');

  const toggleFluxo = (id: string) => {
    setFluxos((prev) =>
      prev.map((f) => (f.id === id ? { ...f, enabled: !f.enabled } : f)),
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-3 rounded-xl border border-indigo-200 bg-indigo-50 p-4">
        <MessageSquare className="mt-0.5 h-5 w-5 shrink-0 text-indigo-600" />
        <div>
          <p className="text-sm font-semibold text-indigo-900">
            Fluxos automáticos avançados
          </p>
          <p className="mt-1 text-xs leading-relaxed text-indigo-700">
            Configure sequências de mensagens que são disparadas em momentos
            estratégicos para fidelizar clientes e reduzir faltas.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {fluxos.map((fluxo) => {
          const Icon = fluxo.icon;
          const isExpanded = expandedId === fluxo.id;

          return (
            <div
              key={fluxo.id}
              className={`wa-card rounded-xl border bg-white transition-all ${
                fluxo.enabled
                  ? `border-l-4 ${fluxo.borderColor}`
                  : 'border-slate-200 opacity-60'
              }`}
            >
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${fluxo.bgColor}`}
                    >
                      <Icon className={`h-5 w-5 ${fluxo.color}`} />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-sm font-semibold text-slate-900">
                        {fluxo.title}
                      </h3>
                      <p className="text-xs leading-relaxed text-slate-500">
                        {fluxo.description}
                      </p>
                    </div>
                  </div>
                  <Toggle
                    enabled={fluxo.enabled}
                    onChange={() => toggleFluxo(fluxo.id)}
                  />
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                  <div className="flex items-center gap-2">
                    <Clock className="h-3.5 w-3.5 text-slate-400" />
                    <span className="text-xs font-medium text-slate-500">
                      {fluxo.timing}
                    </span>
                  </div>
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : fluxo.id)}
                    className="flex cursor-pointer items-center gap-1 text-xs font-medium text-indigo-600 transition-colors hover:text-indigo-700"
                  >
                    {isExpanded ? 'Ocultar preview' : 'Ver preview'}
                    <ChevronRight
                      className={`h-3 w-3 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                    />
                  </button>
                </div>
              </div>

              {isExpanded && (
                <div className="border-t border-slate-100 px-5 pt-4 pb-5">
                  <div className="wa-chat-bg rounded-xl p-4">
                    <div className="bubble-in max-w-sm rounded-lg rounded-tl-none bg-white p-3 shadow-sm">
                      <p className="text-sm whitespace-pre-line text-slate-800">
                        {fluxo.messagePreview}
                      </p>
                      <p className="mt-1 text-right text-[10px] text-slate-400">
                        14:32 ✓✓
                      </p>
                    </div>
                  </div>
                  <button className="mt-3 flex items-center gap-2 text-xs font-medium text-indigo-600 transition-colors hover:text-indigo-700">
                    Editar mensagem
                    <ChevronRight className="h-3 w-3" />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
