'use client';

import { useState } from 'react';
import {
  Shield,
  CreditCard,
  Building2,
  Wifi,
  CheckCircle2,
  AlertTriangle,
  Info,
} from 'lucide-react';

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

export function ConfiguracoesTab() {
  const [optInEnabled, setOptInEnabled] = useState(true);
  const [optOutEnabled, setOptOutEnabled] = useState(true);
  const [onlyOptIn, setOnlyOptIn] = useState(true);

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50">
            <Shield className="h-5 w-5 text-emerald-600" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              LGPD & Consentimento
            </h3>
            <p className="text-xs text-slate-500">
              Configurações de privacidade e opt-in/out
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border border-slate-100 p-4">
            <div className="space-y-1">
              <p className="text-sm font-medium text-slate-900">
                Opt-in automático no primeiro agendamento
              </p>
              <p className="text-xs text-slate-500">
                Exibe "Quer receber lembretes por WhatsApp?" ao agendar
              </p>
            </div>
            <Toggle
              enabled={optInEnabled}
              onChange={() => setOptInEnabled(!optInEnabled)}
            />
          </div>

          <div className="flex items-center justify-between rounded-lg border border-slate-100 p-4">
            <div className="space-y-1">
              <p className="text-sm font-medium text-slate-900">
                Permitir cancelamento de mensagens (opt-out)
              </p>
              <p className="text-xs text-slate-500">
                Cliente pode responder "PARAR" para deixar de receber
              </p>
            </div>
            <Toggle
              enabled={optOutEnabled}
              onChange={() => setOptOutEnabled(!optOutEnabled)}
            />
          </div>

          <div className="flex items-center justify-between rounded-lg border border-slate-100 p-4">
            <div className="space-y-1">
              <p className="text-sm font-medium text-slate-900">
                Enviar somente para clientes com opt-in
              </p>
              <p className="text-xs text-slate-500">
                Mensagens só serão enviadas para quem aceitou receber
              </p>
            </div>
            <Toggle
              enabled={onlyOptIn}
              onChange={() => setOnlyOptIn(!onlyOptIn)}
            />
          </div>
        </div>

        <div className="mt-4 flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
          <p className="text-xs leading-relaxed text-amber-700">
            De acordo com a LGPD, é obrigatório obter consentimento antes de
            enviar mensagens. Mantenha o opt-in ativo para evitar problemas
            legais.
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50">
            <CreditCard className="h-5 w-5 text-purple-600" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              Créditos WhatsApp
            </h3>
            <p className="text-xs text-slate-500">
              Consumo e saldo de mensagens
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-slate-100 bg-slate-50 p-4 text-center">
            <p className="text-2xl font-bold text-slate-900">847</p>
            <p className="text-xs text-slate-500">Créditos restantes</p>
          </div>
          <div className="rounded-lg border border-slate-100 bg-slate-50 p-4 text-center">
            <p className="text-2xl font-bold text-indigo-600">1.247</p>
            <p className="text-xs text-slate-500">Usados este mês</p>
          </div>
          <div className="rounded-lg border border-slate-100 bg-slate-50 p-4 text-center">
            <p className="text-2xl font-bold text-emerald-600">2.000</p>
            <p className="text-xs text-slate-500">Limite do plano</p>
          </div>
        </div>

        <div className="mt-4">
          <div className="mb-1 flex items-center justify-between text-xs text-slate-500">
            <span>Uso do mês</span>
            <span className="font-medium">62%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-linear-to-r from-indigo-500 to-indigo-400 transition-all"
              style={{ width: '62%' }}
            />
          </div>
        </div>

        <button className="mt-4 rounded-lg border border-indigo-200 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600 transition-colors hover:bg-indigo-100">
          Comprar mais créditos
        </button>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
            <Building2 className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              Configuração por Unidade
            </h3>
            <p className="text-xs text-slate-500">Multi-barbeiro / franquia</p>
          </div>
        </div>

        <div className="space-y-3">
          <select className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 focus:outline-none">
            <option>Todas as unidades</option>
            <option>Unidade Centro</option>
            <option>Unidade Zona Sul</option>
            <option>Unidade Shopping</option>
          </select>
          <p className="text-xs text-slate-500">
            Selecione uma unidade para configurar templates e alertas
            específicos.
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50">
            <Wifi className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              Conexão WhatsApp Business API
            </h3>
            <p className="text-xs text-slate-500">
              Status da integração via Meta Verified
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3 rounded-lg border border-emerald-200 bg-emerald-50 p-4">
            <CheckCircle2 className="h-5 w-5 text-emerald-600" />
            <div>
              <p className="text-sm font-medium text-emerald-900">
                Conectado e verificado
              </p>
              <p className="text-xs text-emerald-700">
                Número: +55 (11) 99999-0000 · Parceiro: Meta BSP Oficial
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-slate-100 p-3">
              <p className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
                ID da conta
              </p>
              <p className="mt-1 font-mono text-sm text-slate-700">
                WABA-123456789
              </p>
            </div>
            <div className="rounded-lg border border-slate-100 p-3">
              <p className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
                Tier de mensagens
              </p>
              <p className="mt-1 font-mono text-sm text-slate-700">
                Tier 2 (10k/dia)
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2 rounded-lg border border-blue-200 bg-blue-50 p-3">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
            <p className="text-xs leading-relaxed text-blue-700">
              Integração via parceiro oficial da Meta (sem QR code manual).
              Todos os templates são submetidos automaticamente para aprovação.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
