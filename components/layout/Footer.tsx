"use client";

import { Hexagon, Terminal, Share2 } from "lucide-react";

const footerLinks = [
  { label: "Privacy Protocol", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Security Audit", href: "#" },
];

export default function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Logo */}
        <div className="flex items-center gap-3 grayscale opacity-50">
          <div className="size-6 text-white">
            <Hexagon className="w-full h-full" strokeWidth={1.5} />
          </div>
          <span className="text-sm font-bold tracking-widest uppercase">
            Quantum Vector Labs © 2024
          </span>
        </div>

        {/* Links */}
        <div className="flex gap-8 text-xs text-slate-500 font-bold tracking-widest uppercase">
          {footerLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Social Icons */}
        <div className="flex gap-4">
          <div className="size-8 glass-panel rounded-full flex items-center justify-center border-white/10 hover:border-primary/50 transition-colors cursor-pointer">
            <Terminal className="w-4 h-4 text-slate-400" />
          </div>
          <div className="size-8 glass-panel rounded-full flex items-center justify-center border-white/10 hover:border-primary/50 transition-colors cursor-pointer">
            <Share2 className="w-4 h-4 text-slate-400" />
          </div>
        </div>
      </div>
    </footer>
  );
}
