"use client";

import { useState, useEffect } from "react";
import { Plus, Package, Clock, DollarSign, Loader2, MoreVertical, Trash2, Search, X } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { createService, getServices, deleteService } from "@/app/actions";

export default function ServicesPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [services, setServices] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        duration: "60",
    });

    useEffect(() => {
        fetchServices();
    }, []);

    async function fetchServices() {
        setIsLoading(true);
        const response = await getServices();
        if (response.data) {
            setServices(response.data);
        }
        setIsLoading(false);
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setIsSubmitting(true);

        const res = await createService({
            ...formData,
            duration: parseInt(formData.duration),
        });

        if (res.success) {
            setIsModalOpen(false);
            setFormData({ name: "", description: "", price: "", duration: "60" });
            fetchServices();
        } else {
            alert(res.error || "Erro ao criar serviço");
        }
        setIsSubmitting(false);
    }

    async function handleDelete(id: string) {
        if (!confirm("Tem certeza que deseja excluir este serviço?")) return;

        const res = await deleteService(id);
        if (res.success) {
            setOpenMenuId(null);
            fetchServices();
        } else {
            alert(res.error || "Erro ao excluir serviço");
        }
    }

    const filteredServices = services.filter(service =>
        service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Meus Serviços</h1>
                    <p className="text-sm text-slate-500">Gerencie seu catálogo de serviços e preços.</p>
                </div>
                <Button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2 h-11 px-6 shadow-lg shadow-indigo-200 transition-all hover:-translate-y-0.5"
                >
                    <Plus className="h-4 w-4" />
                    Novo Serviço
                </Button>
            </header>

            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                    type="text"
                    placeholder="Buscar serviços..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full max-w-md pl-10 pr-4 py-2 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none"
                />
            </div>

            {isLoading ? (
                <div className="flex h-64 items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
                </div>
            ) : filteredServices.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-80 rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50/50 p-12 text-center">
                    <div className="h-16 w-16 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-4">
                        <Package className="h-8 w-8 text-slate-300" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900">Nenhum serviço encontrado</h3>
                    <p className="text-sm text-slate-500 max-w-xs mt-2">
                        Comece adicionando os serviços que seu negócio oferece aos clientes.
                    </p>
                    <Button
                        variant="outline"
                        onClick={() => setIsModalOpen(true)}
                        className="mt-6 gap-2"
                    >
                        <Plus className="h-4 w-4" />
                        Cadastrar primeiro serviço
                    </Button>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredServices.map((service) => (
                        <div
                            key={service.id}
                            className="group relative rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-indigo-100"
                        >
                            <div className="flex items-start justify-between">
                                <div className="h-12 w-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                                    <Package className="h-6 w-6" />
                                </div>
                                <div className="relative">
                                    <button
                                        onClick={() => setOpenMenuId(openMenuId === service.id ? null : service.id)}
                                        className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-50 transition-colors"
                                    >
                                        <MoreVertical className="h-5 w-5" />
                                    </button>

                                    {openMenuId === service.id && (
                                        <>
                                            <div
                                                className="fixed inset-0 z-10"
                                                onClick={() => setOpenMenuId(null)}
                                            />
                                            <div className="absolute right-0 top-8 z-20 w-40 rounded-xl border border-slate-100 bg-white py-1 shadow-xl shadow-slate-200/50 animate-in fade-in zoom-in-95 duration-200">
                                                <button
                                                    onClick={() => handleDelete(service.id)}
                                                    className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                    Excluir
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className="mt-4">
                                <h3 className="text-lg font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                                    {service.name}
                                </h3>
                                <p className="mt-1 text-sm text-slate-500 line-clamp-2 min-h-[40px]">
                                    {service.description || "Sem descrição"}
                                </p>
                            </div>

                            <div className="mt-6 flex items-center justify-between border-t border-slate-50 pt-4">
                                <div className="flex items-center gap-1.5 text-slate-600">
                                    <Clock className="h-4 w-4 text-slate-400" />
                                    <span className="text-sm font-medium">{service.duration} min</span>
                                </div>
                                <div className="text-lg font-bold text-slate-900">
                                    R$ {parseFloat(service.price).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {isModalOpen && (
                <div className="fixed inset-0 z-100 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300 px-4">
                    <div
                        className="w-full max-w-lg rounded-3xl bg-white p-8 shadow-2xl animate-in zoom-in-95 duration-300 relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute right-6 top-6 p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-50 transition-colors"
                        >
                            <X className="h-5 w-5" />
                        </button>

                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-slate-900">Novo Serviço</h2>
                            <p className="text-sm text-slate-500">Preencha os dados abaixo para cadastrar um novo serviço.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700">Nome do serviço</label>
                                <input
                                    required
                                    type="text"
                                    placeholder="Ex: Corte de Cabelo Masculino"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700">Descrição (opcional)</label>
                                <textarea
                                    rows={3}
                                    placeholder="Detalhes sobre o que está incluso..."
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700">Preço (R$)</label>
                                    <div className="relative">
                                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                        <input
                                            required
                                            type="number"
                                            step="0.01"
                                            placeholder="0,00"
                                            value={formData.price}
                                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                            className="w-full rounded-xl border border-slate-200 pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700">Duração (min)</label>
                                    <div className="relative">
                                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                        <input
                                            required
                                            type="number"
                                            placeholder="60"
                                            value={formData.duration}
                                            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                            className="w-full rounded-xl border border-slate-200 pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 pt-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 h-12 rounded-xl"
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    disabled={isSubmitting}
                                    type="submit"
                                    className="flex-1 h-12 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-100"
                                >
                                    {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Salvar Serviço"}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
