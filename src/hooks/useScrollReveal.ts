"use client";

import { useEffect, useRef, useState } from "react";

interface UseScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

interface UseScrollRevealReturn {
  ref: React.RefObject<HTMLElement>;
  isVisible: boolean;
}

/**
 * Hook for scroll-triggered reveal animations using Intersection Observer
 * More reliable than GSAP for simple scroll animations
 */
export function useScrollReveal(options: UseScrollRevealOptions = {}): UseScrollRevealReturn {
  const { threshold = 0.1, rootMargin = "0px 0px -50px 0px", triggerOnce = true } = options;
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce && element) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { ref: ref as any, isVisible };
}

/**
 * Hook for revealing multiple children with staggered delay
 */
export function useScrollRevealList(
  itemCount: number,
  options: UseScrollRevealOptions = {}
) {
  const containerRef = useRef<HTMLElement>(null);
  const [visibleIndices, setVisibleIndices] = useState<Set<number>>(new Set());

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setVisibleIndices(new Set(Array.from({ length: itemCount }, (_, i) => i)));
      return;
    }

    const { threshold = 0.1, rootMargin = "0px 0px -50px 0px", triggerOnce = true } = options;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Get all children indices
            const children = Array.from(container.children);
            children.forEach((child, index) => {
              setTimeout(() => {
                setVisibleIndices((prev) => new Set([...prev, index]));
              }, index * 100); // 100ms stagger

              if (triggerOnce) {
                observer.unobserve(child as Element);
              }
            });
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, [itemCount, options]);

  return { containerRef, visibleIndices };
}
