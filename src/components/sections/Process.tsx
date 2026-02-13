"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
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
    icon: <Search className="w-6 h-6 text-white" />,
    color: "bg-blue-500",
  },
  {
    id: 2,
    title: "Design & User Experience",
    description: "Our design team translates strategy into stunning, intuitive interfaces that captivate users and drive engagement.",
    icon: <Zap className="w-6 h-6 text-white" />,
    color: "bg-purple-500",
  },
  {
    id: 3,
    title: "Development & Integration",
    description: "We build robust, scalable solutions using cutting-edge technologies, ensuring seamless performance across all devices.",
    icon: <Rocket className="w-6 h-6 text-white" />,
    color: "bg-pink-500",
  },
  {
    id: 4,
    title: "Launch & Optimization",
    description: "We deploy your project with precision and continuously monitor performance to optimize for maximum ROI.",
    icon: <BarChart3 className="w-6 h-6 text-white" />,
    color: "bg-emerald-500",
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
          },
        }
      );

      // 2. Card Animations (Staggered Reveal)
      items.forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 80%", // When top of item hits 80% of viewport
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="py-16 md:py-24 relative overflow-hidden bg-background">
      <Container>
        <div className="text-center mb-12 md:mb-20 max-w-3xl mx-auto px-4">
          <span className="text-primary font-medium tracking-wide uppercase text-sm mb-4 block">
            How We Work
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 mb-4 md:mb-6">
            Our Proven <span className="text-primary">Process</span>
          </h2>
          <p className="text-base md:text-lg text-slate-600">
            From concept to launch, we follow a rigorous methodology to ensure excellence at every step.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Vertical Line Background (Gray) */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 -translate-x-1/2" />
          
          {/* Vertical Line Foreground (Animated Color) */}
          <div 
            ref={lineRef}
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-primary origin-top -translate-x-1/2" 
          />

          <div className="space-y-8 md:space-y-24">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={cn(
                  "process-item relative flex items-start md:items-center md:justify-between group",
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                )}
              >
                {/* Timeline Dot */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-6 md:top-auto w-6 h-6 md:w-8 md:h-8 rounded-full border-4 border-background bg-slate-200 z-10 flex items-center justify-center transition-colors duration-500 group-hover:bg-primary group-hover:scale-110 shadow-sm">
                   <div className="w-1.5 h-1.5 md:w-2.5 md:h-2.5 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Content Card */}
                <div className={cn(
                    "ml-12 md:ml-0 md:w-[45%] p-5 md:p-8 rounded-2xl md:rounded-3xl glass-card border border-white/40 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1",
                    index % 2 === 0 ? "mr-auto" : "ml-auto"
                )}>
                    <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                        <div className={cn("p-2 md:p-3 rounded-xl md:rounded-2xl shadow-sm", step.color)}>
                            {step.icon}
                        </div>
                        <span className="text-2xl md:text-4xl font-display font-bold text-slate-200/50 absolute top-3 right-4 md:top-4 md:right-6 pointer-events-none">
                            0{step.id}
                        </span>
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2 md:mb-3">{step.title}</h3>
                    <p className="text-sm md:text-base text-slate-600 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
