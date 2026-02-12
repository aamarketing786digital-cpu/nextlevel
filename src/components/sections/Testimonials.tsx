"use client";

import { useRef } from "react";
import { Container } from "@/components/layout/Container";
import { TESTIMONIALS } from "@/lib/constants";
import { TestimonialMarquee } from "@/components/aceternity/testimonial-marquee";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    // Initial reveal animation with ScrollTrigger (Fade In Elements)
    gsap.from(sectionRef.current.querySelectorAll(".testimonial-element"), {
      y: 50,
      opacity: 0,
      stagger: 0.15,
      duration: 0.8,
      delay: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    // Text Reveal (Curtain Effect)
    const splitText = sectionRef.current.querySelectorAll(".reveal-text");
    splitText.forEach((el) => {
        gsap.fromTo(el, 
            { y: "100%" },
            { 
                y: "0%", 
                duration: 1, 
                ease: "power3.out", 
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%",
                    toggleActions: "play none none none"
                } 
            }
        );
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-28 relative overflow-hidden bg-slate-50/50"
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-radial from-slate-200/40 via-transparent to-transparent pointer-events-none" />

      <Container className="relative z-10 mb-16">
        <div className="text-center w-full max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-slate-900 mb-6 flex justify-center items-center gap-x-3 gap-y-2 flex-wrap w-full">
            <div className="overflow-hidden"><div className="reveal-text pb-3">Trusted</div></div>
            <div className="overflow-hidden"><div className="reveal-text pb-3">by</div></div>
            <div className="overflow-hidden"><div className="reveal-text pb-3"><span className="text-primary">Visionaries</span></div></div>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto testimonial-element">
            Join the ranks of industry leaders who have transformed their digital presence with our AI-driven strategies.
          </p>
        </div>
      </Container>

      {/* Infinite Marquee - Row 1 (Left) */}
      <div className="testimonial-element relative w-full mb-8">
         <TestimonialMarquee items={TESTIMONIALS} direction="right" speed="slow" />
      </div>

       {/* Infinite Marquee - Row 2 (Right) */}
      <div className="testimonial-element relative w-full">
         <TestimonialMarquee items={[...TESTIMONIALS].reverse()} direction="left" speed="slow" />
      </div>
    </section>
  );
}
