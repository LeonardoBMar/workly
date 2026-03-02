'use client';

import { useEffect, useState, useMemo } from 'react';
import {
  getClientsWithStats,
  deleteClient,
  type ClientWithStats,
} from '@/app/actions/clients';
import {
  Search,
  Loader2,
  User,
  Trash2,
  Eye,
  Edit2,
  ChevronUp,
  ChevronDown,
  Filter,
  ArrowUpDown,
} from 'lucide-react';
import { Input } from '@/app/components/ui/input';

type SortField = 'name' | 'totalSpent' | 'appointmentCount' | 'lastAppointment';
type SortDirection = 'asc' | 'desc';

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

interface ClientTableProps {
  onViewProfile: (client: ClientWithStats) => void;
  onEdit: (client: ClientWithStats) => void;
}

export function ClientTable({ onViewProfile, onEdit }: ClientTableProps) {
  const [clients, setClients] = useState<ClientWithStats[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDir, setSortDir] = useState<SortDirection>('asc');

  const fetchClients = async () => {
    setIsLoading(true);
    const result = await getClientsWithStats();
    if (result.data) {
      setClients(result.data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      void fetchClients();
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (confirm('Tem certeza que deseja excluir este cliente?')) {
      const result = await deleteClient(id);
      if (result.success) {
        setClients(clients.filter((c) => c.id !== id));
      }
    }
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDir('asc');
    }
  };

  const filtered = useMemo(() => {
    let list = clients.filter(
      (c) =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.phone?.includes(searchTerm),
    );

    if (statusFilter !== 'all') {
      list = list.filter((c) => c.relationshipStatus === statusFilter);
    }

    list.sort((a, b) => {
      const dir = sortDir === 'asc' ? 1 : -1;
      switch (sortField) {
        case 'name':
          return dir * a.name.localeCompare(b.name);
        case 'totalSpent':
          return dir * (a.totalSpent - b.totalSpent);
        case 'appointmentCount':
          return dir * (a.appointmentCount - b.appointmentCount);
        case 'lastAppointment': {
          const aTime = a.lastAppointment
            ? new Date(a.lastAppointment).getTime()
            : 0;
          const bTime = b.lastAppointment
            ? new Date(b.lastAppointment).getTime()
            : 0;
          return dir * (aTime - bTime);
        }
        default:
          return 0;
      }
    });

    return list;
  }, [clients, searchTerm, statusFilter, sortField, sortDir]);

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

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field)
      return <ArrowUpDown className="ml-1 h-3 w-3 opacity-40" />;
    return sortDir === 'asc' ? (
      <ChevronUp className="ml-1 h-3 w-3" />
    ) : (
      <ChevronDown className="ml-1 h-3 w-3" />
    );
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex-1">
          <Input
            placeholder="Buscar por nome, email ou telefone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={<Search className="h-4 w-4 text-slate-400" />}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-slate-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-700 transition-all focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 focus:outline-none"
          >
            <option value="all">Todos os status</option>
            <option value="Novo">Novo</option>
            <option value="Recorrente">Recorrente</option>
            <option value="VIP">VIP</option>
            <option value="Inativo">Inativo</option>
          </select>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600 ring-1 ring-slate-200/80">
          {clients.length} clientes
        </span>
        {(['Novo', 'Recorrente', 'VIP', 'Inativo'] as const).map((status) => {
          const count = clients.filter(
            (c) => c.relationshipStatus === status,
          ).length;
          if (count === 0) return null;
          return (
            <span
              key={status}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${STATUS_COLORS[status]}`}
            >
              <span
                className={`inline-block h-1.5 w-1.5 rounded-full ${STATUS_DOT[status]}`}
              />
              {count} {status}
            </span>
          );
        })}
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200/60 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70">
                <th className="py-3 pr-3 pl-6 text-left">
                  <button
                    onClick={() => handleSort('name')}
                    className="inline-flex items-center text-xs font-bold tracking-wide text-slate-500 uppercase transition-colors hover:text-indigo-600"
                  >
                    Cliente
                    <SortIcon field="name" />
                  </button>
                </th>
                <th className="px-3 py-3 text-left">
                  <span className="text-xs font-bold tracking-wide text-slate-500 uppercase">
                    Telefone
                  </span>
                </th>
                <th className="px-3 py-3 text-left">
                  <span className="text-xs font-bold tracking-wide text-slate-500 uppercase">
                    Status
                  </span>
                </th>
                <th className="px-3 py-3 text-left">
                  <button
                    onClick={() => handleSort('totalSpent')}
                    className="inline-flex items-center text-xs font-bold tracking-wide text-slate-500 uppercase transition-colors hover:text-indigo-600"
                  >
                    LTV
                    <SortIcon field="totalSpent" />
                  </button>
                </th>
                <th className="px-3 py-3 text-left">
                  <button
                    onClick={() => handleSort('appointmentCount')}
                    className="inline-flex items-center text-xs font-bold tracking-wide text-slate-500 uppercase transition-colors hover:text-indigo-600"
                  >
                    Agendamentos
                    <SortIcon field="appointmentCount" />
                  </button>
                </th>
                <th className="px-3 py-3 text-left">
                  <button
                    onClick={() => handleSort('lastAppointment')}
                    className="inline-flex items-center text-xs font-bold tracking-wide text-slate-500 uppercase transition-colors hover:text-indigo-600"
                  >
                    Último Atendimento
                    <SortIcon field="lastAppointment" />
                  </button>
                </th>
                <th className="px-3 py-3 pr-6 text-right">
                  <span className="text-xs font-bold tracking-wide text-slate-500 uppercase">
                    Ações
                  </span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((client) => (
                <tr
                  key={client.id}
                  onClick={() => onViewProfile(client)}
                  className="group cursor-pointer transition-colors hover:bg-indigo-50/40"
                >
                  <td className="py-3.5 pr-3 pl-6">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-indigo-500 to-indigo-600 text-sm font-bold text-white shadow-sm">
                        {client.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-slate-900">
                          {client.name}
                        </p>
                        <p className="truncate text-xs text-slate-500">
                          {client.email || 'Sem e-mail'}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-3 py-3.5">
                    <span className="text-sm text-slate-600">
                      {client.phone || '—'}
                    </span>
                  </td>

                  <td className="px-3 py-3.5">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${STATUS_COLORS[client.relationshipStatus]}`}
                    >
                      <span
                        className={`inline-block h-1.5 w-1.5 rounded-full ${STATUS_DOT[client.relationshipStatus]}`}
                      />
                      {client.relationshipStatus}
                    </span>
                  </td>

                  <td className="px-3 py-3.5">
                    <span className="text-sm font-semibold text-slate-700">
                      {formatCurrency(client.totalSpent)}
                    </span>
                  </td>

                  <td className="px-3 py-3.5">
                    <span className="text-sm text-slate-600">
                      {client.appointmentCount}
                    </span>
                  </td>

                  <td className="px-3 py-3.5">
                    <span className="text-sm text-slate-500">
                      {formatDate(client.lastAppointment)}
                    </span>
                  </td>

                  <td className="px-3 py-3.5 pr-6 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onViewProfile(client);
                        }}
                        title="Ver perfil"
                        className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-indigo-50 hover:text-indigo-600"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onEdit(client);
                        }}
                        title="Editar"
                        className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-indigo-50 hover:text-indigo-600"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={(e) => handleDelete(e, client.id)}
                        title="Excluir"
                        className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="border-t border-dashed border-slate-200 bg-slate-50/50 py-16 text-center">
            <User className="mx-auto h-12 w-12 text-slate-300" />
            <h3 className="mt-4 text-sm font-semibold text-slate-900">
              Nenhum cliente encontrado
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              {searchTerm || statusFilter !== 'all'
                ? 'Tente ajustar os filtros de busca.'
                : 'Comece cadastrando um novo cliente para vê-lo aqui.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
