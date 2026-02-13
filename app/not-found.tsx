'use client';

import { Hammer, ArrowLeft, Construction } from 'lucide-react';
import { Button } from '@/app/components/ui/button';

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-slate-50 px-6">
      <div className="animate-blob absolute top-0 -left-4 h-72 w-72 rounded-full bg-indigo-300 opacity-20 mix-blend-multiply blur-3xl filter"></div>
      <div className="animate-blob animation-delay-2000 absolute top-0 -right-4 h-72 w-72 rounded-full bg-purple-300 opacity-20 mix-blend-multiply blur-3xl filter"></div>
      <div className="animate-blob animation-delay-4000 absolute -bottom-8 left-20 h-72 w-72 rounded-full bg-pink-300 opacity-20 mix-blend-multiply blur-3xl filter"></div>

      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-3xl bg-white shadow-xl ring-1 shadow-indigo-100 ring-slate-200">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50">
            <Construction className="h-8 w-8 animate-bounce text-indigo-600" />
          </div>
        </div>

        <h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Página em <span className="text-indigo-600">Desenvolvimento</span>
        </h1>

        <p className="mx-auto mb-10 max-w-lg text-lg text-slate-600">
          Desculpe o transtorno! Esta funcionalidade ainda está sendo construída
          com muito carinho para você. Em breve teremos novidades por aqui.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Button
            href="/dashboard"
            size="lg"
            className="flex h-12 items-center gap-2 bg-indigo-600 px-8 shadow-lg shadow-indigo-200 transition-all hover:scale-105 hover:bg-indigo-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar ao Dashboard
          </Button>

          <Button
            href="/"
            variant="outline"
            size="lg"
            className="h-12 border-slate-200 bg-white px-8 text-slate-600 transition-all hover:scale-105 hover:bg-slate-50"
          >
            Página Inicial
          </Button>
        </div>

        <div className="mt-16 flex items-center gap-2 text-sm font-medium text-slate-400">
          <Hammer className="h-4 w-4" />
          <span>Workly Alpha v0.1.0</span>
        </div>
      </div>
    </div>
  );
}
