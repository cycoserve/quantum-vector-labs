"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

const navLinks = [
  { label: "Solutions", href: "/solutions" },
  { label: "Pricing", href: "/pricing" },
  { label: "Learn Cy", href: "/learn" },
  { label: "Support", href: "/support" },
];

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Close menu on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  const isDark = resolvedTheme === "dark";

  return (
    <div className="relative" ref={menuRef}>
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg glass-panel border border-primary/20 hover:border-primary/50 transition-colors text-slate-500 dark:text-slate-300 hover:text-primary flex items-center justify-center"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Dropdown Menu */}
      <div
        className={`absolute top-full right-0 mt-4 w-64 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-primary/20 shadow-2xl overflow-hidden transition-all duration-200 origin-top-right ${
          isOpen
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col p-2">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="px-4 py-3 text-sm font-medium text-slate-500 dark:text-slate-300 rounded-xl hover:bg-primary/10 hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
          
          <div className="h-px bg-slate-200 dark:bg-white/10 my-2 mx-2" />

          {/* Theme Toggle row */}
          {mounted && (
            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className="px-4 py-3 text-sm font-medium text-slate-500 dark:text-slate-300 rounded-xl hover:bg-primary/10 hover:text-primary transition-colors flex items-center gap-3"
            >
              {isDark ? (
                <>
                  <Sun className="w-4 h-4 text-primary" />
                  Switch to Light Mode
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-primary" />
                  Switch to Dark Mode
                </>
              )}
            </button>
          )}

          <div className="h-px bg-slate-200 dark:bg-white/10 my-2 mx-2" />
          
          <a
            href="/auth"
            onClick={() => setIsOpen(false)}
            className="px-4 py-3 text-sm font-medium text-slate-500 dark:text-slate-300 rounded-xl hover:bg-primary/10 hover:text-primary transition-colors"
          >
            Log In
          </a>
          <a
            href="/auth"
            onClick={() => setIsOpen(false)}
            className="mx-2 mt-1 mb-2 px-4 py-3 text-center text-sm font-bold text-black bg-primary rounded-xl hover:brightness-110 transition-all"
          >
            Sign Up Free
          </a>
        </nav>
      </div>
    </div>
  );
}
