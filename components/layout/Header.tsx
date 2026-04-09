"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon, Hexagon } from "lucide-react";
import MobileMenu from "./MobileMenu";
import Link from "next/link";

const navLinks = [
  { label: "Solutions", href: "/solutions" },
  { label: "Documetation", href: "/learn" },
  { label: "Pricing", href: "/pricing" },
  { label: "Support", href: "/support" }
];

function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="w-9 h-9" />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="relative w-9 h-9 flex items-center justify-center rounded-full border border-primary/20 bg-transparent hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 text-primary"
      title={isDark ? "Light mode" : "Dark mode"}
    >
      {isDark ? (
        <Sun className="w-4 h-4" />
      ) : (
        <Moon className="w-4 h-4" />
      )}
    </button>
  );
}

export default function Header() {
  return (
    <header className="fixed top-0 w-full z-40 px-6 py-4">
      <div className="max-w-7xl mx-auto glass-panel rounded-full px-8 py-3 flex items-center justify-between card-ring-hover">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="size-10 text-primary">
            <Link href="/">
              <Hexagon className="w-full h-full" strokeWidth={1.5} />
            </Link>
          </div>
          <h2 className="text-lg font-bold tracking-wider uppercase">
            <Link href={"/"}>
              <span className="text-primary font-bold">CycoServe</span>{" "}
            </Link>
          
          </h2>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-slate-500 dark:text-slate-300 hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle - always visible */}
          <ThemeToggle />

          {/* Desktop: Show auth buttons */}
          <div className="hidden md:flex items-center gap-4">
            <a href="/auth" className="text-sm font-medium text-slate-500 dark:text-slate-300 hover:text-primary transition-colors">
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
