"use client";

import Link from "next/link";
import {
  Bot,
  ArrowRight,
  DollarSign,
  FileText,
  Megaphone,
  Map,
  Zap,
  CheckCircle2,
} from "lucide-react";

const operatedBy = [
  {
    icon: DollarSign,
    label: "Pricing Strategy",
    description: "Dynamic pricing decisions driven by AXON market analysis",
  },
  {
    icon: FileText,
    label: "Documentation",
    description: "Auto-generated, always-current technical docs",
  },
  {
    icon: Megaphone,
    label: "Marketing",
    description: "Campaign ideation, copy, and distribution via agent pipelines",
  },
  {
    icon: Map,
    label: "Roadmap Planning",
    description: "Feature prioritization informed by Leader Brain pattern memory",
  },
];

export default function AxonSection() {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section label */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-bold tracking-widest uppercase">
            <Bot className="w-4 h-4" />
            AI-Operated Company
          </div>
        </div>

        {/* Headline */}
        <div className="text-center mb-6">
          <h2 className=" font-bold tracking-tighter leading-tight">
            <span className="text-xl md:text-3xl">We Don&apos;t Just Build Systems.{" "}</span> < br/>
            <span className="text-gradient text-4xl md:text-6xl">We Run On Them!</span>
          </h2>
        </div>

        {/* Subheading */}
        <p className="text-center text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto mb-16">
          CycoServe Labs is not a typical tool vendor. AXON and Leader Brain
          power our own operations — from pricing strategy to product roadmap.
          We ship from the inside out.
        </p>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: Description card */}
          <div className="glass-panel rounded-3xl p-8 md:p-10 card-ring space-y-6">
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Eating Our Own Cooking</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">Internal AI Operations</p>
              </div>
            </div>

            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              Every company we sell to is skeptical — and rightfully so. That&apos;s
              why we built the system on ourselves first. The same AXON agent
              network and Leader Brain framework that power our client pipelines
              are the exact tools managing Cy operations today.
            </p>

            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              This creates a live feedback loop: when we improve our agent
              architecture, our own operations improve immediately. Real stakes,
              real data, real accountability.
            </p>

            <ul className="space-y-3 pt-2">
              {[
                "Proven in production on Cy's own infrastructure",
                "Continuous self-improvement loop between system and operator",
                "No demo-ware — what clients get is what we use",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-slate-700 dark:text-slate-300 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Ops grid */}
          <div className="space-y-4">
            <p className="text-xs font-bold tracking-widest uppercase text-slate-500 dark:text-slate-500 mb-2">
              What AXON &amp; Leader Brain Handle at CycoServe
            </p>
            {operatedBy.map(({ icon: Icon, label, description }) => (
              <div
                key={label}
                className="glass-panel rounded-2xl p-5 card-ring-hover flex items-start gap-4 group cursor-default"
              >
                <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white">{label}</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{description}</p>
                </div>
              </div>
            ))}

            {/* CTA */}
            <div className="pt-4">
              <Link
                href="/learn"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-black font-bold rounded-xl vector-glow hover:brightness-110 transition-all card-ring-hover"
              >
                Learn How AXON Works <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
