'use client';

import { Check, Info, Sparkles } from 'lucide-react';
import { Button } from '../ui/button';
import Link from 'next/link';
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { createCheckoutSession } from '@/app/actions/stripe';
import { notifyError } from '@/lib/toast';
import { useScrollAnimation } from '@/app/animations/scrollAnimations';
import SvgConnections from '../svg/SvgConnections';

const plans = [
  {
    id: 'free',
    name: 'Gratuito',
    price: '0',
    description: 'Para quem está começando e quer organizar o básico.',
    features: [
      'Até 15 agendamentos/mês',
      '1 Profissional',
      'Catálogo de Serviços',
      'Gestão de Clientes',
      'Link de agendamento básico',
    ],
    buttonText: 'Começar Agora',
    highlight: false,
  },
  {
    id: 'solo',
    name: 'Solo (Fundador)',
    price: '19,90',
    originalPrice: '29,90',
    description: 'Ideal para autônomos que buscam profissionalismo.',
    features: [
      'Agendamentos ilimitados',
      'Link de agendamento personalizado',
      'Lembretes via WhatsApp (Manual)',
      'Relatórios mensais de faturamento',
      'Suporte prioritário',
      'Selo de Usuário Fundador',
    ],
    buttonText: 'Garantir Vaga Fundador',
    highlight: true,
    tag: 'Oferta Limitada: 15 Vagas',
  },
  {
    id: 'business',
    name: 'Business',
    price: '59,90',
    description: 'Gestão completa para quem já tem um pequeno negócio.',
    features: [
      'Tudo do plano Solo',
      'Até 3 Profissionais',
      'Gestão de Despesas e Lucro',
      'Mini-CRM (Fidelização)',
      'Relatórios avançados',
      'Dashboard de Insights',
    ],
    buttonText: 'Ser Business',
    highlight: false,
  },
];

export default function PricingSection() {
  const { data: session } = authClient.useSession();
  const router = useRouter();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const containerRef = useRef(null);
  useScrollAnimation(containerRef);

  const handlePlanClick = async (plan: (typeof plans)[0]) => {
    if (!session) {
      router.push('/register');
      return;
    }

    if (plan.id === 'free') {
      router.push('/dashboard');
      return;
    }

    setLoadingPlan(plan.id);
    try {
      const { url } = await createCheckoutSession(plan.id);
      if (url) {
        window.location.href = url;
      }
    } catch (error: any) {
      notifyError(error.message || 'Erro ao iniciar checkout');
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <section
      ref={containerRef}
      id="pricing"
      className="relative overflow-hidden bg-white py-24 sm:py-32"
    >
      <div className="absolute top-1/2 left-1/2 -z-10 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-indigo-50/50 via-transparent to-transparent opacity-80" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="reveal-on-scroll relative mb-20">
          <div className="absolute top-0 right-0 left-0 hidden h-full lg:block">
            <SvgConnections className="absolute top-1/2 left-1/2 w-[800px] -translate-x-1/2 -translate-y-1/2 opacity-60" />
          </div>

          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <h2 className="text-base font-semibold tracking-wider text-indigo-600 uppercase">
              Preços e Planos
            </h2>
            <p className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              O investimento que se paga sozinho
            </p>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
              Escolha o plano ideal para a fase do seu negócio. Comece grátis e
              evolua conforme cresce.
            </p>
          </div>
        </div>

        <div className="reveal-on-scroll mt-20 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative flex flex-col rounded-3xl p-8 transition-all duration-300 ${
                plan.highlight
                  ? 'z-10 scale-105 bg-slate-900 text-white shadow-2xl ring-4 shadow-indigo-200 ring-indigo-500/30 lg:translate-y-[-16px]'
                  : 'border border-slate-200 bg-white text-slate-900 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-500/5'
              }`}
            >
              {plan.tag && (
                <div className="absolute -top-4 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-linear-to-r from-indigo-500 to-purple-600 px-4 py-1 text-xs font-bold whitespace-nowrap text-white shadow-lg">
                  <Sparkles className="h-3 w-3" />
                  {plan.tag}
                </div>
              )}

              <div className="mb-8">
                <h3
                  className={`text-xl font-bold ${plan.highlight ? 'text-white' : 'text-slate-900'}`}
                >
                  {plan.name}
                </h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span
                    className={`text-4xl font-extrabold tracking-tight ${plan.highlight ? 'text-white' : 'text-slate-900'}`}
                  >
                    R$ {plan.price}
                  </span>
                  <span
                    className={`text-sm font-medium ${plan.highlight ? 'text-slate-400' : 'text-slate-500'}`}
                  >
                    /mês
                  </span>
                  {plan.originalPrice && (
                    <span className="ml-2 text-sm text-slate-500 line-through decoration-red-500">
                      R$ {plan.originalPrice}
                    </span>
                  )}
                </div>
                <p
                  className={`mt-4 text-sm leading-relaxed ${plan.highlight ? 'text-slate-400' : 'text-slate-600'}`}
                >
                  {plan.description}
                </p>
              </div>

              <ul className="mb-8 flex-1 space-y-4">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <div
                      className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                        plan.highlight
                          ? 'bg-indigo-500/20 text-indigo-400'
                          : 'bg-indigo-50 text-indigo-600'
                      }`}
                    >
                      <Check className="h-3.5 w-3.5" />
                    </div>
                    <span
                      className={`text-sm ${plan.highlight ? 'text-slate-300' : 'text-slate-600'}`}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                onClick={() => handlePlanClick(plan)}
                disabled={loadingPlan === plan.id}
                className={`w-full cursor-pointer rounded-2xl py-6 font-bold transition-all ${
                  plan.highlight
                    ? 'bg-indigo-600! text-white! shadow-lg! shadow-indigo-500/20! hover:bg-indigo-700!'
                    : 'border! border-slate-200! bg-slate-50! text-slate-900! hover:bg-slate-100!'
                }`}
              >
                {loadingPlan === plan.id ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Processando...
                  </div>
                ) : (
                  plan.buttonText
                )}
              </Button>

              {plan.highlight && (
                <div className="mt-6 flex items-center justify-center gap-2 text-xs font-medium text-indigo-400">
                  <Info className="h-3 w-3" />
                  <span>Vagas para fundadores expiram em breve!</span>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-sm text-slate-500">
            Dúvidas sobre os planos?{' '}
            <button className="font-semibold text-indigo-600 hover:underline">
              Fale com a gente pelo WhatsApp
            </button>
          </p>
        </div>
      </div>
    </section>
  );
}
