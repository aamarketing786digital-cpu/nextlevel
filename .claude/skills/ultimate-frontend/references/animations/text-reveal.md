# Text Reveal Animations — GSAP + overflow-hidden Pattern

## When to Use
- Smooth word-by-word or line-by-line entrance for hero headings
- "Unmasking" text that slides up from behind a hidden boundary
- Premium typography reveals (agency sites, portfolios, editorial)

## The Pattern
Each line of text is wrapped in `overflow-hidden`, and the inner text is animated from `y: 100%` to `y: 0`:

```tsx
<h2 className="text-5xl font-bold leading-tight">
  <div className="overflow-hidden">
    <div className="reveal-text pb-3">First Line</div>
  </div>
  <div className="overflow-hidden">
    <div className="reveal-text pb-3">
      <span className="text-primary">Second Line</span>
    </div>
  </div>
</h2>
```

### GSAP Animation
```tsx
useGSAP(() => {
  gsap.from(".reveal-text", {
    y: "100%",
    duration: 0.8,
    ease: "power3.out",
    stagger: 0.15,
    scrollTrigger: {
      trigger: sectionRef.current,
      start: "top 80%",
    }
  });
}, { scope: sectionRef });
```

## ⚠️ Critical Pitfall: Descender Clipping

### The Bug
Letters with descenders (g, y, p, q, j) get **clipped** at the bottom because `overflow-hidden` cuts off anything below the text baseline.

Before fix:
```
Redefinin[g]  ← bottom of "g" chopped off
Trusted b[y]  ← bottom of "y" chopped off
```

### The Fix: Add `pb-3` to Inner Elements

```tsx
// ❌ BAD — descenders get clipped
<div className="overflow-hidden">
  <div className="reveal-text">Redefining</div>
</div>

// ✅ GOOD — padding gives descenders room
<div className="overflow-hidden">
  <div className="reveal-text pb-3">Redefining</div>
</div>
```

### Why `pb-3` Specifically?
| Font Size | Recommended Padding |
|-----------|-------------------|
| text-2xl to text-3xl | `pb-2` |
| text-4xl to text-5xl | `pb-3` |
| text-6xl+ | `pb-4` |

The larger the font, the deeper the descenders. `pb-3` (0.75rem) works well for most hero-sized text (text-4xl to text-6xl).

### Why Not `leading-loose` Instead?
`leading-loose` (line-height: 2) adds space above AND below, creating ugly gaps between lines. `pb-3` only adds space at the bottom of each line's container, keeping lines tight while preventing clipping.

## Flex Layout Variant (Inline Words)
For horizontal word reveals (e.g. "Trusted by Visionaries" as 3 separate words):

```tsx
<h2 className="flex justify-center items-center gap-x-3 gap-y-2 flex-wrap">
  <div className="overflow-hidden">
    <div className="reveal-text pb-3">Trusted</div>
  </div>
  <div className="overflow-hidden">
    <div className="reveal-text pb-3">by</div>
  </div>
  <div className="overflow-hidden">
    <div className="reveal-text pb-3">
      <span className="text-primary">Visionaries</span>
    </div>
  </div>
</h2>
```

## Gradient Text Inside Reveal
If using `bg-clip-text` gradient text inside a reveal, ensure the gradient container is on the `<span>` inside the reveal div, NOT on the overflow-hidden wrapper:

```tsx
// ✅ Correct — gradient on inner span
<div className="overflow-hidden">
  <div className="reveal-text pb-3">
    <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-amber-600">
      Golden Text
    </span>
  </div>
</div>
```

## Performance Notes
- Reveal animations should be `scrollTrigger` driven, not fire on mount
- Use `stagger: 0.15` for natural feel (not too fast, not too slow)
- `ease: "power3.out"` gives the best "slide up" motion
- Always use `useGSAP` with `{ scope }` for automatic cleanup

## Related
- `animations/gsap.md` — Core GSAP patterns
- `animations/preloaders.md` — Page load reveals
