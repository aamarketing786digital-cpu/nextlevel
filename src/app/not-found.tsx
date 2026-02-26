"use client";

import Link from "next/link";
import { useRef } from "react";
import { Home, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Create floating particles effect
    const particles = particlesRef.current;
    if (!particles) return;

    for (let i = 0; i < 20; i++) {
      const particle = document.createElement("div");
      particle.className = "absolute w-2 h-2 bg-amber-500/30 rounded-full";
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.animationDelay = `${Math.random() * 5}s`;
      particle.style.animation = `float ${5 + Math.random() * 5}s ease-in-out infinite`;
      particles.appendChild(particle);
    }

    // Hero animations
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(".not-found-404", {
      scale: 0.5,
      opacity: 0,
      duration: 1.2,
      rotation: -10
    })
    .from(".not-found-title", {
      y: 50,
      opacity: 0,
      duration: 0.8
    }, "-=0.6")
    .from(".not-found-desc", {
      y: 30,
      opacity: 0,
      duration: 0.8
    }, "-=0.5")
    .from(".not-found-btn", {
      y: 20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.15
    }, "-=0.4");

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative min-h-screen flex items-center justify-center bg-slate-950 overflow-hidden pt-24 md:pt-32">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay" />

      {/* Floating Particles */}
      <div
        ref={particlesRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          animation: "float 10s ease-in-out infinite"
        }}
      />

      {/* Gradient Orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-primary/20 rounded-full blur-[150px] animate-pulse" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "1s" }} />

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: "50px 50px"
        }}
      />

      <div className="relative z-10 container mx-auto px-4 text-center">
        {/* 404 Text */}
        <div className="not-found-404 relative inline-block mb-8">
          <h1 className="text-[150px] md:text-[200px] lg:text-[250px] font-display font-bold leading-none bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 bg-clip-text text-transparent select-none">
            404
          </h1>
          {/* Glow effect behind 404 */}
          <div className="absolute inset-0 bg-amber-500/20 blur-[80px] -z-10" />
        </div>

        {/* Title */}
        <h2 className="not-found-title text-3xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="not-found-desc text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12">
          Oops! The page you&apos;re looking for seems to have wandered off into the digital void.
          Let&apos;s get you back on track.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            asChild
            size="lg"
            className="not-found-btn rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 hover:shadow-[0_0_30px_rgba(251,191,36,0.3)] transition-all duration-300 text-lg px-8 h-14 font-medium"
          >
            <Link href="/">
              <Home className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="not-found-btn rounded-full border-white/20 bg-white/5 hover:bg-white/10 backdrop-blur-md text-white transition-all text-lg px-8 h-14 font-medium"
          >
            <Link href="/services">
              <Search className="w-5 h-5 mr-2" />
              Explore Services
            </Link>
          </Button>
        </div>

        {/* Quick Links */}
        <div className="mt-16 mb-16 pt-12 pb-8 border-t border-white/10">
          <p className="text-slate-500 mb-4">Looking for something specific?</p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <Link href="/about" className="text-amber-400/80 hover:text-amber-400 transition-colors">
              About Us
            </Link>
            <Link href="/services" className="text-amber-400/80 hover:text-amber-400 transition-colors">
              Services
            </Link>
            <Link href="/work" className="text-amber-400/80 hover:text-amber-400 transition-colors">
              Portfolio
            </Link>
            <Link href="/contact" className="text-amber-400/80 hover:text-amber-400 transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(-10px) translateX(-10px); }
          75% { transform: translateY(-30px) translateX(5px); }
        }
      `}</style>
    </div>
  );
}
