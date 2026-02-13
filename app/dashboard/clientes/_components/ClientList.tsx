'use client';

import { useEffect, useState } from 'react';
import { getClients, deleteClient } from '@/app/actions/clients';
import {
  User,
  Phone,
  Mail,
  Trash2,
  Edit2,
  Search,
  Loader2,
} from 'lucide-react';
import { Input } from '@/app/components/ui/input';
import { Client } from '@/lib/schema';

export function ClientList({ onEdit }: { onEdit?: (client: Client) => void }) {
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchClients = async () => {
    setIsLoading(true);
    const result = await getClients();
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

  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza que deseja excluir este cliente?')) {
      const result = await deleteClient(id);
      if (result.success) {
        setClients(clients.filter((c) => c.id !== id));
      }
    }
  };

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.phone?.includes(searchTerm),
  );

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <Input
          placeholder="Buscar clientes por nome, email ou telefone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          icon={<Search className="h-4 w-4 text-slate-400" />}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredClients.map((client) => (
          <div
            key={client.id}
            className="group relative rounded-3xl border border-slate-200/60 bg-white p-6 shadow-sm transition-all hover:border-indigo-100 hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-lg font-bold text-indigo-600">
                {client.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                <button
                  onClick={() => onEdit?.(client)}
                  className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-indigo-50 hover:text-indigo-600"
                >
                  <Edit2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(client.id)}
                  className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="mt-4 space-y-1">
              <h3 className="truncate font-bold text-slate-900">
                {client.name}
              </h3>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Mail className="h-3 w-3" />
                <span className="truncate">{client.email || 'Sem e-mail'}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Phone className="h-3 w-3" />
                <span>{client.phone || 'Sem telefone'}</span>
              </div>
            </div>
          </div>
        ))}

        {filteredClients.length === 0 && (
          <div className="col-span-full rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50/50 py-12 text-center">
            <User className="mx-auto h-12 w-12 text-slate-300" />
            <h3 className="mt-4 text-sm font-semibold text-slate-900">
              Nenhum cliente encontrado
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Comece cadastrando um novo cliente para vê-lo aqui.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
