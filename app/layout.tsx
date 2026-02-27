import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from './components/layout/Header';

import { NextSSRPlugin } from '@uploadthing/react/next-ssr-plugin';
import { extractRouterConfig } from 'uploadthing/server';
import { ourFileRouter } from '@/app/api/uploadthing/core';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Workly | Gerencie seu trabalho com inteligência',
  description:
    'A plataforma completa para gerenciar agendamentos, clientes, serviços e pagamentos. Tudo em um só lugar, de forma simples e eficiente.',
  keywords: [
    'agendamento',
    'gestão de clientes',
    'pagamentos',
    'produtividade',
    'SaaS',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className} suppressHydrationWarning>
        <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
        <div className="flex min-h-screen flex-col">
          <main className="grow">{children}</main>
        </div>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
