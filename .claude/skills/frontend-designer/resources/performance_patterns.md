# Performance Patterns for Frontend Design

Critical performance considerations when implementing animations and interactions.

## The Golden Rule

**Performance > Perfection**

A 95-performance site with subtle animations beats a 40-performance site with epic animations.

---

## Animation Performance Hierarchy

| Priority | Approach | Use When | Example |
|----------|----------|----------|---------|
| 1 | CSS Transitions | Hover states, simple transforms | Buttons, cards, links |
| 2 | CSS Keyframes | Looping patterns, loaders | Spinners, pulse effects |
| 3 | IntersectionObserver | Scroll reveals | Fade-in on scroll |
| 4 | GSAP ScrollTrigger | Complex storytelling | Pinning, timelines |
| 5 | Three.js | 3D scenes | Interactive 3D |

**Critical:** Never use Priority 4+ for mobile hero sections.

---

## The Performance Killers

### 1. Infinite Animations

```typescript
// ❌ KILLS PERFORMANCE - Constant CPU usage
<span className="animate-[spin_2s_linear_infinite]" />

// ✅ USE INSTEAD - Only animate on interaction
<span className="hover:rotate-180 transition-transform duration-300" />
```

### 2. Character-by-Character Animation

```typescript
// ❌ KILLS PERFORMANCE - DOM bloat
{text.split("").map((char, i) => (
  <span key={i} className="inline-block">{char}</span>
))}

// ✅ USE INSTEAD - Animate entire word/phrase
<span className="animate-in fade-in slide-in-from-bottom duration-700">
  {text}
</span>
```

### 3. GSAP for Simple Effects

```typescript
// ❌ OVERKILL - GSAP for simple fade
useEffect(() => {
  gsap.from(ref.current, { opacity: 0, duration: 1 })
}, [])

// ✅ USE INSTEAD - CSS animation
<div className="animate-in fade-in duration-1000">
```

---

## Mobile vs Desktop Strategies

### Mobile: Lightweight Only

```typescript
export function Hero() {
  const isMobile = useMediaQuery("(max-width: 768px)")

  if (isMobile) {
    return (
      // ✅ Simple CSS fade for mobile
      <div className="animate-in fade-in duration-700">
        <h1>Hero Text</h1>
      </div>
    )
  }

  return (
    // Desktop can have GSAP
    <div ref={containerRef}>
      <h1>Hero Text</h1>
    </div>
  )
}
```

### What to Avoid on Mobile

| Feature | Mobile | Desktop | Reason |
|---------|--------|---------|--------|
| GSAP ScrollTrigger | ❌ | ✅ | Too heavy |
| 3D scenes | ❌ | ✅ | GPU/CPU heavy |
| Character animations | ❌ | ⚠️ | DOM bloat |
| Infinite animations | ❌ | ❌ | Never OK |
| Parallax | ⚠️ | ✅ | Can cause jank |

---

## Performance Budgets

### Mobile Budget

| Resource | Budget | Enforce |
|----------|--------|---------|
| Initial JS | < 150KB | Code splitting |
| Hero images | 0KB | Gradient only |
| Animation time | < 100ms | CSS only |
| LCP | < 2.5s | Priority content |

### Desktop Budget

| Resource | Budget | Enforce |
|----------|--------|---------|
| Initial JS | < 300KB | Code splitting |
| Hero images | < 100KB | WebP + quality |
| Animation time | < 500ms | GSAP OK |
| LCP | < 2.5s | Priority content |

---

## Best Practices

### 1. Use `useGSAP` for React

```typescript
import { useGSAP } from "@gsap/react"

// ✅ Automatic cleanup
useGSAP(() => {
  gsap.to(".box", { x: 100 })
}, { scope: container })
```

### 2. Prefer CSS for Hover Effects

```typescript
// ✅ CSS transitions - GPU accelerated
<button className="hover:scale-105 hover:shadow-lg transition-all duration-300">
  Click Me
</button>
```

### 3. Use IntersectionObserver for Scroll Reveals

```typescript
// ✅ Lightweight scroll detection
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
      }
    })
  },
  { threshold: 0.1 }
)
```

### 4. Animate Transforms, Not Layout

```typescript
// ✅ GPU accelerated - use transform/opacity
style={{ transform: 'translateX(0)', opacity: 1 }}

// ❌ CPU intensive - causes layout
style={{ left: 0, display: 'block' }}
```

---

## See Also

- Full PageSpeed guide: `workflow/pagespeed-optimization.md`
- GSAP patterns: `animations/gsap.md`
- CSS recipes: `css/`
