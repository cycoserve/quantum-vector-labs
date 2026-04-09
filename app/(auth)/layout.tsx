import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In | CycoServe Labs',
  description: 'Access your CycoServe Labs account or create a new one. Join the neural horizon today.',
  alternates: {
    canonical: '/auth',
  },
  openGraph: {
    title: "Authentication | CycoServe Labs",
    description: "Join our platform for autonomous operations and context-aware reasoning.",
    images: [
      {
        url: '/og/auth.png',
        width: 1200,
        height: 630,
        alt: 'Cy Authentication',
      },
    ],
  },
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
