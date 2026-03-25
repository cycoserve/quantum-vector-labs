---
dream_id: dream_qvl_001
type: system
status: pending
created_by: human
priority: critical
tags: [qvl, nextjs, axon, leader-brain, website]
created_at: 2026-03-24T00:00:00Z
---

# QVL Website Build — Full Brief for Claude Code

## Who You Are Working For
Quantum Vector Labs (QVL) — an AI infrastructure company
owned by High Limit Designs. QVL sells three core products:
- Serverless Inference (via Vultr)
- Vector DB
- The Leader Brain / AXON Agent Network

The developer building this is the architect of the
Leader Brain and AXON system. He understands the philosophy
deeply. Do not over-explain. Do not add fluff. Build clean,
fast, and file-native where possible.

## What You Are Building
A Next.js 14 App Router website with TSX and Tailwind.
The following pages need to be built or extended:

### Page 1 — /learn (Priority: Build First)
This is the most important page on the site right now.
It explains the Leader Brain and AXON Agent Network to
developers and potential customers.

It must cover:
- What the Leader Brain is (file-native AI intelligence layer)
- What AXON is (Autonomous eXecution and Orchestration Network)
- The core concepts: Brain, Dreams, Pulse, Colonies, Spawn
- Why files over frameworks (the philosophy)
- How it compares to Flowise and vector DBs for small use cases
- A visual of the folder structure
- A visual of the agent pipeline
- A CTA to get access or learn more

Tone: Technical but accessible. This is for developers who
are tired of overengineered AI tooling. Speak to them directly.
Do not use generic AI marketing language.

### Page 2 — /chat (Priority: Second)
A full chat UI similar to Claude.ai or ChatGPT. The user
opens it and talks to the QVL AI assistant powered by the
Leader Brain on the VPS.

Requirements:
- Clean message thread UI (user left, AI right or standard)
- Streaming responses
- The AI knows it is the QVL assistant
- It knows about the Leader Brain, AXON, QVL products
- It can answer questions, help users understand the platform,
  and eventually take actions via the AXON API
- Connect to the VPS brain via API route in Next.js
- Use the existing chat UI design the owner has already built

### Page 3 — / (Landing, extend existing)
The owner has a basic landing page. Extend it to reference
the Leader Brain and AXON as the intelligence layer powering
QVL operations. Keep it clean. Add a section that explains
QVL is not just a tool vendor — it is an AI-operated company.

## The VPS Brain Connection
The Leader Brain runs on a VPS. The Next.js app connects
to it via REST API. Build the connection layer as follows:
```ts
// lib/brain.ts
const BRAIN_API = process.env.BRAIN_API_URL
const BRAIN_KEY = process.env.BRAIN_API_KEY

export async function sendDream(dream: {
  type: string
  content: string
  priority?: string
  tags?: string[]
}) {
  const res = await fetch(`${BRAIN_API}/dreams`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${BRAIN_KEY}`
    },
    body: JSON.stringify(dream)
  })
  return res.json()
}

export async function getBrainState() {
  const res = await fetch(`${BRAIN_API}/state`, {
    headers: { 'Authorization': `Bearer ${BRAIN_KEY}` }
  })
  return res.json()
}
```

Add BRAIN_API_URL and BRAIN_API_KEY to .env.local

## The AXON Internal Operations Layer
The AXON network is not just a product QVL sells.
It runs QVL itself. The agents inside the company brain
are responsible for:

- Writing and updating pricing strategy
- Generating and maintaining documentation
- Planning marketing campaigns
- Reviewing and improving the website copy
- Managing the product roadmap

The owner supplies the resources (compute, inference, budget).
The agents do the operational thinking. This is the core
philosophy of the company — eat your own cooking.

Build an internal /admin dashboard (auth protected via
Stack Auth) where the owner can:
- Drop a dream into the company brain inbox
- Watch the agent loop process it in real time
- See the final output land in final_outputs/
- Read the routing log and pattern library

## Tech Stack
- Next.js 14 App Router
- TypeScript + TSX
- Tailwind CSS
- Stack Auth (already configured)
- Neon + Drizzle (already configured)
- Vultr Serverless Inference (model calls)
- VPS for Leader Brain runtime

## Auth Rules
- / , /learn, /chat — public
- /admin — Stack Auth protected, owner only
- /pricing — public

## Design Direction
The owner already has a design system and existing pages.
Match the existing aesthetic. Do not introduce a new design
language. Ask to see the existing components before building
new ones.

## Rules for Claude Code
- Read this brief completely before writing a single line
- Ask for the existing design components before building UI
- Do not add dependencies that are not in this brief
- Do not build a database schema without confirming with owner
- The Leader Brain connection is via API not direct file access
- Keep components small and composable
- Every page must work on mobile
- Streaming is required on the /chat page — not optional
- The /learn page is the most important deliverable

## First Message Back to Owner Should Be:
1. Confirm you have read and understood this brief
2. Ask to see the existing landing page components
3. Ask to see the existing chat UI design
4. Confirm the VPS is running and the Brain API URL is ready
5. Then start with /learn

## Final Note
This developer built the Leader Brain from scratch.
He understands agents, file-native architecture, and
prompt engineering at a deep level. Do not explain
basics to him. Treat him as the architect and yourself
as the builder executing his vision.

The goal is to have the core pages live within hours.
Move fast. Stay clean. Build real.