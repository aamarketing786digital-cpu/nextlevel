"use client";

import { useEffect } from "react";

export function BodyWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Refresh ScrollTrigger on route change for proper animation cleanup
    const refreshScrollTrigger = async () => {
      const gsap = (await import("gsap")).default;
      const ScrollTrigger = (await import("gsap/ScrollTrigger")).default;

      gsap.registerPlugin(ScrollTrigger);
      ScrollTrigger.refresh();
    };

    refreshScrollTrigger();

    // Also refresh on window resize
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        refreshScrollTrigger();
      }, 250);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  return <body className="font-body antialiased">{children}</body>;
}
