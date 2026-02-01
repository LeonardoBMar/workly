import { useEffect, useState } from "react"
import { getServices, deleteService } from "@/app/actions";
import { Package, Clock, Trash2, Edit2, Search, Loader2 } from "lucide-react";
import { Input } from "@/app/components/ui/input";
import { Service } from "@/lib/schema";

export function ServicesList({ onEdit }: { onEdit?: (service: Service) => void }) {
    const [services, setServices] = useState<Service[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchServices = async () => {
        setIsLoading(true);
        const result = await getServices();
        if (result.data) {
            setServices(result.data);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchServices();
    }, []);

    const handleDelete = async (id: string) => {
        if (confirm("Tem certeza que deseja excluir este serviço?")) {
            const result = await deleteService(id);
            if (result.success) {
                setServices(services.filter(s => s.id !== id));
            }
        }
    };

    const filteredServices = services.filter(service =>
        service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description?.toLowerCase().includes(searchTerm.toLowerCase())
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
                    placeholder="Buscar serviços por nome ou descrição..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    icon={<Search className="h-4 w-4 text-slate-400" />}
                />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredServices.map((service) => (
                    <div key={service.id} className="group relative bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm transition-all hover:shadow-md hover:border-indigo-100">
                        <div className="flex items-start justify-between">
                            <div className="h-12 w-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-lg">
                                <Package className="h-6 w-6" />
                            </div>
                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => onEdit?.(service)}
                                    className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                >
                                    <Edit2 className="h-4 w-4" />
                                </button>
                                <button
                                    onClick={() => handleDelete(service.id)}
                                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>
                        </div>

                        <div className="mt-4 space-y-1">
                            <h3 className="font-bold text-slate-900 truncate">{service.name}</h3>
                            <p className="text-sm text-slate-500 line-clamp-2 min-h-[40px]">
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

                {filteredServices.length === 0 && (
                    <div className="col-span-full py-12 text-center bg-slate-50/50 rounded-3xl border-2 border-dashed border-slate-200">
                        <Package className="mx-auto h-12 w-12 text-slate-300" />
                        <h3 className="mt-4 text-sm font-semibold text-slate-900">Nenhum serviço encontrado</h3>
                        <p className="mt-1 text-sm text-slate-500">
                            Comece cadastrando um novo serviço para vê-lo aqui.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
