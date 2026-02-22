"use client";

import { useRef } from "react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !textRef.current) return;

    // Animate the text block revealing
    gsap.from(textRef.current.children, {
      y: 40,
      opacity: 0,
      stagger: 0.2,
      duration: 1,
      ease: "power4.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        toggleActions: "play none none none",
      },
    });
  }, []);

  return (
    <Section ref={sectionRef} className="py-24 md:py-32 bg-background relative overflow-hidden border-t border-border/50">
      {/* Decorative ambient lighting */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 -translate-x-1/2" />
      
      <Container>
        <div className="max-w-4xl mx-auto">
          <div ref={textRef} className="space-y-8 md:space-y-12">
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground tracking-tight">
              Why Choose <span className="text-gradient-gold">NextLevel?</span>
            </h2>

            <div className="space-y-6 text-lg md:text-xl text-muted-foreground leading-relaxed font-light">
              <p>
                At NextLevel Marketerz, a top of the line 360 agency in the Middle East, our services are unique because we believe in delivering nothing but the best. Starting from the very first phase of each project with a deep knowledge of your brand, which means each campaign is based on robust research, creativity, and strategic insights.
              </p>
              
              <p>
                We take the time and care in everything we do, from full-scale 360° branding campaigns to the smallest element of UX/UI design. That commitment to excellence has sprung us to the top of the minds of major brands, and <span className="font-semibold text-foreground bg-primary/10 px-2 py-0.5 rounded-md border border-primary/20">90% of our business comes from client referrals.</span>
              </p>

              <p>
                At NextLevel Marketerz, we seamlessly combine creativity, strategy, and cutting-edge technology (like AI & Next.js) to deliver tangible results. We want to make your brand shine by executing innovative digital marketing campaigns that directly impact your business growth.
              </p>
            </div>
            
          </div>
        </div>
      </Container>
    </Section>
  );
}
