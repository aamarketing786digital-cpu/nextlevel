# GSAP (GreenSock) — Web Animation Skill

## When to use
- High-quality UI/motion design: entrances, micro-interactions, page transitions
- Timeline-based sequences (vs. scattered CSS transitions)
- Scroll-driven storytelling (with ScrollTrigger)
- Complex easing, staggering, orchestration across many elements

## Official Documentation
- **GSAP Docs**: https://gsap.com/docs
- **ScrollTrigger**: https://gsap.com/docs/v3/Plugins/ScrollTrigger
- **React Integration**: https://greensock.com/docs/v3/Plugins/ScrollTrigger

## Key concepts & APIs
- Tweens: `gsap.to()`, `gsap.from()`, `gsap.fromTo()`
- Timelines: `gsap.timeline()` for sequencing
- Eases: `power2.out`, `expo.inOut`, `elastic.out`
- Staggers: `stagger: 0.05`
- ScrollTrigger: `gsap.registerPlugin(ScrollTrigger)`

## React/Next.js Best Practices (2025)

### 1. SSR Safety
Always check for window before accessing browser APIs:

```tsx
"use client";

import { useEffect } from "react";

// Register plugins only on client
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}
```

### 2. Use useGSAP Hook (Recommended)
The `@gsap/react` package provides proper cleanup:

```tsx
"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function MyComponent() {
  useGSAP(() => {
    // Animation code here
    gsap.from(".box", {
      y: 100,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: ".box",
        start: "top 80%",
      }
    });

    // Cleanup is automatic!
  }, []);

  return <div className="box">Animate me</div>;
}
```

### 3. Refresh ScrollTrigger After Route Changes
In Next.js App Router, refresh after page navigation:

```tsx
useEffect(() => {
  // Delay to ensure DOM is ready
  const timer = setTimeout(() => {
    ScrollTrigger.refresh();
  }, 100);

  return () => clearTimeout(timer);
}, []);
```

### 4. Debounce Resize Handlers
Prevent performance issues on resize:

```tsx
useEffect(() => {
  let resizeTimeout: NodeJS.Timeout;

  const handleResize = () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);
  };

  window.addEventListener("resize", handleResize);
  return () => {
    window.removeEventListener("resize", handleResize);
    clearTimeout(resizeTimeout);
  };
}, []);
```

### 5. Proper Cleanup Pattern
For complex animations, return cleanup function:

```tsx
useGSAP(() => {
  const ctx = gsap.context(() => {
    // All animations scoped to this component
    gsap.from(".item", { opacity: 0, y: 50 });
  });

  return () => ctx.revert(); // Cleanup!
}, []);
```

## Quick recipes

### 1) Hero entrance (stagger)
```tsx
gsap.from(".hero [data-anim]", {
  y: 24,
  autoAlpha: 0,
  duration: 0.8,
  ease: "power2.out",
  stagger: 0.06,
});
```

### 2) Scroll-scrub pinned section
```tsx
gsap.timeline({
  scrollTrigger: {
    trigger: ".story",
    start: "top top",
    end: "+=800",
    scrub: 1,
    pin: true,
  },
}).to(".story .panel", { xPercent: -200 });
```

### 3) Clamp for above-fold prevention (2025 feature)
```tsx
scrollTrigger: {
  trigger: ".hero",
  start: "clamp(top bottom)", // Never starts partially scrubbed
}
```

### 4) Batch animations for performance
```tsx
ScrollTrigger.batch(".fade-in", {
  onEnter: (elements) => gsap.from(elements, {
    opacity: 0,
    y: 50,
    stagger: 0.1
  }),
  start: "top 85%",
});
```

## Performance Tips

1. **Use `will-change` sparingly**: Let GSAP handle transforms
2. **Limit concurrent animations**: Use batch for many elements
3. **Avoid layout thrashing**: Animate transforms, not layout properties
4. **Use `autoAlpha`**: Combines opacity and visibility for better performance
5. **Scrub value**: `scrub: 1` for smooth, `scrub: true` for instant

## Accessibility

Always respect `prefers-reduced-motion`:

```tsx
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!prefersReducedMotion) {
  // Run animations
}
```

## Common Pitfalls

1. ❌ Not registering ScrollTrigger before use
2. ❌ Forgetting cleanup in React (memory leaks)
3. ❌ Not refreshing after dynamic content loads
4. ❌ Using absolute values instead of relative units
5. ❌ Over-animating (causes motion sickness)

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Triggers not firing | Call `ScrollTrigger.refresh()` after layout changes |
| Jumping on scroll | Ensure `overflow-x: hidden` on body |
| Memory leaks | Always return cleanup from useGSAP |
| Mobile issues | Use `ignoreMobileResize: true` in ScrollTrigger |
