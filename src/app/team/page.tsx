import { Metadata } from "next";
import { TeamSection } from "@/components/sections/TeamSection";
import { Container } from "@/components/layout/Container";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Team | NextLevel Marketerz",
  description:
    "Meet the visionaries, designers, and strategists behind NextLevel Marketerz. A diverse team dedicated to your digital growth.",
};

export default function TeamPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-slate-950 py-32 md:py-40 relative overflow-hidden border-b border-white/10">
        {/* Decorative Elements */}
        <div className="absolute inset-0 bg-[url('/images/about-hero.png')] bg-cover bg-center opacity-40 pointer-events-none" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

        <Container className="relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-display font-bold text-white mb-8 tracking-tight">
              Meet Our <span className="text-gradient-gold">Visionaries</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed font-light mb-10">
              We're a collective of creative minds and technical experts dedicated 
              to pushing the boundaries of what's possible in digital marketing.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/about" 
                className="px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-all backdrop-blur-sm"
              >
                Our Story
              </Link>
              <Link 
                href="/work" 
                className="px-8 py-4 rounded-full bg-primary text-black font-bold hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(201,162,39,0.3)]"
              >
                Our Work
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Team Members Section */}
      <div className="bg-slate-950">
        <TeamSection />
      </div>

      {/* CTA Section */}
      <section className="py-24 bg-black border-t border-white/5">
        <Container>
          <div className="bg-gradient-to-br from-slate-900 to-black rounded-[2.5rem] p-12 md:p-20 border border-white/10 text-center relative overflow-hidden">
             <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[100px]" />
             <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-medium text-white mb-6">
                  Want to work with <span className="text-gradient-gold">us?</span>
                </h2>
                <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto">
                  We're always looking for ambitious brands to partner with and talented 
                  individuals to join our mission.
                </p>
                <Link 
                  href="/contact" 
                  className="inline-flex h-14 items-center justify-center px-10 rounded-full bg-primary text-black font-bold hover:bg-primary/90 transition-all text-lg"
                >
                  Get in Touch
                </Link>
             </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
