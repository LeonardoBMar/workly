# 💼 Workly - Gerencie seu negócio com inteligência

Workly é uma plataforma de gestão moderna pensada para profissionais brasileiros que buscam produtividade e excelência no atendimento. Organize seus agendamentos, automatize cobranças e ofereça uma experiência premium para seus clientes.

![Workly Preview](/workly_dashboard_image.png)

## 🚀 Funcionalidades

- **Dashboard Inteligente**: Tenha uma visão clara do seu negócio em tempo real.
- **Gestão de Serviços**: Cadastre e gerencie seus serviços de forma simples e intuitiva.
- **Autenticação Segura**: Fluxo completo de login e registro utilizando Better Auth.
- **Design Premium**: Interface moderna, responsiva e otimizada para a melhor experiência do usuário.
- **Banco de Dados Cloud**: Persistência de dados escalável com Neon PostgreSQL.

## 🛠️ Stack Tecnológica

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **Estilização**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Autenticação**: [Better Auth](https://www.better-auth.com/)
- **ORM**: [Drizzle ORM](https://orm.drizzle.team/)
- **Banco de Dados**: [Neon (PostgreSQL)](https://neon.tech/)
- **Ícones**: [Lucide React](https://lucide.dev/)
- **Linguagem**: [TypeScript](https://www.typescriptlang.org/)

## 🏁 Começando

### Pré-requisitos

- Node.js (versão 18 ou superior)
- NPM, Yarn, PNPM ou Bun
- Uma conta no [Neon.tech](https://neon.tech/) para o banco de dados

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/workly.git
cd workly
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
Crie um arquivo `.env` na raiz do projeto e adicione as seguintes chaves:
```env
DATABASE_URL=seu_link_do_neon_db
BETTER_AUTH_SECRET=sua_chave_secreta
BETTER_AUTH_URL=http://localhost:3000
```

4. Execute as migrações do banco de dados:
```bash
npx drizzle-kit push
```

5. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

## 📱 Estrutura do Projeto

- `/app`: Rotas e componentes de página (Next.js App Router)
- `/components`: Componentes React reutilizáveis (UI, Layout, Seções)
- `/lib`: Configurações de banco de dados, autenticação e utilitários
- `/public`: Ativos estáticos (imagens, ícones)

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

Desenvolvido com ❤️ por Leonardo Bozola.
