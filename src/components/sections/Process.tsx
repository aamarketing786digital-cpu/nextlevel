"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/Container";
import { Search, Zap, Rocket, BarChart3 } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const steps = [
  {
    id: 1,
    title: "Discovery & Strategy",
    description: "We dive deep into your business goals, target audience, and market landscape to craft a data-driven roadmap.",
    icon: <Search className="w-6 h-6 text-slate-900" />,
    color: "bg-orange-400", // Using Tech-Luxury orange
  },
  {
    id: 2,
    title: "Design & User Experience",
    description: "Our design team translates strategy into stunning, intuitive interfaces that captivate users and drive engagement.",
    icon: <Zap className="w-6 h-6 text-slate-900" />,
    color: "bg-orange-300",
  },
  {
    id: 3,
    title: "Development & Integration",
    description: "We build robust, scalable solutions using cutting-edge technologies, ensuring seamless performance across all devices.",
    icon: <Rocket className="w-6 h-6 text-slate-100" />,
    color: "bg-slate-800", // Deep slate for contrast
  },
  {
    id: 4,
    title: "Launch & Optimization",
    description: "We deploy your project with precision and continuously monitor performance to optimize for maximum ROI.",
    icon: <BarChart3 className="w-6 h-6 text-slate-100" />,
    color: "bg-teal-900",
  },
];

export function Process() {
  const containerRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current || !lineRef.current) return;

      const items = gsap.utils.toArray<HTMLElement>(".process-item");

      // 1. Line Animation (Scrub)
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top center",
            end: "bottom center",
            scrub: true,
            fastScrollEnd: true, // Optimization for fast scrolling
          },
        }
      );

      // 2. Card Animations (Staggered Reveal with premium easing)
      items.forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power4.out", // More luxurious, sweeping ease
            scrollTrigger: {
              trigger: item,
              start: "top 85%", 
              toggleActions: "play none none reverse",
              fastScrollEnd: true,
            },
          }
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="py-16 md:py-32 relative overflow-hidden bg-background">
      <Container>
        <div className="text-center mb-16 md:mb-24 max-w-3xl mx-auto px-4">
          <span className="text-primary font-medium tracking-wide uppercase text-sm mb-4 block">
            How We Work
          </span>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-slate-900 mb-6 tracking-tight">
            Our Proven <span className="text-gradient-gold">Process</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-500 font-light leading-relaxed">
            From concept to launch, we follow a rigorous methodology to ensure excellence at every step.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Vertical Line Background (Gray) */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-slate-200 -translate-x-1/2" />
          
          {/* Vertical Line Foreground (Animated Color) */}
          <div 
            ref={lineRef}
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-400 to-orange-600 origin-top -translate-x-1/2 will-change-transform rounded-full shadow-[0_0_10px_rgba(242,151,39,0.5)]" 
          />

          <div className="space-y-12 md:space-y-32">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={cn(
                  "process-item relative flex items-start md:items-center md:justify-between group will-change-[transform,opacity]",
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                )}
              >
                {/* Timeline Dot */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-6 md:top-auto w-6 h-6 md:w-8 md:h-8 rounded-full border-4 border-white bg-slate-100 z-10 flex items-center justify-center transition-all duration-500 group-hover:border-orange-400 group-hover:bg-white group-hover:scale-110 shadow-sm">
                   <div className="w-1.5 h-1.5 md:w-2.5 md:h-2.5 rounded-full bg-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content Card */}
                <div className={cn(
                    "ml-12 w-[calc(100%-3.5rem)] md:ml-0 md:w-[45%] p-6 md:p-10 rounded-2xl md:rounded-[2rem] glass-card border border-slate-200/60 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group-hover:border-orange-200/50",
                    index % 2 === 0 ? "md:mr-auto" : "md:ml-auto"
                )}>
                    <div className="flex items-center gap-4 md:gap-6 mb-4 md:mb-6">
                        <div className={cn("p-3 md:p-4 rounded-xl md:rounded-2xl shadow-sm transition-transform duration-500 group-hover:scale-110", step.color)}>
                            {step.icon}
                        </div>
                        <span className="text-3xl md:text-5xl font-display font-bold text-slate-100 absolute top-4 right-6 md:top-6 md:right-8 pointer-events-none transition-colors duration-500 group-hover:text-orange-50">
                            0{step.id}
                        </span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 md:mb-4 tracking-tight">{step.title}</h3>
                    <p className="text-base md:text-lg text-slate-500 leading-relaxed font-light">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
