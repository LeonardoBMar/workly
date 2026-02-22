'use client';

import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useScrollAnimation } from '@/app/animations/scrollAnimations';

const testimonials = [
  {
    id: 1,
    quote:
      '[Workly] é essencial para manter o controle da minha agenda. Consigo visualizar meus compromissos de forma clara e delegar tarefas com facilidade, sem perder a visão macro do meu negócio.',
    author: 'Ana Silva',
    role: 'Diretora Criativa no Studio Bloom',
    stat: '90% das agências relatam que o Workly aumenta a produtividade em 30 dias.',
    source: 'Pesquisa interna de satisfação Workly',
  },
  {
    id: 2,
    quote:
      'O Workly mudou minha rotina no salão. Agora minhas clientes agendam pelo link e eu não perco mais tempo. Consigo focar no que amo: deixar as unhas impecáveis.',
    author: 'Beatriz Oliveira',
    role: 'Manicure e Nail Designer',
    stat: 'Redução de 80% no tempo gasto com agendamentos manuais.',
    source: 'Relatório Mensal de Eficiência',
  },
  {
    id: 3,
    quote:
      'A organização que o Workly trouxe para o nosso time foi impressionante. Conseguimos centralizar todas as demandas e o fluxo de trabalho ficou muito mais fluido e transparente para todos.',
    author: 'Ricardo Santos',
    role: 'Proprietário do TechFlow',
    stat: 'Economia de mais de 10 horas semanais em reuniões de alinhamento.',
    source: 'Relatório de Impacto ao Cliente 2025',
  },
  {
    id: 4,
    quote:
      'O que mais me surpreendeu foi a interface intuitiva. Minha equipe adotou a ferramenta em um único dia e os resultados na entrega de projetos foram imediatos.',
    author: 'Juliana Mendes',
    role: 'Gerente de Projetos na Nexa Design',
    stat: 'Aumento de 40% na velocidade de entrega de projetos complexos.',
    source: 'Estudo de Caso Nexa 2024',
  },
];

export default function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);
  useScrollAnimation(containerRef);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section ref={containerRef} className="bg-slate-50/50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="reveal-on-scroll mb-8 flex items-center justify-end gap-4">
          <div className="mr-4 flex gap-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === idx
                    ? 'w-8 bg-indigo-600'
                    : 'w-2 bg-slate-300 hover:bg-slate-400'
                }`}
                aria-label={`Ir para depoimento ${idx + 1}`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button
              onClick={prev}
              className="rounded-full border border-slate-200 bg-white p-2 shadow-sm transition-colors hover:bg-slate-50"
              aria-label="Depoimento anterior"
            >
              <ChevronLeft className="h-5 w-5 text-slate-600" />
            </button>
            <button
              onClick={next}
              className="rounded-full border border-slate-200 bg-white p-2 shadow-sm transition-colors hover:bg-slate-50"
              aria-label="Próximo depoimento"
            >
              <ChevronRight className="h-5 w-5 text-slate-600" />
            </button>
          </div>
        </div>

        <div className="reveal-on-scroll relative flex min-h-[400px] flex-col overflow-hidden rounded-3xl bg-white shadow-2xl shadow-indigo-100/50 md:flex-row">
          <div className="relative flex flex-1 flex-col justify-between p-8 md:p-16">
            <Quote className="absolute top-8 left-8 h-12 w-12 text-indigo-50 opacity-10" />

            <div className="relative">
              <p className="text-xl leading-relaxed font-medium text-slate-800 italic md:text-2xl">
                "{currentTestimonial.quote}"
              </p>

              <div className="mt-12">
                <div className="mb-6 h-px w-16 bg-indigo-200" />
                <h4 className="text-lg font-bold text-slate-900">
                  {currentTestimonial.author}
                </h4>
                <p className="text-slate-500">{currentTestimonial.role}</p>
              </div>
            </div>
          </div>

          <div className="relative flex w-full flex-col justify-between overflow-hidden bg-indigo-600 p-8 text-white md:w-[40%] md:p-16">
            <div className="absolute top-0 right-0 h-64 w-64 translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500 opacity-20 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-64 w-64 -translate-x-1/2 translate-y-1/2 rounded-full bg-purple-500 opacity-20 blur-3xl" />

            <div className="relative z-10">
              <h3 className="text-3xl leading-tight font-extrabold md:text-4xl lg:text-5xl">
                {currentTestimonial.stat}
              </h3>
            </div>

            <div className="relative z-10 mt-8">
              <p className="text-sm font-medium text-indigo-100/80">
                {currentTestimonial.source}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
