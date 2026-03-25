'use client';

import AuthForm from '@/components/auth/AuthForm';

export default function AuthPage() {
  return (
    <div className="min-h-screen bg-[#f4f7fb] dark:bg-[#010918] font-[var(--font-space-grotesk)] text-slate-800 dark:text-slate-100 flex items-center justify-center overflow-hidden relative">

      {/* Background Effects — subtle in light, vivid in dark */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Neural sphere — dark mode only */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] hidden dark:block neural-core-sphere" />
        {/* Perspective grid */}
        <div className="absolute inset-0 neural-grid opacity-5 dark:opacity-15 [transform:rotateX(55deg)_translateY(-80px)]" />
        {/* Glow dots */}
        <div className="absolute top-1/4 left-1/4 size-1 bg-primary rounded-full blur-[2px] opacity-20 dark:opacity-70" />
        <div className="absolute top-1/3 right-1/4 size-1 bg-primary rounded-full blur-[2px] opacity-20 dark:opacity-70" />
        <div className="absolute bottom-1/4 left-1/2 size-1.5 bg-primary rounded-full blur-[3px] opacity-20 dark:opacity-70" />
        {/* Light mode soft glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 dark:hidden rounded-full blur-3xl" />
      </div>

      {/* Centered Auth Card */}
      <div className="relative z-10 w-full max-w-sm px-4 py-6">
        <AuthForm />
      </div>
    </div>
  );
}
