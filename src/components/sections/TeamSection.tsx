"use client";

import { useRef } from "react";
import { TeamMemberCard } from "./TeamMemberCard";
import { TEAM_MEMBERS } from "@/lib/constants";
import { Container } from "@/components/layout/Container";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function TeamSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Sort team members by order
  const sortedTeam = [...TEAM_MEMBERS].sort((a, b) => (a.order || 0) - (b.order || 0));

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

    // Animate team cards with ScrollTrigger.batch for staggered reveal
    const cards = gridRef.current.querySelectorAll(".team-member-card");
    if (cards.length > 0) {
      gsap.from(cards, {
        y: 60,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });
    }
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-background border-t border-border">
      <Container>
        <div ref={headingRef} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
            Meet <span className="text-gradient-gold">The Visionaries</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A diverse team of experts passionate about driving digital
            transformation across the Middle East.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {sortedTeam.map((member, index) => (
            <div key={member.id} className="team-member-card">
              <TeamMemberCard member={member} index={index} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
