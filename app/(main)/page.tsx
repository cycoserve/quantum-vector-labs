"use client";

import Sidebar from "@/components/layout/Sidebar";
import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import StatsSection from "@/components/home/StatsSection";
import RAGSection from "@/components/home/RAGSection";
import AxonSection from "@/components/home/AxonSection";
import BrandShowcase from "@/components/home/BrandShowcase";
import CTASection from "@/components/home/CTASection";
// import Footer from "@/components/layout/Footer";

export default function Home() {
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

      {/* Axon Section */}
      <AxonSection />

      {/* CTA Section */}
      <CTASection />
    </main>
  );
}
