"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { Check, Mail, Phone } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function RankingCta() {
  const containerRef = useRef<HTMLElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const rightGridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          end: "bottom bottom",
          toggleActions: "play none none reverse",
        },
      });

      // Left Content Fade In Up
      if (leftContentRef.current) {
        tl.fromTo(
          leftContentRef.current.children,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" }
        );
      }

      // Right Grid Bento Reveal
      if (rightGridRef.current) {
        const cards = Array.from(rightGridRef.current.children);
        tl.fromTo(
          cards,
          { scale: 0.9, opacity: 0, y: 30 },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: "back.out(1.5)",
          },
          "-=0.6" // overlap
        );
      }
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="py-24 lg:py-32 bg-white relative overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Content */}
          <div ref={leftContentRef} className="max-w-xl">
            <h2 className="text-5xl md:text-6xl font-display font-medium text-slate-900 leading-[1.1] tracking-tight mb-8">
              Ranking #1 <br />
              <span className="text-slate-800">with us</span>
            </h2>

            <p className="text-lg text-slate-600 mb-6 font-light">
              Dial <span className="font-semibold text-slate-900">+971 563377016</span> for a free demo and discovery call!
            </p>

            <p className="text-lg text-slate-500 mb-8 font-light">
              Let&apos;s Connect to discover:
            </p>

            <ul className="space-y-6 mb-10">
              <li className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-orange-500 stroke-[3]" />
                </div>
                <span className="text-slate-600 font-light leading-relaxed">
                  How NextLevel accelerates your marketing growth.
                </span>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-orange-500 stroke-[3]" />
                </div>
                <span className="text-slate-600 font-light leading-relaxed">
                  Marketing strategies that are faster, cheaper, and scalable.
                </span>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-orange-500 stroke-[3]" />
                </div>
                <span className="text-slate-600 font-light leading-relaxed">
                  Why we outshine agencies, freelancers, and in-house teams.
                </span>
              </li>
            </ul>

            <Button
              asChild
              className="bg-orange-500 hover:bg-orange-400 text-white font-medium text-lg px-10 h-14 rounded-full shadow-[0_8px_30px_rgba(242,151,39,0.3)] hover:shadow-[0_8px_30px_rgba(242,151,39,0.5)] transition-all duration-300 hover:-translate-y-1"
            >
              <Link href="/contact">Get In Touch</Link>
            </Button>
          </div>

          {/* Right Column: 4-Card Bento Grid */}
          <div className="lg:pl-10 mt-12 lg:mt-0">
            <div ref={rightGridRef} className="flex flex-col sm:flex-row gap-4 md:gap-6">
              
              {/* Left Column of Bento */}
              <div className="flex-1 min-w-0 flex flex-col gap-4 md:gap-6">
                {/* Card 1: Top Left - Texture & Glass Pill (Square-ish) */}
                <div className="relative rounded-[2rem] overflow-hidden group shadow-sm bg-orange-100 aspect-square">
                  <Image
                    src="https://images.unsplash.com/photo-1596496050827-8299e0220de1?q=80&w=800&auto=format&fit=crop"
                    alt="Idea sticky note"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/10 transition-opacity duration-300 group-hover:bg-black/0" />
                  
                  {/* Floating Contact Pill */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="pointer-events-auto flex items-center justify-center gap-3 bg-white/40 backdrop-blur-xl border border-white/40 shadow-xl rounded-full py-2 px-3 transition-transform duration-500 hover:scale-110 cursor-pointer">
                      <a href="mailto:info@nextlevel.com" aria-label="Email Us" className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg text-blue-500 hover:bg-blue-50 transition-colors">
                        <Mail className="w-5 h-5" aria-hidden="true" />
                      </a>
                      <a href="tel:+971563377016" aria-label="Call Us" className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg text-green-500 hover:bg-green-50 transition-colors">
                        <Phone className="w-5 h-5" aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Card 3: Bottom Left - Email Us (Tall) */}
                <Link href="mailto:info@nextlevel.com" className="rounded-[2rem] bg-[#020617] p-8 flex flex-col justify-between group overflow-hidden relative shadow-2xl aspect-[4/5]">
                  <div className="absolute inset-0 bg-gradient-to-t from-teal-900 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <h3 className="text-3xl text-white font-light relative z-10 group-hover:text-orange-400 transition-colors duration-300">Email Us!</h3>
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white backdrop-blur-md self-start relative z-10 group-hover:bg-orange-500/20 group-hover:border-orange-500/30 group-hover:scale-110 transition-all duration-500 cursor-pointer">
                    <Mail className="w-6 h-6" />
                  </div>
                </Link>
              </div>

              {/* Right Column of Bento */}
              <div className="flex-1 min-w-0 flex flex-col gap-4 md:gap-6 sm:mt-8 lg:mt-0">
                {/* Card 2: Top Right - Call Us Now (Tall) */}
                <Link href="tel:+971563377016" className="rounded-[2rem] bg-white border border-slate-100 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] p-8 flex flex-col justify-start group hover:border-orange-200 transition-colors duration-500 aspect-[4/5]">
                  <p className="text-2xl text-slate-400 font-light mb-6 group-hover:text-orange-600 transition-colors duration-300">Call Us Now!</p>
                  <div className="text-3xl lg:text-4xl xl:text-4xl font-display font-medium text-slate-800 leading-[1.1] tracking-tight">
                    +971 <br />
                    56 337 7016
                  </div>
                </Link>

                {/* Card 4: Bottom Right - Lifestyle Image (Square-ish) */}
                <div className="relative rounded-[2rem] overflow-hidden group shadow-sm bg-slate-100 aspect-square">
                  <Image
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop"
                    alt="Professional at laptop"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                   <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>

            </div>
          </div>
          
        </div>
      </Container>
    </section>
  );
}
