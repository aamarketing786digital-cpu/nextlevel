"use client";

import { useRef } from "react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Award, Shield, Zap } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const values = [
  {
    icon: <Award className="w-12 h-12" />,
    title: "Excellence",
    description:
      "We don't settle for good enough. Every project we undertake receives our absolute best effort, attention to detail, and commitment to quality.",
  },
  {
    icon: <Shield className="w-12 h-12" />,
    title: "Integrity",
    description:
      "Transparency, honesty, and ethical practices guide everything we do. Our clients trust us because we've earned it through consistent, principled behavior.",
  },
  {
    icon: <Zap className="w-12 h-12" />,
    title: "Speed",
    description:
      "In the digital world, speed matters. We move fast without sacrificing quality, delivering results in weeks, not months, because time is your most valuable asset.",
  },
];

export function Values() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

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

    // Animate value cards with staggered reveal
    const cards = gridRef.current.querySelectorAll(".value-card");
    if (cards.length > 0) {
      gsap.from(cards, {
        y: 60,
        opacity: 0,
        scale: 0.9,
        stagger: 0.15,
        duration: 0.6,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });
    }
  }, []);

  return (
    <Section ref={sectionRef} className="py-16 md:py-24 bg-background">
      <Container>
        <div ref={headingRef} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
            Our <span className="text-gradient-gold">Values</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The principles that guide every decision we make and every project we
            undertake.
          </p>
        </div>

        <div ref={gridRef} className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="value-card text-center p-8 bg-card rounded-2xl border border-border/50 hover:border-primary/50 transition-colors shadow-luxury hover:shadow-luxury-lg"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 mb-6 text-primary">
                {value.icon}
              </div>
              <h3 className="text-xl font-bold mb-4">{value.title}</h3>
              <p className="text-muted-foreground">{value.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
