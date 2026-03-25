# AI Assistant Setup Guide — Quantum Vector Labs (QVL)

> **Audience:** AI Agent Coders and developers who need to replicate the QVL chatbot assistant in a new or existing Next.js project with zero ambiguity and minimal friction.

---

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [Required Dependencies](#2-required-dependencies)
3. [Environment Variables & API Keys](#3-environment-variables--api-keys)
4. [Step-by-Step Configuration](#4-step-by-step-configuration)
5. [Prompt Structure & System Message](#5-prompt-structure--system-message)
6. [API Route Definition & Request/Response Handling](#6-api-route-definition--requestresponse-handling)
7. [Middleware, Hooks & Utility Functions](#7-middleware-hooks--utility-functions)
8. [UI Integration Notes](#8-ui-integration-notes)
9. [Common Pitfalls, Edge Cases & Gotchas](#9-common-pitfalls-edge-cases--gotchas)
10. [Final Verification Checklist](#10-final-verification-checklist)

---

## 1. Architecture Overview

The QVL AI Assistant is a **floating chatbot widget** embedded in a Next.js 16 (App Router) web application. The assistant is rendered as a fixed-position button/panel in the lower-right corner of every page through the home route.

### Data Flow

```
User (browser)
     │
     │  POST /api/chat  { messages: [...] }
     ▼
app/api/chat/route.ts          ← Next.js API Route (server-side, Node.js runtime)
     │
     │  POST (streaming)
     ▼
Vultr Inference API            ← OpenAI-compatible LLM endpoint
(https://api.vultrinference.com/v1/chat/completions)
     │
     │  SSE stream (Server-Sent Events)
     ▼
app/api/chat/route.ts          ← Parses SSE, emits plain text chunks
     │
     │  ReadableStream<string> via Vercel AI SDK `createTextStreamResponse`
     ▼
components/layout/Sidebar.tsx  ← React client component, streams tokens into UI
```

### Key Architectural Decisions

| Decision | Detail |
|---|---|
| **LLM Provider** | Vultr Serverless Inference (OpenAI-compatible REST API) |
| **Streaming mechanism** | Server-Sent Events (SSE) parsed server-side, re-streamed as a `ReadableStream<string>` |
| **AI SDK role** | `ai` package (`createTextStreamResponse`) wraps the text stream for the response — the frontend does **not** use `useChat`; it manually reads the stream. |
| **Runtime** | `export const runtime = "nodejs"` — forces the route off the Edge runtime to allow full Node.js APIs |
| **Auth layer** | Supabase auth context wraps the app but is **not** required for the chatbot itself |
| **No session persistence** | Chat history lives in React state only (`useState`); it is cleared on page refresh or via the trash icon |
| **No RAG pipeline** | The system prompt is a static, hardcoded string. The `knowledge/` folder is reference material for humans, not injected at runtime. |

---

## 2. Required Dependencies

### Production Dependencies

| Package | Version (from `package.json`) | Purpose |
|---|---|---|
| `next` | `16.1.6` | App Router framework |
| `react` | `19.2.3` | UI library |
| `react-dom` | `19.2.3` | DOM rendering |
| `ai` | `^6.0.104` | Vercel AI SDK — provides `createTextStreamResponse` |
| `@ai-sdk/react` | `^3.0.106` | Vercel AI SDK React layer (installed as peer; not used directly in chatbot but imported by `ai`) |
| `@supabase/supabase-js` | `^2.98.0` | Auth only (not required for the chatbot itself) |
| `lucide-react` | `^0.469.0` | Icons (`Bot`, `Send`, `X`, `Loader2`, `Maximize2`, `Minimize2`, `Trash2`) |

### Dev Dependencies

| Package | Version | Purpose |
|---|---|---|
| `typescript` | `^5` | Type safety |
| `tailwindcss` | `^3.4.1` | Utility CSS used in the chat UI |
| `@types/react` | `^19` | React types |
| `eslint-config-next` | `16.1.6` | Linting |

### Install Command

```bash
npm install ai@^6.0.104 @ai-sdk/react@^3.0.106 lucide-react@^0.469.0
```

> **Note:** `ai` v6 has a different API surface than v3/v4. `createTextStreamResponse` is an `ai` v6 export. Do not downgrade without changing the API route accordingly.

---

## 3. Environment Variables & API Keys

Create a `.env.local` file at the project root with the following variables:

```env
# Vultr Inference — required for the AI chatbot
VULTR_API_KEY=<your-vultr-api-key>
VULTR_API_URL=https://api.vultrinference.com/v1/chat/completions
VULTR_MODEL=kimi-k2-instruct

# Supabase — required for auth pages, NOT for the chatbot
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### Where to Obtain Each Key

| Variable | Source |
|---|---|
| `VULTR_API_KEY` | Log in at [my.vultr.com](https://my.vultr.com) → **Products → Cloud Inference → API Keys** |
| `VULTR_API_URL` | Fixed value: `https://api.vultrinference.com/v1/chat/completions` — do not change |
| `VULTR_MODEL` | Any model ID available in your Vultr Inference account. Default used here: `kimi-k2-instruct`. Other tested model: `deepseek-r1-distill-qwen-32b` |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Dashboard → **Project Settings → API → Project URL** |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase Dashboard → **Project Settings → API → anon public key** |

### Variable Scoping Rules

- `VULTR_API_KEY`, `VULTR_API_URL`, `VULTR_MODEL` — **server-side only** (no `NEXT_PUBLIC_` prefix). They are never exposed to the browser.
- `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` — exposed to the browser (safe; these are public Supabase keys).

---

## 4. Step-by-Step Configuration

Follow this sequence exactly. Each step depends on the previous.

### Step 1 — Bootstrap the Next.js App (App Router)

```bash
npx create-next-app@16.1.6 my-app --typescript --tailwind --app --src-dir=false
cd my-app
```

### Step 2 — Install Required Packages

```bash
npm install ai@^6.0.104 @ai-sdk/react@^3.0.106 lucide-react@^0.469.0
```

### Step 3 — Create the Environment File

Create `.env.local` at the project root (never commit this file):

```env
VULTR_API_KEY=<your-key>
VULTR_API_URL=https://api.vultrinference.com/v1/chat/completions
VULTR_MODEL=kimi-k2-instruct
```

Verify `.env.local` is listed in `.gitignore`:

```gitignore
.env.local
```

### Step 4 — Create the API Route

Create the directory and file:

```
app/
└── api/
    └── chat/
        └── route.ts
```

Populate `app/api/chat/route.ts` with the full implementation (see [Section 6](#6-api-route-definition--requestresponse-handling)).

**Critical:** The file must include `export const runtime = "nodejs"` at the top level to prevent the route from running on the Edge runtime, which restricts certain streaming APIs.

### Step 5 — Create the Sidebar (Chat UI) Component

Create `components/layout/Sidebar.tsx` as a `"use client"` component.

This component owns all chat state and stream-reading logic. It does **not** use any server actions or context — it is fully self-contained. (See [Section 8](#8-ui-integration-notes) for full detail.)

### Step 6 — Mount the Sidebar in the Page

In `app/page.tsx` (or any page where you want the assistant), import and render the `Sidebar` component. It uses `position: fixed` so it floats over the page content regardless of where in the JSX tree it sits.

```tsx
// app/page.tsx
import Sidebar from "@/components/layout/Sidebar";

export default function Home() {
  return (
    <main>
      <Sidebar />
      {/* rest of page content */}
    </main>
  );
}
```

### Step 7 — Confirm Tailwind CSS Classes Are Available

The Sidebar uses custom Tailwind utility classes defined in `app/globals.css`:

- `.glass-panel` — semi-transparent dark glass effect
- `.vector-glow` — glowing border/shadow effect
- `.card-ring` — ring animation class
- `text-primary` — mapped to the brand cyan color (`#20d3ee` or equivalent)

Ensure these are declared in your `globals.css` or the component will render without styling.

### Step 8 — Run and Test

```bash
npm run dev
```

Navigate to `http://localhost:3000`. The floating bot icon appears at the bottom-right. Click it to open the chat panel and send a test message.

---

## 5. Prompt Structure & System Message

The system prompt is a **hardcoded string constant** defined at the top of `app/api/chat/route.ts`. It is never fetched from a file or database at runtime.

### Full System Prompt (verbatim)

```
You are a helpful assistant for Quantum Vector Labs (QVL).

QVL offers:
- Serverless Inference: Deploy GenAI models globally across six continents — no infrastructure to manage, self-optimizing.
- Vector Databases: Private, secure vector DBs for RAG — custom AI outputs without model training.
- Multi-Modal Models: Inference-optimized GPU-backed models.
- Custom Gen AI Apps: AI-powered apps for mobile, web, and internal tools.
- OpenAI-compatible API: Easy integration at an affordable rate.

IMPORTANT: Do NOT use any markdown formatting in your responses. This means:
- Do NOT use **bold** or *italic* text
- Do NOT use bullet points with - or *
- Do NOT use numbered lists
- Do NOT use backticks for code or URLs
- Do NOT use any markdown syntax at all

When you need to mention a URL, just write it as plain text: https://api.qvlabs.ai/v1/completions

Rules:
- Use a casual, professional tone — like a peer on Slack.
- Never start with "Based on the documents provided..." or "Certainly!" or "Great question!"
- Give short, direct answers. If a 1-sentence answer works, use it.
- If you don't know, just say "Not sure about that one yet."
- Keep responses under 3 sentences unless the user asks for detail.
```

### Prompt Design Conventions

| Convention | Rationale |
|---|---|
| Anti-markdown instruction block | The frontend `parseMessageContent()` strips remaining markdown, but the prompt instructs the model to avoid it in the first place as the primary line of defense |
| "Casual, professional tone" | Matches the brand voice of a modern developer-facing AI company |
| Hard token cap (`max_tokens: 150`) | Enforces brevity at the model level, not just via prompt |
| Temperature `0.7` | Balanced creativity vs. factual grounding |
| No RAG injection | The `knowledge/the-app.md` file is a human reference document. Its content is summarized manually into the system prompt — it is not injected dynamically at runtime |

### Message Array Structure Sent to the API

```json
[
  { "role": "system",    "content": "<SYSTEM_PROMPT>" },
  { "role": "user",      "content": "What is serverless inference?" },
  { "role": "assistant", "content": "It lets you deploy AI models globally without managing servers." },
  { "role": "user",      "content": "How do I get started?" }
]
```

The system prompt is **prepended** on every request server-side. The client only sends `user` and `assistant` turns.

---

## 6. API Route Definition & Request/Response Handling

**File:** `app/api/chat/route.ts`

### Route Summary

| Property | Value |
|---|---|
| **HTTP Method** | `POST` |
| **Endpoint** | `/api/chat` |
| **Runtime** | `nodejs` (explicitly declared) |
| **Request body** | `{ messages: Array<{ role: "user" \| "assistant", content: string }> }` |
| **Response** | Streaming text — `ReadableStream<string>` via `createTextStreamResponse` |

### Request Input Format

The client sends the **full conversation history** on every request (stateless from the server's perspective):

```json
{
  "messages": [
    { "role": "user", "content": "What is RAG?" },
    { "role": "assistant", "content": "RAG stands for Retrieval-Augmented Generation." },
    { "role": "user", "content": "Can I use it without training a model?" }
  ]
}
```

### Upstream API Call (Vultr Inference)

```typescript
const response = await fetch(process.env.VULTR_API_URL!, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.VULTR_API_KEY}`,
  },
  body: JSON.stringify({
    model: process.env.VULTR_MODEL ?? "deepseek-r1-distill-qwen-32b",
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      ...messages,  // user-provided history
    ],
    stream: true,
    max_tokens: 150,
    temperature: 0.7,
  }),
});
```

### SSE Stream Parsing

The Vultr API returns an OpenAI-compatible SSE stream. Each line is in the format:

```
data: {"choices":[{"delta":{"content":"Hello"}}]}
data: {"choices":[{"delta":{"content":" there"}}]}
data: [DONE]
```

The route manually parses this stream:

1. Creates a `ReadableStream<string>` via the `textStream` constructor
2. Reads raw bytes from `response.body.getReader()`
3. Decodes each chunk with `TextDecoder` (`{ stream: true }` to handle multi-byte splits)
4. Splits decoded text on `\n`, filters blank lines
5. For each line starting with `"data: "`, strips the prefix and parses JSON
6. Extracts `choices[0].delta.content` and enqueues it
7. Closes the stream on `[DONE]` sentinel

### Response Wrapper

```typescript
return createTextStreamResponse({ textStream });
```

`createTextStreamResponse` (from `ai` v6) converts the `ReadableStream<string>` into an HTTP response with appropriate streaming headers. **The response format is plain concatenated text chunks — not JSON, not SSE.**

### Error Handling

If the upstream response is not OK:

```typescript
if (!response.ok) {
  const error = await response.text();
  return new Response(`API Error: ${error}`, { status: response.status });
}
```

The client treats any non-OK response as a failure and displays a fallback error message.

---

## 7. Middleware, Hooks & Utility Functions

### `parseMessageContent()` — Client-Side Message Renderer

**Location:** `components/layout/Sidebar.tsx` (lines 13–42, defined inline)

**Purpose:** Sanitizes assistant responses for display. Removes residual markdown and converts plain-text URLs into clickable `<a>` tags.

**Transformations applied (in order):**

```typescript
// 1. Remove bold markdown
processed = content.replace(/\*\*(.+?)\*\*/g, "$1");

// 2. Remove italic markdown
processed = processed.replace(/\*(.+?)\*/g, "$1");

// 3. Remove inline code backticks
processed = processed.replace(/`(.+?)`/g, "$1");

// 4. Split on URLs and render as <a> tags
const urlRegex = /(https?:\/\/[^\s<]+)/g;
```

**Return type:** `React.ReactNode` — array of strings and `<a>` elements interleaved.

**Critical note on regex state:** The `urlRegex` regex is created with the `g` flag. After calling `.split(urlRegex)`, calling `.test(part)` inside the `.map()` will consume the regex's `lastIndex`. The code resets it with `urlRegex.lastIndex = 0` after each URL match to prevent false negatives on subsequent iterations. If you modify this function, preserve that reset.

### `useAuth()` Hook

**Location:** `lib/auth-context.tsx`

**Used in:** `app/page.tsx` (for the `isLoading` guard only)

**Relevance to chatbot:** The chatbot (`Sidebar`) does **not** call `useAuth()`. The hook is used in `page.tsx` to show a loading state while Supabase resolves the auth session. The chatbot itself is **not gated** behind authentication — it renders regardless of auth state.

### `AuthProvider` Context

**Location:** `lib/auth-context.tsx`, mounted in `components/providers.tsx`

Wraps the entire app. Provides `user`, `session`, `isLoading`, `isAuthenticated`, and auth action methods. This context is **independent** of the chat functionality.

### No Custom Middleware (`middleware.ts`)

There is no `middleware.ts` in this project. All route protection would be handled at the component level.

---

## 8. UI Integration Notes

### Component: `Sidebar` (`components/layout/Sidebar.tsx`)

**Directive:** `"use client"` — required because it uses `useState`, `useRef`, `useEffect`, and event handlers.

### State Shape

```typescript
const [isOpen, setIsOpen]           // boolean — panel visibility
const [messages, setMessages]       // Message[] — full conversation history
const [input, setInput]             // string — current text field value
const [isLoading, setIsLoading]     // boolean — request in-flight flag
const [isFullscreen, setIsFullscreen] // boolean — panel size toggle
```

### Message Interface

```typescript
interface Message {
  id: string;        // Date.now().toString() — unique per message
  role: "user" | "assistant";
  content: string;   // accumulates during streaming
}
```

### Streaming UX Pattern

The UI uses an **optimistic streaming pattern**:

1. User submits → user message immediately appended to state
2. Empty assistant message placeholder created with a pre-assigned `id`
3. Fetch begins against `/api/chat`
4. Stream reader loop decodes bytes and accumulates them into a local string
5. On each chunk, `setMessages` replaces the placeholder's `content` with the accumulated string (identified by `id`)
6. `Loader2` spinner is shown while `content` is empty string
7. `isLoading` is set to `false` in the `finally` block regardless of success or failure

### Fullscreen Mode

Toggled by `handleToggleFullscreen`. When active, the panel uses:

```
className="fixed inset-0 w-full h-full rounded-none z-[60]"
```

When inactive:

```
className="w-80 h-[480px]"
```

The toggle button renders `Minimize2` or `Maximize2` from `lucide-react` accordingly.

### Auto-Scroll Behavior

```typescript
useEffect(() => {
  if (isOpen) {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }
}, [messages, isOpen]);
```

A `<div ref={messagesEndRef} />` is placed at the bottom of the messages list. Fires on every message state change.

### Mounting Location

The `Sidebar` is imported and rendered directly in `app/page.tsx` — **not** in `app/layout.tsx`. This means it only appears on the home route (`/`). To show it on all pages, move `<Sidebar />` into `app/layout.tsx` inside the `<Providers>` wrapper, after the `<Header />`.

### CSS Dependencies

The Sidebar relies on these Tailwind-extended utility classes from `app/globals.css`:

| Class | Effect |
|---|---|
| `.glass-panel` | `backdrop-filter: blur`, dark semi-transparent background |
| `.vector-glow` | Cyan box-shadow glow matching brand color |
| `.card-ring` | Animated ring/pulse border |
| `text-primary` | Brand color (`var(--color-primary)`) — cyan (`#20d3ee` or similar) |
| `bg-primary` | Brand color background fill |

Ensure all of these are defined in your `globals.css` or Tailwind config before rendering the component.

---

## 9. Common Pitfalls, Edge Cases & Gotchas

### 1. `VULTR_API_URL` must not have a trailing slash

The URL `https://api.vultrinference.com/v1/chat/completions` is used verbatim. Adding a trailing slash will result in a 404 from Vultr.

### 2. `export const runtime = "nodejs"` is mandatory

Omitting this will cause Next.js to try to run the route on the Edge runtime on some deployments (e.g., Vercel). The `TextDecoder` with `{ stream: true }` and the manual `ReadableStream` constructor pattern require the Node.js runtime.

### 3. `ai` v6 breaking change — `createTextStreamResponse` import

This project uses `ai` version `^6.0.104`. In `ai` v3/v4, the equivalent function was `streamText` with different response handling. Do not reference v3/v4 documentation when working with this codebase.

```typescript
// CORRECT (ai v6)
import { createTextStreamResponse } from "ai";
return createTextStreamResponse({ textStream });

// WRONG — ai v3/v4 pattern, will error in v6
import { StreamingTextResponse } from "ai";
```

### 4. The `urlRegex.lastIndex` reset bug

In `parseMessageContent`, the `urlRegex` is declared with the `g` flag. After `.split()`, calling `.test()` in `.map()` advances `lastIndex`. Without the `urlRegex.lastIndex = 0` reset inside the map callback, every second URL in a response will **not** be rendered as a link. Do not remove this reset.

### 5. Chat history is never persisted

All messages live in `useState`. Refreshing the page or navigating away clears the history. There is no localStorage, sessionStorage, or database persistence. If persistence is needed, it must be added explicitly.

### 6. No auth guard on `/api/chat`

The API route at `app/api/chat/route.ts` does not check for a valid Supabase session or any authentication token. Any client that can reach the route can use it. This is intentional for the current demo build but should be addressed before production deployment to prevent API key abuse.

### 7. `max_tokens: 150` enforces very short responses

The upstream call limits responses to 150 tokens. This is suitable for a concise support bot but will truncate responses mid-sentence if users ask for detailed technical explanations. Raise this value if you need longer answers.

### 8. Model fallback default

```typescript
model: process.env.VULTR_MODEL ?? "deepseek-r1-distill-qwen-32b",
```

If `VULTR_MODEL` is not set, the route falls back to `deepseek-r1-distill-qwen-32b`. This model must be available in your Vultr Inference account. If it's not provisioned, the API will return a 400 or 404 error.

### 9. Malformed JSON chunks are silently skipped

```typescript
try {
  const parsed = JSON.parse(data);
  ...
} catch {
  // skip malformed JSON
}
```

Partial SSE chunks (e.g., at network boundaries) that fail JSON.parse are dropped. In practice, this means occasional missing tokens. The `{ stream: true }` option in `TextDecoder` mitigates most split-boundary issues, but this is a known trade-off of manual SSE parsing.

### 10. `Sidebar` only appears on the home page

Because `<Sidebar />` is in `app/page.tsx` and not `app/layout.tsx`, it only renders on the `/` route. If you add more pages and want the chatbot site-wide, move `<Sidebar />` to the layout.

---

## 10. Final Verification Checklist

Use this checklist before considering the AI assistant setup complete and ready for handoff.

### Environment & Configuration

- [ ] `.env.local` exists at project root with all four required variables populated
- [ ] `VULTR_API_KEY` is a valid, active key from the Vultr dashboard
- [ ] `VULTR_API_URL` is exactly `https://api.vultrinference.com/v1/chat/completions`
- [ ] `VULTR_MODEL` is set to a model ID that is available in the Vultr account
- [ ] `.env.local` is listed in `.gitignore` and has not been committed to version control

### Dependencies

- [ ] `npm install` completes with no errors
- [ ] `ai` package version is `^6.0.104` or greater (v6 branch)
- [ ] `lucide-react` is installed and `Bot`, `Send`, `X`, `Loader2`, `Maximize2`, `Minimize2`, `Trash2` icons resolve without import errors

### API Route

- [ ] File exists at `app/api/chat/route.ts`
- [ ] `export const runtime = "nodejs"` is present at the top of the file
- [ ] `import { createTextStreamResponse } from "ai"` resolves without TypeScript errors
- [ ] Sending a test POST to `/api/chat` with `{ "messages": [{ "role": "user", "content": "ping" }] }` returns a streaming text response
- [ ] A curl or Postman test against the route produces readable streaming tokens, not an error

### UI Component

- [ ] `components/layout/Sidebar.tsx` has `"use client"` directive on line 1
- [ ] The floating bot button is visible at bottom-right on the home page after `npm run dev`
- [ ] Clicking the bot button opens the chat panel
- [ ] Typing a message and pressing Send shows the user message immediately (optimistic)
- [ ] The Loader2 spinner appears in the assistant bubble while awaiting the first token
- [ ] Tokens stream in character-by-character (or chunk-by-chunk) into the assistant bubble
- [ ] The clear (Trash2) button empties the message list
- [ ] The fullscreen (Maximize2) button expands the panel to fill the viewport
- [ ] The close (X) button hides the panel
- [ ] URLs in assistant responses are rendered as clickable `<a>` elements

### Styling

- [ ] `.glass-panel`, `.vector-glow`, `.card-ring`, and `text-primary` / `bg-primary` CSS classes are defined in `app/globals.css`
- [ ] The chat panel renders with the dark glass aesthetic (no raw white background)
- [ ] The brand cyan color is visible on the bot icon border, send button, and focus ring

### Edge Cases

- [ ] Submitting an empty input does nothing (button is disabled when `input.trim()` is empty)
- [ ] If the API returns an error, the assistant bubble shows "Sorry, something went wrong. Please try again."
- [ ] Sending a second message while the first is streaming is blocked (`isLoading` disables the input and button)
- [ ] Markdown in assistant responses (`**bold**`, `*italic*`, `` `code` ``) is stripped and rendered as plain text in the UI

---

*Last updated: Based on codebase inspection at commit state — March 2026*
*Project: Quantum Vector Labs (`quantum-vector-labs`)*
