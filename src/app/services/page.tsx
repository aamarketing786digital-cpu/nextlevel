import { Metadata } from "next";
import { ServicesShowcase } from "@/components/sections/ServicesShowcase";

export const metadata: Metadata = {
  title: "Our Services | NextLevel Marketerz",
  description:
    "Explore our comprehensive digital services: AI Chatbots, Web Development, Digital Marketing, Graphic Design, and SEO. Transform your business with cutting-edge solutions.",
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-slate-950 py-32 md:py-40 relative overflow-hidden border-b border-white/10">
        {/* Decorative Elements */}
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 pointer-events-none" />
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

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-background border-t border-border/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-muted-foreground mb-8">
              Let's discuss how our services can help transform your business.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
