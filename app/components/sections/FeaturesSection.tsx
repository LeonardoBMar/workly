import {
    CalendarClock,
    Users,
    Package,
    CreditCard,
    BarChart3,
    Bell,
} from 'lucide-react'

const features = [
    {
        title: "Agendamento Inteligente",
        description:
            "Gerencie compromissos com facilidade. Sistema inteligente de agendamento que evita conflitos e otimiza seu tempo.",
        icon: CalendarClock,
        gradient: "from-blue-500 to-cyan-500",
    },
    {
        title: "Gestão de Clientes",
        description:
            "Mantenha todos os dados dos seus clientes organizados e acessíveis. Histórico completo de interações.",
        icon: Users,
        gradient: "from-purple-500 to-pink-500",
    },
    {
        title: "Catálogo de Serviços",
        description:
            "Organize seus serviços com preços, duração e descrições. Facilite a escolha dos seus clientes.",
        icon: Package,
        gradient: "from-orange-500 to-red-500",
    },
    {
        title: "Pagamentos Integrados",
        description:
            "Receba pagamentos de forma segura e rápida. Múltiplas formas de pagamento em um só lugar.",
        icon: CreditCard,
        gradient: "from-green-500 to-emerald-500",
    },
    {
        title: "Relatórios e Analytics",
        description:
            "Acompanhe o desempenho do seu negócio com relatórios detalhados e insights acionáveis.",
        icon: BarChart3,
        gradient: "from-indigo-500 to-blue-500",
    },
    {
        title: "Notificações Automáticas",
        description:
            "Envie lembretes automáticos para clientes via email e SMS. Reduza faltas e no-shows.",
        icon: Bell,
        gradient: "from-yellow-500 to-orange-500",
    },
]

export default function FeaturesSection() {
    return (
        <section className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-base font-semibold uppercase tracking-wide text-blue-600">
                        Recursos
                    </h2>
                    <p className="mt-2 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                        Tudo que você precisa para crescer
                    </p>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
                        Ferramentas poderosas e intuitivas para gerenciar seu negócio de forma profissional.
                    </p>
                </div>

                <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <div
                                key={index}
                                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                            >
                                <div
                                    className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${feature.gradient} text-white shadow-lg`}
                                >
                                    <Icon className="h-6 w-6" />
                                </div>

                                <h3 className="mb-3 text-xl font-semibold text-slate-900">
                                    {feature.title}
                                </h3>
                                <p className="text-slate-600">{feature.description}</p>

                                <div className={`absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r ${feature.gradient} transition-all duration-300 group-hover:w-full`}></div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
