"use client";

import { ClientForm } from "./_components/ClientForm";
import { ClientList } from "./_components/ClientList";
import { ArrowLeft, Plus, Users } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/app/components/ui/button";

export default function ClientesPage() {
    const [view, setView] = useState<"list" | "create">("list");
    const [editingClient, setEditingClient] = useState<any>(null);

    const handleEdit = (client: any) => {
        setEditingClient(client);
        setView("create");
    };

    const handleCreateNew = () => {
        setEditingClient(null);
        setView("create");
    };

    const handleSuccess = () => {
        setEditingClient(null);
        setView("list");
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                    {view === "create" ? (
                        <button
                            onClick={() => {
                                setView("list");
                                setEditingClient(null);
                            }}
                            className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors mb-2"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Voltar para a lista
                        </button>
                    ) : (
                        <Link
                            href="/dashboard"
                            className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors mb-2"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Voltar para o Dashboard
                        </Link>
                    )}
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                        {view === "list" ? "Clientes" : (editingClient ? "Editar Cliente" : "Novo Cliente")}
                    </h1>
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        variant={view === "list" ? "primary" : "outline"}
                        onClick={() => {
                            setView("list");
                            setEditingClient(null);
                        }}
                        className="gap-2"
                        size="sm"
                    >
                        <Users className="h-4 w-4" />
                        Ver Todos
                    </Button>
                    <Button
                        variant={view === "create" && !editingClient ? "primary" : "outline"}
                        onClick={handleCreateNew}
                        className="gap-2"
                        size="sm"
                    >
                        <Plus className="h-4 w-4" />
                        Novo Cliente
                    </Button>
                </div>
            </header>

            <div className="pt-4">
                {view === "list" ? (
                    <ClientList onEdit={handleEdit} />
                ) : (
                    <ClientForm
                        initialData={editingClient}
                        onSuccess={handleSuccess}
                    />
                )}
            </div>
        </div>
    );
}
