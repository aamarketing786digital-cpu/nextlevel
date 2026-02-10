"use client";

import { useRef } from "react";
import { Container } from "@/components/layout/Container";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import Image from "next/image";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function FounderNote() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !imageRef.current || !textRef.current) return;

    // Parallax Image
    gsap.to(imageRef.current, {
      yPercent: 20,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    // Text Reveal (Curtain Effect)
    const splitText = textRef.current.querySelectorAll(".reveal-text");
    splitText.forEach((el) => {
        gsap.fromTo(el, 
            { y: "100%" },
            { 
                y: "0%", 
                duration: 1, 
                ease: "power3.out", 
                scrollTrigger: {
                    trigger: el,
                    start: "top 80%",
                    toggleActions: "play none none none"
                } 
            }
        );
    });
    
    // Fade in other elements
    gsap.from(textRef.current.querySelectorAll(".fade-in"), {
      opacity: 0,
      y: 20,
      stagger: 0.1,
      duration: 1,
      delay: 0.2, // Wait for curtain
      scrollTrigger: {
        trigger: textRef.current,
        start: "top 70%",
      },
    });
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 section-light bg-slate-50 relative overflow-hidden">
      {/* Background Noise/Gradient */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Image (Parallax) */}
          <div className="relative h-[600px] w-full overflow-hidden rounded-2xl shadow-2xl">
             <div ref={imageRef} className="absolute inset-0 w-full h-[120%] -top-[10%]">
                {/* Placeholder for Founder Image - Using a high-quality abstract or business portrait */}
                <Image 
                  src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2071&auto=format&fit=crop" 
                  alt="Founder Vision"
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
             </div>
             {/* Overlay - Gradient only at bottom for text visibility */}
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
             
             <div className="absolute bottom-8 left-8">
                <p className="text-white font-display font-bold text-xl">Alexander K.</p>
                <p className="text-primary text-sm">Founder & CEO</p>
             </div>
          </div>

          {/* Right: Content */}
          <div ref={textRef} className="relative z-10">
            <h2 className="text-primary font-medium tracking-wide uppercase text-sm mb-6 fade-in">
              Our Vision
            </h2>
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-slate-900 mb-8 leading-tight">
              <div className="overflow-hidden"><div className="reveal-text">Redefining</div></div>
              <div className="overflow-hidden"><div className="reveal-text"><span className="text-gradient-gold">Digital Excellence</span></div></div>
            </h3>
            <div className="space-y-6 text-lg text-slate-600 leading-relaxed max-w-xl fade-in">
              <p>
                "We founded NextLevel with a singular belief: that technology lacks soul without human creativity, and creativity lacks scale without technology."
              </p>
              <p>
                In an era of noise, we don't just amplify your message; we refine it into a signal that cuts through the chaos. We are not just marketers; we are architects of digital perception.
              </p>
            </div>
            
            <div className="mt-12 pt-8 border-t border-slate-200 fade-in">
               {/* Signature (Placeholder Font) */}
               <p className="font-handwriting text-3xl text-slate-800 opacity-80 rotate-[-2deg]">
                 Alexander K.
               </p>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}
