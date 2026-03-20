import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowDown, Sparkles } from "lucide-react";

function AnimatedHeadline() {
  return (
    <div className="relative z-10 space-y-8 flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span className="text-sm font-medium tracking-wide text-amber-50 uppercase">Trusted by 50+ UAE Brands</span>
        </div>

        <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold leading-[1.1] tracking-[-0.02em] max-w-5xl mb-2">
          <span className="block">Next Level</span>
          <span className="block text-amber-400/90">Digital Growth</span>
        </h1>

        <p className="text-lg md:text-2xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed pb-4">
          Every day you're not on Google page 1, a competitor is taking your client. We fix that, with data-driven strategies that deliver real ROI.
        </p>

        {/* Premium Glassmorphic CTA */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4 items-center justify-center w-full">
          <Button
            size="lg"
            asChild
            className="rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 hover:shadow-[0_0_30px_rgba(251,191,36,0.3)] transition-all duration-300 text-lg px-8 h-14 font-medium"
          >
            <a href="/contact">
              Start Your Journey
              <ArrowDown className="ml-2 h-5 w-5" />
            </a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="rounded-full border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-md text-white transition-all text-lg px-8 h-14 font-medium"
            asChild
          >
            <a href="/work">View Our Work</a>
          </Button>
        </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative min-h-[85dvh] md:min-h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 section-dark text-slate-50 font-sans">
      {/* Optimized Background - minimal CPU usage */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Hero Background Image - desktop only for better mobile performance */}
        <div className="hidden md:block absolute inset-0">
          <Image
            src="/images/home-hero.webp"
            alt=""
            fill
            sizes="100vw"
            quality={50}
            className="object-cover opacity-20"
            loading="lazy"
          />
        </div>
        {/* Single subtle amber glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[120px]" />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-slate-950/40" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12 md:py-20 text-center">
        <AnimatedHeadline />
      </div>
    </section>
  );
}
