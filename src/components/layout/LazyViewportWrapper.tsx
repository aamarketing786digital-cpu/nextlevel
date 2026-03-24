"use client";

import { useState, useRef, useEffect, ReactNode } from "react";

/**
 * A wrapper component that defers rendering of its children until it scrolls near the viewport.
 * This completely prevents the enclosed Client Components from executing their JavaScript 
 * during the initial page hydration, drastically improving Total Blocking Time (TBT).
 */
export function LazyViewportWrapper({ 
  children, 
  minHeight = "400px" 
}: { 
  children: ReactNode, 
  minHeight?: string 
}) {
  const [shouldRender, setShouldRender] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    
    // Fallback for extremely old browsers
    if (typeof IntersectionObserver === "undefined") {
      setShouldRender(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin: "600px" } // Start rendering 600px before it enters the viewport
    );
    
    observer.observe(ref.current);
    
    return () => observer.disconnect();
  }, []);

  if (shouldRender) return <>{children}</>;
  
  return <div ref={ref} style={{ minHeight, width: "100%" }} aria-hidden="true" />;
}
