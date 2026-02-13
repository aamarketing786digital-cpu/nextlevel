import { Metadata } from "next";
import { CompanyStory } from "@/components/sections/CompanyStory";
import { TeamSection } from "@/components/sections/TeamSection";
import { Values } from "@/components/sections/Values";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us | NextLevel Marketerz",
  description:
    "Learn about NextLevel Marketerz - our story, our team of visionaries, and the values that drive us to deliver exceptional results for our clients.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-slate-950 py-32 md:py-40 relative overflow-hidden border-b border-white/10">
        {/* Decorative Elements */}
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 pointer-events-none" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-display font-bold text-white mb-8 tracking-tight">
              About <span className="text-gradient-gold">Next Level Marketerz</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed font-light">
              We're a team of passionate marketers, developers, and designers
              united by a mission to transform businesses across the Middle East.
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <CompanyStory />

      {/* Values */}
      <Values />

      {/* Team */}
      <TeamSection />

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Join Our Team</h2>
            <p className="text-muted-foreground mb-8">
              We're always looking for talented individuals who share our passion
              for excellence.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
