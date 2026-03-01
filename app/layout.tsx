import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BackgroundLines from "@/components/layout/BackgroundLines";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "QVL Home: The Neural Horizon | Quantum Vector Labs",
  description:
    "The definitive vector-native platform for autonomous operations, context-aware reasoning, and planetary-scale inference.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${spaceGrotesk.variable} antialiased`}>
        <Providers>
          <BackgroundLines />
          <Header />
          <div className="md:px-4 ">
            {children}
          </div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
