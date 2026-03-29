import BackgroundLines from '@/components/layout/BackgroundLines';

/**
 * User route group layout.
 * Custom layout for user-specific areas (like settings).
 * Excludes the marketing Header and Footer for a focused, app-like experience.
 * Uses theme-aware background and foreground colors.
 */
export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 relative overflow-hidden transition-colors duration-300">
      <BackgroundLines />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
