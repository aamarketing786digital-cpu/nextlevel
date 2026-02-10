"use client";

import { useRef } from "react";
import { CaseStudyCard } from "./CaseStudyCard";
import { CASE_STUDIES } from "@/lib/constants";
import { Container } from "@/components/layout/Container";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

// Register ScrollTrigger with normalizeScroll for mobile smooth scrolling
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.normalizeScroll(true);
}

interface CaseStudiesProps {
  limit?: number;
  featured?: boolean;
}

export function CaseStudies({ limit, featured }: CaseStudiesProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  let filteredStudies = CASE_STUDIES;

  if (featured) {
    filteredStudies = CASE_STUDIES.filter((s) => s.featured);
  }

  if (limit) {
    filteredStudies = filteredStudies.slice(0, limit);
  }

  useGSAP(() => {
    if (!sectionRef.current || !headingRef.current || !gridRef.current) return;

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

    // Animate case study cards
    const cards = gridRef.current.querySelectorAll(".case-study-card");
    if (cards.length > 0) {
      gsap.from(cards, {
        y: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });
    }

    // Cleanup function for ScrollTrigger
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === sectionRef.current || trigger.trigger === gridRef.current) {
          trigger.kill();
        }
      });
    };
  }, [featured, limit]);

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-background border-t border-border">
      <Container>
        <div ref={headingRef} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
            Our <span className="text-gradient-gold">Work</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real results for real businesses. Explore our case studies to see how
            we've helped companies achieve their goals.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredStudies.map((caseStudy, index) => (
            <div key={caseStudy.id} className="case-study-card">
              <CaseStudyCard caseStudy={caseStudy} index={index} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
