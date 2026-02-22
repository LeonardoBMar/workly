'use client';

import { useRef } from 'react';
import { UserPlus, Settings, CalendarCheck } from 'lucide-react';
import { useScrollAnimation } from '@/app/animations/scrollAnimations';

const steps = [
  {
    number: '01',
    title: 'Crie sua conta',
    description:
      'Cadastre-se em segundos com seu email. Sem burocracia, sem cartão de crédito.',
    icon: UserPlus,
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
    border: 'border-indigo-100',
    glow: 'shadow-indigo-100',
  },
  {
    number: '02',
    title: 'Configure seus serviços',
    description:
      'Adicione seus serviços, defina horários disponíveis e personalize seu link de agendamento.',
    icon: Settings,
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    border: 'border-purple-100',
    glow: 'shadow-purple-100',
  },
  {
    number: '03',
    title: 'Receba agendamentos',
    description:
      'Compartilhe seu link e seus clientes agendam direto. Você recebe tudo organizado no dashboard.',
    icon: CalendarCheck,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-100',
    glow: 'shadow-emerald-100',
  },
];

export default function HowItWorksSection() {
  const containerRef = useRef(null);
  useScrollAnimation(containerRef);

  return (
    <section ref={containerRef} className="relative bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="reveal-on-scroll mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold tracking-wider text-indigo-600 uppercase">
            Simples assim
          </h2>
          <p className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Comece em 3 passos
          </p>
          <p className="mx-auto mt-6 max-w-xl text-lg text-slate-600">
            Do cadastro ao primeiro agendamento em menos de 5 minutos. Sem
            complicação.
          </p>
        </div>

        <div className="reveal-on-scroll relative mt-20">
          {/* Connecting line (desktop) */}
          <div className="absolute top-24 right-0 left-0 hidden h-px lg:block">
            <div className="mx-auto h-full max-w-3xl border-t-2 border-dashed border-slate-200" />
          </div>

          <div className="grid grid-cols-1 gap-12 sm:gap-16 lg:grid-cols-3 lg:gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={index}
                  className="group relative flex flex-col items-center text-center"
                >
                  {/* Step number badge */}
                  <div className="relative mb-8">
                    <div
                      className={`flex h-20 w-20 items-center justify-center rounded-3xl border-2 ${step.border} ${step.bg} shadow-lg ${step.glow} transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl`}
                    >
                      <Icon className={`h-8 w-8 ${step.color}`} />
                    </div>
                    <div className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white shadow-md">
                      {step.number}
                    </div>
                  </div>

                  <h3 className="mb-3 text-xl font-bold text-slate-900">
                    {step.title}
                  </h3>
                  <p className="max-w-xs leading-relaxed text-slate-600">
                    {step.description}
                  </p>

                  {/* Arrow between steps (mobile only) */}
                  {index < steps.length - 1 && (
                    <div className="mt-8 flex justify-center lg:hidden">
                      <div className="h-8 w-px border-l-2 border-dashed border-slate-200" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
