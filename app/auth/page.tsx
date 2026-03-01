'use client';

import AuthForm from '@/components/auth/AuthForm';
import { AuthProvider } from '@/lib/auth-context';

export default function AuthPage() {
  return (
    <div className="min-h-screen bg-deep-space font-display text-slate-100 flex items-center justify-center overflow-hidden relative">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] neural-core-sphere"></div>
        <div className="absolute inset-0 neural-grid opacity-20 [transform:rotateX(60deg)_translateY(-100px)]"></div>
        <div className="absolute top-1/4 left-1/4 size-1 bg-primary rounded-full blur-[2px]"></div>
        <div className="absolute top-1/3 right-1/4 size-1 bg-primary rounded-full blur-[2px]"></div>
        <div className="absolute bottom-1/4 left-1/2 size-1.5 bg-primary rounded-full blur-[3px]"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-md px-6">
        <AuthForm />
      </div>

      {/* Neural Core Sphere Animation */}
      <style jsx global>{`
        .neural-core-sphere {
          background: radial-gradient(circle at center, #22D3EE 0%, transparent 70%);
          filter: blur(40px);
          opacity: 0.15;
        }
        .neural-grid {
          background-image: 
            linear-gradient(rgba(34, 211, 238, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 211, 238, 0.03) 1px, transparent 1px);
          background-size: 50px 50px;
          perspective: 1000px;
        }
        .glass-panel {
          background: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(24px);
          border: 1px solid rgba(34, 211, 238, 0.15);
          box-shadow: 0 0 40px rgba(0, 0, 0, 0.5), inset 0 0 20px rgba(34, 211, 238, 0.05);
        }
        .glow-border {
          box-shadow: 0 0 15px rgba(34, 211, 238, 0.3);
        }
        .terminal-input {
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(34, 211, 238, 0.2);
          color: #22D3EE;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
        }
        .terminal-input:focus {
          border-color: #22D3EE;
          outline: none;
          box-shadow: 0 0 10px rgba(34, 211, 238, 0.2);
        }
      `}</style>
    </div>
  );
}
