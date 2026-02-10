import { Metadata } from "next";
import { CaseStudies } from "@/components/sections/CaseStudies";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Work | NextLevel Marketerz",
  description:
    "Explore our portfolio of successful projects. From e-commerce transformations to AI-powered solutions, see how we've helped businesses achieve their goals.",
};

export default function WorkPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-slate-950 py-32 md:py-40 relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 pointer-events-none" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-display font-bold text-white mb-8 tracking-tight">
              Results That <span className="text-gradient-gold">Speak</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed font-light">
              Real transformations for real businesses. Explore our case studies to
              see how we've helped companies across the UAE and Middle East achieve
              their digital goals.
            </p>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <CaseStudies />

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Be Our Next Success Story?
            </h2>
            <p className="text-muted-foreground mb-8">
              Let's discuss how we can help transform your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                Start Your Project
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center px-8 py-4 border border-primary/50 text-foreground rounded-lg font-semibold hover:bg-primary/10 transition-colors"
              >
                Explore Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
