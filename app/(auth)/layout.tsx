import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In | Quantum Vector Labs',
  description: 'Access your QVL account or create a new one.',
};

/**
 * Auth route group layout.
 * Intentionally excludes Header, Footer, and BackgroundLines.
 * The root layout (app/layout.tsx) provides html/body and Providers.
 */
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
