"use client";

import { 
  Cpu, 
  Database, 
  Globe, 
  AppWindow, 
  ArrowRight,
  CheckCircle2
} from "lucide-react";

const services = [
  {
    icon: Cpu,
    title: "Global Inference",
    description: "Deploy and serve GenAI models across six continents without infrastructure management. Self-optimizing AI that scales automatically with demand.",
    features: ["Serverless deployment", "Real-time auto-scaling", "Global edge network"],
  },
  {
    icon: Database,
    title: "Vector Database",
    description: "Private, secure vector databases for embedding storage. Build RAG applications with your proprietary data without leaking to public AI models.",
    features: ["Secure embedding storage", "Semantic search ready", "Private & encrypted"],
  },
  {
    icon: Globe,
    title: "Multi-Modal Models",
    description: "Access the latest inference-optimized GPUs for text, image, audio, and video processing. OpenAI-compatible API for easy integration.",
    features: ["Latest GPU hardware", "OpenAI-compatible", "Text, Image, Audio, Video"],
  },
  {
    icon: AppWindow,
    title: "Custom GenAI Apps",
    description: "We build custom Generative AI applications for mobile, web, and internal enterprise tools tailored to your specific needs.",
    features: ["Mobile & web apps", "Internal tools", "Custom fine-tuning"],
  },
];

export default function ServicesSection() {
  return (
    <section className="py-24 px-6 bg-space-blue/50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">
            Everything You Need for <span className="text-primary">Enterprise AI</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            From inference to deployment, we provide the complete infrastructure for building 
            intelligent applications that scale globally.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <div 
              key={service.title}
              className="group bento-card glass-panel rounded-3xl p-8 hover:border-primary/50 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shrink-0 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="w-7 h-7" />
                </div>
                
                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-2xl font-bold tracking-tight mb-3">
                    {service.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed mb-4">
                    {service.description}
                  </p>
                  
                  {/* Features */}
                  <ul className="space-y-2 mb-4">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  {/* Learn More */}
                  <button className="text-sm font-bold text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                    Learn more <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
