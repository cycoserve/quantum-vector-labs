import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chat Assistant",
  description: "Interact with our planetary-scale AI assistant. Get answers about AXON, Leader Brain, and serverless inference in real-time.",
  alternates: {
    canonical: '/chat',
  },
  openGraph: {
    title: "AI Chat Assistant | Quantum Vector Labs",
    description: "Get real-time answers about our GenAI infrastructure and autonomous agent orchestration.",
    images: [
      {
        url: '/og/chat.png',
        width: 1200,
        height: 630,
        alt: 'QVL AI Chat Assistant',
      },
    ],
  },
};

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
