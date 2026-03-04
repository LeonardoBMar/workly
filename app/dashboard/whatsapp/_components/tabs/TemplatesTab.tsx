'use client';

import { useState } from 'react';
import {
  Plus,
  CheckCircle,
  Clock,
  XCircle,
  Eye,
  Copy,
  Edit3,
  Search,
} from 'lucide-react';

interface Template {
  id: string;
  name: string;
  category: string;
  status: 'approved' | 'pending' | 'rejected';
  lastEdited: string;
  content: string;
}

const mockTemplates: Template[] = [
  {
    id: '1',
    name: 'Confirmação de Agendamento',
    category: 'Confirmação',
    status: 'approved',
    lastEdited: '28/02/2026',
    content:
      'Olá {{nome}}! ✅ Seu agendamento está confirmado.\n\n📅 {{data}} às {{hora}}\n💈 Serviço: {{servico}}\n👤 Profissional: {{profissional}}\n💰 Valor: R$ {{valor}}\n📍 {{endereco}}\n\nDúvidas? Responda esta mensagem!',
  },
  {
    id: '2',
    name: 'Lembrete 24h',
    category: 'Lembrete',
    status: 'approved',
    lastEdited: '27/02/2026',
    content:
      'Ei {{nome}}! 👋 Lembrando que amanhã você tem horário marcado.\n\n📅 {{data}} às {{hora}}\n💈 {{servico}} com {{profissional}}\n\n⏰ Chegue 10 min antes, por favor!\n\nPrecisa reagendar? {{link_reagendamento}}',
  },
  {
    id: '3',
    name: 'Pós-Atendimento',
    category: 'Pós-atendimento',
    status: 'approved',
    lastEdited: '25/02/2026',
    content:
      'Obrigado por nos visitar, {{nome}}! 🙏\n\nEsperamos que você tenha curtido o {{servico}}.\n\n⭐ Deixe sua avaliação: {{link_avaliacao}}\n\nAté a próxima! 💈',
  },
  {
    id: '4',
    name: 'Cancelamento pelo Profissional',
    category: 'Cancelamento',
    status: 'pending',
    lastEdited: '26/02/2026',
    content:
      'Oi {{nome}}, infelizmente precisamos reagendar seu horário de {{data}} às {{hora}}.\n\n😔 Pedimos desculpas pelo inconveniente.\n\n📅 Reagende agora: {{link_reagendamento}}',
  },
  {
    id: '5',
    name: 'Boas-vindas Novo Cliente',
    category: 'Boas-vindas',
    status: 'rejected',
    lastEdited: '24/02/2026',
    content:
      'Bem-vindo(a) à {{empresa}}, {{nome}}! 🎉\n\n Primeira visita? Aqui vai o que você precisa saber:\n📍 {{endereco}}\n⏰ Chegue 10 min antes\n🅿️ Estacionamento gratuito\n\nNos vemos em breve! 💈',
  },
];

const variables = [
  { key: 'nome', label: 'Nome do Cliente' },
  { key: 'data', label: 'Data' },
  { key: 'hora', label: 'Hora' },
  { key: 'servico', label: 'Serviço' },
  { key: 'profissional', label: 'Profissional' },
  { key: 'valor', label: 'Valor' },
  { key: 'endereco', label: 'Endereço' },
  { key: 'empresa', label: 'Empresa' },
  { key: 'link_reagendamento', label: 'Link Reagendamento' },
  { key: 'link_avaliacao', label: 'Link Avaliação' },
  { key: 'link_pagamento', label: 'Link Pagamento' },
];

const statusConfig = {
  approved: {
    label: 'Aprovado',
    icon: CheckCircle,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
  },
  pending: {
    label: 'Pendente',
    icon: Clock,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
  },
  rejected: {
    label: 'Rejeitado',
    icon: XCircle,
    color: 'text-red-600',
    bg: 'bg-red-50',
    border: 'border-red-200',
  },
};

export function TemplatesTab() {
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
    mockTemplates[0],
  );
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTemplates = mockTemplates.filter(
    (t) =>
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.category.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white py-2 pr-4 pl-10 text-sm text-slate-700 placeholder-slate-400 transition-colors focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 focus:outline-none sm:w-72"
          />
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-indigo-700 hover:shadow-md">
          <Plus className="h-4 w-4" />
          Novo Template
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="space-y-2 lg:col-span-2">
          {filteredTemplates.map((template) => {
            const status = statusConfig[template.status];
            const StatusIcon = status.icon;
            const isSelected = selectedTemplate?.id === template.id;

            return (
              <button
                key={template.id}
                onClick={() => setSelectedTemplate(template)}
                className={`wa-card w-full cursor-pointer rounded-xl border p-4 text-left transition-all ${
                  isSelected
                    ? 'border-indigo-300 bg-indigo-50/50 ring-1 ring-indigo-200'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold text-slate-900">
                      {template.name}
                    </h4>
                    <p className="text-xs text-slate-500">
                      {template.category} · Editado {template.lastEdited}
                    </p>
                  </div>
                  <span
                    className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold ${status.color} ${status.bg} ${status.border}`}
                  >
                    <StatusIcon className="h-3 w-3" />
                    {status.label}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        <div className="lg:col-span-3">
          {selectedTemplate ? (
            <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900">
                  {selectedTemplate.name}
                </h3>
                <div className="flex items-center gap-2">
                  <button className="rounded-lg border border-slate-200 p-2 text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-700">
                    <Copy className="h-4 w-4" />
                  </button>
                  <button className="flex items-center gap-2 rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white transition-all hover:bg-indigo-700">
                    <Edit3 className="h-3.5 w-3.5" />
                    Editar
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
                  Variáveis disponíveis
                </p>
                <div className="flex flex-wrap gap-2">
                  {variables.map((v) => (
                    <button
                      key={v.key}
                      className="variable-chip rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600 transition-colors hover:bg-indigo-100"
                      title={v.label}
                    >
                      {`{{${v.key}}}`}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4 text-slate-400" />
                  <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
                    Pré-visualização
                  </p>
                </div>
                <div className="wa-chat-bg rounded-xl p-4">
                  <div className="bubble-in max-w-sm rounded-lg rounded-tl-none bg-white p-3 shadow-sm">
                    <p className="text-sm whitespace-pre-line text-slate-800">
                      {selectedTemplate.content}
                    </p>
                    <p className="mt-1 text-right text-[10px] text-slate-400">
                      14:32 ✓✓
                    </p>
                  </div>
                </div>
              </div>

              {selectedTemplate.status !== 'approved' && (
                <div className="flex items-center justify-between rounded-lg border border-amber-200 bg-amber-50 p-3">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-amber-600" />
                    <span className="text-sm text-amber-700">
                      {selectedTemplate.status === 'pending'
                        ? 'Aguardando aprovação da Meta'
                        : 'Template rejeitado — edite e reenvie'}
                    </span>
                  </div>
                  <button className="rounded-lg bg-amber-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-amber-700">
                    {selectedTemplate.status === 'pending'
                      ? 'Ver Status'
                      : 'Reenviar'}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex h-64 items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50">
              <p className="text-sm text-slate-400">
                Selecione um template para visualizar
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
