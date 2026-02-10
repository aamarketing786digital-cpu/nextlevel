"use client";

import { Suspense, useRef } from "react";
import dynamic from "next/dynamic";
import { useMounted } from "@/hooks/useMounted";
import { useMobileDetection } from "@/hooks/useMobileDetection";
import { Button } from "@/components/ui/button";
import { ArrowDown, Sparkles } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const HeroScene = dynamic(
  () => import("@/components/3d/HeroScene").then((mod) => mod.HeroScene),
  { ssr: false }
);

function StaticHeroImage() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-background">
      <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-background to-background" />
    </div>
  );
}

function AnimatedHeadline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleText = "NextLevel";
  
  useGSAP(() => {
    if (!containerRef.current) return;
    
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    // Badge
    tl.from(".hero-badge", { y: -20, opacity: 0, duration: 0.8 });
    
    // Text Chars
    tl.from(".hero-char", {
        y: 50,
        opacity: 0,
        stagger: 0.05,
        duration: 0.8,
        ease: "back.out(1.7)"
    }, "-=0.4");
    
    // Subtitle & CTA
    tl.from(".hero-element", {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6
    }, "-=0.4");
    
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative z-10 space-y-8 flex flex-col items-center">
      <div className="hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 backdrop-blur-sm">
        <Sparkles className="w-4 h-4 text-primary" />
        <span className="text-sm font-medium text-primary">AI-Powered Growth</span>
      </div>

      <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-bold leading-tight text-foreground tracking-tight">
        {titleText.split("").map((char, i) => (
            <span key={i} className="hero-char inline-block">{char}</span>
        ))}
      </h1>

      <p className="hero-element text-xl md:text-2xl lg:text-3xl text-muted-foreground max-w-3xl mx-auto font-light leading-relaxed">
        The Future of Digital Growth
      </p>

      <p className="hero-element text-base md:text-lg text-muted-foreground/80 max-w-2xl mx-auto">
        Transform your digital presence with AI-powered marketing strategies that
        deliver measurable results. Where innovation meets excellence.
      </p>

      <div className="hero-element flex flex-col sm:flex-row gap-4 pt-4 justify-center w-full">
        <Button
          size="lg"
          asChild
          className="bg-primary hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5 transition-all text-lg px-8 h-14"
        >
          <a href="/contact">
            Start Your Journey
            <ArrowDown className="ml-2 h-5 w-5" />
          </a>
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="border-primary/20 hover:bg-primary/5 transition-all text-lg px-8 h-14"
          asChild
        >
          <a href="/work">View Our Work</a>
        </Button>
      </div>
    </div>
  );
}

export function Hero() {
  const mounted = useMounted();
  const isMobile = useMobileDetection();
  
  // Only show 3D on desktop for performance
  const show3D = mounted && !isMobile;

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-background section-dark text-foreground">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 bg-slate-950 pointer-events-none overflow-hidden">
          {/* Noise Texture */}
          <div 
             className="absolute inset-0 opacity-[0.03]" 
             style={{ 
                 backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.5'/%3E%3C/svg%3E")`,
                 backgroundRepeat: 'repeat',
             }} 
          />
          
          {/* Nebula Glows */}
          <div className="absolute top-[-20%] left-[-20%] w-[800px] h-[800px] bg-purple-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow" />
          <div className="absolute bottom-[-20%] right-[-20%] w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow delay-1000" />
          
          {/* Center Glow */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/20 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow" />

          {/* Vignette */}
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-slate-950/60 to-slate-950" />
      </div>

      {/* Background 3D or Static */}
      <div className="absolute inset-0 z-0 opacity-80 mix-blend-screen pointer-events-none">
          {show3D ? (
             <Suspense fallback={<StaticHeroImage />}>
                <HeroScene />
             </Suspense>
          ) : (
             <StaticHeroImage />
          )}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        <AnimatedHeadline />
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10 opacity-50">
        <ArrowDown className="w-6 h-6 text-primary" />
      </div>
    </section>
  );
}
