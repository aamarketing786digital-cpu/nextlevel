"use client";

import { useRef } from "react";
import { BentoGrid, BentoGridItem } from "@/components/aceternity/bento-grid";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";
import { Bot, Code, TrendingUp, Palette, Search, Zap, Target, Globe as LucideGlobe } from "lucide-react";
import { Globe } from "@/components/ui/globe";
import { NeuralNetwork } from "@/components/ui/neural-network";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const valueProps = [
  {
    title: "AI-Powered Solutions",
    description: <div className="md:w-1/2">Leverage cutting-edge artificial intelligence to automate customer engagement, generate insights, and scale operations efficiently.</div>,
    icon: <Bot className="w-8 h-8" />,
    // Covers the full card but fades out at top-left to avoid text
    header: (
        <div 
            className="hidden md:block absolute inset-0 z-0 overflow-hidden" 
            style={{ 
                maskImage: "radial-gradient(circle at top left, transparent 0%, transparent 35%, black 60%)",
                WebkitMaskImage: "radial-gradient(circle at top left, transparent 0%, transparent 35%, black 60%)"
            }}
        >
            <NeuralNetwork density="high" className="opacity-100" />
        </div>
    ),
    colSpan: 2,
    rowSpan: 2,
  },
  {
    title: "Data-Driven Marketing",
    description: "Every decision backed by real-time analytics. Track, measure, and optimize your marketing spend for maximum ROI.",
    icon: <TrendingUp className="w-8 h-8" />,
    colSpan: 1,
  },
  {
    title: "Custom Web Development",
    description: "High-performance websites built with modern technologies that load fast, rank well, and convert visitors into customers.",
    icon: <Code className="w-8 h-8" />,
    colSpan: 1,
  },
  {
    title: "Premium Brand Design",
    description: "Visual identities that resonate. From logos to complete design systems, we create brands that stand out in crowded markets.",
    icon: <Palette className="w-8 h-8" />,
    colSpan: 1,
  },
  {
    title: "SEO Excellence",
    description: "Dominate search results with white-hat SEO strategies. Increase organic visibility and attract qualified leads consistently.",
    icon: <Search className="w-8 h-8" />,
    colSpan: 1,
  },
  {
    title: "Lightning Fast Results",
    description: "We move at startup speed. From concept to launch in weeks, not months. Time is your most valuable asset—we respect it.",
    icon: <Zap className="w-8 h-8" />,
    colSpan: 1,
  },
  {
    title: "Targeted Campaigns",
    description: "Reach the right audience at the right time. Our precision targeting ensures your message resonates with those who matter most.",
    icon: <Target className="w-8 h-8" />,
    colSpan: 1,
  },
  {
    title: "Global Reach",
    description: <div className="md:w-1/2">While we're rooted in the UAE, our strategies span the Middle East and beyond. Think global, act local.</div>,
    icon: <LucideGlobe className="w-8 h-8" />,
    colSpan: 2,
    header: <div className="hidden md:block absolute inset-0 md:inset-auto md:right-[-40%] md:bottom-[-100%] md:w-[100%] md:h-[200%] z-0 rounded-full overflow-hidden pointer-events-none opacity-20 md:opacity-40"><Globe className="opacity-100" /></div>,
  },
];

export function ValueProp() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!headingRef.current || !gridRef.current) return;

    // Animate heading
    gsap.from(headingRef.current.children, {
      y: 50,
      opacity: 0,
      stagger: 0.15,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    // Animate grid items with advanced stagger
    const gridItems = gridRef.current.querySelectorAll(".bento-item");
    if (gridItems.length > 0) {
      gsap.from(gridItems, {
        y: 100,
        scale: 0.8,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
        stagger: {
             amount: 0.5,
             grid: "auto",
             from: "center"
        },
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 85%", 
          toggleActions: "play none none none", 
        },
      });
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-28 bg-background relative overflow-hidden"
    >
      {/* Subtle background interaction */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent pointer-events-none opacity-50" />
      
      {/* Noise texture for premium feel */}
      <div className="absolute inset-0 noise-overlay opacity-[0.03] pointer-events-none" />

      <Container className="relative z-10">
        <div ref={headingRef} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <span className="text-xs font-bold text-primary uppercase tracking-wider">Why Us</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6">
            Why Choose <span className="text-gradient-gold">NextLevel</span>?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            We combine creativity, technology, and data to deliver results that
            transform businesses. Here's what sets us apart.
          </p>
        </div>

        <div ref={gridRef} className="mx-auto max-w-[90rem]">
          <BentoGrid>
              {valueProps.map((prop, index) => (
                <div 
                  key={index} 
                  className={cn(
                    "bento-item h-full", 
                    prop.colSpan === 2 ? "md:col-span-2" : "",
                    prop.rowSpan === 2 ? "md:row-span-2" : ""
                  )}
                >
                  <BentoGridItem
                    title={prop.title}
                    description={prop.description}
                    icon={prop.icon}
                    colSpan={prop.colSpan}
                    rowSpan={prop.rowSpan}
                    header={prop.header}
                    className={cn(
                      "bg-white/60 backdrop-blur-xl border-black/5 hover:border-primary/30 shadow-sm hover:shadow-luxury transition-all duration-500",
                      "dark:bg-surface-glass/60 dark:border-white/10"
                    )}
                  />
                </div>
              ))}
          </BentoGrid>
        </div>

        {/* Call to action */}
        <div className="text-center mt-20 opacity-0 animate-cta">
          <a
            href="/contact"
            className="group relative inline-flex items-center justify-center px-10 py-5 bg-foreground text-background rounded-full font-bold hover:bg-primary hover:text-foreground transition-all duration-300 hover:shadow-luxury hover:-translate-y-1 overflow-hidden"
          >
            <span className="relative z-10">Start Your Transformation</span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </a>
        </div>
      </Container>

      <style>{`
        .animate-cta {
          animation: fadeUp 0.8s ease-out 1s forwards;
        }
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
