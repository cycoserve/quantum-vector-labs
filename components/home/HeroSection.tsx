"use client";

import { ArrowRight, Sparkles, Cpu, Database, Globe, Bot } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-end justify-center particle-bg px-4 overflow-hidden">
      {/* Animated SVG Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.06]"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="glow-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a855f7" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#a855f7" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0.8" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Animated floating orbs */}
          <circle cx="20" cy="30" r="3" fill="#a855f7" filter="url(#glow)" opacity="0.6">
            <animate attributeName="cy" values="30;70;30" dur="8s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.6;0.3;0.6" dur="4s" repeatCount="indefinite" />
          </circle>
          <circle cx="80" cy="60" r="2" fill="#a855f7" filter="url(#glow)" opacity="0.5">
            <animate attributeName="cy" values="60;20;60" dur="10s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.5;0.2;0.5" dur="5s" repeatCount="indefinite" />
          </circle>
          <circle cx="50" cy="80" r="2.5" fill="#a855f7" filter="url(#glow)" opacity="0.4">
            <animate attributeName="cy" values="80;40;80" dur="12s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.4;0.7;0.4" dur="6s" repeatCount="indefinite" />
          </circle>
          <circle cx="70" cy="25" r="1.5" fill="#a855f7" filter="url(#glow)" opacity="0.6">
            <animate attributeName="cy" values="25;65;25" dur="7s" repeatCount="indefinite" />
          </circle>
          <circle cx="30" cy="55" r="2" fill="#a855f7" filter="url(#glow)" opacity="0.5">
            <animate attributeName="cy" values="55;35;55" dur="9s" repeatCount="indefinite" />
          </circle>

          {/* Animated connecting lines */}
          <line x1="20" y1="30" x2="50" y2="80" stroke="#a855f7" strokeWidth="0.1" opacity="0.3">
            <animate attributeName="opacity" values="0.3;0.5;0.3" dur="4s" repeatCount="indefinite" />
          </line>
          <line x1="50" y1="80" x2="80" y2="60" stroke="#a855f7" strokeWidth="0.1" opacity="0.3">
            <animate attributeName="opacity" values="0.3;0.5;0.3" dur="5s" repeatCount="indefinite" />
          </line>
          <line x1="80" y1="60" x2="70" y2="25" stroke="#a855f7" strokeWidth="0.1" opacity="0.3">
            <animate attributeName="opacity" values="0.3;0.5;0.3" dur="6s" repeatCount="indefinite" />
          </line>
          <line x1="70" y1="25" x2="20" y2="30" stroke="#a855f7" strokeWidth="0.1" opacity="0.3">
            <animate attributeName="opacity" values="0.3;0.5;0.3" dur="7s" repeatCount="indefinite" />
          </line>
          <line x1="30" y1="55" x2="70" y2="25" stroke="#a855f7" strokeWidth="0.1" opacity="0.2">
            <animate attributeName="opacity" values="0.2;0.4;0.2" dur="8s" repeatCount="indefinite" />
          </line>
        </svg>

        {/* Animated radial gradient */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[800px] pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center, rgba(168, 85, 247, 0.15) 0%, rgba(126, 34, 206, 0.08) 30%, transparent 70%)",
            animation: "pulse-glow 8s ease-in-out infinite",
          }}
        />

        {/* Additional animated layers */}
        <div
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
          style={{
            background: "linear-gradient(180deg, transparent 0%, rgba(168, 85, 247, 0.02) 50%, transparent 100%)",
            animation: "wave-move 12s ease-in-out infinite",
          }}
        />

        {/* Floating particles layer */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary/30 rounded-full animate-pulse" />
          <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-purple-500/30 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-1/4 left-1/3 w-2.5 h-2.5 bg-primary/20 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-purple-500/40 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
          <div className="absolute bottom-1/3 right-1/2 w-1.5 h-1.5 bg-primary/25 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }} />
          <div className="absolute top-2/3 left-1/2 w-1 h-1 bg-purple-500/35 rounded-full animate-pulse" style={{ animationDelay: '2.5s' }} />
        </div>

        {/* Scanline effect */}
        <div
          className="absolute inset-0 pointer-events-none opacity-5"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(168, 85, 247, 0.1) 2px, rgba(168, 85, 247, 0.1) 4px)`,
            animation: "scanlines 10s linear infinite",
          }}
        />

        {/* Cyberpunk horizontal scan line */}
        <div
          className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-40 animate-grid-scan"
          style={{
            top: '50%',
            boxShadow: '0 0 20px rgba(168, 85, 247, 0.8), 0 0 40px rgba(168, 85, 247, 0.4)',
          }}
        />

        {/* Cyberpunk vertical scan line */}
        <div
          className="absolute top-0 w-[2px] h-full bg-gradient-to-b from-transparent via-primary to-transparent opacity-30 animate-grid-scan-vertical"
          style={{
            left: '30%',
            boxShadow: '0 0 15px rgba(168, 85, 247, 0.6)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto space-y-4 pt-20 md:pt-0">
        {/* Badge */}
        {/* <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-bold tracking-widest uppercase animate-fade-in">
          <Sparkles className="w-4 h-4" />
          Enterprise-Grade AI Infrastructure
        </div> */}

        {/* Headline */}
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-[1.05] text-slate-900 dark:text-white"><span className="text-2xl md:text-4xl">
          Serve GenAI
        </span>
           <br />
          <span className="text-gradient">At Planetary Scale</span>
        </h1>

        {/* Subtitle */}
        <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto font-light leading-relaxed">
          Build intelligent systems that scale across continents without infrastructure complexity.
        </p>

        {/* Service Tags */}
        <div className="flex flex-wrap justify-center gap-2 py-2">
          <span className="px-4 py-2 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm text-slate-700 dark:text-slate-300 flex items-center gap-2 hover:border-primary/50 transition-colors">
            <Cpu className="w-4 h-4 text-primary" /> Inference
          </span>
          <span className="px-4 py-2 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm text-slate-700 dark:text-slate-300 flex items-center gap-2 hover:border-primary/50 transition-colors">
            <Database className="w-4 h-4 text-primary" /> Vector Database
          </span>
          <span className="px-4 py-2 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm text-slate-700 dark:text-slate-300 flex items-center gap-2 hover:border-primary/50 transition-colors">
            <Globe className="w-4 h-4 text-primary" /> AI Agents
          </span>
          <span className="px-4 py-2 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm text-slate-700 dark:text-slate-300 flex items-center gap-2 hover:border-primary/50 transition-colors">
            <Bot className="w-4 h-4 text-primary" /> Custom Apps
          </span>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <Link href={"/auth"}>
            <button className="w-full sm:w-auto px-8 py-4 bg-primary text-black font-bold rounded-xl vector-glow hover:brightness-110 transition-all flex items-center justify-center gap-2 group">
              Start Deploying <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
          <Link href={"/learn"}>
            <button className="w-full sm:w-auto px-8 py-4 glass-panel border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-bold rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 transition-all card-ring-hover">
              View Documentation
            </button>
          </Link>

        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">

        <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent animate-pulse"></div>
      </div>
    </section>
  );
}
