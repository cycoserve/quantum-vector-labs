import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Industry Solutions",
  description: "Pre-built AI agent clusters for every industry: Record Labels, Law Firms, Real Estate, and E-commerce. Deploy autonomous AI workflows with AXON.",
  alternates: {
    canonical: '/solutions',
  },
  openGraph: {
    title: "Industry Solutions | CycoServe Labs",
    description: "Industry-specific AI agent clusters designed for autonomous operations and context-aware reasoning.",
    images: [
      {
        url: '/og/solutions.png',
        width: 1200,
        height: 630,
        alt: 'Cy Industry Solutions',
      },
    ],
  },
};

export default function SolutionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
