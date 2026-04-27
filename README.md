<div align="center">

# 💅 Vanass Nails

### Site de Agendamento para Estúdio de Nail Design

[![Next.js](https://img.shields.io/badge/Next.js_15-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

**[🌐 Demo ao vivo](https://vanass-nails.vercel.app)** • **[📋 Reportar Bug](https://github.com/BigOnwer/Vanass-Nails/issues)** • **[💡 Sugerir Feature](https://github.com/BigOnwer/Vanass-Nails/issues)**

</div>

---

## 📖 Sobre o Projeto

O **Vanass Nails** é um site institucional e sistema de agendamento online desenvolvido para um estúdio de nail design. Clientes podem visualizar os serviços disponíveis e realizar agendamentos diretamente pela plataforma, escolhendo data e horário de forma intuitiva com um calendário interativo.

O projeto foi construído com Next.js 15, Prisma para persistência dos agendamentos, e um sistema de formulários validados com React Hook Form + Zod.

---

## ✨ Funcionalidades

- 📅 **Agendamento online** com calendário interativo via `react-day-picker`
- 💇 **Catálogo de serviços** — exibição dos procedimentos disponíveis no estúdio
- ✅ **Formulários validados** com React Hook Form + Zod
- 🗓️ **Gestão de datas** com `date-fns`
- 💾 **Persistência de agendamentos** com Prisma
- 🔔 **Feedback visual** para o cliente com Sonner (toasts)
- 📱 **Interface responsiva** adaptada para mobile e desktop
- ⚡ **Build otimizado** com Turbopack (Next.js 15)

---

## 🛠️ Stack Tecnológica

| Camada | Tecnologia |
|---|---|
| **Framework** | Next.js 15 (App Router + Turbopack) |
| **Linguagem** | TypeScript |
| **Estilização** | Tailwind CSS v4 + tw-animate-css |
| **Componentes UI** | Radix UI + Lucide React |
| **ORM / Banco** | Prisma |
| **Calendário** | react-day-picker |
| **Formulários** | React Hook Form + Zod |
| **Datas** | date-fns |
| **Notificações** | Sonner |
| **HTTP Client** | Axios |
| **Deploy** | Vercel |

---

## 🗂️ Estrutura do Projeto

```
vanass-nails/
├── app/                  # Rotas e páginas (Next.js App Router)
├── components/           # Componentes reutilizáveis da UI
├── lib/                  # Utilitários e configuração do Prisma
├── prisma/               # Schema e migrations do banco de dados
├── public/               # Assets estáticos (imagens, ícones)
├── next.config.ts        # Configuração do Next.js
└── components.json       # Configuração dos componentes shadcn/ui
```

---

## 🚀 Como Rodar Localmente

### Pré-requisitos

- Node.js 18+
- npm
- Banco de dados compatível com Prisma (PostgreSQL recomendado)

### Instalação

```bash
# 1. Clone o repositório
git clone https://github.com/BigOnwer/Vanass-Nails.git
cd Vanass-Nails

# 2. Instale as dependências
npm install

# 3. Configure as variáveis de ambiente
cp .env.example .env
# Edite o .env com a URL do seu banco de dados

# 4. Execute as migrations do banco
npx prisma migrate dev

# 5. Inicie o servidor de desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no seu navegador.

---

## 🔑 Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# Banco de Dados
DATABASE_URL="postgresql://user:password@localhost:5432/vanass_nails"
```

---

## 📱 Fluxo de Agendamento

```
Cliente acessa o site
        ↓
Visualiza os serviços disponíveis
        ↓
Seleciona um serviço
        ↓
Escolhe data no calendário interativo
        ↓
Seleciona o horário disponível
        ↓
Preenche os dados (nome, contato)
        ↓
Confirmação do agendamento ✅
```

---

## 🤝 Contribuindo

1. Faça um **fork** do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'feat: adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um **Pull Request**

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

<div align="center">

Feito com ☕ por **[Gustavo Leal](https://github.com/BigOnwer)**

</div>
