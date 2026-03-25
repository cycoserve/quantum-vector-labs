"use client";

import { Hexagon, Terminal, Share2, Github, Twitter, Linkedin, Mail, ArrowUpRight } from "lucide-react";

const footerColumns = [
  {
    title: "Products",
    links: [
      { label: "Serverless Inference", href: "#" },
      { label: "Vector Database", href: "#" },
      { label: "Multimodal Models", href: "#" },
      { label: "Private Clusters", href: "#" },
      { label: "Turnkey RAG", href: "#" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Custom Gen AI Apps", href: "#" },
      { label: "Mobile AI", href: "#" },
      { label: "Web Applications", href: "#" },
      { label: "Internal Tools", href: "#" },
      { label: "Enterprise AI", href: "#" },
    ],
  },
  {
    title: "Developers",
    links: [
      { label: "Documentation", href: "#" },
      { label: "API Reference", href: "#" },
      { label: "OpenAI-Compatible API", href: "#" },
      { label: "SDKs & Libraries", href: "#" },
      { label: "Status Page", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "#" },
      { label: "Pricing", href: "/pricing" },
      { label: "Blog", href: "#" },
      { label: "Privacy Protocol", href: "#" },
      { label: "Terms of Service", href: "#" },
    ],
  },
];

const socialLinks = [
  { icon: Github, label: "GitHub", href: "#" },
  { icon: Twitter, label: "Twitter", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Mail, label: "Email", href: "#" },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-white/5 bg-white/80 dark:bg-[#010918]/80 backdrop-blur-xl">
      {/* Main Footer Grid */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Top Section: Logo + Tagline */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="size-7 text-primary">
              <Hexagon className="w-full h-full" strokeWidth={1.5} />
            </div>
            <span className="text-base font-bold tracking-widest uppercase text-slate-800 dark:text-white">
              Quantum Vector Labs
            </span>
          </div>
          <p className="text-sm text-slate-400 max-w-xs leading-relaxed">
            Deploy and serve GenAI models globally — without the complexity of infrastructure management.
          </p>
        </div>

        {/* 4-col on desktop, 2-col on mobile */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">
          {footerColumns.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-bold tracking-widest uppercase text-primary mb-5">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="group flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-60 transition-opacity duration-200 -translate-y-px" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          {/* Copyright */}
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium tracking-widest uppercase">
            <Hexagon className="w-4 h-4 text-slate-600" strokeWidth={1.5} />
            <span>© {new Date().getFullYear()} Quantum Vector Labs. All rights reserved.</span>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            {socialLinks.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="size-8 glass-panel rounded-full flex items-center justify-center card-ring hover:border-primary/50 hover:text-primary transition-all duration-200 cursor-pointer"
              >
                <Icon className="w-3.5 h-3.5 text-slate-400 hover:text-primary transition-colors" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
