"use client";

import { ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto glass-panel rounded-[2rem] p-12 text-center relative overflow-hidden border-primary/30 vector-glow">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent"></div>

        {/* Content */}
        <div className="relative z-10 space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">
            Ready to redefine your <br />
            <span className="text-primary">neural horizon?</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Join the leading enterprise firms building the next generation of
            autonomous operations on Quantum Vector Labs.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="px-10 py-4 bg-white text-black font-bold rounded-xl hover:bg-primary transition-colors flex items-center gap-2">
              Request Alpha Access <ArrowRight className="w-5 h-5" />
            </button>
            <button className="px-10 py-4 glass-panel border border-white/20 font-bold rounded-xl hover:bg-white/5">
              Schedule Briefing
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
