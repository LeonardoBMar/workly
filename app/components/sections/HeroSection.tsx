"use client";

import Link from "next/link";
import { useState } from "react";
import { Check } from "lucide-react";

export default function HeroSection() {
    const [email, setEmail] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Email submitted:", email);
        setEmail("");
    };

    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 pb-10">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -left-4 top-0 h-72 w-72 animate-blob rounded-full bg-purple-300 opacity-20 mix-blend-multiply blur-xl filter"></div>
                <div className="animation-delay-2000 absolute -right-4 top-0 h-72 w-72 animate-blob rounded-full bg-blue-300 opacity-20 mix-blend-multiply blur-xl filter"></div>
                <div className="animation-delay-4000 absolute bottom-15 left-20 h-72 w-72 animate-blob rounded-full bg-pink-300 opacity-20 mix-blend-multiply blur-xl filter"></div>
            </div>

            <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
                <div className="text-center">
                    {/* <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-lg ring-1 ring-slate-900/5">
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                        </span>
                        <span className="text-sm font-medium text-slate-700">
                            Novo: Integrações com IA disponíveis
                        </span>
                    </div> */}

                    <h1 className="mx-auto max-w-4xl text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
                        Gerencie seu trabalho com
                        inteligência
                    </h1>

                    <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
                        Workly é a plataforma completa para gerenciar agendamentos, clientes, serviços e pagamentos.
                        Tudo em um só lugar, de forma simples e eficiente.
                    </p>

                    <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <Link
                            href="/schedule"
                            className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 px-8 py-4 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
                        >
                            <span className="relative">Começar gratuitamente</span>
                            <svg
                                className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                                />
                            </svg>
                        </Link>

                        <Link
                            href="/demo"
                            className="inline-flex items-center justify-center rounded-lg border-2 border-slate-300 bg-white px-8 py-4 text-base font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:border-slate-400 hover:shadow-md"
                        >
                            Ver demonstração
                        </Link>
                    </div>

                    <form onSubmit={handleSubmit} className="mx-auto mt-8 max-w-md">
                        <div className="flex flex-col gap-3 sm:flex-row">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="seu@email.com"
                                className="flex-1 rounded-lg border border-slate-300 px-4 py-3 text-slate-900 placeholder-slate-400 shadow-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            <button
                                type="submit"
                                className="rounded-lg bg-slate-900 px-6 py-3 font-semibold text-white shadow-sm transition-all hover:bg-slate-800 hover:shadow-md"
                            >
                                Inscrever-se
                            </button>
                        </div>
                        <p className="mt-3 text-sm text-slate-500">
                            Receba atualizações e dicas exclusivas. Sem spam.
                        </p>
                    </form>

                    <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-slate-600">
                        <HeroItem label="Teste grátis por 14 dias" />
                        <HeroItem label="Sem cartão de crédito" />
                        <HeroItem label="Cancele quando quiser" />
                    </div>
                </div>
            </div>
        </section>
    );
}


function HeroItem({ label }: { label: string }) {
    return (
        <div className="flex items-center gap-2">
            <Check className="h-5 w-5 text-green-500" />
            <span>{label}</span>
        </div>
    );
}
