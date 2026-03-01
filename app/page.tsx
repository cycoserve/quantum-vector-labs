"use client";

import { useAuth } from '@/lib/auth-context';
import Sidebar from "@/components/layout/Sidebar";
import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import StatsSection from "@/components/home/StatsSection";
import RAGSection from "@/components/home/RAGSection";
import BrandShowcase from "@/components/home/BrandShowcase";
import CTASection from "@/components/home/CTASection";
import Footer from "@/components/layout/Footer";

export default function Home() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <main className="relative min-h-screen flex items-center justify-center">
        <div className="text-primary">Loading...</div>
      </main>
    );
  }

  return (
    <main className="relative">


      {/* Chat Assistant Sidebar */}
      <Sidebar />

      {/* Hero Section */}
      <HeroSection />

      {/* Services Section */}
      <ServicesSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Stats Section */}
      <StatsSection />

      {/* Brand Showcase */}
      <BrandShowcase />

      {/* RAG Section */}
      <RAGSection />

      {/* CTA Section */}
      <CTASection />
    </main>
  );
}
