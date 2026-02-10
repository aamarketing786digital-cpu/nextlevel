"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "scale";
  threshold?: number;
  as?: "div" | "section" | "article" | "header" | "main";
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = "up",
  threshold = 0.1,
  as: Component = "div",
}: ScrollRevealProps) {
  const { ref, isVisible } = useScrollReveal({ threshold });

  const directionClasses = {
    up: "reveal-on-scroll",
    left: "fade-from-left",
    right: "fade-from-right",
    scale: "scale-in",
  };

  const delayClass = delay ? `stagger-${Math.min(Math.ceil(delay / 100), 8)}` : "";

  return (
    <Component
      ref={ref as any}
      className={cn(
        directionClasses[direction],
        delayClass,
        isVisible && "is-visible",
        className
      )}
      style={delay && !delayClass ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Component>
  );
}
