# Horizontal Scroll Sections — GSAP ScrollTrigger Pin

## When to Use
- Service showcases, portfolio galleries, feature tours
- Any content that benefits from "swiping" through full-screen panels
- Immersive storytelling sections that pin and scroll laterally

## Architecture

```
┌─────────────────────────────────────────────┐
│ <section> (trigger — gets pinned)           │
│  ┌────────────────────────────────────────┐ │
│  │ Fixed Header: Tab Nav + Index          │ │
│  ├────────────────────────────────────────┤ │
│  │ <div> flex container (500% wide)       │ │
│  │  ┌──────┐┌──────┐┌──────┐┌──────┐     │ │
│  │  │Panel1││Panel2││Panel3││Panel4│     │ │
│  │  │100vw ││100vw ││100vw ││100vw │     │ │
│  │  └──────┘└──────┘└──────┘└──────┘     │ │
│  └────────────────────────────────────────┘ │
└─────────────────────────────────────────────┘
```

## Implementation

### Component Structure
```tsx
export function HorizontalScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const panels = gsap.utils.toArray<HTMLElement>(".panel");
    const totalPanels = panels.length;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerRef.current,
        pin: true,
        scrub: 1,
        snap: {
          snapTo: 1 / (totalPanels - 1),
          duration: { min: 0.2, max: 0.5 },
          delay: 0.1,
          ease: "power1.inOut"
        },
        end: () => "+=" + (containerRef.current!.offsetWidth - window.innerWidth),
      }
    });

    tl.to(panels, {
      xPercent: -100 * (totalPanels - 1),
      ease: "none",
    });
  }, { scope: triggerRef });

  return (
    <section>
      <div ref={triggerRef} className="relative overflow-hidden">
        <div ref={containerRef} className="flex h-screen w-[500%] will-change-transform">
          {/* Panels here — each w-screen h-full */}
        </div>
      </div>
    </section>
  );
}
```

### Panel Template
```tsx
<div className="panel relative w-screen h-full flex items-center px-6 pb-6 pt-24 md:pt-32 md:px-24 md:pb-24 overflow-hidden">
  <Container className="relative z-10">
    <div className="grid md:grid-cols-2 gap-8 lg:gap-24 items-center">
      {/* Left: Content */}
      <div className="space-y-6">
        <h2 className="text-4xl md:text-7xl font-bold">Title</h2>
        <p className="text-lg text-slate-600">Description</p>
      </div>
      {/* Right: Visual */}
      <div className="relative">
        {/* Image, mockup, or illustration */}
      </div>
    </div>
  </Container>
</div>
```

## ⚠️ Pitfall: Tab Header Overlapping Content

### The Bug
A floating tab navigation at `position: absolute; top: 0` sits ON TOP of the first panel's content because the panel doesn't account for the header height.

### The Fix: Top Padding on Panels
```tsx
// ❌ BAD — content starts behind the header
className="pt-6 md:p-24"

// ✅ GOOD — enough top clearance for the sticky header
className="pt-24 md:pt-32 md:px-24 md:pb-24"
```

The tab header is typically ~80px tall (with padding). Use `pt-24` (6rem ≈ 84px at 14px base) on mobile and `pt-32` (8rem ≈ 112px) on desktop.

## Navigation Tabs (Sticky Header)

```tsx
<div className="absolute top-0 left-0 right-0 z-50 p-6 md:p-8 flex justify-center pointer-events-none">
  <div className="flex gap-3 p-2 rounded-full bg-white/80 backdrop-blur-md border border-slate-200/50 pointer-events-auto shadow-sm">
    {items.map((item, idx) => (
      <button
        key={item.id}
        className={cn(
          "px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all whitespace-nowrap",
          idx === activeIndex
            ? "bg-slate-900 text-white shadow-sm font-bold"
            : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
        )}
      >
        {item.title}
      </button>
    ))}
  </div>
</div>
```

### Click-to-Navigate
Allow users to click tabs to jump to specific panels:

```tsx
onClick={() => {
  const st = ScrollTrigger.getById("scroll-id");
  if (st) {
    const progress = idx / (items.length - 1);
    const scrollPos = st.start + (st.end - st.start) * progress;
    window.scrollTo({ top: scrollPos + 1, behavior: "smooth" });
  }
}}
```

## Hiding/Showing Navbar
Hide the site navbar when entering the pinned section to avoid z-index conflicts:

```tsx
scrollTrigger: {
  onEnter: () => gsap.to("#main-navbar", { y: -100, autoAlpha: 0, duration: 0.3, overwrite: true }),
  onLeave: () => gsap.to("#main-navbar", { y: 0, autoAlpha: 1, duration: 0.3, overwrite: true }),
  onEnterBack: () => gsap.to("#main-navbar", { y: -100, autoAlpha: 0, duration: 0.3, overwrite: true }),
  onLeaveBack: () => gsap.to("#main-navbar", { y: 0, autoAlpha: 1, duration: 0.3, overwrite: true }),
}
```

## Active Tab Tracking
Update active tab based on scroll progress:

```tsx
onUpdate: (self) => {
  const newIndex = Math.round(self.progress * (totalPanels - 1));
  if (newIndex !== activeIndexRef.current) {
    activeIndexRef.current = newIndex;

    // Update tab styles
    document.querySelectorAll(".nav-btn").forEach((btn, i) => {
      if (i === newIndex) {
        btn.classList.add("bg-slate-900", "text-white");
        btn.classList.remove("text-slate-500");
      } else {
        btn.classList.remove("bg-slate-900", "text-white");
        btn.classList.add("text-slate-500");
      }
    });

    // Update index display
    const display = document.getElementById("index-display");
    if (display) display.innerText = `0${newIndex + 1} / 0${totalPanels}`;
  }
}
```

## Performance Tips
1. Use `will-change-transform` on the flex container
2. Use `scrub: 1` (not `true`) for smooth interpolation
3. Keep panel content lightweight — heavy 3D scenes inside panels will lag
4. Use `snap` to ensure panels align cleanly

## Related
- `animations/gsap.md` — Core GSAP / ScrollTrigger patterns
- `css/responsive-scaling.md` — Sizing strategy affects panel padding
