"use client";

import MobileMenu from "./MobileMenu";

const navLinks = [
  { label: "Solutions", href: "/solutions" },
  { label: "Products", href: "/solutions" },
  { label: "Pricing", href: "/pricing" },
  { label: "Learn QVL", href: "/docs.quantumvectorlabs.com" },
  { label: "Support", href: "/support" },
];

export default function Header() {
  return (
    <header className="fixed top-0 w-full z-40 px-6 py-4">
      <div className="max-w-7xl mx-auto glass-panel rounded-full px-8 py-3 flex items-center justify-between card-ring-hover">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="size-10 text-primary">
            <img 
              src="/logo-icon.svg" 
              alt="Quantum Vector Labs Logo" 
              className="w-full h-full"
            />
          </div>
          <h2 className="text-lg font-bold tracking-wider uppercase">
            <span className="text-primary font-bold">QVL</span>{" "}
            <span className="text-white font-thin">LABS</span>
          </h2>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-slate-300 hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {/* Desktop: Show auth buttons */}
          <div className="hidden md:flex items-center gap-4">
            <a href="/auth" className="text-sm font-medium text-slate-300 hover:text-primary transition-colors">
              Log In
            </a>
            <a href="/auth" className="bg-primary text-black text-xs font-bold px-5 py-2.5 rounded-full hover:scale-105 transition-transform card-ring-hover">
              Sign Up
            </a>
          </div>
          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
