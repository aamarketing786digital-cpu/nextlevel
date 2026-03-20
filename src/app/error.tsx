"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(".error-icon", {
      scale: 0,
      rotation: -180,
      opacity: 0,
      duration: 0.8,
      ease: "back.out(1.7)"
    })
    .from(".error-title", {
      y: 40,
      opacity: 0,
      duration: 0.8
    }, "-=0.4")
    .from(".error-desc", {
      y: 30,
      opacity: 0,
      duration: 0.8
    }, "-=0.5")
    .from(".error-code", {
      opacity: 0,
      duration: 0.6
    }, "-=0.3")
    .from(".error-btn", {
      y: 20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1
    }, "-=0.3");

  }, { scope: containerRef });

  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error);
  }, [error]);

  return (
    <div ref={containerRef} className="relative min-h-screen flex items-center justify-center bg-slate-950 overflow-hidden pt-24 md:pt-32">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay" />

      {/* Error Gradient Orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-red-500/10 rounded-full blur-[150px] animate-pulse" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "1s" }} />

      <div className="relative z-10 container mx-auto px-4 text-center max-w-3xl">
        {/* Error Icon */}
        <div className="error-icon inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-red-500/20 to-orange-500/20 border border-red-500/30 mb-8">
          <AlertTriangle className="w-16 h-16 text-red-400" />
        </div>

        {/* Title */}
        <h1 className="error-title text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
          Something Went Wrong
        </h1>

        {/* Description */}
        <p className="error-desc text-lg md:text-xl text-slate-400 mb-8">
          We encountered an unexpected error. Don&apos;t worry, our team has been notified
          and we&apos;re working to fix it.
        </p>

        {/* Error Code (in development) */}
        {process.env.NODE_ENV === "development" && (
          <div className="error-code bg-slate-900/50 border border-red-500/30 rounded-xl p-4 mb-8 text-left">
            <p className="text-red-400 text-sm font-mono break-all">
              {error.message}
            </p>
            {error.digest && (
              <p className="text-slate-500 text-xs mt-2">
                Error ID: {error.digest}
              </p>
            )}
          </div>
        )}

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={reset}
            size="lg"
            className="error-btn rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 hover:shadow-[0_0_30px_rgba(251,191,36,0.3)] transition-all duration-300 text-lg px-8 h-14 font-medium"
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            Try Again
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="error-btn rounded-full border-white/20 bg-white/5 hover:bg-white/10 backdrop-blur-md text-white transition-all text-lg px-8 h-14 font-medium"
          >
            <Link href="/">
              <Home className="w-5 h-5 mr-2" />
              Go Home
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="error-btn rounded-full border-white/20 bg-white/5 hover:bg-white/10 backdrop-blur-md text-white transition-all text-lg px-8 h-14 font-medium"
          >
            <Link href="/contact">
              <MessageSquare className="w-5 h-5 mr-2" />
              Contact Support
            </Link>
          </Button>
        </div>

        {/* Helpful Links */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-slate-500 mb-4">While you wait, check out:</p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <Link href="/services" className="text-amber-400/80 hover:text-amber-400 transition-colors">
              Our Services
            </Link>
            <Link href="/work" className="text-amber-400/80 hover:text-amber-400 transition-colors">
              Portfolio
            </Link>
            <Link href="/about" className="text-amber-400/80 hover:text-amber-400 transition-colors">
              About Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
