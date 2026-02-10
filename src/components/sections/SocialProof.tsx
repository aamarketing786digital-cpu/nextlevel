"use client";

import { useRef } from "react";
import { Container } from "@/components/layout/Container";
import { InfiniteMovingCards } from "@/components/aceternity/infinite-moving-cards";
import { CLIENT_LOGOS } from "@/lib/constants";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function SocialProof() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  // Duplicate logos for seamless infinite scroll
  const scrollItems = [...CLIENT_LOGOS, ...CLIENT_LOGOS];

  useGSAP(() => {
    if (!headingRef.current) return;

    // GSAP ScrollTrigger fade-in animation
    gsap.from(headingRef.current.children, {
      y: 40,
      opacity: 0,
      stagger: 0.15,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-24 bg-background border-b border-border/50"
    >
      {/* Gradient transition from dark hero above */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-secondary to-transparent pointer-events-none" />

      <Container className="relative z-10">
        <div ref={headingRef} className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We've helped businesses across the UAE and Middle East achieve their
            digital transformation goals.
          </p>
        </div>

        <InfiniteMovingCards
          items={scrollItems}
          direction="left"
          speed="normal"
          pauseOnHover={true}
        />
      </Container>
    </section>
  );
}
