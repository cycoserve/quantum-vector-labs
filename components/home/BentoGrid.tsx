"use client";

import {
  Brain,
  Lock,
  Zap,
  Globe,
  ArrowRight,
  Network,
  Cpu,
} from "lucide-react";

export default function BentoGrid() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div className="space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">
            Core Architectures
          </h2>
          <p className="text-slate-400 max-w-md">
            Deploy mission-critical AI with precision tools designed for the
            neural edge.
          </p>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-3 glass-panel px-6 py-3 rounded-xl border-white/5">
          <div className="text-right">
            <div className="text-xs text-slate-500 uppercase tracking-tighter">
              Throughput
            </div>
            <div className="text-sm font-bold text-primary">1.2M Vects/sec</div>
          </div>
          <div className="w-px h-8 bg-white/10"></div>
          <div className="text-right">
            <div className="text-xs text-slate-500 uppercase tracking-tighter">
              Latency
            </div>
            <div className="text-sm font-bold text-primary">0.42ms</div>
          </div>
        </div>
      </div>

      {/* Bento Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* RAG: Neural Context Engine (Large Card) */}
        <div className="md:col-span-8 group bento-card glass-panel rounded-3xl p-8 relative overflow-hidden h-[400px]">
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="space-y-2">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 mb-6">
                <Brain className="w-6 h-6" />
              </div>
              <h3 className="text-3xl font-bold tracking-tight">
                Neural Context Engines (RAG)
              </h3>
              <p className="text-slate-400 max-w-sm">
                Dynamic retrieval-augmented generation that understands intent,
                not just keywords. Engineered for zero-hallucination enterprise
                environments.
              </p>
            </div>
            <div className="flex gap-4">
              <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] uppercase font-bold text-slate-400">
                Semantic Search
              </span>
              <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] uppercase font-bold text-slate-400">
                Cross-Encoding
              </span>
            </div>
          </div>
          <div className="absolute right-0 bottom-0 top-0 w-1/2 opacity-20 group-hover:opacity-40 transition-opacity pointer-events-none">
            <div className="w-full h-full bg-gradient-to-l from-primary/20 to-transparent"></div>
          </div>
        </div>

        {/* Small Card: Encrypted Mesh */}
        <div className="md:col-span-4 bento-card glass-panel rounded-3xl p-8 flex flex-col justify-between">
          <div className="size-10 rounded-lg bg-slate-800 flex items-center justify-center text-primary mb-4">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xl font-bold mb-2">Encrypted Mesh</h4>
            <p className="text-sm text-slate-400">
              Military-grade security for neural weights and proprietary data
              vectors.
            </p>
          </div>
        </div>

        {/* Small Card: Ultra-Low Latency */}
        <div className="md:col-span-4 bento-card glass-panel rounded-3xl p-8 flex flex-col justify-between h-[300px]">
          <div className="size-10 rounded-lg bg-slate-800 flex items-center justify-center text-primary mb-4">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xl font-bold mb-2">Edge Optimization</h4>
            <p className="text-sm text-slate-400">
              Sub-millisecond inference for real-time mission-critical
              applications.
            </p>
          </div>
        </div>

        {/* Geospatial: Planetary Intelligence (Medium Card) */}
        <div className="md:col-span-8 bento-card glass-panel rounded-3xl p-0 relative overflow-hidden flex flex-col md:flex-row h-[300px]">
          <div className="flex-1 p-8 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold tracking-tight mb-2">
                Planetary Intelligence
              </h3>
              <p className="text-sm text-slate-400">
                Geospatial vector analysis for global logistics and environmental
                monitoring.
              </p>
            </div>
            <button className="text-xs font-bold text-primary flex items-center gap-1 group">
              VIEW MODULE{" "}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          <div className="flex-1 bg-slate-900/50 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-space-blue to-transparent"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Globe className="w-24 h-24 text-primary/20" />
            </div>
          </div>
        </div>

        {/* Agentic Systems (Full Width) */}
        <div className="md:col-span-12 bento-card glass-panel rounded-3xl p-8 relative overflow-hidden group">
          <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
            <div className="flex-1 space-y-6">
              <h3 className="text-4xl font-bold tracking-tighter">
                Autonomous Agentic Swarms
              </h3>
              <p className="text-slate-400">
                Orchestrate thousands of specialized AI agents working in concert
                to solve complex, multi-step organizational challenges without
                human intervention.
              </p>
              <div className="flex flex-wrap gap-8">
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-white">99.9%</span>
                  <span className="text-[10px] uppercase text-slate-500 tracking-widest">
                    Self-Healing
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-white">40k+</span>
                  <span className="text-[10px] uppercase text-slate-500 tracking-widest">
                    Concurrent Nodes
                  </span>
                </div>
              </div>
            </div>
            <div className="flex-1 grid grid-cols-2 gap-4 w-full">
              <div className="h-32 rounded-2xl border border-primary/20 bg-primary/5 p-4 flex flex-col justify-between">
                <Network className="text-primary w-6 h-6" />
                <span className="text-xs font-medium">Orchestrator V3</span>
              </div>
              <div className="h-32 rounded-2xl border border-white/5 bg-white/5 p-4 flex flex-col justify-between">
                <Cpu className="text-white/40 w-6 h-6" />
                <span className="text-xs font-medium text-slate-400">
                  Logic Core
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
