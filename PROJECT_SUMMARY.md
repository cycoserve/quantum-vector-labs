# Project Summary — Quantum Vector Labs (QVL)

> Generated: 2026-03-24 | Next.js 16 · React 19 · TypeScript · TailwindCSS · Supabase · Vultr Inference

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
- Authentication portal (sign in / sign up, OAuth)
- A floating AI chat assistant powered by Vultr Inference for answering product questions

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
| **Auth Backend** | Supabase (`@supabase/supabase-js` v2.98) |
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
│   ├── page.tsx                  ← Home page — assembles all home sections + Sidebar
│   ├── globals.css               ← Global CSS, Tailwind base, custom utility classes (.glass-panel, .vector-glow, etc.)
│   ├── favicon.ico
│   │
│   ├── api/chat/
│   │   └── route.ts              ← POST /api/chat — streams LLM responses from Vultr Inference
│   │
│   ├── auth/
│   │   └── page.tsx              ← Auth page — renders AuthForm with cinematic background effects
│   │
│   ├── chat/
│   │   └── page.tsx              ← Full-page streaming chat UI (manual SSE reader, no useChat)
│   │
│   ├── learn/
│   │   └── page.tsx              ← Primary conversion page — Leader Brain + AXON explainer
│   │
│   ├── admin/
│   │   └── page.tsx              ← Auth-protected internal dashboard — dream inbox + brain state
│   │
│   ├── api/brain/
│   │   ├── dream/route.ts        ← POST — proxies dream payloads to VPS Brain API
│   │   └── state/route.ts        ← GET — proxies brain state from VPS Brain API
│   │
│   ├── pricing/
│   │   └── page.tsx              ← Pricing page — 3 tiers (Starter/Pro/Enterprise) + FAQ accordion
│   │
│   └── signin/
│       └── page.html             ← Static HTML sign-in prototype (legacy/reference)
│
├── components/
│   │
│   ├── providers.tsx             ← Wraps app in AuthProvider React context
│   │
│   ├── auth/
│   │   └── AuthForm.tsx          ← Full auth form: login + signup tabs, email/password, OAuth (Google, GitHub)
│   │
│   ├── home/                     ← All homepage sections (rendered in order in app/page.tsx)
│   │   ├── HeroSection.tsx       ← Full-screen hero: animated SVG, particles, scan lines, CTA buttons
│   │   ├── ServicesSection.tsx   ← Services overview cards
│   │   ├── FeaturesSection.tsx   ← Feature highlights
│   │   ├── StatsSection.tsx      ← Key statistics/metrics display
│   │   ├── BrandShowcase.tsx     ← Partner/brand logos display
│   │   ├── RAGSection.tsx        ← Explainer section for RAG (Retrieval-Augmented Generation)
│   │   ├── AxonSection.tsx       ← "AI-operated company" section — AXON + Leader Brain + eat-your-own-cooking
│   │   ├── BentoGrid.tsx         ← Bento-style grid layout component (available for use)
│   │   └── CTASection.tsx        ← Bottom CTA section
│   │
│   └── layout/
│       ├── Header.tsx            ← Fixed top navbar: logo, nav links, Log In / Sign Up buttons
│       ├── Footer.tsx            ← Site footer
│       ├── MobileMenu.tsx        ← Responsive hamburger menu for mobile
│       ├── BackgroundLines.tsx   ← Decorative animated background lines (decorative layer)
│       └── Sidebar.tsx           ← Floating AI chat assistant widget (bottom-right, streaming)
│
├── lib/
│   ├── supabase.ts               ← Supabase client, auth helpers (signIn, signUp, signOut, OAuth, resetPassword)
│   ├── auth-context.tsx          ← React context + AuthProvider + useAuth() hook
│   └── brain.ts                  ← VPS Brain API layer: sendDream(), getBrainState()
│
├── knowledge/
│   └── the-app.md                ← Human-readable product description (NOT injected at runtime)
│
├── leader-brain/                 ← AI agent / strategic planning knowledge base
│   ├── leader-brain.json         ← Structured AI agent memory/configuration
│   ├── DEMO_USAGE.md             ← Usage documentation for the leader-brain agent
│   ├── master/                   ← Core persona, philosophy, and scanning instructions
│   ├── dreams/                   ← Long-form product visions and goals
│   ├── knowledge/projects/       ← Project-specific knowledge entries
│   │   ├── test-project.md       ← Example entry (Express.js test project)
│   │   └── quantum-vector-labs-website.md  ← Full knowledge entry for this project (auto-generated)
│   ├── decision-frameworks/      ← (Reserved for decision logic)
│   ├── features/                 ← (Reserved for feature specs)
│   ├── mistakes/                 ← (Reserved for lessons learned)
│   ├── patterns/                 ← (Reserved: architecture, performance, scaling, security)
│   └── stack-guides/             ← (Reserved for stack-specific guides)
│
├── source-files/                 ← Design source files and HTML prototypes
│   ├── index.html                ← Static marketing page prototype
│   ├── signup-page.html          ← Static signup page prototype
│   ├── user-dashboard.html       ← Static user dashboard prototype
│   ├── logo-starter.png          ← Raw logo asset
│   └── FreeSample-Vectorizer-io-logo-starter.svg  ← Vectorized logo variant
│
├── public/                       ← Static assets served at root URL
│   ├── logo-icon.svg             ← QVL brand icon (used in Header)
│   ├── globe.svg
│   ├── file.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
│
├── .env.local                    ← Secret environment variables (gitignored)
├── .gitignore
├── AI_ASSISTANT_SETUP.md         ← Detailed technical guide for replicating the AI chatbot
├── README.md                     ← Default Next.js bootstrap README
├── next.config.ts                ← Next.js configuration
├── tailwind.config.ts            ← Tailwind config with custom colors/animations
├── tsconfig.json                 ← TypeScript configuration
├── eslint.config.mjs             ← ESLint configuration
├── postcss.config.mjs            ← PostCSS configuration
└── package.json                  ← Project manifest and dependency list
```

---

## 4. Key Pages & Routes

| Route | File | Description |
|---|---|---|
| `/` | `app/page.tsx` | Home — full marketing landing page |
| `/learn` | `app/learn/page.tsx` | **Primary conversion page** — Leader Brain + AXON explainer, folder structure visual, agent pipeline, comparison to Flowise/vector DBs, CTA |
| `/chat` | `app/chat/page.tsx` | Full-page streaming chat UI (Vultr Inference, manual SSE reader) |
| `/pricing` | `app/pricing/page.tsx` | Pricing tiers with billing toggle and FAQ |
| `/auth` | `app/auth/page.tsx` | Authentication portal (sign in / sign up / OAuth) |
| `/admin` | `app/admin/page.tsx` | **Auth-protected** internal dashboard — submit dreams to brain + view brain state JSON |
| `/api/chat` | `app/api/chat/route.ts` | POST — streams LLM responses from Vultr Inference |
| `/api/brain/dream` | `app/api/brain/dream/route.ts` | POST — sends a dream payload to the VPS Brain API |
| `/api/brain/state` | `app/api/brain/state/route.ts` | GET — fetches current brain state from the VPS Brain API |

---

## 5. New Files Added (Build Phase 2)

| File | Type | Description |
|---|---|---|
| `app/learn/page.tsx` | Page | Leader Brain + AXON explainer — primary conversion funnel |
| `app/chat/page.tsx` | Page | Full-page streaming chat UI |
| `app/admin/page.tsx` | Page | Auth-protected dream submission + brain state viewer |
| `app/api/brain/dream/route.ts` | API Route | POST — proxy to VPS Brain `/dreams` |
| `app/api/brain/state/route.ts` | API Route | GET — proxy to VPS Brain `/state` |
| `lib/brain.ts` | Library | `sendDream()` + `getBrainState()` — VPS Brain connection layer |
| `components/home/AxonSection.tsx` | Component | Home page AXON/AI-operated-company section |
| `leader-brain/knowledge/projects/quantum-vector-labs-website.md` | Knowledge | Full project scan entry for the Leader Brain memory system |

---

## 7. AI Chatbot Architecture

The floating chat assistant is a core feature of the homepage:

- **Widget:** `components/layout/Sidebar.tsx` — fixed bottom-right button that opens a chat panel
- **API:** `app/api/chat/route.ts` — Node.js server-side route; proxies requests to Vultr Inference with a static system prompt
- **LLM:** Vultr Serverless Inference (model: `deepseek-r1-distill-qwen-32b`, configurable via `VULTR_MODEL` env var)
- **Streaming:** SSE stream from Vultr parsed server-side, re-emitted as a `ReadableStream<string>` via Vercel AI SDK `createTextStreamResponse`
- **State:** Chat history lives in React `useState` — no persistence, cleared on refresh
- **Auth gating:** None — the assistant is available to all visitors without authentication
- **Features:** Fullscreen toggle, clear chat, auto-scroll, URL auto-linking, markdown stripping

---

## 6. Authentication System

- **Provider:** Supabase Auth
- **Methods supported:** Email/password, Google OAuth, GitHub OAuth
- **Context:** `lib/auth-context.tsx` exports `AuthProvider` and `useAuth()` hook
- **Client:** `lib/supabase.ts` initializes the Supabase client and exports typed auth helper functions
- **Auth page:** `app/auth/page.tsx` renders the `AuthForm` component with sign in / sign up tab switching
- **Post-login redirect:** Redirects to `/dashboard` (dashboard route not yet implemented in this codebase)
- **OAuth callback URL:** `{origin}/auth/callback`

---

## 7. Styling System

A custom dark, cyberpunk/sci-fi visual style with these design tokens and utility classes defined in `app/globals.css` and `tailwind.config.ts`:

| Class/Token | Effect |
|---|---|
| `.glass-panel` | Frosted glass effect — dark semi-transparent background, backdrop blur |
| `.vector-glow` | Cyan glowing box-shadow matching brand color |
| `.card-ring` | Animated ring/pulse border effect |
| `.card-ring-hover` | Ring effect activates on hover |
| `text-primary` | Brand cyan color (`#20d3ee` / `--color-primary`) |
| `.particle-bg` | Background animation for the hero section |
| `text-gradient` | Gradient text using brand colors (cyan → purple) |
| `animate-grid-scan` | Horizontal scan line animation |
| `animate-grid-scan-vertical` | Vertical scan line animation |

The app is forced into **dark mode** at the HTML level and uses **Space Grotesk** as the display typeface.

---

## 8. Environment Variables

| Variable | Scope | Purpose |
|---|---|---|
| `VULTR_API_KEY` | Server-only | API key for Vultr Inference (AI chatbot) |
| `VULTR_API_URL` | Server-only | Vultr Inference endpoint URL |
| `VULTR_MODEL` | Server-only | LLM model identifier (default: `deepseek-r1-distill-qwen-32b`) |
| `NEXT_PUBLIC_SUPABASE_URL` | Public (browser) | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public (browser) | Supabase anonymous public key |

---

## 9. Leader Brain (AI Agent Knowledge Base)

The `leader-brain/` directory contains a structured AI agent memory system intended for use by an AI coding assistant. It includes:

- **`leader-brain.json`** — Core agent configuration and memory structure
- **`master/leader-brain-persona.md`** — The agent's persona definition
- **`master/leader-brain-philosophy.md`** — Decision-making philosophy
- **`master/project-scan-instructions.md`** — Instructions for scanning and understanding the project
- **`master/entry-template.md`** — Template for new knowledge entries
- **`dreams/dream_qvl_001.md`** — Long-form product vision document
- **`knowledge/projects/test-project.md`** — Example project knowledge entry
- Reserved subdirectories: `decision-frameworks/`, `features/`, `mistakes/`, `patterns/`, `stack-guides/`

This is a **developer/agent tooling layer** and does not affect the running application.

---

## 10. Development Commands

```bash
# Install dependencies
npm install

# Start development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint the codebase
npm run lint
```

---

## 12. Notable Observations

- The `/dashboard` route referenced in post-auth redirects does **not yet exist** in `app/`. First-time sign-in will hit a 404.
- The `app/signin/page.html` file is a **static HTML prototype** — it is not part of the Next.js routing system.
- The `source-files/` directory contains **design prototypes** (static HTML/PNG/SVG) intended as references, not deployed assets.
- The `knowledge/the-app.md` file is a human reference doc; it is **NOT injected** into the AI chatbot's context at runtime.
- The `BentoGrid` component exists in `components/home/` but is **not currently rendered** on the home page.
- There is **no `middleware.ts`** — all route protection is handled at the component level.
- Chat history is **not persisted** — it lives in React state only and is cleared on page refresh.
- `MobileMenu.tsx` has its own nav links array and is **not yet updated** with the `/learn` and `/chat` links added to the desktop header.
- The `/admin` page is auth-gated **client-side only** — a server-side or middleware guard should be added before production.
- `BRAIN_API_URL` and `BRAIN_API_KEY` in `.env.local` are placeholder values — the `/admin` brain features will error until a real VPS Brain is running and keys are filled in.

---

## 13. Immediate Next Priorities (Ordered by Revenue Impact)

1. **Build `/dashboard`** — Unblock the auth conversion funnel. Without it, sign-ups have nowhere to land.
2. **Fix `MobileMenu.tsx`** — Add Learn and Chat links to mobile nav.
3. **Add rate limiting to `/api/chat`** — Protect Vultr quota from abuse before publishing.
4. **Configure Supabase OAuth** — Enable Google + GitHub providers in Supabase dashboard; set redirect URI `{domain}/auth/callback`.
5. **Set Supabase URL + key in production** — Replace placeholder values in `.env.local` (or Vercel dashboard for prod).
6. **Deploy VPS Brain + set `BRAIN_API_URL`/`BRAIN_API_KEY`** — Required for admin dashboard to function.
7. **Persist chat history** — `localStorage` for guests, Supabase for authenticated users.
8. **Add OpenGraph metadata** — All pages need `og:title`, `og:description`, `og:image` for social sharing.
9. **Analytics** — Add Plausible or PostHog to track `/learn` → `/auth` → `/pricing` conversion funnel.
