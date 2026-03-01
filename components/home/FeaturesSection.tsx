"use client";

import { 
  Zap, 
  Globe2, 
  Lock, 
  Server, 
  ArrowRight,
  CheckCircle2
} from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Self-Optimizing",
    description: "Our infrastructure automatically scales resources to match demand while optimizing performance in real-time. No manual intervention required.",
    highlight: "Auto-scaling",
  },
  {
    icon: Globe2,
    title: "Inference at the Edge",
    description: "Deploy across six continents to meet demands at any volume. Low-latency inference wherever your users are located.",
    highlight: "Global Edge Network",
  },
  {
    icon: Lock,
    title: "Private Clusters",
    description: "Deploy on private GPU clusters with self-optimization and scalability while complying with data residency regulations.",
    highlight: "Enterprise Security",
  },
  {
    icon: Server,
    title: "Bring Your Own Model",
    description: "Whether developed on your own infrastructure or another cloud, our platform enables hassle-free global inference.",
    highlight: "Model Agnostic",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
        <div 
          className="w-full h-full"
          style={{
            background: "radial-gradient(circle at 70% 50%, rgba(32, 211, 238, 0.3) 0%, transparent 70%)",
          }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">
              Infrastructure Built for <span className="text-primary">AI at Scale</span>
            </h2>
            <p className="text-slate-400 max-w-lg">
              Enterprise-grade features designed to handle the most demanding AI workloads without operational complexity.
            </p>
          </div>
          
          <button className="text-sm font-bold text-primary flex items-center gap-1 hover:gap-2 transition-all">
            View all features <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature) => (
            <div 
              key={feature.title}
              className="glass-panel rounded-2xl p-6 hover:border-primary/30 transition-all duration-300 group card-ring-hover"
            >
              {/* Icon */}
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-6 h-6" />
              </div>

              {/* Highlight Badge */}
              <span className="inline-block px-2 py-1 rounded-md bg-primary/10 border border-primary/20 text-[10px] font-bold text-primary uppercase tracking-wider mb-3">
                {feature.highlight}
              </span>

              {/* Content */}
              <h3 className="text-xl font-bold mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
