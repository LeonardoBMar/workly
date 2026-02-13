'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, Plus, User, Phone, Mail, ChevronDown } from 'lucide-react';
import type { Client } from '../_actions/use-clients';

interface ClientSelectProps {
  value: Client | null;
  onChange: (client: Client | null) => void;
  onCreateClient: (clientData: Omit<Client, 'id'>) => Promise<Client>;
  onSearchClients: (search: string) => Promise<Client[]>;
  isLoading?: boolean;
}

export function ClientSelect({
  value,
  onChange,
  onCreateClient,
  onSearchClients,
  isLoading,
}: ClientSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [clients, setClients] = useState<Client[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newClientData, setNewClientData] = useState({
    name: '',
    phone: '',
    email: '',
  });
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setShowCreateForm(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (search.trim()) {
      const debounce = setTimeout(async () => {
        const results = await onSearchClients(search);
        setClients(results);
      }, 300);
      return () => clearTimeout(debounce);
    } else {
      setClients([]);
    }
  }, [search, onSearchClients]);

  const handleCreateClient = async () => {
    if (!newClientData.name.trim()) return;

    try {
      const newClient = await onCreateClient(newClientData);
      onChange(newClient);
      setShowCreateForm(false);
      setNewClientData({ name: '', phone: '', email: '' });
      setSearch('');
      setIsOpen(false);
    } catch (error) {
      console.error('Error creating client:', error);
    }
  };

  const handleSelectClient = (client: Client) => {
    onChange(client);
    setIsOpen(false);
    setSearch('');
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="text-muted-foreground mb-2 flex items-center gap-1.5 text-sm font-medium">
        <User className="h-4 w-4" />
        Cliente
      </label>

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="border-border text-foreground focus:ring-ring flex w-full items-center justify-between rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:outline-none"
      >
        <span className={value ? 'text-foreground' : 'text-muted-foreground'}>
          {value ? value.name : 'Selecione ou crie um cliente...'}
        </span>
        <ChevronDown
          className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="bg-card border-border absolute z-50 mt-1 flex max-h-80 w-full flex-col overflow-hidden rounded-lg border shadow-lg">
          <div className="border-border border-b p-2">
            <div className="relative">
              <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Pesquisar cliente..."
                className="border-border text-foreground placeholder:text-muted-foreground focus:ring-ring w-full rounded-md border py-2 pr-3 pl-9 text-sm focus:ring-2 focus:outline-none"
                autoFocus
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {isLoading ? (
              <div className="text-muted-foreground p-4 text-center text-sm">
                Carregando...
              </div>
            ) : clients.length > 0 ? (
              <div className="p-1">
                {clients.map((client) => (
                  <button
                    key={client.id}
                    type="button"
                    onClick={() => handleSelectClient(client)}
                    className="hover:bg-secondary w-full rounded-md px-3 py-2 text-left transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <User className="text-muted-foreground h-4 w-4" />
                      <div className="min-w-0 flex-1">
                        <p className="text-foreground truncate text-sm font-medium">
                          {client.name}
                        </p>
                        {(client.phone || client.email) && (
                          <p className="text-muted-foreground truncate text-xs">
                            {client.phone && client.phone}
                            {client.phone && client.email && ' • '}
                            {client.email && client.email}
                          </p>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            ) : search.trim() ? (
              <div className="p-4">
                {!showCreateForm ? (
                  <button
                    type="button"
                    onClick={() => {
                      setShowCreateForm(true);
                      setNewClientData({ ...newClientData, name: search });
                    }}
                    className="bg-primary/10 text-primary hover:bg-primary/20 flex w-full items-center gap-2 rounded-md px-3 py-2 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                    <span className="text-sm font-medium">
                      Criar cliente "{search}"
                    </span>
                  </button>
                ) : (
                  <div className="space-y-3">
                    <h4 className="text-foreground text-sm font-semibold">
                      Novo Cliente
                    </h4>
                    <div>
                      <label className="text-muted-foreground mb-1 flex items-center gap-1.5 text-xs font-medium">
                        <User className="h-3 w-3" />
                        Nome *
                      </label>
                      <input
                        type="text"
                        value={newClientData.name}
                        onChange={(e) =>
                          setNewClientData({
                            ...newClientData,
                            name: e.target.value,
                          })
                        }
                        placeholder="Nome completo"
                        className="border-border text-foreground placeholder:text-muted-foreground focus:ring-ring w-full rounded border px-2 py-1.5 text-sm focus:ring-2 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-muted-foreground mb-1 flex items-center gap-1.5 text-xs font-medium">
                        <Phone className="h-3 w-3" />
                        Telefone
                      </label>
                      <input
                        type="tel"
                        value={newClientData.phone}
                        onChange={(e) =>
                          setNewClientData({
                            ...newClientData,
                            phone: e.target.value,
                          })
                        }
                        placeholder="(00) 00000-0000"
                        className="border-border text-foreground placeholder:text-muted-foreground focus:ring-ring w-full rounded border px-2 py-1.5 text-sm focus:ring-2 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-muted-foreground mb-1 flex items-center gap-1.5 text-xs font-medium">
                        <Mail className="h-3 w-3" />
                        Email
                      </label>
                      <input
                        type="email"
                        value={newClientData.email}
                        onChange={(e) =>
                          setNewClientData({
                            ...newClientData,
                            email: e.target.value,
                          })
                        }
                        placeholder="email@exemplo.com"
                        className="border-border text-foreground placeholder:text-muted-foreground focus:ring-ring w-full rounded border px-2 py-1.5 text-sm focus:ring-2 focus:outline-none"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setShowCreateForm(false)}
                        className="bg-secondary text-secondary-foreground hover:bg-secondary/80 flex-1 rounded px-3 py-1.5 text-sm font-medium transition-colors"
                      >
                        Cancelar
                      </button>
                      <button
                        type="button"
                        onClick={handleCreateClient}
                        disabled={!newClientData.name.trim()}
                        className="bg-primary text-primary-foreground hover:bg-primary/90 flex-1 rounded px-3 py-1.5 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        Criar
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-muted-foreground p-4 text-center text-sm">
                Digite para pesquisar clientes
              </div>
            )}
          </div>
        </div>
      )}

      {value && (
        <div className="bg-secondary/50 mt-2 rounded-md p-2">
          <div className="flex items-start justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-foreground text-sm font-medium">
                {value.name}
              </p>
              {value.phone && (
                <p className="text-muted-foreground mt-0.5 flex items-center gap-1 text-xs">
                  <Phone className="h-3 w-3" />
                  {value.phone}
                </p>
              )}
              {value.email && (
                <p className="text-muted-foreground mt-0.5 flex items-center gap-1 text-xs">
                  <Mail className="h-3 w-3" />
                  {value.email}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={() => onChange(null)}
              className="text-muted-foreground hover:text-foreground text-xs transition-colors"
            >
              Alterar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
