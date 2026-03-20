"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import type { Service } from "@/types";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2, ArrowRight, Sparkles, TrendingUp, ChevronRight } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";
import { SERVICES } from "@/lib/constants";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ServiceDetailClientProps {
  service: Service;
}

const getFAQs = (serviceTitle: string) => [
  {
    question: `What makes your ${serviceTitle} service different?`,
    answer: `We combine cutting-edge technology with deep industry expertise to deliver ${serviceTitle} solutions that drive real business results. Our team stays ahead of trends and focuses on metrics that matter.`,
  },
  {
    question: `How long does a typical ${serviceTitle} project take?`,
    answer: `Timeline varies based on scope and complexity. Most projects range from 2-12 weeks. We'll provide a detailed timeline during our initial consultation based on your specific requirements.`,
  },
  {
    question: `What's included in your ${serviceTitle} pricing?`,
    answer: `Our pricing includes strategy, execution, reporting, and ongoing support. We're transparent about costs and deliverables. Contact us for a custom quote based on your needs.`,
  },
  {
    question: `Do you work with businesses of all sizes?`,
    answer: `Yes! We serve startups, SMEs, and enterprise clients. We scale our approach to match your budget and goals while maintaining the same quality standards.`,
  },
];

export function ServiceDetailClient({ service }: ServiceDetailClientProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  const heroContainerRef = useRef<HTMLDivElement>(null);
  const statsContainerRef = useRef<HTMLDivElement>(null);
  const processContainerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const featureContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Hero Animations (Text Reveal & Parallax Orbs)
  useGSAP(() => {
    if (!isLoaded) return;

    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    // Parallax Orbs
    gsap.to(".hero-orb-1", {
      y: -50,
      x: 30,
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
    
    gsap.to(".hero-orb-2", {
      y: 40,
      x: -40,
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // Staggered Text Reveal
    tl.fromTo(".service-hero-badge", { y: 30, opacity: 0, filter: "blur(10px)" }, { y: 0, opacity: 1, filter: "blur(0px)", duration: 1 })
      .fromTo(".service-hero-title-word", { y: 60, opacity: 0, rotationX: -20 }, { y: 0, opacity: 1, rotationX: 0, duration: 1, stagger: 0.1 }, "-=0.6")
      .fromTo(".service-hero-desc", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, "-=0.6")
      .fromTo(".service-hero-cta", { y: 20, opacity: 0, scale: 0.95 }, { y: 0, opacity: 1, scale: 1, duration: 0.8 }, "-=0.4");

  }, { scope: heroContainerRef, dependencies: [isLoaded] });

  // Stats Counters
  useGSAP(() => {
    if (!isLoaded) return;

    const statsNumbers = gsap.utils.toArray<HTMLElement>(".stat-value");
    
    statsNumbers.forEach((stat) => {
      const targetValue = parseInt(stat.getAttribute("data-value") || "0", 10);
      if(isNaN(targetValue)) return; // Skip if it's not a pure number (like "$5k")

      gsap.fromTo(stat, 
        { innerHTML: 0 },
        {
          innerHTML: targetValue,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: statsContainerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          snap: { innerHTML: 1 },
          onUpdate: function() {
              if (stat.getAttribute("data-suffix")) {
                  stat.innerHTML = Math.round(Number(this.targets()[0].innerHTML)) + (stat.getAttribute("data-suffix") || "");
              }
          }
        }
      );
    });

    gsap.fromTo(".service-stat-card",
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        scrollTrigger: {
          trigger: ".service-stats-section",
          start: "top 80%",
          toggleActions: "play none none reverse",
        }
      }
    );
  }, { scope: statsContainerRef, dependencies: [isLoaded] });

  // Process Timeline Scrub
  useGSAP(() => {
    if (!isLoaded || !processContainerRef.current || !lineRef.current) return;

    const items = gsap.utils.toArray<HTMLElement>(".process-step");

    // Line Animation
    gsap.fromTo(
      lineRef.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: processContainerRef.current,
          start: "top center",
          end: "bottom center",
          scrub: true,
          fastScrollEnd: true,
        },
      }
    );

    // Staggered Steps
    items.forEach((item) => {
      gsap.fromTo(
        item,
        { opacity: 0, x: item.classList.contains("md:flex-row") ? -40 : 40 },
        {
          opacity: 1,
          x: 0,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%", 
            toggleActions: "play none none reverse",
            fastScrollEnd: true,
          },
        }
      );
    });
  }, { scope: processContainerRef, dependencies: [isLoaded] });

  // Bento Grid Features
  useGSAP(() => {
    if (!isLoaded) return;

    gsap.fromTo(".feature-card", 
      { y: 40, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".features-section",
          start: "top 75%",
          fastScrollEnd: true
        }
      }
    );
  }, { scope: featureContainerRef, dependencies: [isLoaded] });

  if (!service) {
    notFound();
  }

  const faqs = getFAQs(service.title);
  const relatedServices = SERVICES.filter(s => s.slug !== service.slug).slice(0, 3);

  // Helper to visually extract numeric values for counter animations
  const parseStat = (val: string) => {
    const numMatch = val.match(/[\d.]+/);
    const suffixStr = val.replace(/[\d.]+/g, '');
    return {
      num: numMatch ? parseInt(numMatch[0].replace('.', '')) : val, // Fallback to raw string if no numbers
      suffix: suffixStr,
      isNumber: !!numMatch
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 font-sans selection:bg-primary/30 selection:text-primary">
      
      {/* 1. Epicenter: Hero Section (God-Tier Dark) */}
      <section ref={heroContainerRef} className="relative min-h-[85vh] flex items-center justify-center overflow-hidden section-dark">
        {/* Cinematic Parallax Orbs */}
        <div className="absolute inset-0 bg-[#020617]" />
        {/* AI Generated Service Background */}
        <div className="absolute inset-0 bg-[url('/images/services-hero.png')] bg-cover bg-center opacity-20 mix-blend-screen pointer-events-none" />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
        <div className="hero-orb-1 absolute top-[-10%] right-[10%] w-[600px] h-[600px] bg-amber-500/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="hero-orb-2 absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

        <Container className="relative z-10 pt-32 pb-20">
          <div className="max-w-5xl mx-auto text-center flex flex-col items-center">
            
            <Link
              href="/services"
              className="service-hero-badge group inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-sm text-slate-300 hover:text-white hover:bg-white/10 transition-all mb-8"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Services
            </Link>

            <div className="service-hero-badge inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-500/20 to-primary/5 border border-amber-500/20 backdrop-blur-xl mb-8 shadow-[0_0_30px_rgba(251,191,36,0.15)]">
              <Sparkles className="w-10 h-10 text-amber-400" />
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-medium text-white mb-8 leading-[1.1] tracking-tight">
              {service.title.split(' ').map((word, i) => (
                <span key={i} className="service-hero-title-word inline-block mr-4 last:mr-0 drop-shadow-2xl">
                  {word}
                </span>
              ))}
            </h1>

            <p className="service-hero-desc text-xl md:text-2xl text-slate-400 font-light max-w-3xl mx-auto mb-12 leading-relaxed">
              {service.description}
            </p>

            {/* Glassmorphic Dock CTAs */}
            <div className="service-hero-cta flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center p-3 sm:p-2 rounded-[2rem] sm:rounded-full border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl w-full sm:w-auto max-w-xs sm:max-w-none mx-auto sm:mx-0">
              <Button
                asChild
                size="lg"
                className="rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all duration-300 text-base sm:text-lg px-6 h-12 sm:h-14 font-medium"
              >
                <Link href="/contact" className="w-full sm:w-auto justify-center">
                  Start Project <ArrowRight className="ml-2 h-5 w-5 shrink-0" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="ghost"
                className="rounded-full hover:bg-white/10 text-white transition-all text-base sm:text-lg px-6 h-12 sm:h-14 font-medium"
              >
                <Link href="/work" className="w-full sm:w-auto justify-center">View Portfolio</Link>
              </Button>
            </div>
          </div>
        </Container>

        {/* Cinematic Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
          <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-amber-400 to-transparent" />
        </div>
      </section>

      {/* 2. Stats Section (Dynamic Counters - Light Theme) */}
      {service.stats && service.stats.length > 0 && (
        <section ref={statsContainerRef} className="service-stats-section py-20 bg-white border-y border-slate-200 relative z-20">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {service.stats.map((stat, index) => {
                const parsed = parseStat(stat.value);
                return (
                  <div
                    key={index}
                    className="service-stat-card glass-card rounded-3xl p-10 text-center flex flex-col items-center justify-center group"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500/10 to-transparent border border-amber-500/20 mb-6 group-hover:scale-110 transition-transform duration-500">
                      <TrendingUp className="w-8 h-8 text-amber-500" />
                    </div>
                    <div className="text-5xl md:text-6xl font-display font-medium text-slate-950 mb-4 tracking-tight">
                      {parsed.isNumber ? (
                        <span 
                          className="stat-value text-gradient-gold drop-shadow-sm" 
                          data-value={parsed.num} 
                          data-suffix={parsed.suffix}
                        >
                          0{parsed.suffix}
                        </span>
                      ) : (
                         <span className="text-gradient-gold drop-shadow-sm">{stat.value}</span>
                      )}
                    </div>
                    <div className="text-lg text-slate-600 font-light">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </Container>
        </section>
      )}

      {/* 3. Process Section (GSAP Scroll Scrub - Light Theme) */}
      {service.process && service.process.length > 0 && (
        <section ref={processContainerRef} className="process-section py-32 bg-slate-50 relative">
          <Container>
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-24">
                <span className="text-amber-600 font-medium tracking-widest uppercase text-sm mb-4 block">The Pipeline</span>
                <h2 className="text-4xl md:text-6xl font-display font-medium text-slate-900 mb-6">
                  Our Proven Process
                </h2>
                <p className="text-xl text-slate-600 font-light">
                  A data-driven methodology that eliminates guesswork.
                </p>
              </div>

              <div className="relative">
                {/* Track Line */}
                <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-slate-200 -translate-x-[1px]" />
                {/* Fill Line */}
                <div 
                  ref={lineRef}
                  className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-amber-400 via-amber-500 to-amber-600 origin-top -translate-x-[1px] shadow-[0_0_15px_rgba(251,191,36,0.3)]" 
                />

                <div className="space-y-24">
                  {service.process.map((step, index) => (
                    <div
                      key={index}
                      className={cn(
                        "process-step relative flex flex-col md:flex-row gap-8 items-center",
                        index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                      )}
                    >
                      {/* Node */}
                      <div className="absolute left-8 md:left-1/2 -translate-x-[15px] md:-translate-x-1/2 w-8 h-8 rounded-full border-[4px] border-white bg-slate-100 flex items-center justify-center z-10 shadow-md">
                        <div className="w-2 h-2 rounded-full bg-amber-500" />
                      </div>

                      {/* Content */}
                      <div className={cn("ml-20 md:ml-0 md:w-[45%]", index % 2 === 0 ? "md:pr-12" : "md:pl-12")}>
                        <div className="bg-white border border-slate-200 shadow-sm rounded-3xl p-8 hover:border-amber-500/30 hover:shadow-md transition-all duration-500">
                          <span className="text-slate-100 font-display font-bold text-6xl absolute top-4 right-6 pointer-events-none">
                            0{index + 1}
                          </span>
                          <h3 className="text-2xl font-display font-medium text-slate-900 mb-4 relative z-10">
                            {step.title}
                          </h3>
                          <p className="text-slate-600 font-light leading-relaxed relative z-10">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* 4. Features Section (Premium Bento Grid - Light Theme) */}
      <section ref={featureContainerRef} className="features-section py-32 bg-white relative overflow-hidden">
        {/* Subtle radial gradient background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />

        <Container className="relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-display font-medium text-slate-900 mb-6">
                What&apos;s Included
              </h2>
              <p className="text-xl text-slate-600 font-light">
                Comprehensive solutions tailored for luxury and scale.
              </p>
            </div>

            {/* Asymmetric Bento Grid */}
            <div className="grid grid-flow-dense grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 sm:auto-rows-[220px] lg:auto-rows-[250px] gap-4 sm:gap-6">
              {service.features.map((feature, index) => {
                const total = service.features.length;
                
                // Track if it's considered a "large" card for font sizing
                let isLargeCard = false;
                let colSpan = "col-span-1";
                let rowSpan = "row-span-1";

                if (total === 3) {
                    if (index === 0) { colSpan = "sm:col-span-2 lg:col-span-2"; rowSpan = "sm:row-span-2"; isLargeCard = true; }
                    else if (index === 1) { colSpan = "sm:col-span-2 lg:col-span-2"; rowSpan = "row-span-1"; }
                    else if (index === 2) { colSpan = "sm:col-span-2 lg:col-span-2"; rowSpan = "row-span-1"; }
                } else if (total === 4) {
                    if (index === 0) { colSpan = "sm:col-span-2 lg:col-span-2"; rowSpan = "sm:row-span-2"; isLargeCard = true; }
                    else if (index === 1) { colSpan = "sm:col-span-2 lg:col-span-2"; rowSpan = "row-span-1"; }
                    else if (index === 2) { colSpan = "sm:col-span-1 lg:col-span-1"; rowSpan = "row-span-1"; }
                    else if (index === 3) { colSpan = "sm:col-span-1 lg:col-span-1"; rowSpan = "row-span-1"; }
                } else if (total === 5) {
                    // 1 large 2x2 hero card, and 4 square 1x1 cards evenly tiling
                    if (index === 0) { colSpan = "sm:col-span-2 lg:col-span-2"; rowSpan = "sm:row-span-2"; isLargeCard = true; }
                    else if (index === 1) { colSpan = "sm:col-span-1 lg:col-span-1"; rowSpan = "row-span-1"; }
                    else if (index === 2) { colSpan = "sm:col-span-1 lg:col-span-1"; rowSpan = "row-span-1"; }
                    else if (index === 3) { colSpan = "sm:col-span-1 lg:col-span-1"; rowSpan = "row-span-1"; }
                    else if (index === 4) { colSpan = "sm:col-span-1 lg:col-span-1"; rowSpan = "row-span-1"; }
                } else if (total === 6) {
                    // 1 large 2x2 hero card, and mixture of wide/square to tile perfectly
                    if (index === 0) { colSpan = "sm:col-span-2 lg:col-span-2"; rowSpan = "sm:row-span-2"; isLargeCard = true; }
                    else if (index === 1) { colSpan = "sm:col-span-2 lg:col-span-2"; rowSpan = "row-span-1"; }
                    else if (index === 2) { colSpan = "sm:col-span-1 lg:col-span-1"; rowSpan = "row-span-1"; }
                    else if (index === 3) { colSpan = "sm:col-span-1 lg:col-span-1"; rowSpan = "row-span-1"; }
                } else if (total === 7) {
                    // Pattern for 7 items perfectly tiling a 4-col dense grid
                    // |0    |1    |
                    // |0    |2    |
                    // |3 |4 |5    |
                    // |6          | <-- 6 spans full width to finish row cleanly
                    if (index === 0) { colSpan = "sm:col-span-2 lg:col-span-2"; rowSpan = "sm:row-span-2"; isLargeCard = true; }
                    else if (index === 1) { colSpan = "sm:col-span-2 lg:col-span-2"; rowSpan = "row-span-1"; }
                    else if (index === 2) { colSpan = "sm:col-span-2 lg:col-span-2"; rowSpan = "row-span-1"; }
                    else if (index === 3) { colSpan = "sm:col-span-1 lg:col-span-1"; rowSpan = "row-span-1"; }
                    else if (index === 4) { colSpan = "sm:col-span-1 lg:col-span-1"; rowSpan = "row-span-1"; }
                    else if (index === 5) { colSpan = "sm:col-span-2 lg:col-span-2"; rowSpan = "sm:row-span-2"; isLargeCard = true; }
                    else if (index === 6) { colSpan = "sm:col-span-4 lg:col-span-4"; rowSpan = "row-span-1"; }
                } else if (total === 8) {
                    // Pattern for 8 items perfectly tiling
                    // |0    |1    |
                    // |0    |2    |
                    // |3 |4 |5    |
                    // |6    |5    | 
                    // |7          | <-- 7 spans full 4-col width perfectly anchoring the grid
                    if (index === 0) { colSpan = "sm:col-span-2 lg:col-span-2"; rowSpan = "sm:row-span-2"; isLargeCard = true; }
                    else if (index === 1) { colSpan = "sm:col-span-2 lg:col-span-2"; rowSpan = "row-span-1"; }
                    else if (index === 2) { colSpan = "sm:col-span-2 lg:col-span-2"; rowSpan = "row-span-1"; }
                    else if (index === 3) { colSpan = "sm:col-span-1 lg:col-span-1"; rowSpan = "row-span-1"; }
                    else if (index === 4) { colSpan = "sm:col-span-1 lg:col-span-1"; rowSpan = "row-span-1"; }
                    else if (index === 5) { colSpan = "sm:col-span-2 lg:col-span-2"; rowSpan = "sm:row-span-2"; isLargeCard = true; }
                    else if (index === 6) { colSpan = "sm:col-span-2 lg:col-span-2"; rowSpan = "row-span-1"; }
                    else if (index === 7) { colSpan = "sm:col-span-4 lg:col-span-4"; rowSpan = "row-span-1"; }
                } else {
                    // Generic asymmetric fallback rules (Total > 8)
                    const isLastOddItem = index === total - 1 && total % 2 !== 0;
                    const mod = index % 5;
                    if (mod === 0) { colSpan = "sm:col-span-2 lg:col-span-2"; rowSpan = "sm:row-span-2"; isLargeCard = true; }
                    else if (mod === 1 || mod === 2) { colSpan = "sm:col-span-2 lg:col-span-2"; rowSpan = "row-span-1"; }
                    else if (isLastOddItem) { colSpan = "sm:col-span-4 lg:col-span-4"; rowSpan = "row-span-1"; }
                    else { colSpan = "sm:col-span-1 lg:col-span-1"; rowSpan = "row-span-1"; }
                }

                const isFullWidth = colSpan.includes("col-span-4");

                return (
                  <div
                    key={index}
                    className={cn(
                      "feature-card group relative overflow-hidden rounded-[2rem] border transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] flex flex-col p-6 lg:p-8 min-h-[240px] sm:min-h-0",
                      colSpan,
                      rowSpan,
                      "hover:scale-[1.01] hover:z-20",
                      // 30% Selective Coloring Logic
                      (index === 0 || index === 5)
                        ? (index === 0 ? "bg-slate-950 border-white/10 text-white shadow-[0_20px_50px_rgba(0,0,0,0.4)]" 
                                      : "bg-gradient-to-br from-amber-400 to-amber-600 border-amber-400/50 text-slate-950 shadow-[0_25px_60px_rgba(245,158,11,0.2)]")
                        : "bg-white border-slate-200 text-slate-900 shadow-[0_20px_50px_rgba(0,0,0,0.03)]"
                    )}
                  >
                    {/* Elite Shimmer Effect */}
                    <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
                    
                    {/* Sophisticated Background Index */}
                    <div className={cn(
                      "absolute top-6 right-8 font-display font-black text-6xl tracking-tighter opacity-[0.03] select-none pointer-events-none group-hover:opacity-[0.08] transition-all duration-700 group-hover:-translate-y-1",
                      index === 0 ? "text-white" : "text-slate-950"
                    )}>
                      {(index + 1).toString().padStart(2, '0')}
                    </div>

                    <div className={cn(
                      "relative z-10 flex flex-col h-full",
                      isFullWidth && "items-center text-center max-w-4xl mx-auto"
                    )}>
                      {/* Premium Status Badge */}
                      <div className={cn("flex mb-6", isFullWidth && "justify-center")}>
                        <div className={cn(
                          "inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] transition-all duration-500 shadow-sm",
                          (index === 0 || index === 5) && index === 0 ? "bg-white/5 text-primary border border-white/10" :
                          (index === 0 || index === 5) && index !== 0 ? "bg-black/10 text-slate-950 border border-black/10" :
                          "bg-slate-50 text-slate-500 border border-slate-200"
                        )}>
                          <div className={cn(
                            "w-1.5 h-1.5 rounded-full animate-pulse",
                            (index === 0 || index === 5) && index !== 0 ? "bg-slate-950" : "bg-primary"
                          )} />
                          {index % 4 === 0 ? "Performance" : index % 4 === 1 ? "Strategic" : index % 4 === 2 ? "Optimization" : "Scale"}
                        </div>
                      </div>

                      <div className={cn("space-y-3 mt-auto", isFullWidth && "space-y-4")}>
                        <h3 className={cn(
                          "font-display font-bold leading-[1.15] tracking-tight transition-all duration-500 text-balance",
                          isLargeCard ? "text-2xl lg:text-4xl" : "text-lg lg:text-2xl",
                          isFullWidth && "text-3xl lg:text-5xl"
                        )}>
                          {feature}
                        </h3>
                        
                        <p className={cn(
                          "text-[13px] font-light leading-snug group-hover:opacity-100 transition-opacity duration-500",
                          (index === 0 || index === 5) && index !== 0 ? "text-slate-950/70" : "text-slate-400/80",
                          isFullWidth ? "max-w-2xl text-base" : "max-w-[260px]"
                        )}>
                          {index % 3 === 0 ? "Elite digital architectures for global scale." : 
                           index % 3 === 1 ? "Data-driven intelligence for massive growth." : 
                           "Fine-tuned for high-conversion experience."}
                        </p>

                        <div className={cn(
                          "flex items-center gap-3 pt-3 group-hover:gap-4 transition-all duration-500",
                          (index === 0 || index === 5) && index !== 0 ? "text-slate-950" : "text-primary",
                          isFullWidth && "justify-center"
                        )}>
                          <div className={cn(
                            "h-[2px] w-8 rounded-full transition-all duration-500 shadow-sm",
                            (index === 0 || index === 5) && index !== 0 ? "bg-slate-950" : "bg-primary"
                          )} />
                          <Sparkles className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* 5. Removed Pricing Section */}

      {/* 6. FAQ Section (Light Theme) */}
      <section className="py-24 bg-white border-t border-slate-100">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-display font-medium text-slate-900 mb-6 tracking-tight">
                Service FAQs
              </h2>
            </div>

            <Accordion type="single" collapsible className="space-y-6">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-slate-50 border border-slate-200 shadow-sm hover:shadow-md rounded-2xl px-8 data-[state=open]:border-amber-500 data-[state=open]:bg-white transition-all duration-300"
                >
                  <AccordionTrigger className="text-left text-xl font-medium text-slate-900 hover:no-underline py-6 [&[data-state=open]]:text-amber-600">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-lg text-slate-600 font-light pb-8 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Container>
      </section>

      {/* 7. Related Services (Light Theme) */}
      {relatedServices.length > 0 && (
        <section className="py-32 bg-slate-50 border-t border-slate-200">
          <Container>
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                <div>
                  <h2 className="text-4xl md:text-5xl font-display font-medium text-slate-900 mb-4 tracking-tight">
                    Explore Further
                  </h2>
                  <p className="text-xl text-slate-600 font-light">
                    Discover complementary services to accelerate your growth.
                  </p>
                </div>
                <Link href="/services" className="text-amber-600 hover:text-amber-700 flex items-center gap-2 font-medium transition-colors">
                  View All Services <ArrowRight className="w-5 h-5" />
                </Link>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {relatedServices.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/services/${related.slug}`}
                    className="group bg-white border border-slate-200 shadow-sm rounded-3xl p-8 hover:-translate-y-2 hover:shadow-xl transition-all duration-500"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center mb-8 group-hover:bg-amber-50 group-hover:border-amber-200 transition-all duration-500">
                      <Sparkles className="w-8 h-8 text-slate-400 group-hover:text-amber-500 transition-colors" />
                    </div>
                    <h3 className="text-2xl font-display font-medium text-slate-900 mb-4 group-hover:text-amber-600 transition-colors">
                      {related.title}
                    </h3>
                    <p className="text-slate-600 font-light leading-relaxed mb-8">
                      {related.shortDescription}
                    </p>
                    <div className="flex items-center text-amber-500 font-medium">
                      Learn More
                      <ChevronRight className="w-5 h-5 ml-1 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* 8. Final CTA Line (Light Theme) */}
      <section className="py-32 bg-white border-t border-slate-200 relative overflow-hidden">
        {/* Decorative corner light burst */}
        <div className="absolute -bottom-1/2 -right-1/4 w-[800px] h-[800px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
        
        <Container className="relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-5xl md:text-7xl font-display font-medium text-slate-900 mb-10 tracking-tight">
              Ready to elevate your <span className="text-gradient-gold">standards?</span>
            </h2>
            <Button
              asChild
              size="lg"
              className="rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-medium text-lg px-12 h-16 shadow-[0_0_40px_rgba(251,191,36,0.3)] hover:shadow-[0_0_40px_rgba(251,191,36,0.5)] transition-all duration-500 hover:scale-105"
            >
              <Link href="/contact">
                Start Your Project
              </Link>
            </Button>
          </div>
        </Container>
      </section>
    </main>
  );
}
