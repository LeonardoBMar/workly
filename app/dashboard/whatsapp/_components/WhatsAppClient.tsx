'use client';

import { useState } from 'react';
import {
  ArrowLeft,
  Bell,
  FileText,
  MousePointerClick,
  BarChart3,
  Workflow,
  Settings,
} from 'lucide-react';
import Link from 'next/link';
import '../whatsapp.css';
import { AlertasTab } from './tabs/AlertasTab';
import { TemplatesTab } from './tabs/TemplatesTab';
import { BotoesTab } from './tabs/BotoesTab';
import { RastreamentoTab } from './tabs/RastreamentoTab';
import { FluxosTab } from './tabs/FluxosTab';
import { ConfiguracoesTab } from './tabs/ConfiguracoesTab';

const tabs = [
  { id: 'alertas', label: 'Alertas Automáticos', icon: Bell },
  { id: 'templates', label: 'Templates', icon: FileText },
  { id: 'botoes', label: 'Botões Interativos', icon: MousePointerClick },
  { id: 'rastreamento', label: 'Rastreamento', icon: BarChart3 },
  { id: 'fluxos', label: 'Fluxos Extras', icon: Workflow },
  { id: 'config', label: 'Configurações', icon: Settings },
] as const;

type TabId = (typeof tabs)[number]['id'];

export function WhatsAppClient() {
  const [activeTab, setActiveTab] = useState<TabId>('alertas');

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 whatsapp-accent space-y-6 duration-700">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <Link
            href="/dashboard"
            className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-indigo-600"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para o Dashboard
          </Link>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500 shadow-lg shadow-green-500/20">
              <svg
                className="h-5 w-5 text-white"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                WhatsApp Business
              </h1>
              <p className="text-sm text-slate-500">
                Configure alertas, mensagens e automações
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-3 py-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500"></span>
            </span>
            <span className="text-sm font-medium text-green-700">
              API Conectada
            </span>
          </div>
        </div>
      </header>

      <div className="border-b border-slate-200">
        <nav className="-mb-px flex gap-1 overflow-x-auto" aria-label="Tabs">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`group relative flex cursor-pointer items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
                  isActive
                    ? 'text-indigo-600'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <Icon
                  className={`h-4 w-4 ${isActive ? 'text-indigo-500' : 'text-slate-400 group-hover:text-slate-500'}`}
                />
                {tab.label}
                {isActive && (
                  <span className="tab-underline absolute right-0 bottom-0 left-0 h-0.5 bg-indigo-600" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="tab-content-enter" key={activeTab}>
        {activeTab === 'alertas' && <AlertasTab />}
        {activeTab === 'templates' && <TemplatesTab />}
        {activeTab === 'botoes' && <BotoesTab />}
        {activeTab === 'rastreamento' && <RastreamentoTab />}
        {activeTab === 'fluxos' && <FluxosTab />}
        {activeTab === 'config' && <ConfiguracoesTab />}
      </div>
    </div>
  );
}
