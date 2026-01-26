"use client";

import { Construction, Hammer } from "lucide-react";

export function Development() {
    return (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-white p-12 text-center">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                <Construction className="h-10 w-10 animate-pulse" />
            </div>

            <h2 className="mb-2 text-2xl font-bold text-slate-900">
                Módulo em Desenvolvimento
            </h2>

            <p className="max-w-md text-slate-500">
                Estamos trabalhando duro para finalizar esta funcionalidade.
                Em breve você poderá gerenciar tudo por aqui com a facilidade que o Workly oferece.
            </p>

            <div className="mt-8 flex items-center gap-2 rounded-full bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-400 ring-1 ring-slate-100">
                <Hammer className="h-3.5 w-3.5" />
                WORKLY LABS • COMING SOON
            </div>
        </div>
    );
}
