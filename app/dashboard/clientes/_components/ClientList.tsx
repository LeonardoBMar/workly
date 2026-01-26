"use client";

import { useEffect, useState } from "react";
import { getClients, deleteClient } from "@/app/actions";
import { User, Phone, Mail, MoreVertical, Trash2, Edit2, Search, Loader2 } from "lucide-react";
import { Input } from "@/app/components/ui/input";

export function ClientList({ onEdit }: { onEdit?: (client: any) => void }) {
    const [clients, setClients] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchClients = async () => {
        setIsLoading(true);
        const result = await getClients();
        if (result.data) {
            setClients(result.data);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchClients();
    }, []);

    const handleDelete = async (id: string) => {
        if (confirm("Tem certeza que deseja excluir este cliente?")) {
            const result = await deleteClient(id);
            if (result.success) {
                setClients(clients.filter(c => c.id !== id));
            }
        }
    };

    const filteredClients = clients.filter(client =>
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.phone?.includes(searchTerm)
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
                    <div key={client.id} className="group relative bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm transition-all hover:shadow-md hover:border-indigo-100">
                        <div className="flex items-start justify-between">
                            <div className="h-12 w-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-lg">
                                {client.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => onEdit?.(client)}
                                    className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                >
                                    <Edit2 className="h-4 w-4" />
                                </button>
                                <button
                                    onClick={() => handleDelete(client.id)}
                                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>
                        </div>

                        <div className="mt-4 space-y-1">
                            <h3 className="font-bold text-slate-900 truncate">{client.name}</h3>
                            <div className="flex items-center gap-2 text-sm text-slate-500">
                                <Mail className="h-3 w-3" />
                                <span className="truncate">{client.email || "Sem e-mail"}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-slate-500">
                                <Phone className="h-3 w-3" />
                                <span>{client.phone || "Sem telefone"}</span>
                            </div>
                        </div>
                    </div>
                ))}

                {filteredClients.length === 0 && (
                    <div className="col-span-full py-12 text-center bg-slate-50/50 rounded-3xl border-2 border-dashed border-slate-200">
                        <User className="mx-auto h-12 w-12 text-slate-300" />
                        <h3 className="mt-4 text-sm font-semibold text-slate-900">Nenhum cliente encontrado</h3>
                        <p className="mt-1 text-sm text-slate-500">
                            Comece cadastrando um novo cliente para vê-lo aqui.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
