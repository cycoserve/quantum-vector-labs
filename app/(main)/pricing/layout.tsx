import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing Plans",
  description: "Transparent, usage-based pricing for planetary-scale GenAI infrastructure. From free starter tiers to dedicated enterprise solutions.",
  alternates: {
    canonical: '/pricing',
  },
  openGraph: {
    title: "Pricing | CycoServe Labs",
    description: "Compare plans and scale your AI infrastructure globally with transparent pricing.",
    images: [
      {
        url: '/og/pricing.png',
        width: 1200,
        height: 630,
        alt: 'Cy Pricing Plans',
      },
    ],
  },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
