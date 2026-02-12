# Common Frontend Pitfalls & Solutions

A compiled reference of bugs, gotchas, and fixes discovered during production builds.

---

## 1. Text Descender Clipping in Reveal Animations

**Symptom**: Letters like g, y, p, q, j are cut off at the bottom in animated headings.

**Cause**: `overflow-hidden` on wrapper div clips below the text baseline.

**Fix**: Add `pb-3` to the inner text element (not the overflow wrapper).

```tsx
// ✅ Fix
<div className="overflow-hidden">
  <div className="reveal-text pb-3">Typography</div>
</div>
```

→ Full guide: `animations/text-reveal.md`

---

## 2. Site Looks "Too Zoomed" at 100% Browser Zoom

**Symptom**: Everything appears oversized on standard 1080p laptop screens. Site looks correct at 80-90% zoom.

**Cause**: Default 16px root font-size + generous Tailwind spacing is designed for larger screens.

**Fix**: Set `html { font-size: 14px }` with responsive breakpoints.

```css
html { font-size: 14px; }
@media (min-width: 1536px) { html { font-size: 15px; } }
@media (min-width: 1920px) { html { font-size: 16px; } }
```

→ Full guide: `css/responsive-scaling.md`

---

## 3. Horizontal Scroll Section: Header Overlaps Content

**Symptom**: Tab navigation at top of pinned section overlaps the first panel's content.

**Cause**: Panel uses `p-24` uniformly, but the header sits at `top: 0` taking up ~80px.

**Fix**: Use separate `pt-24 md:pt-32` for top padding.

→ Full guide: `animations/horizontal-scroll.md`

---

## 4. Low Contrast on Light Backgrounds (Washed-Out Look)

**Symptom**: Contact page, forms, or cards look invisible against pale/minty backgrounds.

**Cause**: Theme token `bg-background` (e.g. `#F1FEFC`) is nearly identical to `bg-card` (white).

**Fix**: Use `bg-slate-50` for sections and `bg-white shadow-xl border-slate-200` for cards.

→ Full guide: `design/section-theming.md`

---

## 5. Preloader Logo Not Visible (Wrong Z-Index)

**Symptom**: Preloader blinds/dots cover the logo text.

**Cause**: Logo layer at `z-[9990]` is behind animation elements at `z-[9999]`.

**Fix**: Put the logo text ON TOP of animation elements (`z-[10001]`), or restructure the animation to reveal the logo after the animation elements move.

```tsx
// Logo layer should be ABOVE blind/dot layers
<div className="relative z-[10001]">
  <div ref={textRef}>Logo Text</div>
</div>
```

---

## 6. Preloader Dot Visible During Logo Display (Fluid Preloader)

**Symptom**: White dot/circle is visible alongside the logo in fluid preloader.

**Cause**: Dot starts with default opacity/scale.

**Fix**: Initialize dot with `opacity: 0, scale: 0` and only show it after the logo fades out.

```tsx
gsap.set(dotRef.current, { opacity: 0, scale: 0 });

// After logo fades out:
tl.to(dotRef.current, { opacity: 1, scale: 1, duration: 0.5 });
```

---

## 7. GSAP ScrollTrigger Not Firing After Route Change

**Symptom**: Scroll animations work on first load but break when navigating to a page via Next.js router.

**Fix**: Call `ScrollTrigger.refresh()` after route changes with a small delay:

```tsx
useEffect(() => {
  const timer = setTimeout(() => ScrollTrigger.refresh(), 100);
  return () => clearTimeout(timer);
}, []);
```

---

## 8. Navbar Z-Index Conflicts with Fixed/Pinned Sections

**Symptom**: Navbar visually overlaps or fights with pinned GSAP sections.

**Fix**: Hide the navbar when entering pinned sections using ScrollTrigger callbacks:

```tsx
onEnter: () => gsap.to("#navbar", { y: -100, autoAlpha: 0, duration: 0.3 }),
onLeave: () => gsap.to("#navbar", { y: 0, autoAlpha: 1, duration: 0.3 }),
```

---

## 9. Dynamic Class Names Not Working in Tailwind

**Symptom**: Classes like `bg-${color}-500` don't apply.

**Cause**: Tailwind's JIT compiler needs to see complete class strings in source code.

**Fix**: Use complete class names or safelist them:

```tsx
// ❌ BAD
className={`bg-${color}-500`}

// ✅ GOOD — use a map
const colorMap = { blue: "bg-blue-500", red: "bg-red-500" };
className={colorMap[color]}
```

---

## 10. `@tailwind` / `@apply` Lint Warnings in VS Code

**Symptom**: CSS linter shows "Unknown at rule @tailwind" warnings.

**Cause**: VS Code's built-in CSS validator doesn't understand Tailwind directives.

**Fix**: These are **false positives** — benign and do not affect the build. Optionally install the [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) extension.
