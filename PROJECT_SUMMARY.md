# Project Summary — Quantum Vector Labs (QVL)

> Generated: 2026-03-29 | Next.js 16 · React 19 · TypeScript · TailwindCSS · Stack Auth · Vultr Inference

---

## 1. What Is This App?

**Quantum Vector Labs (QVL)** is a marketing and sign-up web application for a GenAI infrastructure platform. The product sells three core services:

| Service | Description |
|---|---|
| **Serverless Inference** | Deploy GenAI models globally across six continents without managing infrastructure. Self-optimizing, edge-distributed, OpenAI-compatible API. |
| **Vector Databases** | Private, secure vector DBs for Retrieval-Augmented Generation (RAG). Store embeddings and retrieve custom AI outputs without model training. |
| **Multi-Modal Models** | Inference-optimized GPU-backed models supporting diverse input types. |
| **Custom Gen AI Apps** | AI-powered applications built for mobile, web, and internal tooling. |

The site is primarily a **public-facing marketing website** with:
- A hero landing page with animated visuals and service highlights
- Tiered pricing page (Starter, Pro, Enterprise)
- Authentication portal (sign in / sign up) powered by Stack Auth
- A floating AI chat assistant powered by Vultr Inference for answering product questions
- An admin dashboard for managing AI "dreams" and monitoring the Leader Brain state

---

## 2. Technology Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16.1.6 (App Router) |
| **UI Library** | React 19.2.3 |
| **Language** | TypeScript 5 |
| **Styling** | TailwindCSS 3.4.1 + custom CSS utility classes |
| **Font** | Space Grotesk (via `next/font/google`) |
| **Icons** | Lucide React |
| **Auth Backend** | Stack Auth (`@stackframe/stack` v2.8) |
| **AI Chatbot** | Vultr Serverless Inference (OpenAI-compatible REST API) |
| **AI SDK** | Vercel AI SDK v6 (`ai`, `@ai-sdk/react`) |
| **Theme** | Dark mode (forced via `<html lang="en" className="dark">`) |

---

## 3. Project Structure

```
quantum-vector-labs/
│
├── app/                          ← Next.js App Router pages & API routes
│   ├── layout.tsx                ← Root layout: font, metadata, Header, Footer, BackgroundLines, Providers
│   ├── not-found.tsx             ← Custom 404 page (compact/cyberpunk style)
│   ├── page.tsx                  ← Home page — assembles all home sections + Sidebar
│   ├── globals.css               ← Global CSS, Tailwind base, custom utility classes (.glass-panel, .vector-glow, etc.)
│   ├── favicon.ico
│   │
│   ├── api/chat/
│   │   └── route.ts              ← POST /api/chat — streams LLM responses from Vultr Inference
│   │
│   ├── (user)/
│   │   ├── layout.tsx            ← User group layout
│   │   └── settings/
│   │       └── page.tsx          ← Settings page (tabs: general, account, privacy, billing)
│   │
│   ├── (auth)/
│   │   ├── layout.tsx            ← Auth group layout
│   │   └── auth/
│   │       └── page.tsx          ← Auth page — renders AuthForm using Stack Auth hooks
│   │
│   ├── (main)/
│   │   ├── chat/
│   │   │   └── page.tsx          ← Full-page streaming chat UI
│   │   ├── learn/
│   │   │   └── page.tsx          ← Primary conversion page — Leader Brain + AXON explainer
│   │   ├── pricing/
│   │   │   └── page.tsx          ← Pricing page — 3 tiers (Starter/Pro/Enterprise) + FAQ
│   │   ├── admin/
│   │   │   └── page.tsx          ← Auth-protected internal dashboard — dream inbox + brain state
│   │   └── solutions/
│   │       └── page.tsx          ← Industry-specific AI solutions
│   │
│   ├── handler/
│   │   └── [...stack]/
│   │       └── page.tsx          ← Stack Auth catch-all handler
│   │
│   └── api/brain/
│       ├── dream/route.ts        ← POST — proxies dream payloads to VPS Brain API
│       └── state/route.ts        ← GET — proxies brain state from VPS Brain API
│
├── components/
│   │
│   ├── providers.tsx             ← Wraps app in ThemeProvider and StackProvider
│   │
│   ├── auth/
│   │   └── AuthForm.tsx          ← Auth form: login + signup tabs using useAuth() from lib/auth-context.tsx
│   │
│   ├── home/                     ← All homepage sections
│   │   ├── HeroSection.tsx       ← Full-screen hero with animated visuals
│   │   ├── ServicesSection.tsx   ← Services overview cards
│   │   ├── FeaturesSection.tsx   ← Feature highlights
│   │   ├── StatsSection.tsx      ← Key statistics/metrics display
│   │   └── CTASection.tsx        ← Bottom CTA section
│   │
│   └── layout/
│       ├── Header.tsx            ← Fixed top navbar: logo, nav links, Auth buttons
│       ├── Footer.tsx            ← Site footer
│       └── Sidebar.tsx           ← Floating AI chat assistant widget (bottom-right)
│
├── lib/
│   ├── auth-context.tsx          ← Convenience wrapper for Stack Auth hooks (useAuth, useUser)
│   ├── brain.ts                  ← VPS Brain API layer: sendDream(), getBrainState()
│   └── mddb.ts                   ← Markdown database configuration for Leader Brain
│
├── stack/                        ← Stack Auth configuration
│   ├── client.ts                 ← StackClientApp instance
│   └── server.ts                 ← StackServerApp instance
│
├── leader-brain/                 ← AI agent / strategic planning knowledge base
│   ├── leader-brain.json         ← Structured AI agent memory/configuration
│   ├── dreams/                   ← Long-form product visions and goals
│   └── knowledge/projects/       ← Project-specific knowledge entries
│
├── public/                       ← Static assets served at root URL
│   ├── og/                       ← SEO / OpenGraph images for all pages
│   └── logo-icon.svg             ← QVL brand icon
│
├── sitemap.ts                    ← Dynamic SEO sitemap
├── robots.ts                     ← Robots exclusion configuration
├── next.config.ts                ← Next.js configuration
├── tailwind.config.ts            ← Tailwind config with custom colors/animations
└── package.json                  ← Project manifest and dependency list
```

---

## 4. Authentication System

- **Provider:** Stack Auth
- **SDK:** `@stackframe/stack`
- **Config:** `stack/client.ts` and `stack/server.ts`
- **Context:** `lib/auth-context.tsx` exports `useAuth()` as a convenience hook wrapping Stack's native hooks.
- **Handler:** `app/handler/[...stack]/page.tsx` handles all auth-related routes (sign-in, sign-up, callbacks).
- **Protected Routes:** `app/(main)/admin/page.tsx` is auth-gated using the `useUser()` hook.

---

## 5. Environment Variables

| Variable | Scope | Purpose |
|---|---|---|
| `VULTR_API_KEY` | Server-only | API key for Vultr Inference (AI chatbot) |
| `NEXT_PUBLIC_STACK_PROJECT_ID` | Public | Stack Auth Project ID |
| `NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY` | Public | Stack Auth Publishable Key |
| `STACK_SECRET_SERVER_KEY` | Server-only | Stack Auth Secret Key |
| `BRAIN_API_URL` | Server-only | Endpoint for the Leader Brain VPS |

---

## 6. Immediate Next Priorities

1. **Build `/dashboard`** — Unblock the auth conversion funnel.
2. **Fix `MobileMenu.tsx`** — Add Learn and Chat links to mobile nav.
3. **Add rate limiting to `/api/chat`** — Protect Vultr quota from abuse.
4. **Deploy VPS Brain** — Required for admin dashboard to function.
5. **Persist chat history** — Store in local storage or database.
