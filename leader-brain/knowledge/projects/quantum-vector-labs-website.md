# Project Entry — Quantum Vector Labs Website

## Project Overview
- **Project Name**: Quantum Vector Labs (QVL) Marketing Website
- **Purpose**: Marketing, conversion, and operational hub for a GenAI infrastructure platform selling Serverless Inference, Vector Databases, multi-modal models, and custom AI apps. The site is itself operated by the AXON agent network — QVL eats its own cooking.
- **Stack**: Next.js 16 (App Router) · React 19 · TypeScript · TailwindCSS · Supabase Auth · Vultr Serverless Inference · Vercel AI SDK v6
- **Architecture Type**: Full-stack monolith via Next.js App Router — server components, client components, and API routes co-located

---

## Technology Stack

- **Frontend**: Next.js 16 App Router (TSX), React 19, TailwindCSS 3.4, Space Grotesk font via `next/font/google`, Lucide React icons
- **Backend**: Next.js API routes (Node.js runtime) — `/api/chat`, `/api/brain/dream`, `/api/brain/state`
- **Database**: Supabase (PostgreSQL under the hood) — auth sessions only; no custom tables built yet
- **Authentication**: Supabase Auth — email/password + OAuth (Google, GitHub). Context via `lib/auth-context.tsx` + `useAuth()` hook. `AuthProvider` wraps the app via `components/providers.tsx`.
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

### Auth
- `/auth` — Sign in / sign up via email+password or OAuth (Google, GitHub); tab-switching form; redirects to `/dashboard` on success (dashboard not yet built)

### Internal / Admin
- `/admin` — Auth-protected dream submission form (type, priority, tags) + brain state JSON viewer; calls `/api/brain/dream` and `/api/brain/state`

### AI Chatbot Widget
- Floating chat assistant in bottom-right corner (all pages via `app/page.tsx`); powered by `/api/chat`; streaming; fullscreen toggle; no auth required; no session persistence

### Backend
- `lib/brain.ts` — `sendDream()` and `getBrainState()` — connection layer to VPS-hosted Leader Brain runtime
- `lib/supabase.ts` — typed Supabase auth helpers (signIn, signUp, signOut, OAuth, resetPassword, updatePassword)
- `lib/auth-context.tsx` — React context, `AuthProvider`, `useAuth()` hook

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

### 4. Supabase Auth (not NextAuth, not Stack Auth)
**Decision**: Use Supabase for all authentication.
**Reason**: Already configured, provides OAuth + email/password, client SDK is simple.
**Note**: The dream brief mentioned Stack Auth — this was not used. Supabase handles auth instead. If migrating, the `AuthProvider` pattern is well isolated in `lib/auth-context.tsx`.
**Outcome**: Works. OAuth providers need to be enabled in the Supabase dashboard.

### 5. No database schema beyond auth
**Decision**: No custom Drizzle/Prisma schema built; all data is either in-memory or routed to the VPS Brain API.
**Reason**: The brief did not confirm a database schema. Dream brief warned against building one without owner confirmation.
**Outcome**: Deferred. When users need persistence (saved dreams, chat history, dashboard data), Supabase tables + Drizzle should be added.

### 6. File-native brain connection (`lib/brain.ts`)
**Decision**: Connect to the VPS Leader Brain via REST rather than direct file access.
**Reason**: The brain runs on a separate VPS. The web app is stateless in this regard. Security boundary is clear.
**Outcome**: Layer is in place. Requires `BRAIN_API_URL` and `BRAIN_API_KEY` env vars to be set.

---

## Successful Patterns

### `glass-panel` + `vector-glow` design system
The custom CSS utility classes defined in `app/globals.css` (`glass-panel`, `vector-glow`, `card-ring`, `card-ring-hover`, `text-gradient`) provide a consistent dark cyberpunk aesthetic with minimal per-component CSS. Every new page naturally picks up the system by using these class names. Highly reusable.

### Streaming chat pattern (manual ReadableStream reader)
The pattern established in `Sidebar.tsx` — create a placeholder assistant message, then accumulate stream chunks into it by message ID — is clean, debuggable, and reusable. Copy-paste into `/chat/page.tsx` required almost no modification. This should be the standard pattern for all streaming UI in this codebase.

### `AuthProvider` + `useAuth()` isolation
Auth logic is completely isolated in `lib/auth-context.tsx` and `lib/supabase.ts`. Any page can call `const { isAuthenticated, user } = useAuth()` without coupling to Supabase directly. This makes provider swaps (if ever needed) a single-file change.

### `lib/brain.ts` as a clean API boundary
All VPS communication is isolated behind two exported async functions. API routes (`/api/brain/dream` and `/api/brain/state`) are thin wrappers that call these functions. The web app never knows the brain's internal structure — only its REST interface.

---

## Mistakes

### 1. `/dashboard` route referenced but not built
The auth form redirects to `/dashboard` on successful sign in, but this route does not exist. First-time users will hit a 404. **Fix**: Build `app/dashboard/page.tsx` before launching auth.

### 2. Chat history is not persisted
Both the `Sidebar` widget and the `/chat` page lose all history on refresh. There is no user session tied to chat. For a product that promises AI memory (Leader Brain), this is a gap. **Fix**: Store chat history in `localStorage` as a minimum, or Supabase for authenticated users.

### 3. No rate limiting on `/api/chat`
Any user can spam the chat endpoint and exhaust the Vultr API quota. **Fix**: Add `express-rate-limit` equivalent via Next.js middleware, or check for an auth token before allowing requests.

### 4. `BRAIN_API_URL` and `BRAIN_API_KEY` are placeholder values in `.env.local`
The brain API will fail silently until real values are provided. The admin page and brain API routes will return errors until the VPS is running. **Note**: This is expected — document it clearly for the operator.

### 5. OAuth redirect URL not configured in Supabase/Google/GitHub
The sign-in with Google and GitHub buttons will fail until OAuth providers are enabled in the Supabase dashboard and callback URLs are registered with each provider. **Fix**: Add `{YOUR_DOMAIN}/auth/callback` to each provider's allowed redirect URIs.

### 6. Mobile menu does not include the new `/learn` and `/chat` links
`components/layout/Header.tsx` was updated but `components/layout/MobileMenu.tsx` has a separate nav links array. It will be out of sync on mobile. **Fix**: Update `MobileMenu.tsx` to include the same links.

---

## Performance Observations

- **Server Components**: The app uses `"use client"` broadly. Most pages could be partially server-rendered for faster initial load. In particular, `/learn` and `/pricing` have no interactivity above the fold.
- **Font loading**: Space Grotesk loaded via `next/font` — optimal, no layout shift.
- **No image optimization**: No `<Image>` components used yet. SVG logos are inline — efficient.
- **Streaming chat**: Response rendering starts immediately on first token — perceived latency is low even if full response is slow.

---

## Security Observations

- **API keys server-only**: `VULTR_API_KEY`, `BRAIN_API_KEY`, `BRAIN_API_URL` are all server-side only (no `NEXT_PUBLIC_` prefix). Never exposed to the browser. ✅
- **Supabase anon key is public**: `NEXT_PUBLIC_SUPABASE_ANON_KEY` is expected to be public. It should have Row-Level Security (RLS) enabled on all tables. ⚠️ (No custom tables yet, but critical for when they're added.)
- **No CSRF protection on API routes**: Next.js API routes don't have CSRF tokens by default. Currently only the chat and brain routes exist. If user-mutating routes are added (e.g., account updates), add protection.
- **Admin page auth**: Protected client-side via `useAuth()`. A determined user could inspect the page source. For true security, move admin checks to a server component or middleware.

---

## Deployment Lessons

- **Vercel is the target platform**: `next build` + `next start` or Vercel automatic deployment. No special config required.
- **Environment variables**: Must be set in Vercel dashboard for production (`VULTR_API_KEY`, `BRAIN_API_URL`, `BRAIN_API_KEY`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`).
- **VPS Brain**: The Leader Brain runtime must be deployed and running before the `/admin` page and brain API routes function. The web app degrades gracefully (errors in admin only) if the brain is offline.

---

## Future Improvements

1. **Build `/dashboard`** — The #1 blocking item for a usable auth flow. Show user name, plan tier, API usage stats, and recent chat history.
2. **Persist chat history** — Store in `localStorage` for guests; Supabase for authenticated users.
3. **Fix mobile nav** — Add Learn and Chat links to `MobileMenu.tsx`.
4. **Add rate limiting** — Protect `/api/chat` from abuse. Use Upstash Redis + `@upstash/ratelimit` for a serverless-compatible approach.
5. **Enable Supabase RLS** — Before adding any user data tables, ensure Row-Level Security policies are in place.
6. **Server-side render static sections** — Convert HeroSection, ServicesSection, FeaturesSection, /learn, /pricing header sections to server components for faster FCP.
7. **Real AXON pipeline integration** — When the VPS brain is live, wire the `/admin` dream submission to actually trigger an AXON agent loop and display real-time execution logs.
8. **Add a `/docs` or `/learn/[slug]` sub-pages** — The `/learn` page is one long scroll. Break it into navigable sections with a sidebar.
9. **Add OpenGraph metadata** — All pages need `<meta property="og:*">` tags for social sharing. Currently only the root layout has metadata.
10. **Analytics** — Add Plausible or PostHog to understand conversion funnels from `/learn` → `/auth` → `/pricing`.

---

*Entry generated by Quantum Vector Labs — Leader Brain system*
*Date: 2026-03-24*
*Project status: Active / In development*
