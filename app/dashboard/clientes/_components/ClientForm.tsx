"use client";

import { useState } from "react";
import { User, Mail, Phone, FileText, ArrowRight, Loader2, Check } from "lucide-react";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { Button } from "@/app/components/ui/button";
import { createClient, updateClient } from "@/app/actions";
import { useRouter } from "next/navigation";

interface ClientFormProps {
    onSuccess?: () => void;
    initialData?: {
        id: string;
        name: string;
        email?: string | null;
        phone?: string | null;
        notes?: string | null;
    };
}

export function ClientForm({ onSuccess, initialData }: ClientFormProps) {
    const isEditing = !!initialData;
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const phone = formData.get("phone") as string;
        const notes = formData.get("notes") as string;

        try {
            const data = {
                name,
                email: email || undefined,
                phone: phone || undefined,
                notes: notes || undefined,
            };

            const result = isEditing
                ? await updateClient(initialData.id, data)
                : await createClient(data);

            if (result.error) {
                setError(result.error);
            } else {
                setIsSuccess(true);
                setTimeout(() => {
                    setIsSuccess(false);
                    if (onSuccess) {
                        onSuccess();
                    } else {
                        router.push("/dashboard");
                    }
                    router.refresh();
                }, 2000);
            }
        } catch (error) {
            setError(`Ocorreu um erro ao ${isEditing ? 'atualizar' : 'salvar'} o cliente`);
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-3xl border border-slate-200/60 shadow-sm overflow-hidden transition-all hover:shadow-md">
                <div className="p-8 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    <div className="space-y-1">
                        <h2 className="text-xl font-bold text-slate-900">
                            {isEditing ? "Editar Cliente" : "Novo Cliente"}
                        </h2>
                        <p className="text-sm text-slate-500 mt-1">
                            {isEditing
                                ? "Atualize as informações do seu cliente."
                                : "Cadastre um novo cliente para gerenciar agendamentos e faturas."}
                        </p>
                    </div>

                    {isSuccess ? (
                        <div className="flex flex-col items-center gap-2 animate-in zoom-in duration-300">
                            <div className="h-20 w-20 rounded-2xl bg-emerald-50 border-2 border-emerald-100 flex items-center justify-center text-emerald-500 shadow-sm shadow-emerald-100">
                                <Check className="h-8 w-8" />
                            </div>
                            <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">Sucesso!</span>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-2">
                            <div className="h-20 w-20 rounded-2xl bg-indigo-50 border-2 border-dashed border-indigo-200 flex items-center justify-center text-indigo-400 hover:bg-indigo-100 hover:border-indigo-300 transition-all cursor-pointer group">
                                <User className="h-8 w-8 transition-transform group-hover:scale-110" />
                            </div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Adicionar Foto</span>
                        </div>
                    )}
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    {error && (
                        <div className="p-4 rounded-xl bg-red-50 border border-red-100 text-sm text-red-600 animate-in fade-in">
                            {error}
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <Input
                                name="name"
                                label="Nome Completo"
                                placeholder="Ex: João Silva"
                                defaultValue={initialData?.name}
                                required
                                icon={<User className="h-4 w-4 text-slate-400" />}
                            />
                        </div>

                        <Input
                            name="email"
                            label="E-mail"
                            type="email"
                            placeholder="joao@exemplo.com"
                            defaultValue={initialData?.email || ""}
                            icon={<Mail className="h-4 w-4 text-slate-400" />}
                        />

                        <Input
                            name="phone"
                            label="Telefone / WhatsApp"
                            placeholder="(11) 99999-9999"
                            defaultValue={initialData?.phone || ""}
                            icon={<Phone className="h-4 w-4 text-slate-400" />}
                        />

                        <div className="md:col-span-2">
                            <Textarea
                                name="notes"
                                label="Observações"
                                placeholder="Adicione informações relevantes sobre o cliente..."
                                defaultValue={initialData?.notes || ""}
                                icon={<FileText className="h-4 w-4 text-slate-400" />}
                            />
                        </div>
                    </div>

                    <div className="pt-4 flex items-center justify-end gap-3">
                        <Button variant="ghost" type="button" disabled={isLoading} onClick={() => router.back()}>
                            Cancelar
                        </Button>
                        <Button type="submit" className="gap-2" disabled={isLoading || isSuccess}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Salvando...
                                </>
                            ) : (
                                <>
                                    {isEditing ? "Atualizar" : "Cadastrar"} Cliente
                                    <ArrowRight className="h-4 w-4" />
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
