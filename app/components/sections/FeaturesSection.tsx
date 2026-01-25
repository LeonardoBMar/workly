import {
    CalendarClock,
    Users,
    Package,
    CreditCard,
    BarChart3,
    Bell,
    ArrowRight
} from 'lucide-react'
import { Button } from '../ui/button'

const features = [
    {
        title: "Agendamento Inteligente",
        description:
            "Gerencie compromissos com facilidade. Sistema inteligente que evita conflitos.",
        icon: CalendarClock,
        color: "text-blue-600",
        bg: "bg-blue-50",
    },
    {
        title: "Gestão de Clientes",
        description:
            "Mantenha todos os dados dos seus clientes organizados e acessíveis.",
        icon: Users,
        color: "text-purple-600",
        bg: "bg-purple-50",
    },
    {
        title: "Catálogo de Serviços",
        description:
            "Organize seus serviços com preços, duração e descrições personalizadas.",
        icon: Package,
        color: "text-pink-600",
        bg: "bg-pink-50",
    },
    {
        title: "Pagamentos Integrados",
        description:
            "Receba pagamentos de forma segura e rápida. Múltiplas formas em um só lugar.",
        icon: CreditCard,
        color: "text-emerald-600",
        bg: "bg-emerald-50",
    },
    {
        title: "Relatórios e Analytics",
        description:
            "Acompanhe o desempenho do seu negócio com relatórios detalhados.",
        icon: BarChart3,
        color: "text-indigo-600",
        bg: "bg-indigo-50",
    },
    {
        title: "Notificações Automáticas",
        description:
            "Envie lembretes automáticos para seus clientes via email e SMS.",
        icon: Bell,
        color: "text-orange-600",
        bg: "bg-orange-50",
    },
]

export default function FeaturesSection() {
    return (
        <section id="features" className="bg-slate-50 py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-base font-semibold uppercase tracking-wider text-indigo-600">
                        Poder de Execução
                    </h2>
                    <p className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
                        Tudo que seu negócio precisa
                    </p>
                    <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 outline-none">
                        Ferramentas profissionais projetadas para simplificar sua gestão e impulsionar seu crescimento.
                    </p>
                </div>

                <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <div
                                key={index}
                                className="group relative rounded-3xl border border-slate-200 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-500/10"
                            >
                                <div
                                    className={`mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl ${feature.bg} ${feature.color}`}
                                >
                                    <Icon className="h-6 w-6" />
                                </div>

                                <h3 className="mb-3 text-xl font-bold text-slate-900">
                                    {feature.title}
                                </h3>
                                <p className="mb-6 text-slate-600 leading-relaxed">
                                    {feature.description}
                                </p>

                                <button className="flex items-center text-sm font-semibold text-indigo-600 group-hover:gap-2 transition-all">
                                    Saiba mais <ArrowRight className="ml-1 h-4 w-4 opacity-0 group-hover:opacity-100 transition-all" />
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
