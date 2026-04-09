"use client";

import { useEffect, useState } from "react";
import { Hexagon } from "lucide-react";

export default function BrandShowcase() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="py-32 px-6 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-96 h-96">
          {/* Outer Ring */}
          <div className="absolute inset-0 border border-primary/20 rounded-full animate-[spin_20s_linear_infinite]">
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-primary rounded-full vector-glow"></div>
          </div>
          
          {/* Middle Ring */}
          <div className="absolute inset-8 border border-primary/10 rounded-full animate-[spin_15s_linear_infinite_reverse]">
            <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-3 h-3 bg-primary/50 rounded-full"></div>
          </div>
          
          {/* Inner Ring */}
          <div className="absolute inset-16 border border-primary/5 rounded-full animate-[spin_10s_linear_infinite]">
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-2 h-2 bg-primary/30 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
        {/* Main Logo */}
        <div className="flex justify-center mb-8">
          <div className={`relative transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
            <div className="size-32 text-primary">
              <Hexagon className="w-full h-full" strokeWidth={1} />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="size-16 bg-primary/20 rounded-full flex items-center justify-center animate-pulse">
                <Hexagon className="w-8 h-8 text-primary" strokeWidth={1.5} />
              </div>
            </div>
          </div>
        </div>

        {/* Tagline */}
        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">
          <span className="text-gradient">
            CycoServe Labs
          </span>
        </h2>

        <p className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto">
          Where next-generation AI infrastructure meets enterprise reliability
        </p>

        {/* Animated Stats Pills */}
        <div className="flex flex-wrap justify-center gap-4 pt-8">
          {[
            { label: "Inference", value: "Global" },
            { label: "Vectors", value: "Secure" },
            { label: "GenAI", value: "Custom" },
          ].map((item, index) => (
            <div 
              key={item.label}
              className="px-6 py-3 glass-panel rounded-full border border-primary/20 hover:border-primary/50 transition-all duration-300 group card-ring-hover"
            >
              <span className="text-sm text-slate-400 group-hover:text-white transition-colors">
                {item.label}:{" "}
              </span>
              <span className="text-sm font-bold text-primary">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
