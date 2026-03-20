"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

if (typeof window !== "undefined") {
  gsap.registerPlugin();
}

interface ModernLoaderProps {
  onComplete: () => void;
}

/**
 * ModernLoader - Spot Reveal Preloader for NextLevel Marketerz
 *
 * Light background with spot reveal animation
 *
 * Choreography:
 * 1. Logo fades in with scale effect
 * 2. Hold for brand visibility
 * 3. Spot (circle) expands from center revealing content
 *
 * Design tokens:
 * - Primary: amber-500 (#f59e0b)
 * - Background: White
 * - Duration: ~2s total
 */
export function ModernLoader({ onComplete }: ModernLoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        // Final cleanup
        gsap.set(containerRef.current, { pointerEvents: "none" });
        onComplete();
      },
    });

    // Initial states
    tl.set(logoRef.current, { opacity: 0, scale: 0.8, filter: "blur(10px)" });
    tl.set(taglineRef.current, { opacity: 0, y: 20 });
    tl.set(spotRef.current, { clipPath: "circle(0% at 50% 50%)" });

    // Phase 1: Logo Reveal (0-0.6s)
    tl.to(logoRef.current, {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      duration: 0.6,
      ease: "back.out(1.7)",
    });

    // Phase 2: Tagline slides in (0.4-0.8s)
    tl.to(
      taglineRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out",
      },
      "-=0.2"
    );

    // Phase 3: Hold for brand visibility (0.8-1.2s)
    tl.to({}, { duration: 0.4 });

    // Phase 4: Logo fades out (1.2-1.5s)
    tl.to(
      [logoRef.current, taglineRef.current],
      {
        opacity: 0,
        scale: 0.5,
        duration: 0.3,
        ease: "power2.in",
        stagger: 0.05,
      }
    );

    // Phase 5: Spot expands revealing content (1.5-2.2s)
    tl.to(
      spotRef.current,
      {
        clipPath: "circle(150% at 50% 50%)",
        duration: 0.7,
        ease: "power2.inOut",
      },
      "-=0.1"
    );

    // Phase 6: Fade out container (2.0-2.3s)
    tl.to(
      containerRef.current,
      {
        opacity: 0,
        duration: 0.3,
        ease: "power2.inOut",
      },
      "-=0.3"
    );
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-white"
    >
      {/* Gradient Orbs for atmosphere */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[400px] h-[400px] bg-amber-600/5 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "0.5s" }} />

      {/* Noise Texture */}
      <div
        className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.7'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Logo - ABOVE spot layer */}
      <div className="relative z-20 text-center">
        <div ref={logoRef} className="mb-4">
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 bg-clip-text text-transparent">
              NextLevel
            </span>
          </h1>
        </div>
        <div ref={taglineRef} className="mt-2">
          <p className="text-sm md:text-base text-amber-700/70 tracking-[0.3em] uppercase font-semibold">
            Marketerz
          </p>
        </div>
      </div>

      {/* Spot/Circle Reveal Layer - Behind logo */}
      <div
        ref={spotRef}
        className="absolute inset-0 z-10 bg-gradient-to-br from-amber-50 to-white"
        style={{ clipPath: "circle(0% at 50% 50%)" }}
      />
    </div>
  );
}

/**
 * InlineLoader - Smaller version for use within components
 * For buttons, cards, sections loading state
 */
export function InlineLoader({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dot1 = useRef<HTMLDivElement>(null);
  const dot2 = useRef<HTMLDivElement>(null);
  const dot3 = useRef<HTMLDivElement>(null);

  const sizeClasses = {
    sm: "w-1 h-1",
    md: "w-2 h-2",
    lg: "w-3 h-3",
  };

  useGSAP(() => {
    const tl = gsap.timeline({ repeat: -1 });
    tl.to([dot1.current, dot2.current, dot3.current], {
      opacity: 0.3,
      duration: 0.4,
      stagger: 0.15,
      ease: "power1.inOut",
      yoyo: true,
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="flex items-center justify-center gap-2">
      <div ref={dot1} className={`rounded-full bg-amber-500 ${sizeClasses[size]}`} />
      <div ref={dot2} className={`rounded-full bg-amber-500 ${sizeClasses[size]}`} />
      <div ref={dot3} className={`rounded-full bg-amber-500 ${sizeClasses[size]}`} />
    </div>
  );
}

/**
 * SpinnerLoader - Classic rotating spinner
 * Simple, elegant, for inline use
 */
export function SpinnerLoader({ size = 24, className = "" }: { size?: number; className?: string }) {
  return (
    <div
      className={`inline-block animate-spin rounded-full border-2 border-solid border-amber-500/20 border-t-amber-500 ${className}`}
      style={{ width: size, height: size }}
    />
  );
}

/**
 * SkeletonLoader - Content placeholder
 * For cards, list items, sections
 */
export function SkeletonLoader({
  className,
  variant = "default",
}: {
  className?: string;
  variant?: "default" | "text" | "avatar" | "card";
}) {
  const variantClasses = {
    default: "h-4 w-full rounded",
    text: "h-4 w-3/4 rounded",
    avatar: "h-12 w-12 rounded-full",
    card: "h-32 w-full rounded-xl",
  };

  return (
    <div
      className={`animate-pulse bg-amber-100/50 ${variantClasses[variant]} ${className}`}
    />
  );
}

/**
 * PageTransitionLoader - Quick page transition overlay
 * For smooth navigation between pages
 */
export function PageTransitionLoader({ onComplete, delay = 0 }: { onComplete: () => void; delay?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete,
    });

    tl.set(containerRef.current, { scaleY: 0, transformOrigin: "bottom" });
    tl.to({}, { duration: delay });
    tl.to(containerRef.current, {
      scaleY: 1,
      duration: 0.3,
      ease: "power2.in",
    });
    tl.to(containerRef.current, {
      scaleY: 0,
      transformOrigin: "top",
      duration: 0.4,
      ease: "power2.out",
    });
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-gradient-to-b from-white to-amber-50 pointer-events-none"
      style={{ transform: "scaleY(0)", transformOrigin: "bottom" }}
    />
  );
}
