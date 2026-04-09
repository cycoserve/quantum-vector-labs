# Quantum Vector Labs

**Owner:** [CycoServe](https://github.com/cycoserve) — GenAI Infrastructure Platform

Quantum Vector Labs is the public-facing marketing and platform web application for CycoServe's GenAI infrastructure services. It delivers serverless AI model inference, vector databases, and custom AI application development — all through a modern dark-mode web experience with an integrated streaming AI assistant.

---

## Features

- **Serverless Inference** — Deploy GenAI models globally across six continents
- **Vector Databases** — Private, secure vector DBs for Retrieval-Augmented Generation (RAG)
- **Multi-Modal Models** — GPU-backed inference supporting diverse input types
- **Custom GenAI Apps** — AI-powered applications for mobile, web, and internal tooling
- **OpenAI-Compatible API** — Easy integration at competitive rates
- **Streaming Chat Assistant** — Real-time LLM chat powered by Vultr Serverless Inference
- **Leader Brain System** — Internal AI agent memory and strategic planning layer
- **Admin Dashboard** — Manage AI "dreams" and view brain state (auth-protected)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| UI Library | React 19 |
| Styling | TailwindCSS 3.4 |
| Icons | Lucide React |
| Font | Space Grotesk (Google Fonts) |
| Authentication | Stack Auth (`@stackframe/stack`) |
| AI / Streaming | Vercel AI SDK + Vultr Serverless Inference |
| Knowledge Base | MarkdownDB (`mddb`) |
| Theme | next-themes (forced dark mode) |

---

## Project Structure

```
quantum-vector-labs/
├── app/
│   ├── (main)/          # Public routes: /, /learn, /pricing, /solutions, /support, /chat, /admin, /settings
│   ├── (auth)/          # Authentication routes: /auth
│   ├── (user)/          # User settings routes
│   ├── api/             # API routes: /api/chat, /api/brain/dream, /api/brain/state, /api/support
│   └── handler/         # Stack Auth handler
├── components/
│   ├── home/            # Landing page sections (Hero, Services, Features, Stats, CTA, Bento, etc.)
│   ├── layout/          # Header, Footer, Sidebar, MobileMenu, BackgroundLines
│   ├── auth/            # AuthForm component
│   └── providers.tsx    # Theme and auth providers
├── lib/
│   ├── auth-context.tsx # useAuth / useUser hooks (Stack Auth wrapper)
│   └── brain.ts         # VPS Brain API layer (sendDream, getBrainState)
├── leader-brain/
│   ├── brain.json       # Leader Brain master configuration
│   ├── dreams/          # Long-form product visions and goals
│   ├── knowledge/       # Project-specific knowledge files
│   └── llms/            # Agent audit reports
├── stack/               # Stack Auth client/server config
├── public/              # Static assets and OpenGraph images
└── .env.local           # Environment variables (not committed)
```

---

## Pages

| Route | Description | Auth Required |
|---|---|---|
| `/` | Landing page — hero, services, features, stats, CTA | No |
| `/learn` | Leader Brain and AXON system explainer | No |
| `/pricing` | 3-tier pricing (Starter / Pro / Enterprise) | No |
| `/solutions` | Industry-specific AI solutions | No |
| `/support` | Support and contact page | No |
| `/chat` | Full-page streaming AI chat interface | No |
| `/admin` | Dashboard for managing AI dreams and brain state | Yes |
| `/settings` | User settings (general, account, privacy, billing) | Yes |

---

## API Routes

| Method | Route | Purpose |
|---|---|---|
| `POST` | `/api/chat` | Streaming LLM chat via Vultr Inference |
| `POST` | `/api/brain/dream` | Submit a dream to the VPS Brain API |
| `GET` | `/api/brain/state` | Retrieve current brain state |
| `POST` | `/api/support` | Handle support form submissions |

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm or equivalent package manager

### Installation

```bash
git clone https://github.com/cycoserve/quantum-vector-labs.git
cd quantum-vector-labs
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
# Vultr Serverless Inference (AI chatbot)
VULTR_API_KEY=your_vultr_api_key
VULTR_API_URL=https://api.vultrinference.com/v1
VULTR_MODEL=kimi-k2-instruct

# Stack Auth (authentication)
NEXT_PUBLIC_STACK_PROJECT_ID=your_stack_project_id
NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY=your_publishable_client_key
STACK_SECRET_SERVER_KEY=your_secret_server_key

# VPS Brain API (Leader Brain integration — optional)
BRAIN_API_URL=https://your-vps-brain-api.example.com
BRAIN_API_KEY=your_brain_api_key
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm run start
```

### Knowledge Base (MarkdownDB)

Index or watch the markdown knowledge base used by the Leader Brain:

```bash
npm run mddb:index   # One-time index build
npm run mddb:watch   # Watch for changes and rebuild
```

---

## Documentation

| File | Contents |
|---|---|
| [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) | Full project overview, architecture, and priorities |
| [FILE_TREE.md](FILE_TREE.md) | File tree, Leader Brain structure, VPS API docs, setup order |
| [AI_ASSISTANT_SETUP.md](AI_ASSISTANT_SETUP.md) | Comprehensive chatbot architecture and integration guide |
| [AGENTS.md](AGENTS.md) | Agent guidelines, system boundaries, and failure disclosure protocol |

---

## CycoServe Ecosystem

This repository is part of the broader **CycoServe** platform ecosystem. CycoServe publishes and maintains numerous npm packages and open-source tools. See the [CycoServe GitHub organization](https://github.com/cycoserve) for all related repositories.

---

## License

Copyright (c) 2025 [CycoServe](https://github.com/cycoserve). All rights reserved.
