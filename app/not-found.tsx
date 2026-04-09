"use client";

import Link from 'next/link';
import { FileQuestion, ArrowLeft } from 'lucide-react';
import BackgroundLines from '@/components/layout/BackgroundLines';

/**
 * Minimal and compact Not Found (404) page.
 * Adheres to the CycoServe cyberpunk aesthetic with glass panels and theme-aware colors.
 */
export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background text-foreground transition-colors duration-300">
      <BackgroundLines />
      
      <div className="relative z-10 w-full max-w-sm px-6">
        <div className="glass-panel card-ring rounded-3xl p-8 text-center border border-surface-border/30 shadow-2xl">
          <div className="inline-flex items-center justify-center size-14 rounded-2xl bg-primary/10 border border-primary/20 mb-6">
            <FileQuestion className="size-7 text-primary animate-pulse" />
          </div>
          
          <div className="space-y-2 mb-8">
            <h1 className="text-3xl font-black tracking-tighter uppercase">404</h1>
            <p className="text-[10px] font-mono text-primary uppercase tracking-[0.3em]">Status: Page Not Found</p>
          </div>
          
          <p className="text-muted text-xs leading-relaxed mb-8 px-4 opacity-80">
            The page you are looking for does not exist or has been moved.
          </p>
          
          <Link 
            href="/"
            className="inline-flex items-center gap-2 bg-primary text-black font-bold px-6 py-2.5 rounded-xl hover:scale-105 transition-transform vector-glow text-[10px] uppercase tracking-widest"
          >
            <ArrowLeft className="size-3.5" />
            Return Home
          </Link>
        </div>
        
        {/* Subtle footer tag */}
        <div className="mt-8 text-center">
          <span className="text-[8px] font-mono text-muted uppercase tracking-[0.4em] opacity-40">
            CycoServe Labs // Error_Control
          </span>
        </div>
      </div>
    </div>
  );
}
