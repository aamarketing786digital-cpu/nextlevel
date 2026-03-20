"use client";

import { useEffect } from "react";

export function BodyWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Only refresh ScrollTrigger on window resize, not on every mount
    // This prevents scroll jank on route changes
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        // Dynamically import only when needed
        import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
          ScrollTrigger.refresh();
        });
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
