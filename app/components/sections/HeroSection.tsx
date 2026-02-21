'use client';

import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import { useHeroAnimations } from '@/app/animations/heroAnimations';
import SvgSteppingUp from '@/app/components/svg/SteppingUp';

export default function HeroSection() {
  const containerRef = useRef(null);
  useHeroAnimations(containerRef);

  return (
    <section
      ref={containerRef}
      className="relative min-h-dvh overflow-hidden bg-white"
    >
      <div className="relative z-20 mx-auto flex min-h-dvh max-w-7xl flex-col justify-center px-6 pt-24 pb-32 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-12 lg:pt-0 lg:pb-0">
        <div className="max-w-2xl pt-8 lg:w-1/2 lg:pt-0">
          <h1 className="hero-title text-5xl leading-[1.05] font-extrabold tracking-tight text-slate-900 sm:text-6xl lg:text-8xl">
            Gerencie seu negócio.
          </h1>

          <p className="hero-desc mt-8 max-w-xl text-lg leading-relaxed text-slate-700/80 sm:text-xl lg:text-2xl">
            Organize agendamentos, automatize cobranças e encante seus clientes
            com uma experiência premium pensada para o seu crescimento.
          </p>

          <div className="hero-cta mt-12">
            <Button
              size="lg"
              className="group h-14 rounded-full border-2 border-slate-900 bg-slate-900 px-10 text-base font-bold text-white shadow-lg transition-all hover:bg-slate-800 hover:shadow-xl"
              href="/register"
            >
              Começar agora
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>

        <div className="relative mt-16 flex w-full items-center justify-center lg:mt-0 lg:w-1/2">
          <div className="hero-shape hero-shape--1 absolute -top-10 right-10 z-10 hidden translate-x-1/4 -translate-y-1/4 opacity-0 lg:block" />
          <div className="hero-shape hero-shape--2 absolute top-full right-10 z-10 hidden opacity-0 lg:block" />
          <div className="hero-shape hero-shape--3 absolute top-[15%] right-[80%] z-10 hidden opacity-0 lg:block" />
          <div className="hero-shape hero-shape--4 absolute -right-[25%] bottom-[10%] z-10 hidden opacity-0 lg:block" />

          <div className="relative z-20 w-full max-w-[500px] lg:max-w-[600px]">
            <SvgSteppingUp className="animate-float h-auto w-full drop-shadow-2xl" />
          </div>
        </div>

        <div className="hero-trust absolute right-6 bottom-6 left-6 sm:right-8 sm:bottom-8 sm:left-8 lg:right-12 lg:bottom-12 lg:left-12">
          <div className="flex flex-col items-start gap-6 border-t border-slate-900/10 pt-8 sm:flex-row sm:items-center sm:gap-12">
            <p className="shrink-0 text-xs font-semibold tracking-[0.2em] text-slate-500/70 uppercase">
              Utilizado por profissionais de
            </p>
            <div className="flex flex-wrap items-center gap-6 md:gap-10">
              <TrustLabel name="Gestão" />
              <TrustLabel name="Design" />
              <TrustLabel name="Saúde" />
              <TrustLabel name="Educação" />
              <TrustLabel name="Beleza" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustLabel({ name }: { name: string }) {
  return (
    <span className="text-sm font-bold tracking-tight text-slate-900/40 transition-colors hover:text-slate-900/70">
      {name}
    </span>
  );
}
