"use client";

import Link from "next/link";
import {
    MoreHorizontal,
    Calendar,
    Plus,
    Edit3,
    ExternalLink,
    Info,
    CalendarClock,
    UserPlus,
    PlusCircle,
    Settings,
    Check
} from "lucide-react";

export function DashboardHome() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <header className="flex items-center justify-between">
                <h1 className="text-xl sm:text-2xl font-semibold text-slate-900">Hoje</h1>
            </header>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 border-b border-slate-100 pb-8">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                                Receita total
                                <MoreHorizontal className="h-3 w-3" />
                            </div>
                            <div className="text-2xl sm:text-3xl font-bold text-slate-900">R$ 0,00</div>
                            <div className="text-xs text-slate-400">Última atualização: agora mesmo</div>
                        </div>
                        <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                                Ontem
                                <MoreHorizontal className="h-3 w-3" />
                            </div>
                            <div className="text-2xl sm:text-3xl font-bold text-slate-900/30">R$ 0,00</div>
                        </div>
                    </div>

                    <div className="mt-8">
                        <div className="relative h-24 w-full">
                            <svg className="h-full w-full" viewBox="0 0 100 20" preserveAspectRatio="none">
                                <line x1="0" y1="18" x2="100" y2="18" stroke="#f1f5f9" strokeWidth="0.5" strokeDasharray="2,2" />

                                <path
                                    d="M 0 10 Q 25 8, 50 10 T 100 8"
                                    fill="none"
                                    stroke="#6366f1"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    className="animate-draw"
                                />
                            </svg>
                            <div className="mt-2 flex justify-between text-[10px] font-medium text-slate-400">
                                <span>25/01</span>
                                <span>26/01</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">Saldo disponível</h3>
                                <button className="text-xs font-medium text-indigo-600 hover:underline">Ver tudo</button>
                            </div>
                            <div className="text-2xl font-bold text-slate-900">R$ 0,00</div>
                        </div>
                        <div className="space-y-4 border-t sm:border-t-0 sm:border-l border-slate-100 pt-8 sm:pt-0 sm:pl-8">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">Agendamentos</h3>
                                <button className="text-xs font-medium text-indigo-600 hover:underline">Ver agenda</button>
                            </div>
                            <div className="flex flex-col gap-1">
                                <div className="text-2xl font-bold text-slate-900">0</div>
                                <div className="h-1 w-8 rounded-full bg-slate-100"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm transition-all hover:shadow-md">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-semibold text-slate-900">Configuração</h3>
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-50 text-[10px] font-bold text-indigo-600">2/4</span>
                        </div>
                        <div className="mt-4 space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                                    <Check className="h-3 w-3" />
                                </div>
                                <span className="text-sm text-slate-600">Criar conta</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                                    <Check className="h-3 w-3" />
                                </div>
                                <span className="text-sm text-slate-600">Configurar perfil</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                                    <div className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                                </div>
                                <span className="text-sm text-slate-500 font-medium">Cadastrar primeiro serviço</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                                    <div className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                                </div>
                                <span className="text-sm text-slate-500">Conectar agenda</span>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm transition-all hover:shadow-md">
                        <h3 className="text-sm font-semibold text-slate-900">Ações Rápidas</h3>
                        <div className="mt-4 grid grid-cols-2 gap-2">
                            <button className="flex flex-col items-center justify-center rounded-lg border border-slate-100 bg-slate-50/50 p-3 transition-colors hover:bg-slate-100">
                                <CalendarClock className="mb-2 h-5 w-5 text-indigo-600" />
                                <span className="text-[10px] font-medium text-slate-600 text-center">Novo Agendamento</span>
                            </button>
                            <Link href="/dashboard/clientes" className="flex flex-col items-center justify-center rounded-lg border border-slate-100 bg-slate-50/50 p-3 transition-colors hover:bg-slate-100">
                                <UserPlus className="mb-2 h-5 w-5 text-indigo-600" />
                                <span className="text-[10px] font-medium text-slate-600 text-center">Novo Cliente</span>
                            </Link>
                            <button className="flex flex-col items-center justify-center rounded-lg border border-slate-100 bg-slate-50/50 p-3 transition-colors hover:bg-slate-100">
                                <PlusCircle className="mb-2 h-5 w-5 text-indigo-600" />
                                <span className="text-[10px] font-medium text-slate-600 text-center">Novo Serviço</span>
                            </button>
                            <button className="flex flex-col items-center justify-center rounded-lg border border-slate-100 bg-slate-50/50 p-3 transition-colors hover:bg-slate-100">
                                <Settings className="mb-2 h-5 w-5 text-indigo-600" />
                                <span className="text-[10px] font-medium text-slate-600 text-center">Configurações</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <section className="space-y-6">
                <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <h2 className="text-xl font-semibold text-slate-900">Visão geral</h2>
                    <div className="flex flex-wrap items-center gap-2">
                        <div className="flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2 py-1 text-xs font-medium text-slate-600 shadow-sm">
                            <Calendar className="h-3 w-3" />
                            <span>Últimos 7 dias</span>
                            <span>▼</span>
                        </div>
                        <div className="flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2 py-1 text-xs font-medium text-slate-600 shadow-sm">
                            <span>Diário</span>
                            <span>▼</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2 py-1 text-xs font-medium text-slate-600 shadow-sm hover:bg-slate-50">
                                <Plus className="h-3 w-3" /> Adicionar
                            </button>
                            <button className="flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2 py-1 text-xs font-medium text-slate-600 shadow-sm hover:bg-slate-50">
                                <Edit3 className="h-3 w-3" /> Editar
                            </button>
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <div className="dashboard-card-hover rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 uppercase tracking-wider">
                                Agendamentos recentes <ExternalLink className="h-3 w-3 text-slate-400" />
                            </div>
                            <MoreHorizontal className="h-4 w-4 text-slate-400" />
                        </div>
                        <div className="mt-8 space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex h-4 w-full animate-pulse rounded bg-slate-50"></div>
                            ))}
                        </div>
                    </div>

                    <div className="dashboard-card-hover flex flex-col rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-500">
                                Faturamento Total <Info className="h-3 w-3 text-slate-400" />
                            </div>
                            <button className="flex items-center gap-1 rounded bg-slate-100 px-2 py-1 text-[10px] font-bold text-slate-600 hover:bg-slate-200 transition-colors">
                                <BarChart3 className="h-3 w-3" /> EXPLORAR
                            </button>
                        </div>
                        <div className="mt-6">
                            <div className="text-2xl font-bold text-slate-900">R$ 0,00</div>
                            <div className="mt-1 text-xs text-slate-500">R$ 0,00 período anterior</div>
                        </div>
                        <div className="mt-auto pt-6">
                            <div className="flex items-center justify-between border-t border-slate-50 pt-4 text-[10px] font-medium text-slate-400">
                                <span>R$ 0,00</span>
                            </div>
                        </div>
                    </div>

                    <div className="dashboard-card-hover flex flex-col rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-500">
                                Novos Clientes <Info className="h-3 w-3 text-slate-400" />
                            </div>
                        </div>
                        <div className="mt-6">
                            <div className="text-2xl font-bold text-slate-900">0</div>
                            <div className="mt-1 text-xs text-slate-500">0 período anterior</div>
                        </div>
                        <div className="mt-auto pt-6">
                            <div className="flex items-center justify-between border-t border-slate-50 pt-4 text-[10px] font-medium text-slate-400">
                                <span>0</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

function BarChart3(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M3 3v18h18" />
            <path d="M18 17V9" />
            <path d="M13 17V5" />
            <path d="M8 17v-3" />
        </svg>
    )
}
