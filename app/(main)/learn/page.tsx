"use client";

import Link from "next/link";

const coreConceptsData = [
  {
    term: "Brain",
    definition:
      "The knowledge base. A directory of markdown files that give your AI agents persistent memory, context, and personality across every session.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-primary" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714a2.25 2.25 0 001.591 2.25m-.659-8.964c.251.023.501.05.75.082M15 3.104v5.714a2.25 2.25 0 00.659 1.591L20 14.5M9.75 3.104A24.301 24.301 0 0012 3c.766 0 1.24.036 1.558.065" />
      </svg>
    ),
  },
  {
    term: "Dreams",
    definition:
      "Tasks and goals submitted to the AXON system. Each dream is a structured markdown file describing what needs to be done, why, and what success looks like.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-primary" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ),
  },
  {
    term: "Pulse",
    definition:
      "The agent heartbeat loop. AXON agents check the dream queue on each pulse, claim uncompleted tasks, execute them, and emit results — no manual triggering required.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-primary" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
  },
  {
    term: "Colonies",
    definition:
      "Agent clusters scoped to a domain. A Colony is a set of agents (Planner, Executor, Critic, Memory) configured to handle a specific problem space — e.g., a security audit colony or a content pipeline colony.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-primary" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
  },
  {
    term: "Spawn",
    definition:
      "Dynamic agent creation at runtime. When a task exceeds a single agent's scope, AXON spawns sub-agents on demand, delegates subtasks, and reaps them when done.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-primary" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

const whyFilesData = [
  {
    title: "No vendor lock-in",
    body: "Your intelligence lives in plain `.md` files. Swap LLMs, change infrastructure, migrate platforms — your knowledge goes with you.",
  },
  {
    title: "Version-controllable",
    body: "Git diff your agent's memory. PR your persona updates. Roll back bad instructions. Intelligence as code, not as a service.",
  },
  {
    title: "Human-readable",
    body: "Every file in your Brain is readable without a dashboard, an API call, or a login. Your team can audit, edit, and extend it directly.",
  },
  {
    title: "Works with any LLM",
    body: "OpenAI, Anthropic, Mistral, local Ollama — the Brain doesn't care. Files are files. Just inject the context, run the prompt.",
  },
  {
    title: "Zero runtime overhead",
    body: "No embeddings server, no chunking pipeline, no vector index maintenance. Read the files, inject them, done. It's just I/O.",
  },
];

const comparisonData = [
  {
    feature: "Setup time",
    qvl: "Minutes",
    flowise: "Hours (Docker + DB + config)",
    vectorDb: "Hours (index + embeddings pipeline)",
  },
  {
    feature: "Infrastructure",
    qvl: "None — just files",
    flowise: "Docker, Node, a DB",
    vectorDb: "Pinecone / Weaviate / Qdrant server",
  },
  {
    feature: "Knowledge format",
    qvl: "Markdown (human-readable)",
    flowise: "Nodes & edges (visual graph)",
    vectorDb: "Embeddings (binary blobs)",
  },
  {
    feature: "Version control",
    qvl: "Git-native",
    flowise: "JSON export (fragile)",
    vectorDb: "Not applicable",
  },
  {
    feature: "LLM portability",
    qvl: "Any LLM",
    flowise: "Tied to configured nodes",
    vectorDb: "Embedding model dependent",
  },
  {
    feature: "Team onboarding",
    qvl: "Open the folder",
    flowise: "Learn the UI + deploy stack",
    vectorDb: "Learn the SDK + manage indexes",
  },
];

const pipelineSteps = [
  { label: "Dream", sublabel: "Task submitted", color: "from-primary/20 to-primary/5" },
  { label: "Planner", sublabel: "Breaks into steps", color: "from-violet-500/20 to-violet-500/5" },
  { label: "Executor", sublabel: "Runs each step", color: "from-blue-500/20 to-blue-500/5" },
  { label: "Critic", sublabel: "Validates output", color: "from-amber-500/20 to-amber-500/5" },
  { label: "Memory", sublabel: "Stores results", color: "from-emerald-500/20 to-emerald-500/5" },
  { label: "Output", sublabel: "Returns result", color: "from-primary/20 to-primary/5" },
];

export default function LearnPage() {
  return (
    <main className="min-h-screen pt-32 pb-24">
      <div className="max-w-5xl mx-auto px-6">

        {/* ── Page Header ── */}
        <div className="mb-20">
          <div className="inline-flex items-center gap-2 glass-panel card-ring rounded-full px-4 py-1.5 mb-6 text-xs font-mono text-primary tracking-widest uppercase">
            <span className="size-1.5 rounded-full bg-primary animate-pulse inline-block" />
            Documentation
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
            How <span className="text-gradient">Leader Brain</span>
            <br />& AXON Work
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl leading-relaxed">
            No marketing. No magic. Just a precise explanation of what these systems are, why they exist, and how to use them.
          </p>
        </div>

        {/* ── Leader Brain ── */}
        <section className="mb-24">
          <SectionLabel label="01" title="Leader Brain" />
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="glass-panel card-ring rounded-2xl p-8">
              <h3 className="text-xl font-bold text-white mb-4">What it is</h3>
              <p className="text-slate-400 leading-relaxed">
                Leader Brain is a <span className="text-white font-medium">file-native AI intelligence layer</span>. Instead of storing agent knowledge in a vector database or embedding index, it lives in structured markdown files that any LLM can read at inference time.
              </p>
              <p className="text-slate-400 leading-relaxed mt-4">
                Think of it as &quot;system prompt as a knowledge base&quot; — but organised, versioned, and composable. Every piece of context the agent needs is a file in the <code className="text-primary text-sm bg-primary/10 px-1.5 py-0.5 rounded">leader-brain/</code> directory.
              </p>
            </div>
            <div className="glass-panel card-ring rounded-2xl p-8">
              <h3 className="text-xl font-bold text-white mb-4">How it&apos;s organised</h3>
              <ul className="space-y-3">
                {[
                  ["persona", "Who the agent is — tone, voice, boundaries"],
                  ["philosophy", "How it makes decisions — principles and tradeoffs"],
                  ["dreams", "Tasks and goals in the queue"],
                  ["patterns", "Reusable solutions (architecture, security, performance)"],
                  ["mistakes", "Past failures the agent should not repeat"],
                  ["knowledge/projects", "Per-project context files"],
                ].map(([key, desc]) => (
                  <li key={key} className="flex items-start gap-3">
                    <span className="font-mono text-xs text-primary bg-primary/10 px-2 py-1 rounded mt-0.5 shrink-0">{key}</span>
                    <span className="text-slate-400 text-sm leading-relaxed">{desc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Folder Structure */}
          <div className="mt-6 glass-panel card-ring rounded-2xl p-6 overflow-x-auto">
            <div className="flex items-center gap-2 mb-4">
              <span className="size-2.5 rounded-full bg-red-500/70" />
              <span className="size-2.5 rounded-full bg-amber-500/70" />
              <span className="size-2.5 rounded-full bg-emerald-500/70" />
              <span className="ml-2 text-xs text-slate-500 font-mono">leader-brain/ — folder structure</span>
            </div>
            <pre className="text-sm text-slate-300 font-mono leading-relaxed whitespace-pre">
{`leader-brain/
├── brain.json                        ← agent config + state
├── master/
│   ├── leader-brain-persona.md       ← identity & voice
│   ├── leader-brain-philosophy.md    ← decision principles
│   └── entry-template.md            ← how to write new entries
├── dreams/
│   └── dream_*.md                   ← tasks in the queue
├── patterns/
│   ├── architecture/
│   ├── performance/
│   └── security/
├── knowledge/
│   └── projects/                    ← per-project context
└── mistakes/                        ← anti-patterns to avoid`}
            </pre>
          </div>
        </section>

        {/* ── AXON ── */}
        <section className="mb-24">
          <SectionLabel label="02" title="AXON" />
          <div className="mt-8 glass-panel card-ring rounded-2xl p-8 mb-6">
            <div className="flex items-start gap-4 mb-6">
              <div className="size-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-primary" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Autonomous eXecution and Orchestration Network</h3>
                <p className="text-slate-400 leading-relaxed">
                  AXON is the multi-agent execution layer that sits on top of Leader Brain. Where the Brain stores <em>what to know</em>, AXON handles <em>what to do</em> — orchestrating specialised agents that collaborate to complete complex tasks autonomously.
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  role: "Planner",
                  desc: "Receives a Dream, reads the Brain, decomposes the goal into ordered subtasks. Produces an execution plan.",
                  color: "violet",
                },
                {
                  role: "Executor",
                  desc: "Takes each subtask from the Planner, calls tools, writes files, hits APIs, runs code. Produces a result per step.",
                  color: "blue",
                },
                {
                  role: "Critic",
                  desc: "Reviews the Executor's output against the original goal. Flags failures, hallucinations, and incomplete steps. Can trigger retries.",
                  color: "amber",
                },
                {
                  role: "Memory",
                  desc: "Stores the outcome in the Brain — patterns learned, mistakes made, project context updated. Feeds the next cycle.",
                  color: "emerald",
                },
              ].map(({ role, desc, color }) => (
                <div key={role} className={`glass-panel rounded-xl p-5 border border-${color}-500/20`}>
                  <div className={`text-xs font-mono text-${color}-400 mb-2 uppercase tracking-widest`}>{role} Agent</div>
                  <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Pipeline Diagram */}
          <div className="glass-panel card-ring rounded-2xl p-6">
            <p className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-6">Agent Pipeline</p>
            <div className="flex items-center gap-1 overflow-x-auto pb-2">
              {pipelineSteps.map((step, i) => (
                <div key={step.label} className="flex items-center gap-1 shrink-0">
                  <div className={`bg-gradient-to-b ${step.color} border border-white/10 rounded-xl px-4 py-3 text-center min-w-[80px]`}>
                    <div className="text-sm font-bold text-white">{step.label}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5 whitespace-nowrap">{step.sublabel}</div>
                  </div>
                  {i < pipelineSteps.length - 1 && (
                    <svg viewBox="0 0 16 16" className="w-4 h-4 text-primary/40 shrink-0" fill="currentColor">
                      <path d="M6.47 4.29l3.54 3.53a.25.25 0 010 .36L6.47 11.7a.75.75 0 001.06 1.06l3.54-3.53a1.75 1.75 0 000-2.47L7.53 3.23a.75.75 0 00-1.06 1.06z" />
                    </svg>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Core Concepts ── */}
        <section className="mb-24">
          <SectionLabel label="03" title="Core Concepts" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
            {coreConceptsData.map((concept) => (
              <div key={concept.term} className="glass-panel card-ring-hover rounded-2xl p-6 flex flex-col gap-3">
                <div className="size-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  {concept.icon}
                </div>
                <div>
                  <h3 className="text-base font-bold text-white mb-1">{concept.term}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{concept.definition}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Files over Frameworks ── */}
        <section className="mb-24">
          <SectionLabel label="04" title="Files Over Frameworks" />
          <p className="text-slate-400 mt-4 mb-8 max-w-2xl leading-relaxed">
            Every major AI framework eventually asks you to trust its runtime, its database, or its cloud. Leader Brain doesn&apos;t. Here&apos;s why files are the right primitive for agent knowledge:
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {whyFilesData.map((item) => (
              <div key={item.title} className="glass-panel card-ring-hover rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-primary shrink-0" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  <h3 className="text-sm font-bold text-white">{item.title}</h3>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Comparison ── */}
        <section className="mb-24">
          <SectionLabel label="05" title="How It Compares" />
          <p className="text-slate-400 mt-4 mb-8 max-w-2xl leading-relaxed">
            Flowise and vector databases are powerful tools — but they&apos;re the wrong tool for small teams who need persistent agent intelligence without the ops overhead.
          </p>
          <div className="glass-panel card-ring rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="text-left px-6 py-4 text-slate-500 font-medium w-[180px]">Feature</th>
                    <th className="text-left px-6 py-4 font-bold text-primary">QVL Leader Brain</th>
                    <th className="text-left px-6 py-4 text-slate-400 font-medium">Flowise</th>
                    <th className="text-left px-6 py-4 text-slate-400 font-medium">Vector DB</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, i) => (
                    <tr key={row.feature} className={i < comparisonData.length - 1 ? "border-b border-white/5" : ""}>
                      <td className="px-6 py-4 text-slate-500 font-medium">{row.feature}</td>
                      <td className="px-6 py-4 text-white font-medium">{row.qvl}</td>
                      <td className="px-6 py-4 text-slate-400">{row.flowise}</td>
                      <td className="px-6 py-4 text-slate-400">{row.vectorDb}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── CTAs ── */}
        <section className="glass-panel card-ring rounded-3xl p-10 md:p-14 text-center relative overflow-hidden">
          {/* Glow orb */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              background:
                "radial-gradient(ellipse 60% 40% at 50% 100%, rgba(32,211,238,0.5) 0%, transparent 70%)",
            }}
          />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 glass-panel card-ring rounded-full px-4 py-1.5 mb-6 text-xs font-mono text-primary tracking-widest uppercase">
              <span className="size-1.5 rounded-full bg-primary animate-pulse inline-block" />
              Now in early access
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              Ready to give your<br />
              <span className="text-gradient">agents a brain?</span>
            </h2>
            <p className="text-slate-400 mb-10 max-w-xl mx-auto leading-relaxed">
              Start with a file. Add structure. Let AXON handle the rest.
              No infra to provision, no dashboards to learn.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/auth"
                className="bg-primary text-black font-bold px-8 py-4 rounded-full hover:scale-105 transition-transform vector-glow text-sm"
              >
                Get Early Access
              </Link>
              <a
                href="https://docs.quantumvectorlabs.com"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-panel card-ring text-white font-bold px-8 py-4 rounded-full hover:border-primary/40 transition-colors text-sm"
              >
                Read the Docs →
              </a>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}

function SectionLabel({ label, title }: { label: string; title: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="text-xs font-mono text-primary/60 tracking-widest">/{label}</span>
      <div className="h-px flex-1 bg-white/5" />
      <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">{title}</h2>
    </div>
  );
}
