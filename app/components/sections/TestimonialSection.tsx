"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
    {
        id: 1,
        quote: "[Workly] é essencial para manter o controle da minha agenda. Consigo visualizar meus compromissos de forma clara e delegar tarefas com facilidade, sem perder a visão macro do meu negócio.",
        author: "Ana Silva",
        role: "Diretora Criativa no Studio Bloom",
        stat: "90% das agências relatam que o Workly aumenta a produtividade em 30 dias.",
        source: "Pesquisa interna de satisfação Workly",
    },
    {
        id: 2,
        quote: "A organização que o Workly trouxe para o nosso time foi impressionante. Conseguimos centralizar todas as demandas e o fluxo de trabalho ficou muito mais fluido e transparente para todos.",
        author: "Ricardo Santos",
        role: "Proprietário do TechFlow",
        stat: "Economia de mais de 10 horas semanais em reuniões de alinhamento.",
        source: "Relatório de Impacto ao Cliente 2025",
    },
    {
        id: 3,
        quote: "O que mais me surpreendeu foi a interface intuitiva. Minha equipe adotou a ferramenta em um único dia e os resultados na entrega de projetos foram imediatos.",
        author: "Juliana Mendes",
        role: "Gerente de Projetos na Nexa Design",
        stat: "Aumento de 40% na velocidade de entrega de projetos complexos.",
        source: "Estudo de Caso Nexa 2024",
    },
    {
        id: 4,
        quote: "Finalmente conseguimos eliminar as planilhas confusas. O Workly nos dá uma clareza que nunca tivemos antes, permitindo escalar nosso atendimento sem perder a qualidade.",
        author: "Marcos Oliveira",
        role: "Fundador da GrowUp Consultoria",
        stat: "Capacidade de atendimento ampliada em 2x sem novas contratações.",
        source: "Análise de ROI GrowUp",
    }
];

export default function TestimonialSection() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const next = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prev = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const currentTestimonial = testimonials[currentIndex];

    return (
        <section className="py-24 bg-slate-50/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Navigation Controls */}
                <div className="flex justify-end items-center gap-4 mb-8">
                    <div className="flex gap-2 mr-4">
                        {testimonials.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentIndex(idx)}
                                className={`h-2 transition-all duration-300 rounded-full ${currentIndex === idx ? "w-8 bg-indigo-600" : "w-2 bg-slate-300 hover:bg-slate-400"
                                    }`}
                                aria-label={`Ir para depoimento ${idx + 1}`}
                            />
                        ))}
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={prev}
                            className="p-2 rounded-full border border-slate-200 bg-white shadow-sm hover:bg-slate-50 transition-colors"
                            aria-label="Depoimento anterior"
                        >
                            <ChevronLeft className="w-5 h-5 text-slate-600" />
                        </button>
                        <button
                            onClick={next}
                            className="p-2 rounded-full border border-slate-200 bg-white shadow-sm hover:bg-slate-50 transition-colors"
                            aria-label="Próximo depoimento"
                        >
                            <ChevronRight className="w-5 h-5 text-slate-600" />
                        </button>
                    </div>
                </div>

                {/* Main Card */}
                <div className="relative overflow-hidden rounded-3xl bg-white shadow-2xl shadow-indigo-100/50 flex flex-col md:flex-row min-h-[400px]">

                    {/* Left Side: Testimonial Content */}
                    <div className="flex-1 p-8 md:p-16 flex flex-col justify-between relative">
                        <Quote className="absolute top-8 left-8 w-12 h-12 text-indigo-50 opacity-10" />

                        <div className="relative">
                            <p className="text-xl md:text-2xl font-medium text-slate-800 leading-relaxed italic">
                                "{currentTestimonial.quote}"
                            </p>

                            <div className="mt-12">
                                <div className="h-px w-16 bg-indigo-200 mb-6" />
                                <h4 className="font-bold text-slate-900 text-lg">{currentTestimonial.author}</h4>
                                <p className="text-slate-500">{currentTestimonial.role}</p>
                            </div>
                        </div>

                        <div className="mt-12 flex items-center justify-between flex-wrap gap-6">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-200">
                                    <span className="text-white font-bold text-sm">W</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-bold tracking-tight text-slate-900 leading-none">WORKLY</span>
                                    <span className="text-[10px] text-slate-400 font-medium tracking-widest uppercase">Premium SaaS</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Statistic Card */}
                    <div className="w-full md:w-[40%] bg-indigo-600 p-8 md:p-16 flex flex-col justify-between text-white relative overflow-hidden">
                        {/* Abstract Background Design */}
                        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-indigo-500 rounded-full opacity-20 blur-3xl" />
                        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-purple-500 rounded-full opacity-20 blur-3xl" />

                        <div className="relative z-10">
                            <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight">
                                {currentTestimonial.stat}
                            </h3>
                        </div>

                        <div className="relative z-10 mt-8">
                            <p className="text-indigo-100/80 text-sm font-medium">
                                {currentTestimonial.source}
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
