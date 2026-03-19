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

function AnimatedHeadline() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    if (!containerRef.current) return;
    
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    
    tl.from(".hero-badge-main", { y: 20, opacity: 0, duration: 1.2, ease: "power3.out" })
      .to(".hero-char-main", {
        y: 0,
        opacity: 1,
        stagger: 0.02,
        duration: 1.5,
        filter: "blur(0px)",
      }, "-=0.8")
      .from(".hero-sub-main", { y: 30, opacity: 0, duration: 1.2 }, "-=1.0")
      .from(".hero-cta-main", { y: 20, opacity: 0, duration: 1.2 }, "-=1.0");
      
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative z-10 space-y-8 flex flex-col items-center">
        <div className="hero-badge-main inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span className="text-sm font-medium tracking-wide text-amber-50 uppercase">Trusted by 50+ UAE Brands</span>
        </div>

        <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold leading-[1.1] tracking-[-0.02em] max-w-5xl mb-2">
          {"Next Level".split("").map((char, i) => (
            <span 
              key={i} 
              className="hero-char-main inline-block whitespace-pre opacity-0 translate-y-[60px] pb-2 -mb-2"
              style={{ filter: "blur(10px)", willChange: "transform, opacity, filter" }}
            >
              {char}
            </span>
          ))}
          <br />
          {"Digital Growth".split("").map((char, i) => (
            <span 
              key={`g-${i}`} 
              className="hero-char-main inline-block whitespace-pre opacity-0 translate-y-[60px] text-amber-400/90 pb-2 -mb-2"
              style={{ filter: "blur(10px)", willChange: "transform, opacity, filter" }}
            >
              {char}
            </span>
          ))}
        </h1>

        <p className="hero-sub-main text-lg md:text-2xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed pb-4">
          Every day you're not on Google page 1, a competitor is taking your client. We fix that — with data-driven strategies that deliver real ROI.
        </p>

        {/* Premium Glassmorphic CTA */}
        <div className="hero-cta-main flex flex-col sm:flex-row gap-4 pt-4 items-center justify-center w-full">
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
  const mounted = useMounted();
  const isMobile = useMobileDetection();
  
  // Show 3D on all devices, but optimize count for mobile
  const show3D = mounted;
  const particleCount = isMobile ? 200 : 400; // Increased count based on new experimental design
  const sceneScale = isMobile ? 0.6 : 1;

  return (
    <section className="relative min-h-[85dvh] md:min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#06080e] section-dark text-slate-50 font-sans">
      
      {/* Cinematic Deep Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          {/* Noise Texture */}
          <div 
             className="absolute inset-0 opacity-[0.05] mix-blend-overlay" 
             style={{ 
                 backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.7'/%3E%3C/svg%3E")`,
             }} 
          />
          
          {/* Elegant Amber Glows */}
          <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-amber-600/10 rounded-full blur-[150px] mix-blend-screen" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[800px] h-[800px] bg-slate-400/10 rounded-full blur-[150px] mix-blend-screen" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-900/15 rounded-full blur-[150px] mix-blend-screen" />
      </div>

      {/* Background 3D or Static */}
      <div className="absolute inset-0 z-0 pointer-events-none">
          {show3D && (
             <div className="w-full h-full opacity-60 mix-blend-screen">
               <Suspense fallback={null}>
                  <HeroScene count={particleCount} scale={sceneScale} />
               </Suspense>
             </div>
          )}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12 md:py-20 text-center">
        <AnimatedHeadline />
      </div>
      
    </section>
  );
}
