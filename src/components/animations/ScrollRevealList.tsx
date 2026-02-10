"use client";

import { useScrollRevealList } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";

interface ScrollRevealListProps {
  children: React.ReactNode[];
  className?: string;
  staggerDelay?: number;
  direction?: "up" | "left" | "right" | "scale";
  threshold?: number;
  as?: "div" | "section" | "article" | "header";
}

export function ScrollRevealList({
  children,
  className,
  staggerDelay = 100,
  direction = "up",
  threshold = 0.1,
  as: Component = "div",
}: ScrollRevealListProps) {
  const { containerRef, visibleIndices } = useScrollRevealList(children.length, { threshold });

  const directionClasses = {
    up: "reveal-on-scroll",
    left: "fade-from-left",
    right: "fade-from-right",
    scale: "scale-in",
  };

  return (
    <Component ref={containerRef as any} className={className}>
      {children.map((child, index) => (
        <div
          key={index}
          className={cn(
            directionClasses[direction],
            visibleIndices.has(index) && "is-visible"
          )}
          style={{ transitionDelay: `${index * staggerDelay}ms` }}
        >
          {child}
        </div>
      ))}
    </Component>
  );
}
