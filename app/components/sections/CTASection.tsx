'use client';

import { useRef } from 'react';
import { Button } from '../ui/button';
import {
  ArrowRight,
  CheckCircle2,
  Star,
  Zap,
  ShieldCheck,
  Users2,
} from 'lucide-react';
import { useScrollAnimation } from '@/app/animations/scrollAnimations';

export default function CTASection() {
  const containerRef = useRef(null);
  useScrollAnimation(containerRef);

  return (
    <section
      ref={containerRef}
      id="cta"
      className="relative overflow-hidden bg-slate-50/50 py-24 sm:py-32"
    >
      <div className="absolute top-0 left-1/2 -z-10 h-full w-full max-w-7xl -translate-x-1/2 px-4 sm:px-6 lg:px-8">
        <div className="absolute top-1/2 left-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 bg-radial from-indigo-100/40 via-transparent to-transparent opacity-50"></div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="reveal-on-scroll relative isolate overflow-hidden rounded-3xl border border-slate-200 bg-white px-6 py-20 shadow-[0_20px_50px_rgba(0,0,0,0.05)] sm:px-24 xl:py-32">
          <div className="animate-blob absolute -top-24 -right-24 h-96 w-96 rounded-full bg-indigo-50/50 blur-3xl"></div>
          <div className="animate-blob animation-delay-4000 absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-purple-50/50 blur-3xl"></div>

          <div className="absolute inset-0 -z-10 mask-[radial-gradient(ellipse_at_center,black,transparent)] opacity-[0.03]">
            <svg className="h-full w-full" aria-hidden="true">
              <defs>
                <pattern
                  id="grid-pattern-light"
                  width="40"
                  height="40"
                  patternUnits="userSpaceOnUse"
                >
                  <path d="M0 40V.5H40" fill="none" stroke="currentColor" />
                </pattern>
              </defs>
              <rect
                width="100%"
                height="100%"
                fill="url(#grid-pattern-light)"
                className="text-slate-900"
              />
            </svg>
          </div>

          <div className="relative z-10 text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-xs font-semibold tracking-wider text-indigo-600 uppercase">
              <Zap className="h-3.5 w-3.5 fill-indigo-600/20" />
              Comece hoje mesmo
            </div>

            <h2 className="mx-auto max-w-3xl text-4xl leading-[1.1] font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Pronto para elevar sua{' '}
              <span className="text-indigo-600">produtividade</span> ao próximo
              nível?
            </h2>

            <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-slate-600">
              Junte-se a milhares de profissionais que já transformaram seus
              negócios com o Workly. Gestão inteligente para quem busca
              excelência.
            </p>

            <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                className="h-14 bg-indigo-600 px-8 text-base text-white! shadow-lg shadow-indigo-200 transition-all hover:scale-105 hover:bg-indigo-700"
                href="/register"
              >
                Criar conta gratuita <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-14 border-slate-200 px-8 text-base text-slate-700 hover:bg-slate-50"
                href="/pricing"
              >
                Falar com especialista
              </Button>
            </div>

            <div className="mt-20 border-t border-slate-200 pt-16">
              <div className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-4">
                <StatItem
                  icon={<Users2 className="h-5 w-5 text-indigo-600" />}
                  label="Usuários Ativos"
                  value="10k+"
                />
                <StatItem
                  icon={<CheckCircle2 className="h-5 w-5 text-emerald-600" />}
                  label="Taxa de Sucesso"
                  value="99.9%"
                />
                <StatItem
                  icon={<Star className="h-5 w-5 text-amber-500" />}
                  label="Avaliação Média"
                  value="4.9/5"
                />
                <StatItem
                  icon={<ShieldCheck className="h-5 w-5 text-blue-600" />}
                  label="Segurança"
                  value="Enterprise"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatItem({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-y-3">
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-2.5 shadow-sm">
        {icon}
      </div>
      <div className="text-center">
        <dd className="mb-1 text-2xl font-bold tracking-tight text-slate-900">
          {value}
        </dd>
        <dt className="text-sm font-medium text-slate-500">{label}</dt>
      </div>
    </div>
  );
}
