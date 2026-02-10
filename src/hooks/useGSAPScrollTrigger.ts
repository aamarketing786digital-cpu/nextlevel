import { useGSAP as gsapUseGSAP } from "@gsap/react";

/**
 * Wrapper around @gsap/react's useGSAP hook with mobile-first animation defaults.
 *
 * This hook automatically disables complex animations on mobile devices
 * and provides proper cleanup for GSAP ScrollTrigger animations.
 *
 * @param callback - GSAP animation callback
 * @param options - useGSAP options (scope, dependencies)
 */
export function useGSAPScrollTrigger(
  callback: (context: gsap.Context) => void,
  options?: {
    scope?: React.RefObject<HTMLElement>;
    dependencies?: React.DependencyList;
    mobileBreakpoint?: number;
  },
) {
  const { scope, dependencies = [], mobileBreakpoint = 768 } = options || {};

  // Use the useGSAP hook from @gsap/react
  const gsapContext = gsapUseGSAP(
    () => {
      // Check if we're on mobile
      const isMobile = window.innerWidth < mobileBreakpoint;

      if (isMobile) {
        // On mobile, don't run complex animations
        return;
      }

      // On desktop, run the full animation
      callback(gsapContext.context!);
    },
    { scope: scope as any, dependencies: dependencies as unknown[] },
  );

  return gsapContext;
}

/**
 * Alternative: Direct use of useGSAP for full control.
 * Re-export for convenience.
 */
export { useGSAP } from "@gsap/react";
