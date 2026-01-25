import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export default function CTASection() {
    return (
        <section id="cta" className="py-24 sm:py-32 overflow-hidden">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="relative isolate overflow-hidden bg-slate-900 px-6 py-24 shadow-2xl rounded-3xl sm:px-24 xl:py-32">
                    <h2 className="mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        Pronto para transformar seu negócio hoje?
                    </h2>
                    <p className="mx-auto mt-6 max-w-xl text-center text-lg leading-8 text-slate-300">
                        Junte-se a mais de 10.000 profissionais que elevaram o nível de sua gestão com o Workly.
                        Simples, potente e feito para você.
                    </p>

                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Button size="lg" className="bg-white text-slate-800! hover:bg-slate-100 shadow-none" href="/register">
                            Começar agora <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                        <Button size="lg" variant="ghost" className="text-white hover:text-white  hover:bg-white/10" href="/pricing">
                            Ver planos
                        </Button>
                    </div>

                    <dl className="mt-16 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
                        <Stat label="Usuários ativos" value="10k+" />
                        <Stat label="Agendamentos/mês" value="50k+" />
                        <Stat label="Uptime garantido" value="99.9%" />
                        <Stat label="Satisfação" value="4.8/5" />
                    </dl>

                    <svg
                        viewBox="0 0 1024 1024"
                        className="absolute left-1/2 top-1/2 -z-10 h-256 w-5xl -translate-x-1/2 mask-[radial-gradient(closest-side,white,transparent)]"
                        aria-hidden="true"
                    >
                        <circle cx="512" cy="512" r="512" fill="url(#gradient)" fillOpacity="0.7" />
                        <defs>
                            <radialGradient id="gradient">
                                <stop stopColor="#6366f1" />
                                <stop offset={1} stopColor="#a855f7" />
                            </radialGradient>
                        </defs>
                    </svg>
                </div>
            </div>
        </section>
    );
}

function Stat({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex flex-col items-center gap-y-1">
            <dt className="text-sm leading-6 text-slate-400">{label}</dt>
            <dd className="order-first text-3xl font-semibold tracking-tight text-white">{value}</dd>
        </div>
    );
}
