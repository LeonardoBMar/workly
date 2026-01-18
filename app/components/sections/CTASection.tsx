import Link from "next/link";

export default function CTASection() {
    return (
        <section
            aria-labelledby="cta-heading"
            className="bg-white py-16 sm:py-20"
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="relative overflow-hidden bg-white px-6 py-10 sm:px-12 sm:py-14">
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -left-10 -top-10 hidden h-36 w-36 transform rounded-full bg-gradient-to-br from-gray-100 to-white opacity-50 blur-2xl sm:block"
                    />

                    <div className="mx-auto max-w-3xl text-center">
                        <h2
                            id="cta-heading"
                            className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl"
                        >
                            Pronto para transformar seu negócio?
                        </h2>

                        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
                            Junte-se a profissionais que usam o Workly para gerenciar clientes,
                            agenda e pagamentos com eficiência. Simples, seguro e escalável.
                        </p>

                        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                            <Link
                                href="/schedule"
                                aria-label="Começar agora — ir para agendamento"
                                className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm transition-transform duration-150 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                            >
                                Começar agora
                                <svg
                                    className="ml-2 h-5 w-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
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
                                href="/pricing"
                                aria-label="Ver planos e preços"
                                className="inline-flex items-center justify-center rounded-lg px-6 py-3 text-base font-medium text-gray-700 transition-colors duration-150 hover:text-gray-900"
                            >
                                Ver planos
                            </Link>
                        </div>

                        <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
                            <Stat number="10k+" label="Usuários ativos" />
                            <Stat number="50k+" label="Agendamentos/mês" />
                            <Stat number="99.9%" label="Uptime" />
                            <Stat number="4.8/5" label="Avaliação média" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function Stat({ number, label }: { number: string; label: string }) {
    return (
        <div className="text-center">
            <div className="text-2xl font-semibold text-gray-900 sm:text-3xl">{number}</div>
            <div className="mt-1 text-sm text-gray-500">{label}</div>
        </div>
    );
}
