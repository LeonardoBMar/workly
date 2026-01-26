"use client";

import Image from "next/image";
import { Check, ArrowRight, PlayCircle, Star, ShieldCheck, Users } from "lucide-react";
import { Button } from "../ui/button";

const DASHBOARD_IMAGE = "/workly_dashboard_image.png";

export default function HeroSection() {
    return (
        <section className="relative overflow-hidden pt-32 pb-20 lg:pt-48 lg:pb-32">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-indigo-50/50 via-white to-white"></div>

            <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[14px_24px]"></div>

            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-[600px] w-full max-w-7xl rounded-full bg-indigo-100/50 blur-3xl opacity-50"></div>
                <div className="absolute top-1/4 -right-1/4 h-[400px] w-[400px] animate-blob rounded-full bg-purple-200/40 blur-3xl filter"></div>
                <div className="animation-delay-4000 absolute bottom-0 -left-1/4 h-[400px] w-[400px] animate-blob rounded-full bg-pink-100/30 blur-3xl filter"></div>
            </div>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="relative z-10 text-center">
                    <div className="mb-10 inline-flex items-center gap-3 rounded-full border border-indigo-200/50 bg-white/50 px-4 py-2 text-sm font-medium backdrop-blur-md shadow-sm">
                        <span className="flex h-2 w-2 items-center justify-center">
                            <span className="absolute h-2 w-2 animate-ping rounded-full bg-indigo-400 opacity-75"></span>
                            <span className="relative h-1.5 w-1.5 rounded-full bg-indigo-600"></span>
                        </span>
                        <span className="text-slate-600">
                            Nova versão 2.0 disponível para profissionais brasileiros
                        </span>
                        <ArrowRight className="h-3.5 w-3.5 text-indigo-400" />
                    </div>

                    <h1 className="mx-auto max-w-5xl text-5xl font-extrabold tracking-tight text-slate-900 sm:text-7xl lg:text-8xl">
                        Gerencie seu negócio
                        {" "}
                        <span className="text-gradient">com inteligência</span>
                    </h1>

                    <p className="mx-auto mt-10 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-xl lg:text-2xl">
                        Organize agendamentos, automatize cobranças e encante seus clientes
                        com uma experiência premium pensada para o seu crescimento.
                    </p>

                    <div className="mt-12 flex flex-col items-center justify-center gap-5 sm:flex-row">
                        <Button size="lg" className="group h-14 px-10 text-lg shadow-xl shadow-indigo-500/20" href="/register">
                            Começar agora gratuito
                            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </Button>
                        <Button variant="outline" size="lg" className="h-14 px-10 text-lg bg-white/50 backdrop-blur-sm group hover:bg-white hover:border-indigo-200">
                            <PlayCircle className="mr-2 h-6 w-6 text-indigo-600" />
                            Ver demonstração
                        </Button>
                    </div>

                    <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm font-semibold text-slate-500">
                        <HeroCheck label="14 dias grátis" />
                        <HeroCheck label="Configuração em 2 min" />
                        <HeroCheck label="Sem cartão necessário" />
                    </div>
                </div>

                <div className="mt-24 relative lg:mt-32">
                    <div className="absolute -top-12 -right-12 z-20 hidden lg:block animate-float">
                        <div className="glass rounded-2xl p-4 shadow-2xl border border-white/50">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                    <ShieldCheck className="h-6 w-6" />
                                </div>
                                <div className="text-left">
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Status do Pagamento</p>
                                    <p className="text-sm font-bold text-slate-900">Recebido: R$ 1.250,00</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="absolute -bottom-8 -left-12 z-20 hidden lg:block animate-float animation-delay-2000">
                        <div className="glass rounded-2xl p-4 shadow-2xl border border-white/50">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                                    <Users className="h-6 w-6" />
                                </div>
                                <div className="text-left">
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Novo Cliente</p>
                                    <p className="text-sm font-bold text-slate-900">Mariana Silva agendou 14:30</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative animate-float mx-auto max-w-6xl">
                        <div className="absolute -inset-1 rounded-[2.5rem] bg-linear-to-r from-indigo-500 to-purple-400 opacity-20 blur-3xl"></div>

                        <div className="relative overflow-hidden rounded-4xl border border-slate-200 bg-white shadow-[0_0_100px_-20px_rgba(0,0,0,0.1)] transition-all hover:border-indigo-200 hover:shadow-[0_0_120px_-20px_rgba(99,102,241,0.15)]">
                            <div className="flex items-center gap-1.5 border-b border-slate-100 bg-slate-50/50 px-6 py-4">
                                <div className="h-3 w-3 rounded-full bg-slate-200"></div>
                                <div className="h-3 w-3 rounded-full bg-slate-200"></div>
                                <div className="h-3 w-3 rounded-full bg-slate-200"></div>
                                <div className="ml-4 h-4 w-1/3 rounded bg-slate-100"></div>
                            </div>

                            <Image
                                src={DASHBOARD_IMAGE}
                                alt="Workly Dashboard Mockup"
                                width={1200}
                                height={675}
                                className="w-full h-auto brightness-[0.98] transition-all group-hover:brightness-100"
                                priority
                            />
                        </div>
                    </div>

                    <div className="mt-20 text-center lg:mt-24">
                        <p className="text-sm font-semibold text-slate-400 uppercase tracking-[0.2em] mb-8">Utilizado por profissionais de</p>
                        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-40 grayscale transition-all hover:grayscale-0 hover:opacity-100">
                            <TrustLogo name="Gestão" />
                            <TrustLogo name="Design" />
                            <TrustLogo name="Saúde" />
                            <TrustLogo name="Educação" />
                            <TrustLogo name="Beleza" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function HeroCheck({ label }: { label: string }) {
    return (
        <div className="flex items-center gap-2.5">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-50 text-green-600">
                <Check className="h-3.5 w-3.5" strokeWidth={3} />
            </div>
            <span className="text-slate-600">{label}</span>
        </div>
    );
}

function TrustLogo({ name }: { name: string }) {
    return (
        <span className="text-xl font-bold tracking-tighter text-slate-900 border-2 border-slate-900 px-3 py-1 rounded">
            {name}
        </span>
    );
}
