"use client";

import { 
  Brain, 
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export default function RAGSection() {
  return (
    <section className="py-24 px-6 bg-slate-50/80 dark:bg-space-blue/30">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-bold tracking-widest uppercase">
              <Brain className="w-4 h-4" />
              Leader Brain
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-slate-900 dark:text-white">
              Build Custom AI Without <span className="text-primary">Training Models</span>
            </h2>
            
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              The Leader Brain is a file-native intelligence layer — JSON and Markdown.
              No framework lock-in, no black box. Drop it on any VPS and connect it to
              your app in minutes. Your AI knows your history, your patterns, your rules.
            </p>

            <ul className="space-y-4">
              {[
                "File-native: JSON + Markdown — readable by humans and LLMs",
                "Deploy on any VPS — fully self-hosted, zero vendor lock-in",
                "Agents route tasks through a defined pipeline automatically",
                "Pattern library learns from decisions over time",
                "No model training required — connect, configure, ship",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-slate-700 dark:text-slate-300 text-sm">{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 bg-primary text-black font-bold rounded-xl vector-glow hover:brightness-110 transition-all flex items-center justify-center gap-2 card-ring-hover">
                Start Building <ArrowRight className="w-5 h-5" />
              </button>
              <button className="px-8 py-4 glass-panel border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white font-bold rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 transition-all">
                View Documentation
              </button>
            </div>
          </div>

          {/* Right Visual — Leader Brain Code Example */}
          <div className="relative">
            {/* Main Card */}
            <div className="glass-panel-primary rounded-3xl p-8 border-primary/30 vector-glow relative z-10 card-ring">
              {/* Header */}
              <div className="flex items-center justify-between gap-3 mb-5">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Brain className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">Leader Brain</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">brain.json — Example Structure</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-primary bg-primary/10 border border-primary/20 px-2 py-1 rounded-full tracking-widest uppercase">
                  v1.0.0
                </span>
              </div>

              {/* Code Block */}
              <div className="bg-slate-900 rounded-xl p-4 font-mono text-xs leading-relaxed overflow-x-auto">
                {/* Line 1 */}
                <div className="flex gap-2">
                  <span className="text-slate-600 select-none w-4 shrink-0">1</span>
                  <span className="text-slate-400">{"{"}</span>
                </div>
                {/* meta */}
                <div className="flex gap-2">
                  <span className="text-slate-600 select-none w-4 shrink-0">2</span>
                  <span>
                    <span className="text-blue-400">&quot;meta&quot;</span>
                    <span className="text-slate-400">: {"{"}</span>
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="text-slate-600 select-none w-4 shrink-0">3</span>
                  <span className="pl-4">
                    <span className="text-green-400">&quot;name&quot;</span>
                    <span className="text-slate-400">: </span>
                    <span className="text-yellow-300">&quot;My Project Brain&quot;</span>
                    <span className="text-slate-400">,</span>
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="text-slate-600 select-none w-4 shrink-0">4</span>
                  <span className="pl-4">
                    <span className="text-green-400">&quot;version&quot;</span>
                    <span className="text-slate-400">: </span>
                    <span className="text-yellow-300">&quot;1.0.0&quot;</span>
                    <span className="text-slate-400">,</span>
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="text-slate-600 select-none w-4 shrink-0">5</span>
                  <span className="pl-4">
                    <span className="text-green-400">&quot;status&quot;</span>
                    <span className="text-slate-400">: </span>
                    <span className="text-orange-400">&quot;active&quot;</span>
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="text-slate-600 select-none w-4 shrink-0">6</span>
                  <span className="text-slate-400 pl-0">{"} ,"}</span>
                </div>
                {/* agents */}
                <div className="flex gap-2">
                  <span className="text-slate-600 select-none w-4 shrink-0">7</span>
                  <span>
                    <span className="text-blue-400">&quot;agents&quot;</span>
                    <span className="text-slate-400">: [{"{"}</span>
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="text-slate-600 select-none w-4 shrink-0">8</span>
                  <span className="pl-4">
                    <span className="text-green-400">&quot;name&quot;</span>
                    <span className="text-slate-400">: </span>
                    <span className="text-yellow-300">&quot;Qualifier&quot;</span>
                    <span className="text-slate-400">,</span>
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="text-slate-600 select-none w-4 shrink-0">9</span>
                  <span className="pl-4">
                    <span className="text-green-400">&quot;role&quot;</span>
                    <span className="text-slate-400">: </span>
                    <span className="text-yellow-300">&quot;Idea Evaluator&quot;</span>
                    <span className="text-slate-400">,</span>
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="text-slate-600 select-none w-4 shrink-0">10</span>
                  <span className="pl-4">
                    <span className="text-green-400">&quot;handles&quot;</span>
                    <span className="text-slate-400">: [</span>
                    <span className="text-orange-400">&quot;idea&quot;</span>
                    <span className="text-slate-400">, </span>
                    <span className="text-orange-400">&quot;request&quot;</span>
                    <span className="text-slate-400">]</span>
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="text-slate-600 select-none w-4 shrink-0">11</span>
                  <span className="text-slate-400">{"}],"}</span>
                </div>
                {/* execution_rules */}
                <div className="flex gap-2">
                  <span className="text-slate-600 select-none w-4 shrink-0">12</span>
                  <span>
                    <span className="text-blue-400">&quot;execution_rules&quot;</span>
                    <span className="text-slate-400">: [</span>
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="text-slate-600 select-none w-4 shrink-0">13</span>
                  <span className="pl-4 text-yellow-300">&quot;Validate before build&quot;</span>
                  <span className="text-slate-400">,</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-slate-600 select-none w-4 shrink-0">14</span>
                  <span className="pl-4 text-yellow-300">&quot;All outputs immediately usable&quot;</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-slate-600 select-none w-4 shrink-0">15</span>
                  <span className="text-slate-400">]</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-slate-600 select-none w-4 shrink-0">16</span>
                  <span className="text-slate-400">{"}"}</span>
                </div>
              </div>

              {/* Footer badge */}
              <div className="mt-5 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <span>Drop <span className="font-bold text-primary">brain.json</span> anywhere — your AI knows the context instantly</span>
              </div>
            </div>

            {/* Floating decorations */}
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>

            {/* Floating label */}
            <div className="absolute -bottom-4 -right-4 flex items-center gap-2 px-4 py-2 bg-white dark:bg-space-blue border border-primary/30 rounded-full shadow-lg">
              <Brain className="w-4 h-4 text-primary" />
              <span className="text-xs font-bold text-primary">File-Native · Zero Lock-In</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
