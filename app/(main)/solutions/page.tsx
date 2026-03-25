"use client";

import Link from "next/link";
import { 
  Music, 
  Scale, 
  Building2, 
  ShoppingBag, 
  ArrowRight, 
  Bot, 
  Zap, 
  ShieldCheck, 
  Users,
  Sparkles,
  ChevronRight
} from "lucide-react";

const solutions = [
  {
    id: "record-label",
    title: "Record Label",
    description: "Automate A&R scouting, distribution pipelines, and fan engagement loops. Your agents manage the release calendar while you focus on the music.",
    icon: Music,
    color: "from-purple-500/20 to-primary/20",
    agents: ["Scout Agent", "Distribution Manager", "Fan Engagement Bot"],
    features: [
      "Automated demo sorting and sentiment analysis",
      "Multi-platform distribution scheduling",
      "Social media response automation"
    ]
  },
  {
    id: "law-firm",
    title: "Law Firm",
    description: "Accelerate discovery, contract review, and case research. AXON clusters ingest case files and provide structured briefs with citation mapping.",
    icon: Scale,
    color: "from-blue-500/20 to-primary/20",
    agents: ["Research Paralegal", "Contract Reviewer", "Discovery Bot"],
    features: [
      "Citation-mapped legal research",
      "Clause-level contract risk analysis",
      "Automated discovery document sorting"
    ]
  },
  {
    id: "real-estate",
    title: "Real Estate Agency",
    description: "Manage listings, lead qualification, and document workflows 24/7. Your agents handle the initial outreach so you only step in for the closing.",
    icon: Building2,
    color: "from-emerald-500/20 to-primary/20",
    agents: ["Lead Qualifier", "Listing Manager", "Closing Assistant"],
    features: [
      "Instant lead response & qualification",
      "Automated property description generation",
      "Transaction document tracking"
    ]
  },
  {
    id: "ecommerce",
    title: "E-commerce Brand",
    description: "Personalize shopping experiences, manage inventory alerts, and automate customer support. High-scale operations with zero additional headcount.",
    icon: ShoppingBag,
    color: "from-orange-500/20 to-primary/20",
    agents: ["Personal Shopper", "Inventory Sentinel", "Support Agent"],
    features: [
      "Individualized product recommendations",
      "Supply chain anomaly detection",
      "Multi-channel support automation"
    ]
  }
];

const industries = [
  "Marketing Agency", "Podcast Studio", "Restaurant Group", 
  "Talent Agency", "News Room", "Startup Studio", "Medical Practice"
];

export default function SolutionsPage() {
  return (
    <div className="pt-24 pb-20">
      {/* Hero Section */}
      <section className="px-6 mb-20 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-bold tracking-widest uppercase">
            <Sparkles className="w-4 h-4" />
            Industry Solutions
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight text-slate-900 dark:text-white">
            Pre-built Agent Clusters for <br />
            <span className="text-gradient">Every Industry</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Every business runs on decisions, communication, and execution. 
            AXON agent clusters handle all three — no UI, no babysitting, 
            no generic AI responses.
          </p>
          <div className="pt-4">
            <Link 
              href="/auth" 
              className="px-8 py-4 bg-primary text-black font-bold rounded-xl vector-glow hover:brightness-110 transition-all inline-flex items-center gap-2 card-ring-hover"
            >
              Get Started Free <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Main Solutions Grid */}
      <section className="px-6 mb-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {solutions.map((solution) => (
              <div 
                key={solution.id}
                className="group relative glass-panel rounded-3xl overflow-hidden border border-slate-200 dark:border-white/5 card-ring-hover hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${solution.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <div className="relative p-8 md:p-10 space-y-6">
                  <div className="flex items-start justify-between">
                    <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:scale-110 transition-transform duration-300">
                      <solution.icon className="w-7 h-7 text-primary" />
                    </div>
                    <span className="text-[10px] font-bold text-primary bg-primary/5 border border-primary/20 px-3 py-1.5 rounded-full tracking-widest uppercase">
                      Cluster Ready
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                      {solution.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      {solution.description}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <p className="text-xs font-bold tracking-widest uppercase text-slate-400 dark:text-slate-500">
                      Standard Agents
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {solution.agents.map((agent) => (
                        <span 
                          key={agent} 
                          className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2"
                        >
                          <Bot className="w-3 h-3 text-primary" />
                          {agent}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="h-px bg-slate-200 dark:bg-white/10 w-full" />

                  <ul className="space-y-3">
                    {solution.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                        <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <button className="w-full py-4 rounded-xl border border-primary/20 bg-primary/5 text-primary font-bold text-sm hover:bg-primary hover:text-black transition-all duration-300 flex items-center justify-center gap-2 group/btn">
                    Deploy {solution.title} Cluster <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* More Industries */}
      <section className="px-6 mb-32 py-20 bg-slate-100/50 dark:bg-white/5">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">More Industries Coming Soon</h2>
            <p className="text-slate-600 dark:text-slate-400">Don&apos;t see yours? Request a custom agent cluster designed for your specific needs.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {industries.map((industry) => (
              <span 
                key={industry}
                className="px-5 py-2 rounded-full border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-950 text-sm font-medium text-slate-500 dark:text-slate-400"
              >
                {industry}
              </span>
            ))}
          </div>

          <div className="pt-6">
            <button className="px-10 py-4 bg-primary text-black font-bold rounded-xl vector-glow hover:brightness-110 hover:scale-105 transition-all card-ring-hover flex items-center justify-center gap-2 mx-auto">
              Request Custom Cluster <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Feature Highlight */}
      <section className="px-6 mb-20">
        <div className="max-w-7xl mx-auto glass-panel rounded-[3rem] p-10 md:p-16 border border-primary/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
            <div className="space-y-8">
              <div className="size-16 rounded-3xl bg-primary/20 flex items-center justify-center">
                <Zap className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-slate-900 dark:text-white leading-tight">
                Agents That Think In <br />
                <span className="text-primary text-gradient">Your Context</span>
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Pick your cluster. Deploy in minutes. Your agents are ready. 
                Each solution is a pre-built team of specialized agents configured 
                for your industry. They think in your context, work in your workflow, 
                and get smarter every time they run.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                    <Users className="w-4 h-4 text-primary" />
                    Specialized
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-500">Industry-specific knowledge bases.</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                    <ShieldCheck className="w-4 h-4 text-primary" />
                    Verified
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-500">Pre-tested agent collaboration paths.</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="glass-panel-primary rounded-3xl p-8 border-primary/30 vector-glow card-ring">
                <div className="flex items-center gap-4 mb-6">
                  <div className="size-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">AXON Cluster Instance</h4>
                    <p className="text-xs text-slate-500 tracking-widest uppercase">Initializing Solution...</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-4 bg-slate-200 dark:bg-white/5 rounded-full w-full animate-pulse" style={{ animationDelay: `${i * 200}ms` }} />
                  ))}
                  <div className="h-4 bg-primary/20 rounded-full w-2/3 animate-pulse" style={{ animationDelay: '800ms' }} />
                </div>

                <div className="mt-8 pt-6 border-t border-slate-200 dark:border-white/10 flex justify-between items-center">
                  <span className="text-xs font-mono text-primary">STATUS: CONNECTED</span>
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="size-8 rounded-full border-2 border-white dark:border-slate-950 bg-slate-200 dark:bg-slate-800" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
