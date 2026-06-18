import { Metadata } from "next";
import { ServicesShowcase } from "@/components/sections/ServicesShowcase";
import { ExpandedServices } from "@/components/sections/ExpandedServices";
import { RankingCta } from "@/components/sections/RankingCta";

export const metadata: Metadata = {
  title: "Our Services | NextLevel Marketerz",
  description:
    "Explore our comprehensive digital services: Web Development, SEO, Paid Media, Video Production, Lead Generation, and more. 55+ services to transform your business.",
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-teal-950 py-32 md:py-40 relative overflow-hidden border-b border-white/10">
        {/* Decorative Elements */}
        <div className="absolute inset-0 bg-[url('/images/services-hero.png')] bg-cover bg-center opacity-30 pointer-events-none" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-display font-bold text-white mb-8 tracking-tight">
              Services That <span className="text-gradient-gold">Drive Growth</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed font-light">
              From AI-powered automation to stunning web experiences, we deliver
              comprehensive solutions tailored to your business needs.
            </p>
          </div>
        </div>
      </section>

      {/* Services Showcase - Horizontal Scroll (GSAP) */}
      <ServicesShowcase />

      {/* Comprehensive Services - All 55 Services Listed */}
      <ExpandedServices />

      {/* CTA Section - Premium Bento Grid */}
      <RankingCta />
    </main>
  );
}
