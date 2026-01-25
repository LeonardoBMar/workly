import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

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
        <Header />
        <div className="flex flex-col min-h-screen">
          <main className="grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
