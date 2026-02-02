import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/layout/Header";

import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "@/app/api/uploadthing/core";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Workly | Gerencie seu trabalho com inteligência",
  description: "A plataforma completa para gerenciar agendamentos, clientes, serviços e pagamentos. Tudo em um só lugar, de forma simples e eficiente.",
  keywords: ["agendamento", "gestão de clientes", "pagamentos", "produtividade", "SaaS"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <NextSSRPlugin
          /**
           * The `extractRouterConfig` will extract **only** the route configs
           * from the router to prevent additional information from being
           * leaked to the client. The data passed to the client is the same
           * as if you were to fetch `/api/uploadthing` directly.
           */
          routerConfig={extractRouterConfig(ourFileRouter)}
        />
        <div className="flex flex-col min-h-screen">
          <main className="grow">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
