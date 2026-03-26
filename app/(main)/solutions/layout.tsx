import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Industry Solutions",
  description: "Pre-built AI agent clusters for every industry: Record Labels, Law Firms, Real Estate, and E-commerce. Deploy autonomous AI workflows with AXON.",
  openGraph: {
    title: "Industry Solutions | Quantum Vector Labs",
    description: "Industry-specific AI agent clusters designed for autonomous operations and context-aware reasoning.",
  }
};

export default function SolutionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
