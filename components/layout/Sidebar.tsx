"use client";

import { useState } from "react";
import { Bot, Code2, Send } from "lucide-react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="fixed right-6 bottom-6 z-50 flex flex-col items-end gap-4">
      {/* Chat Panel */}
      <div className="glass-panel-primary rounded-2xl p-4 w-64 hidden lg:flex flex-col gap-3 vector-glow border-primary/40">
        {/* System Status */}
        <div className="flex items-center gap-2 mb-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
          </span>
          <span className="text-xs font-bold tracking-widest text-primary uppercase">
            System Status: Optimized
          </span>
        </div>

        {/* Welcome Message */}
        <p className="text-xs text-slate-400">
          Welcome to Quantum Vector Labs. How can I assist your enterprise
          operations today?
        </p>

        {/* Input */}
        <div className="flex gap-2">
          <input
            className="bg-slate-900 border border-slate-700 rounded-lg text-xs px-3 py-2 w-full focus:ring-1 focus:ring-primary focus:outline-none text-white placeholder-slate-500"
            placeholder="Inquire..."
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="size-16 glass-panel rounded-full flex items-center justify-center border-primary/50 vector-glow group"
      >
        <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary animate-pulse">
          <Bot className="text-primary group-hover:rotate-180 transition-transform duration-500 w-5 h-5" />
        </div>
      </button>
    </div>
  );
}
