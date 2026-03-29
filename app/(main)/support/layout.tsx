import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support & Documentation",
  description: "Get help with your Quantum Vector Labs deployment. Access documentation, contact sales, or talk to our technical support team.",
  alternates: {
    canonical: '/support',
  },
  openGraph: {
    title: "Support | Quantum Vector Labs",
    description: "Technical support and documentation for the QVL GenAI platform.",
    images: [
      {
        url: '/og/support.png',
        width: 1200,
        height: 630,
        alt: 'QVL Support Center',
      },
    ],
  },
};

export default function SupportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
