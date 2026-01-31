"use client";

import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { upsertShopper } from "../_actions/manage-link";
import { Loader2, ExternalLink, Save } from "lucide-react";

interface LinkFormProps {
    initialData?: {
        slug: string;
        name: string;
        description?: string | null;
        bannerUrl?: string;
    } | null;
}

export function LinkForm({ initialData }: LinkFormProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState({
        slug: initialData?.slug || "",
        name: initialData?.name || "",
        description: initialData?.description || "",
        bannerUrl: initialData?.bannerUrl || "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        setSuccess(false);

        try {
            const result = await upsertShopper({
                slug: formData.slug,
                name: formData.name,
                description: formData.description,
                bannerUrl: formData.bannerUrl,
            });

            if (result.error) {
                setError(result.error);
            } else {
                setSuccess(true);
            }
        } catch (err) {
            setError("Ocorreu um erro inesperado.");
        } finally {
            setIsLoading(false);
        }
    };

    const linkUrl = typeof window !== "undefined"
        ? `${window.location.origin}/b/${formData.slug}`
        : `/b/${formData.slug}`;

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-200/60 shadow-sm overflow-hidden transition-all hover:shadow-md p-6">
            <div className="space-y-2">
                <h2 className="text-xl font-semibold text-slate-900">Configurar seu Link</h2>
                <p className="text-sm text-slate-500">
                    Crie um link personalizado para compartilhar seus serviços e produtos com seus clientes.
                </p>
            </div>

            <div className="space-y-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-900">
                        Link Personalizado (Slug)
                    </label>
                    <div className="flex items-center">
                        <span className="flex items-center px-3 h-10 border border-r-0 border-slate-200 bg-slate-50 text-slate-500 text-sm rounded-l-md">
                            workly.com/b/
                        </span>
                        <input
                            type="text"
                            required
                            value={formData.slug}
                            onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-') }))}
                            className="flex-1 h-10 px-3 rounded-r-md border border-slate-200 bg-transparent text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all"
                            placeholder="minha-loja"
                        />
                    </div>
                    <p className="text-xs text-slate-500">
                        Este será o link que você enviará para seus clientes. Use apenas letras, números e hífens.
                    </p>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-900">
                        Nome do Negócio / Profissional
                    </label>
                    <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full h-10 px-3 rounded-md border border-slate-200 bg-white text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all"
                        placeholder="Ex: Espaço Beleza, Dr. João Silva"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-900">
                        Descrição (Opcional)
                    </label>
                    <textarea
                        value={formData.description}
                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                        className="w-full min-h-[80px] p-3 rounded-md border border-slate-200 bg-white text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all resize-y"
                        placeholder="Uma breve descrição sobre o que você oferece..."
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-900">
                        Banner (Opcional)
                    </label>
                    <input
                        type="url"
                        value={formData.bannerUrl}
                        onChange={(e) => setFormData(prev => ({ ...prev, bannerUrl: e.target.value }))}
                        className="w-full h-10 px-3 rounded-md border border-slate-200 bg-white text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all"
                        placeholder="https://..."
                    />
                    <p className="text-xs text-slate-500">
                        Deixe em branco para usar uma imagem padrão.
                    </p>
                </div>  { /* Ver armazenamento de imagens (AWS S3?) PESQUISAR QUAL É O MELHOR NO PLANO FREE*/}


            </div>

            {error && (
                <div className="p-3 bg-red-50 text-red-600 text-sm rounded-md border border-red-100">
                    {error}
                </div>
            )}

            {success && (
                <div className="p-3 bg-green-50 text-green-600 text-sm rounded-md border border-green-100 flex items-center justify-between">
                    <span>Configurações salvas com sucesso!</span>
                    <a href={`/b/${formData.slug}`} target="_blank" className="flex items-center gap-1 text-xs font-semibold hover:underline">
                        Ver página <ExternalLink className="h-3 w-3" />
                    </a>
                </div>
            )}

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                {formData.slug && (
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => window.open(`/b/${formData.slug}`, '_blank')}
                    >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Visualizar
                    </Button>
                )}
                <Button type="submit" disabled={isLoading} className="min-w-[120px]">
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Salvando...
                        </>
                    ) : (
                        <>
                            <Save className="mr-2 h-4 w-4" />
                            Salvar Alterações
                        </>
                    )}
                </Button>
            </div>
        </form>
    );
}
