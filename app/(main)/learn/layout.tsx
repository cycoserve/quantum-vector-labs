import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Learn Quantum Vector Labs",
  description: "Master the Neural Horizon. Deep dive into AXON agent networks, Leader Brain file-native intelligence, and planetary-scale inference.",
  openGraph: {
    title: "Learn QVL | Neural Infrastructure Explained",
    description: "Understand the core concepts of Quantum Vector Labs: Pulse, Colonies, Spawn, and the Leader Brain.",
  }
};

export default function LearnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
