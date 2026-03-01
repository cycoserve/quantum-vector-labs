"use client";

import { useEffect, useState } from "react";

export default function BackgroundLines() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY);
    };
    
    // Initial set
    setOffset(window.scrollY);
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none bg-[#010918] overflow-hidden">
      {/* Glowing orbs for a more appealing background */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[120px]" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/10 blur-[120px]" />
      <div className="absolute top-[40%] left-[60%] w-[30%] h-[30%] rounded-full bg-purple-600/10 blur-[100px]" />

      {/* Grid lines with parallax effect */}
      <div 
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #20d3ee 1px, transparent 1px),
            linear-gradient(to bottom, #20d3ee 1px, transparent 1px)
          `,
          backgroundSize: '4rem 4rem',
          backgroundPosition: `0px -${offset * 0.3}px`,
        }}
      />
      
      {/* Radial gradient to fade out edges and focus center */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#010918_100%)]" />
      
      {/* Subtle glow at the top */}
      <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-primary/5 to-transparent" />
    </div>
  );
}
