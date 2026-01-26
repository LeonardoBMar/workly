"use client";

import { Hammer, ArrowLeft, Construction } from "lucide-react";
import { Button } from "@/app/components/ui/button";

export default function NotFound() {
    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-slate-50 px-6">
            <div className="absolute top-0 -left-4 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

            <div className="relative z-10 flex flex-col items-center text-center">
                <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-3xl bg-white shadow-xl shadow-indigo-100 ring-1 ring-slate-200">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50">
                        <Construction className="h-8 w-8 text-indigo-600 animate-bounce" />
                    </div>
                </div>

                <h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                    Página em <span className="text-indigo-600">Desenvolvimento</span>
                </h1>

                <p className="mx-auto mb-10 max-w-lg text-lg text-slate-600">
                    Desculpe o transtorno! Esta funcionalidade ainda está sendo construída com muito carinho para você.
                    Em breve teremos novidades por aqui.
                </p>

                <div className="flex flex-col gap-4 sm:flex-row">
                    <Button
                        href="/dashboard"
                        size="lg"
                        className="h-12 px-8 bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all hover:scale-105 flex items-center gap-2"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Voltar ao Dashboard
                    </Button>

                    <Button
                        href="/"
                        variant="outline"
                        size="lg"
                        className="h-12 px-8 bg-white border-slate-200 text-slate-600 hover:bg-slate-50 transition-all hover:scale-105"
                    >
                        Página Inicial
                    </Button>
                </div>

                <div className="mt-16 flex items-center gap-2 text-sm font-medium text-slate-400">
                    <Hammer className="h-4 w-4" />
                    <span>Workly Alpha v0.1.0</span>
                </div>
            </div>
        </div>
    );
}
