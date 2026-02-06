"use client";

import { useState } from "react";
import { ServiceForm } from "./ServiceForm";
import { ServicesList } from "./ServicesList";
import { Button } from "@/app/components/ui/button";
import { Users, Plus, ArrowLeft, Package } from "lucide-react";
import Link from "next/link";

export function ServicesClient() {
    const [view, setView] = useState<"list" | "create">("list");
    const [editingService, setEditingService] = useState<any>(null);

    const handleEdit = (service: any) => {
        setEditingService(service);
        setView("create");
    };

    const handleCreateNew = () => {
        setEditingService(null);
        setView("create");
    };

    const handleSuccess = () => {
        setEditingService(null);
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
                                setEditingService(null);
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
                        {view === "list" ? "Serviços" : (editingService ? "Editar Serviço" : "Novo Serviço")}
                    </h1>
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        variant={view === "list" ? "primary" : "outline"}
                        onClick={() => {
                            setView("list");
                            setEditingService(null);
                        }}
                        className="gap-2"
                        size="sm"
                    >
                        <Package className="h-4 w-4" />
                        Ver Todos
                    </Button>
                    <Button
                        variant={view === "create" && !editingService ? "primary" : "outline"}
                        onClick={handleCreateNew}
                        className="gap-2"
                        size="sm"
                    >
                        <Plus className="h-4 w-4" />
                        Novo Serviço
                    </Button>
                </div>
            </header>

            <div className="pt-4">
                {view === "list" ? (
                    <ServicesList onEdit={handleEdit} />
                ) : (
                    <ServiceForm
                        initialData={editingService}
                        onSuccess={handleSuccess}
                    />
                )}
            </div>
        </div>
    );
}
