import { useMediaQuery } from "./useMediaQuery";

/**
 * Hook to detect if the current device is a mobile device.
 * Used for 3D fallback and simplified animations.
 *
 * Mobile is defined as screen width < 768px (Tailwind md breakpoint).
 */
export function useMobileDetection(): boolean {
  return useMediaQuery("(max-width: 767px)");
}
