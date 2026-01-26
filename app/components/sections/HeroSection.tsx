"use client";

import Image from "next/image";
import { Check, ArrowRight, PlayCircle } from "lucide-react";
import { Button } from "../ui/button";

const DASHBOARD_IMAGE = "/workly_dashboard_image.png";

export default function HeroSection() {
    return (
        <section className="relative overflow-hidden pt-32 pb-20 lg:pt-48 lg:pb-32">
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-0 left-1/6 h-[500px] w-[500px] animate-blob rounded-full bg-indigo-300 opacity-20 blur-3xl filter"></div>
                <div className="animation-delay-2000 absolute top-0 right-1/4 h-[500px] w-[500px] animate-blob rounded-full bg-purple-300 opacity-20 blur-3xl filter"></div>
                <div className="animation-delay-4000 absolute -bottom-8 left-1/2 h-[500px] w-[500px] -translate-x-1/2 animate-blob rounded-full bg-pink-300 opacity-20 blur-3xl filter"></div>
            </div>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50/50 px-4 py-1.5 backdrop-blur-sm">
                        <span className="flex h-2 w-2 rounded-full bg-indigo-600 animate-pulse"></span>
                        <span className="text-sm font-semibold text-indigo-700">
                            Disponível agora para profissionais brasileiros
                        </span>
                    </div>

                    <h1 className="mx-auto max-w-4xl text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
                        Gerencie seu negócio com{" "}
                        <span className="text-gradient">inteligência</span>
                    </h1>

                    <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-xl">
                        Workly é a plataforma premium para gerenciar agendamentos, clientes e pagamentos.
                        Simplifique sua rotina e foque no que realmente importa: seu talento.
                    </p>

                    <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <Button size="lg" className="group" href="/register">
                            Começar agora gratuito
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                        <Button variant="outline" size="lg" className="group">
                            <PlayCircle className="mr-2 h-5 w-5 text-indigo-600" />
                            Ver demonstração
                        </Button>
                    </div>

                    <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm font-medium text-slate-500">
                        <HeroCheck label="14 dias grátis" />
                        <HeroCheck label="Sem cartão necessário" />
                        <HeroCheck label="Cancele a qualquer momento" />
                    </div>
                </div>

                <div className="mt-20 relative">
                    <div className="absolute -inset-1 rounded-4xl bg-linear-to-r from-indigo-500 to-purple-600 opacity-20 blur-2xl"></div>
                    <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-white shadow-2xl backdrop-blur-md">
                        <Image
                            src={DASHBOARD_IMAGE}
                            alt="Workly Dashboard Mockup"
                            width={1200}
                            height={675}
                            className="w-full h-auto"
                            priority
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

function HeroCheck({ label }: { label: string }) {
    return (
        <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-green-500" />
            <span>{label}</span>
        </div>
    );
}
