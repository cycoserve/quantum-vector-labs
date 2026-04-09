import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support & Documentation",
  description: "Get help with your CycoServe Labs deployment. Access documentation, contact sales, or talk to our technical support team.",
  alternates: {
    canonical: '/support',
  },
  openGraph: {
    title: "Support | CycoServe Labs",
    description: "Technical support and documentation for the CycoServe GenAI platform.",
    images: [
      {
        url: '/og/support.png',
        width: 1200,
        height: 630,
        alt: 'Cy Support Center',
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
