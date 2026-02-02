# 💼 Workly - Gerencie seu negócio com inteligência

> Plataforma open-source para profissionais de serviços organizarem agenda, clientes e pagamentos em minutos.

Plataforma open-source para prestadores de serviço gerenciarem agenda, clientes e cobranças em um só lugar. O Workly foi desenhado para ser simples, rápido e focado no que realmente importa: o crescimento do seu negócio.

![Workly Preview](public/workly_dashboard_image.png)

## ❓ Por que o Workly existe?

A maioria dos profissionais hoje ainda depende de uma mistura caótica de mensagens no WhatsApp, planilhas manuais e a própria memória para gerir seus clientes. 

O Workly surge para centralizar agenda, clientes e pagamentos em uma única plataforma simples, eliminando o trabalho manual e profissionalizando o atendimento desde o primeiro contato.

## 🎯 Para quem é

- ✂️ **Barbeiros**
- 💅 **Manicures**
- 💉 **Tatuadores**
- 💄 **Esteticistas**
- 🏋️ **Personal trainers**
- 💻 **Freelancers**
- 🛠️ **Pequenos prestadores de serviço**

## 🚀 Funcionalidades

- **Dashboard Inteligente**: Tenha uma visão clara do seu negócio e faturamento em tempo real.
- **Gestão de Serviços**: Cadastre e gerencie seus serviços com preços e durações personalizadas.
- **Autenticação Segura**: Fluxo de segurança robusto utilizando Better Auth.
- **Design Premium**: Interface moderna, 100% responsiva e otimizada para conversão.
- **Banco de Dados Cloud**: Persistência de dados escalável com Neon PostgreSQL.

## 🛠️ Stack Tecnológica

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **Estilização**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Autenticação**: [Better Auth](https://www.better-auth.com/)
- **ORM**: [Drizzle ORM](https://orm.drizzle.team/)
- **Banco de Dados**: [Neon (PostgreSQL)](https://neon.tech/)
- **Uploads**: [UploadThing](https://uploadthing.com/)
- **Ícones**: [Lucide React](https://lucide.dev/)
- **Linguagem**: [TypeScript](https://www.typescriptlang.org/)

## 🗺️ Roadmap

### Já Implementado ✅
- [x] **Landing Page Premium**: Design moderno, responsiva e otimizada.
- [x] **Autenticação Completa**: Login, Registro e Proteção de rotas com Better Auth.
- [x] **Dashboard Administrativo**: Interface intuitiva para gestão do negócio.
- [x] **Gestão de Serviços (CRUD)**: Criação, listagem e exclusão de serviços.
- [x] **Integração com Banco de Dados**: Persistência escalável com Neon PostgreSQL + Drizzle.
- [x] **Arquitetura Escalável**: Uso de Server Actions e clean code com Next.js 15.
- [x] **Página de Link Profissional**: Sistema de rota dinâmica `/b/[slug]` para perfil público.
- [x] **Gestão de Imagens**: Upload de logo e banner integrado com UploadThing.

### Em Desenvolvimento / Futuro 🚀
- [ ] **Sistema de Agendamentos**: Calendário interativo para clientes e profissionais.
- [ ] **Gestão de Clientes (CRM)**: Base de dados de clientes com histórico de atendimentos.
- [ ] **Pagamentos Integrados**: Receba via PIX e Cartão de Crédito direto na plataforma.
- [ ] **Lembretes Automáticos**: Notificações via WhatsApp e E-mail para reduzir faltas.
- [ ] **Relatórios Financeiros**: Gráficos de faturamento, lucro e serviços mais realizados.
- [ ] **App Mobile (PWA)**: Atalho no celular para acesso rápido.
- [ ] **Multi-agendamento**: Suporte para equipes e múltiplos profissionais.

## 🏁 Começando

### Pré-requisitos

- Node.js (versão 18 ou superior)
- NPM, Yarn, PNPM ou Bun
- Uma conta no [Neon.tech](https://neon.tech/) para o banco de dados

### Instalação

1. **Clone o repositório:**
```bash
git clone https://github.com/LeonardoBMar/workly.git
cd workly
```

2. **Instale as dependências:**
```bash
npm install
```

3. **Configure as variáveis de ambiente:**
Crie um arquivo `.env` na raiz do projeto e adicione:
```env
DATABASE_URL=seu_link_do_neon_db
BETTER_AUTH_SECRET=sua_chave_secreta
BETTER_AUTH_URL=http://localhost:3000
UPLOADTHING_TOKEN=sua_secret_do_uploadthing
```

4. **Prepare o banco de dados:**
```bash
npx drizzle-kit push
```

5. **Inicie o servidor de desenvolvimento:**
```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

## 📱 Estrutura do Projeto

- `/app`: Rotas e componentes de página (Next.js App Router).
- `/components`: Componentes UI, Layout e Seções reutilizáveis.
- `/lib`: Configurações de banco (Drizzle), Auth e utilitários.
- `/public`: Ativos estáticos e imagens.

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---


Desenvolvido por **Leonardo Bozola**.
