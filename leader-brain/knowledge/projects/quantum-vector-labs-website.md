# Project Entry — Quantum Vector Labs Website

## Project Overview
- **Project Name**: Quantum Vector Labs (QVL) Marketing Website
- **Purpose**: Marketing, conversion, and operational hub for a GenAI infrastructure platform selling Serverless Inference, Vector Databases, multi-modal models, and custom AI apps. The site is itself operated by the AXON agent network — QVL eats its own cooking.
- **Stack**: Next.js 16 (App Router) · React 19 · TypeScript · TailwindCSS · Stack Auth · Neon DB (Future) · Vultr Serverless Inference · Vercel AI SDK v6
- **Architecture Type**: Full-stack monolith via Next.js App Router — server components, client components, and API routes co-located

---

## Technology Stack

- **Frontend**: Next.js 16 App Router (TSX), React 19, TailwindCSS 3.4, Space Grotesk font via `next/font/google`, Lucide React icons
- **Icons**: Lucide React (Standard). Avoid Material Icons or other third-party icon fonts.
- **Backend**: Next.js API routes (Node.js runtime) — `/api/chat`, `/api/brain/dream`, `/api/brain/state`
- **Authentication**: Stack Auth — Modern, developer-friendly auth system.
- **Database**: Neon DB — Serverless Postgres (Planned for future data persistence; currently stateless MVP).
- **Storage**: None (no file uploads implemented)
- **Infrastructure**: Designed for Vercel deployment. AI inference via Vultr Serverless Inference REST API. Brain/AXON VPS connection via `lib/brain.ts` (separate runtime on a VPS).
- **AI**: Vultr Inference (OpenAI-compatible). Model: `kimi-k2-instruct` (configurable). Streamed via SSE, re-emitted as `ReadableStream<string>` using Vercel AI SDK `createTextStreamResponse`.

---

## Features

### Public Pages
- `/` — Full marketing landing page: Hero, Services, Features, Stats, BrandShowcase, AXON ("eat your own cooking") section, RAG section, CTA, Footer
- `/learn` — Flagship explainer page for Leader Brain + AXON: concept breakdown, folder structure visual, agent pipeline diagram, comparison to Flowise/vector DBs, CTA to sign up
- `/chat` — Full-page streaming chat UI powered by Vultr Inference; manual SSE stream reader (no `useChat` hook); fullscreen capable
- `/pricing` — 3-tier pricing (Starter free / Pro $99/mo / Enterprise custom) with monthly/yearly toggle and FAQ accordion
- `/solutions` - Industry-specific AI agent clusters (Record Label, Law Firm, Real Estate, E-commerce).
- `/support` - AI-powered support center with NLP resolution loop.

### Auth
- `/auth` — Sign in / sign up via Stack Auth managed components and hooks.

### Internal / Admin
- `/admin` — Auth-protected dream submission form (type, priority, tags) + brain state JSON viewer; calls `/api/brain/dream` and `/api/brain/state`

### AI Chatbot Widget
- Floating chat assistant in bottom-right corner; powered by `/api/chat`; streaming; fullscreen toggle; persistent session via localStorage.

---

## Architectural Decisions

### 1. App Router (Next.js 16) over Pages Router
**Decision**: Use the App Router introduced in Next.js 13+.
**Reason**: Enables server components, layouts, and co-located API routes. Better suited for a long-lived product.
**Outcome**: Clean separation between server-only API routes and client components. Works well.

### 2. Vultr Inference over OpenAI directly
**Decision**: Route all LLM calls through Vultr Serverless Inference.
**Reason**: Cost, global edge distribution, OpenAI-compatible API (drop-in replacement), and alignment with QVL's own product offering.
**Outcome**: Works. Model quality depends on model selected. `kimi-k2-instruct` is the default. `deepseek-r1-distill-qwen-32b` also tested.

### 3. Manual SSE stream parsing instead of `useChat`
**Decision**: Do not use `useChat()` from `@ai-sdk/react`. Instead manually read the `ReadableStream<string>` in the client.
**Reason**: `useChat` adds abstraction complexity and made the token stream non-trivial to control. Manual reading is simpler and more debuggable.
**Outcome**: Works cleanly. The pattern in `components/layout/Sidebar.tsx` and `app/chat/page.tsx` is identical and easily reusable.

### 4. Stack Auth
**Decision**: Use Stack Auth for all authentication.
**Reason**: Modern, hooks-based SDK, excellent Next.js App Router support, and simplified user management compared to traditional providers.
**Outcome**: Core auth logic is centered around Stack's provided components and hooks.

### 5. Neon DB for Persistence
**Decision**: Use Neon DB as the primary relational database for future features.
**Reason**: Serverless architecture, branching capabilities, and seamless scaling.
**Outcome**: Currently deferred for the MVP. When users need persistence (saved dreams, chat history, dashboard data), Neon DB + Drizzle ORM will be implemented.

---

## Successful Patterns

### `glass-panel` + `vector-glow` design system
The custom CSS utility classes defined in `app/globals.css` (`glass-panel`, `vector-glow`, `card-ring`, `card-ring-hover`, `text-gradient`) provide a consistent dark cyberpunk aesthetic with minimal per-component CSS. Every new page naturally picks up the system by using these class names. Highly reusable.

### Streaming chat pattern (manual ReadableStream reader)
The pattern established in `Sidebar.tsx` — create a placeholder assistant message, then accumulate stream chunks into it by message ID — is clean, debuggable, and reusable. Copy-paste into `/chat/page.tsx` required almost no modification. This should be the standard pattern for all streaming UI in this codebase.

### Stack Auth Integration
Auth logic is managed via Stack Auth's SDK. Components can use Stack's hooks (e.g., `useUser`) to handle session state without complex custom providers.

### Branding & Theming
The app uses a theme-aware branding system to ensure accessibility across light and dark modes.
- **Dark Mode Primary**: `#20d3ee` (Cyan) — Optimized for vibrant glowing effects against dark backgrounds.
- **Light Mode Primary**: `#0e7490` (Cyan 700) — A deeper, high-contrast blue that ensures WCAG-compliant legibility on light backgrounds while maintaining brand identity.
- **Implementation**: Managed via `var(--color-primary)` in `app/globals.css` and mapped in `tailwind.config.ts`.

---

## Mistakes

### 1. `/dashboard` route referenced but not built
The auth form redirects to `/dashboard` on successful sign in, but this route does not exist. First-time users will hit a 404. **Fix**: Build `app/dashboard/page.tsx` before launching auth.

### 2. No rate limiting on `/api/chat`
Any user can spam the chat endpoint and exhaust the Vultr API quota. **Fix**: Add `express-rate-limit` equivalent via Next.js middleware, or check for an auth token before allowing requests.

### 3. `BRAIN_API_URL` and `BRAIN_API_KEY` are placeholder values in `.env.local`
The brain API will fail silently until real values are provided. The admin page and brain API routes will return errors until the VPS is running. **Note**: This is expected — document it clearly for the operator.

---

## Performance Observations

- **Server Components**: The app uses `"use client"` broadly. Most pages could be partially server-rendered for faster initial load. In particular, `/learn` and `/pricing` have no interactivity above the fold.
- **Font loading**: Space Grotesk loaded via `next/font` — optimal, no layout shift.
- **No image optimization**: No `<Image>` components used yet. SVG logos are inline — efficient.
- **Streaming chat**: Response rendering starts immediately on first token — perceived latency is low even if full response is slow.

---

## Security Observations

- **API keys server-only**: `VULTR_API_KEY`, `BRAIN_API_KEY`, `BRAIN_API_URL` are all server-side only. Never exposed to the browser. ✅
- **Stack Auth Security**: Leveraging Stack Auth's built-in security features for session management and token handling.

---

## Deployment Lessons

- **Vercel is the target platform**: `next build` + `next start` or Vercel automatic deployment. No special config required.
- **Environment variables**: Must be set in Vercel dashboard for production (`VULTR_API_KEY`, `BRAIN_API_URL`, `BRAIN_API_KEY`, `NEXT_PUBLIC_STACK_PROJECT_ID`, `NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY`, `STACK_SECRET_SERVER_KEY`).
- **VPS Brain**: The Leader Brain runtime must be deployed and running before the `/admin` page and brain API routes function. The web app degrades gracefully (errors in admin only) if the brain is offline.

---

## Future Improvements

1. **Build `/dashboard`** — The #1 blocking item for a usable auth flow. Show user name, plan tier, API usage stats, and recent chat history.
2. **Fix mobile nav** — Add Learn and Chat links to `MobileMenu.tsx`.
3. **Add rate limiting** — Protect `/api/chat` from abuse. Use Upstash Redis + `@upstash/ratelimit` for a serverless-compatible approach.
4. **Server-side render static sections** — Convert HeroSection, ServicesSection, FeaturesSection, /learn, /pricing header sections to server components for faster FCP.
5. **Real AXON pipeline integration** — When the VPS brain is live, wire the `/admin` dream submission to actually trigger an AXON agent loop and display real-time execution logs.
6. **Add a `/docs` or `/learn/[slug]` sub-pages** — The `/learn` page is one long scroll. Break it into navigable sections with a sidebar.
7. **Add OpenGraph metadata** — All pages need metadata.
8. **Analytics** — Add Plausible or PostHog to understand conversion funnels.

---

*Entry generated by Quantum Vector Labs — Leader Brain system*
*Date: 2026-03-25*
*Project status: Active / In development*
