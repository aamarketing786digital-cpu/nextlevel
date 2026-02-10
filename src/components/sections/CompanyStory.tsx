"use client";

import { useRef } from "react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Sparkles, Target, Rocket, TrendingUp } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function CompanyStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const storyItemsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !headingRef.current || !storyItemsRef.current) return;

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

    // Animate story items
    const items = storyItemsRef.current.children;
    gsap.from(items, {
      x: -50,
      opacity: 0,
      stagger: 0.2,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: storyItemsRef.current,
        start: "top 75%",
        toggleActions: "play none none none",
      },
    });
  }, []);

  return (
    <Section ref={sectionRef} className="py-16 md:py-24 bg-muted/30">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div ref={headingRef} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
              Born to <span className="text-gradient-gold">Disrupt</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Our journey from ambitious startup to industry leader
            </p>
          </div>

          <div ref={storyItemsRef} className="space-y-8">
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">The Beginning</h3>
                <p className="text-muted-foreground">
                  Founded in Dubai with a simple mission: bring world-class digital
                  marketing and technology solutions to the Middle East. We saw a gap
                  in the market—agencies that either excelled at creative or
                  technology, but rarely both. We set out to change that.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Our Philosophy</h3>
                <p className="text-muted-foreground">
                  We believe in the power of data-driven creativity. Every decision
                  we make is backed by analytics, every campaign optimized for
                  measurable results. We don't just execute—we strategize, test,
                  learn, and iterate until we achieve exceptional outcomes.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <Rocket className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Growth & Evolution</h3>
                <p className="text-muted-foreground">
                  From a small team working out of a Dubai office to serving
                  clients across the UAE, Saudi Arabia, and beyond. We've grown by
                  delivering results that speak for themselves—300% increases in
                  conversions, 70% reductions in support costs, and millions in
                  revenue generated for our clients.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">The Future</h3>
                <p className="text-muted-foreground">
                  We're just getting started. With AI-powered solutions, advanced
                  automation, and a relentless focus on excellence, we're poised to
                  lead the digital transformation of businesses across the Middle
                  East. Join us on this journey.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
