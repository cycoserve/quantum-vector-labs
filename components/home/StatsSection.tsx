"use client";

import {
  Globe2,
  Cpu,
  Zap,
  Shield,
  Users,
  Building2
} from "lucide-react";

const stats = [
  {
    icon: Globe2,
    value: "6",
    label: "Continents",
    description: "Global edge network deployment",
  },
  {
    icon: Cpu,
    value: "99.9%",
    label: "Uptime SLA",
    description: "Enterprise-grade reliability",
  },
  {
    icon: Zap,
    value: "<10ms",
    label: "Latency",
    description: "Edge inference speed",
  },
  {
    icon: Shield,
    value: "100%",
    label: "Private",
    description: "Data never leaves your control",
  },
  // {
  //   icon: Users,
  //   value: "10K+",
  //   label: "Active Users",
  //   description: "Developers building on QVL",
  // },
  // {
  //   icon: Building2,
  //   value: "500+",
  //   label: "Enterprises",
  //   description: "Trust Quantum Vector Labs",
  // },
];

export default function StatsSection() {
  return (
    <section className="py-24 px-6 border-y border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className=" font-bold tracking-tighter">
            <span className="text-2xl md:text-4xl">
              QVL is built for
            </span> <br />
            <span className="text-gradient text-3xl md:text-6xl ">Enterprise Scale</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Trusted by leading enterprises worldwide to power their AI infrastructure
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="glass-panel rounded-2xl p-6 text-center hover:border-primary/30 transition-all duration-300 group card-ring-hover"
            >
              {/* Icon */}
              <div className="mx-auto size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:bg-primary/20 transition-colors">
                <stat.icon className="w-5 h-5" />
              </div>

              {/* Value */}
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                {stat.value}
              </div>

              {/* Label */}
              <div className="text-sm font-bold text-primary uppercase tracking-wider mb-2">
                {stat.label}
              </div>

              {/* Description */}
              <p className="text-xs text-slate-500">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
