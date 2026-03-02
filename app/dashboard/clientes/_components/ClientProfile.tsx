'use client';

import { useEffect, useState } from 'react';
import {
  getClientProfile,
  updateClientTags,
  type ClientProfileData,
} from '@/app/actions/clients';
import {
  ArrowLeft,
  Loader2,
  Mail,
  Phone,
  Calendar,
  DollarSign,
  Clock,
  Star,
  Tag,
  X,
  Plus,
  FileText,
  TrendingUp,
  Cake,
} from 'lucide-react';

const STATUS_COLORS: Record<string, string> = {
  Novo: 'bg-sky-50 text-sky-700 ring-sky-600/20',
  Recorrente: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  VIP: 'bg-amber-50 text-amber-700 ring-amber-600/20',
  Inativo: 'bg-slate-100 text-slate-500 ring-slate-400/20',
};

const STATUS_DOT: Record<string, string> = {
  Novo: 'bg-sky-500',
  Recorrente: 'bg-emerald-500',
  VIP: 'bg-amber-500',
  Inativo: 'bg-slate-400',
};

const APPT_STATUS_MAP: Record<string, { label: string; color: string }> = {
  pending: {
    label: 'Pendente',
    color: 'bg-yellow-50 text-yellow-700 ring-yellow-600/20',
  },
  confirmed: {
    label: 'Confirmado',
    color: 'bg-green-50 text-green-700 ring-green-600/20',
  },
  completed: {
    label: 'Finalizado',
    color: 'bg-blue-50 text-blue-700 ring-blue-600/20',
  },
  cancelled: {
    label: 'Cancelado',
    color: 'bg-red-50 text-red-700 ring-red-600/20',
  },
  no_show: {
    label: 'Não Compareceu',
    color: 'bg-slate-100 text-slate-600 ring-slate-400/20',
  },
};

interface ClientProfileProps {
  clientId: string;
  onBack: () => void;
}

export function ClientProfile({ clientId, onBack }: ClientProfileProps) {
  const [data, setData] = useState<ClientProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [newTag, setNewTag] = useState('');
  const [isSavingTag, setIsSavingTag] = useState(false);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      const result = await getClientProfile(clientId);
      if (result.data) {
        setData(result.data);
      }
      setIsLoading(false);
    };
    void load();
  }, [clientId]);

  const handleAddTag = async () => {
    if (!newTag.trim() || !data) return;
    const tag = newTag.trim();
    if (data.client.tags.includes(tag)) {
      setNewTag('');
      return;
    }
    const updated = [...data.client.tags, tag];
    setIsSavingTag(true);
    await updateClientTags(clientId, updated);
    setData({
      ...data,
      client: { ...data.client, tags: updated },
    });
    setNewTag('');
    setIsSavingTag(false);
  };

  const handleRemoveTag = async (tag: string) => {
    if (!data) return;
    const updated = data.client.tags.filter((t) => t !== tag);
    setIsSavingTag(true);
    await updateClientTags(clientId, updated);
    setData({
      ...data,
      client: { ...data.client, tags: updated },
    });
    setIsSavingTag(false);
  };

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);

  const formatDate = (date: Date | null) => {
    if (!date) return '—';
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(new Date(date));
  };

  const formatDateTime = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(date));
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="py-16 text-center">
        <p className="text-slate-500">Cliente não encontrado.</p>
        <button
          onClick={onBack}
          className="mt-4 text-sm font-medium text-indigo-600 hover:text-indigo-500"
        >
          Voltar para a lista
        </button>
      </div>
    );
  }

  const { client, stats, appointments, topServices } = data;

  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-indigo-600"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar para a lista
      </button>

      <div className="overflow-hidden rounded-2xl border border-slate-200/60 bg-white shadow-sm">
        <div className="bg-linear-to-r from-indigo-500 via-indigo-600 to-violet-600 px-8 py-6">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-white/20 text-3xl font-bold text-white backdrop-blur-sm">
              {client.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-2xl font-bold text-white">{client.name}</h2>
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${STATUS_COLORS[stats.relationshipStatus]}`}
                >
                  <span
                    className={`inline-block h-1.5 w-1.5 rounded-full ${STATUS_DOT[stats.relationshipStatus]}`}
                  />
                  {stats.relationshipStatus}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm text-indigo-100">
                {client.email && (
                  <span className="flex items-center gap-1.5">
                    <Mail className="h-3.5 w-3.5" />
                    {client.email}
                  </span>
                )}
                {client.phone && (
                  <span className="flex items-center gap-1.5">
                    <Phone className="h-3.5 w-3.5" />
                    {client.phone}
                  </span>
                )}
                {client.birthday && (
                  <span className="flex items-center gap-1.5">
                    <Cake className="h-3.5 w-3.5" />
                    {client.birthday}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-100 px-8 py-4">
          <div className="flex flex-wrap items-center gap-2">
            <Tag className="h-4 w-4 text-slate-400" />
            {client.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700"
              >
                {tag}
                <button
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-0.5 rounded-full p-0.5 transition-colors hover:bg-indigo-200"
                  disabled={isSavingTag}
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
            <div className="flex items-center gap-1">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    void handleAddTag();
                  }
                }}
                placeholder="Nova tag..."
                className="w-24 rounded-lg border border-dashed border-slate-300 bg-transparent px-2 py-1 text-xs text-slate-600 placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none"
                disabled={isSavingTag}
              />
              <button
                onClick={() => void handleAddTag()}
                className="rounded-lg p-1 text-slate-400 transition-colors hover:bg-indigo-50 hover:text-indigo-600"
                disabled={isSavingTag || !newTag.trim()}
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div className="rounded-2xl border border-slate-200/60 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
              <DollarSign className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500">LTV Total</p>
              <p className="text-lg font-bold text-slate-900">
                {formatCurrency(stats.totalSpent)}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200/60 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50">
              <Calendar className="h-5 w-5 text-indigo-600" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500">Agendamentos</p>
              <p className="text-lg font-bold text-slate-900">
                {stats.appointmentCount}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200/60 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50">
              <Clock className="h-5 w-5 text-violet-600" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500">
                Primeiro Atend.
              </p>
              <p className="text-sm font-bold text-slate-900">
                {formatDate(stats.firstAppointment)}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200/60 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50">
              <TrendingUp className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500">
                Último Atend.
              </p>
              <p className="text-sm font-bold text-slate-900">
                {formatDate(stats.lastAppointment)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm">
          <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900">
            <Star className="h-4 w-4 text-amber-500" />
            Serviços Mais Contratados
          </h3>
          <div className="mt-4 space-y-2">
            {topServices.length === 0 ? (
              <p className="text-sm text-slate-400">Nenhum serviço ainda.</p>
            ) : (
              topServices.map((service, i) => (
                <div
                  key={service}
                  className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-2.5"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600">
                    {i + 1}
                  </span>
                  <span className="text-sm font-medium text-slate-700">
                    {service}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm">
          <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900">
            <FileText className="h-4 w-4 text-indigo-500" />
            Observações do Profissional
          </h3>
          <div className="mt-4">
            {client.notes ? (
              <p className="text-sm leading-relaxed whitespace-pre-wrap text-slate-600">
                {client.notes}
              </p>
            ) : (
              <p className="text-sm text-slate-400 italic">
                Nenhuma observação registrada.
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200/60 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-6 py-4">
          <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900">
            <Calendar className="h-4 w-4 text-indigo-500" />
            Histórico de Agendamentos
            <span className="ml-1 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-500">
              {appointments.length}
            </span>
          </h3>
        </div>

        {appointments.length === 0 ? (
          <div className="py-12 text-center">
            <Calendar className="mx-auto h-10 w-10 text-slate-300" />
            <p className="mt-3 text-sm text-slate-500">
              Nenhum agendamento encontrado.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="bg-slate-50/70">
                  <th className="py-2.5 pr-3 pl-6 text-left text-xs font-bold tracking-wide text-slate-500 uppercase">
                    Data
                  </th>
                  <th className="px-3 py-2.5 text-left text-xs font-bold tracking-wide text-slate-500 uppercase">
                    Serviço
                  </th>
                  <th className="px-3 py-2.5 text-left text-xs font-bold tracking-wide text-slate-500 uppercase">
                    Valor
                  </th>
                  <th className="px-3 py-2.5 text-left text-xs font-bold tracking-wide text-slate-500 uppercase">
                    Status
                  </th>
                  <th className="px-3 py-2.5 pr-6 text-left text-xs font-bold tracking-wide text-slate-500 uppercase">
                    Notas
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {appointments.map((appt) => {
                  const st = APPT_STATUS_MAP[appt.status] || {
                    label: appt.status,
                    color: 'bg-slate-100 text-slate-600',
                  };
                  return (
                    <tr key={appt.id} className="hover:bg-slate-50/50">
                      <td className="py-3 pr-3 pl-6 text-sm text-slate-700">
                        {formatDateTime(appt.startTime)}
                      </td>
                      <td className="px-3 py-3 text-sm font-medium text-slate-700">
                        {appt.serviceName}
                      </td>
                      <td className="px-3 py-3 text-sm font-semibold text-slate-700">
                        {formatCurrency(Number(appt.servicePrice))}
                      </td>
                      <td className="px-3 py-3">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${st.color}`}
                        >
                          {st.label}
                        </span>
                      </td>
                      <td className="px-3 py-3 pr-6 text-sm text-slate-500">
                        {appt.notes || '—'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
