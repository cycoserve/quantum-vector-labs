import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Learn CycoServe Labs",
  description: "Master the Neural Horizon. Deep dive into AXON agent networks, Leader Brain file-native intelligence, and planetary-scale inference.",
  alternates: {
    canonical: '/learn',
  },
  openGraph: {
    title: "Learn Cy | Neural Infrastructure Explained",
    description: "Understand the core concepts of CycoServe Labs: Pulse, Colonies, Spawn, and the Leader Brain.",
    images: [
      {
        url: '/og/learn.png',
        width: 1200,
        height: 630,
        alt: 'Learn CycoServe Labs',
      },
    ],
  }
};

export default function LearnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
