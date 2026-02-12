# Curtain Reveal Animations — GSAP Section Transitions

## When to Use
- Dramatic page load / section entrances
- Preloader blind/shutter effects
- Hero-to-content transitions
- Any "unveiling" moment (before / after, reveals)

## Patterns

### 1. Vertical Blinds (Shutter)
Screen splits into vertical columns that stagger away.

```tsx
export function CurtainBlinds({ onComplete, blindCount = 5 }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(containerRef.current, { display: "none" });
        onComplete();
      }
    });

    // Stagger blinds from center outward
    tl.to(".curtain-blind", {
      scaleY: 0,
      duration: 0.8,
      stagger: {
        amount: 0.4,
        from: "center",
      },
      ease: "power4.inOut",
      transformOrigin: "top center",
    });
  });

  return (
    <div ref={containerRef} className="fixed inset-0 z-[9999] flex pointer-events-none">
      {Array.from({ length: blindCount }).map((_, i) => (
        <div
          key={i}
          className="curtain-blind flex-1 h-full bg-slate-950"
        />
      ))}
    </div>
  );
}
```

### 2. Horizontal Wipe
Single curtain slides from one side to reveal content.

```tsx
useGSAP(() => {
  gsap.to(".curtain-wipe", {
    xPercent: -100,
    duration: 1.2,
    ease: "power3.inOut",
    delay: 0.5,
  });
});

// JSX
<div className="curtain-wipe fixed inset-0 z-[9999] bg-slate-950 pointer-events-none" />
```

### 3. Split Curtain (Two Halves)
Two panels pull apart like theater curtains.

```tsx
useGSAP(() => {
  const tl = gsap.timeline({ delay: 0.5 });

  tl.to(".curtain-left", {
    xPercent: -100,
    duration: 1,
    ease: "power3.inOut",
  }, 0);

  tl.to(".curtain-right", {
    xPercent: 100,
    duration: 1,
    ease: "power3.inOut",
  }, 0); // Same start time — they move simultaneously
});

// JSX
<div className="fixed inset-0 z-[9999] pointer-events-none">
  <div className="curtain-left absolute top-0 left-0 w-1/2 h-full bg-slate-950" />
  <div className="curtain-right absolute top-0 right-0 w-1/2 h-full bg-slate-950" />
</div>
```

### 4. Iris / Circle Reveal
A circle expands from center to reveal content.

```tsx
useGSAP(() => {
  const tl = gsap.timeline();

  // Start as small dot, expand to fill screen
  tl.fromTo(".curtain-iris", {
    clipPath: "circle(0% at 50% 50%)",
  }, {
    clipPath: "circle(150% at 50% 50%)",
    duration: 1.5,
    ease: "power2.inOut",
  });
});

// JSX — the content is BEHIND the curtain, iris reveals it
<div className="curtain-iris fixed inset-0 z-[9998] bg-background"
     style={{ clipPath: "circle(0% at 50% 50%)" }}>
  {/* Page content rendered here */}
</div>
```

### 5. Diagonal Wipe
Angled curtain slide for a dynamic feel.

```tsx
useGSAP(() => {
  gsap.to(".curtain-diagonal", {
    clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
    duration: 1.2,
    ease: "power3.inOut",
  });
});

// JSX
<div className="curtain-diagonal fixed inset-0 z-[9999] bg-slate-950"
     style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }} />
```

## Combining with Logo/Text

Show a logo BEFORE the curtain opens. Key: logo must be at a **higher z-index** than the curtain panels.

```tsx
// Logo layer — ABOVE curtain panels
<div className="fixed inset-0 z-[10001] flex items-center justify-center pointer-events-none">
  <div ref={logoRef} className="text-4xl font-bold text-white">
    Brand Name
  </div>
</div>

// Curtain panels — below logo
<div className="fixed inset-0 z-[9999] flex">
  {blinds}
</div>
```

### Animation Sequence
```tsx
const tl = gsap.timeline();

// 1. Show logo
tl.from(logoRef.current, { y: 40, opacity: 0, duration: 0.5, ease: "power3.out" });

// 2. Hold for reading
tl.to({}, { duration: 1.5 });

// 3. Fade logo out
tl.to(logoRef.current, { opacity: 0, y: -20, duration: 0.4, ease: "power2.in" });

// 4. Open curtain
tl.to(".curtain-blind", { scaleY: 0, duration: 0.8, stagger: { amount: 0.4, from: "center" } });
```

## ⚠️ Pitfalls

### Logo Hidden Behind Curtain
If logo is at `z-[9990]` and curtain at `z-[9999]`, the logo is invisible.
**Fix**: Logo container at `z-[10001]`, curtain at `z-[9999]`.

### Curtain Blocks Page Interaction
Always add `pointer-events-none` to curtain containers and set `display: none` in `onComplete`.

### Content Visible Before Curtain
If page content loads before the curtain, users see a flash.
**Fix**: Set curtain container to `display: block` with full coverage by default (no initial animation state dependent on JS).

### Vertical Blinds Leave Gaps
At certain viewport widths, `flex-1` blinds may have sub-pixel gaps.
**Fix**: Add `-mx-px` margin on blinds or use `width: calc(100% / ${count} + 1px)`.

## Performance
- Use `scaleY` / `scaleX` instead of `height` / `width` — transforms are GPU-accelerated
- Keep blind count ≤ 8 for smooth staggering
- Use `will-change: transform` on blind elements
- Always call `gsap.set(container, { display: "none" })` after animation completes

## Related
- `animations/preloaders.md` — Full preloader implementations
- `animations/gsap.md` — Core GSAP patterns
