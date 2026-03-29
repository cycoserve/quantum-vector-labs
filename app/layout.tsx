import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://qvlabs.ai'),
  title: {
    default: "Quantum Vector Labs | Planetary-Scale GenAI Infrastructure",
    template: "%s | Quantum Vector Labs"
  },
  description: "The definitive vector-native platform for autonomous operations, context-aware reasoning, and planetary-scale inference. Deploy GenAI models globally without infrastructure complexity.",
  keywords: [
    "GenAI", 
    "Inference", 
    "Vector Database", 
    "AI Agents", 
    "RAG", 
    "Serverless AI", 
    "Quantum Vector Labs", 
    "AXON", 
    "Leader Brain",
    "Agent Orchestration",
    "GPU Cloud",
    "Edge AI"
  ],
  authors: [{ name: "Quantum Vector Labs Team" }],
  creator: "Quantum Vector Labs",
  publisher: "Quantum Vector Labs",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/logo-icon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' },
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://qvlabs.ai',
    siteName: 'Quantum Vector Labs',
    title: 'Quantum Vector Labs | Planetary-Scale GenAI Infrastructure',
    description: 'Deploy and serve GenAI models globally — without the complexity of infrastructure management.',
    images: [
      {
        url: '/og/main.png',
        width: 1200,
        height: 630,
        alt: 'Quantum Vector Labs - Planetary-Scale GenAI Infrastructure',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Quantum Vector Labs | Planetary-Scale GenAI Infrastructure',
    description: 'The vector-native platform for autonomous operations and context-aware reasoning.',
    creator: '@qvlabs',
    images: ['/og/main.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    "theme-color": "#20d3ee",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Quantum Vector Labs',
    url: 'https://qvlabs.ai',
    logo: 'https://qvlabs.ai/logo-icon.svg',
    sameAs: [
      'https://twitter.com/qvlabs',
      'https://github.com/quantum-vector-labs',
    ],
    description: 'The definitive vector-native platform for autonomous operations, context-aware reasoning, and planetary-scale inference.',
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
