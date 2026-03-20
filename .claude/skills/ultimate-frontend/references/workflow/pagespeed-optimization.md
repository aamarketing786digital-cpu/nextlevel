# PageSpeed Optimization Guide (90+ Scores)

Comprehensive guide for maintaining 90+ PageSpeed scores from the start of development.

## Score Targets

| Platform | Target | LCP | TBT | Speed Index | CLS |
|----------|--------|-----|-----|-------------|-----|
| Mobile | 90+ | < 2.5s | < 200ms | < 3.4s | < 0.1 |
| Desktop | 90+ | < 2.5s | < 300ms | < 3.4s | < 0.1 |

---

## 1. Image Optimization (Critical - Affects LCP)

### Rules
- Use Next.js `<Image>` component only
- WebP format (30-50% smaller than PNG)
- Mobile-specific `sizes` attribute
- `priority` only for LCP elements
- Quality 60-75 (balance size/visuals)
- Desktop-only heavy images

### Implementation

```typescript
// ✅ CORRECT - Optimized hero image
<Image
  src="/hero.webp"
  alt="Hero background"
  fill
  priority={isAboveFold}
  sizes="(max-width: 768px) 50vw, 100vw"
  quality={75}
  className="object-cover"
  loading={isAboveFold ? undefined : "lazy"}
/>

// ✅ Desktop-only background image
<div className="hidden md:block absolute inset-0">
  <Image
    src="/hero-desktop.webp"
    alt=""
    fill
    sizes="100vw"
    quality={50}
    className="object-cover opacity-20"
    loading="lazy"
  />
</div>
```

### Pitfalls to Avoid

| ❌ Wrong | ✅ Right | Impact |
|---------|---------|--------|
| `<img src="large.png">` | `<Image src="optimized.webp">` | -2s LCP |
| `quality={100}` | `quality={75}` | +500KB |
| No `sizes` attr | `sizes="(max-width: 768px) 50vw"` | +1MB mobile |
| Same image mobile+desktop | Separate/desktop-only images | -1.5s mobile |

---

## 2. Code Splitting (Affects TBT, TTI)

### Dynamic Imports Pattern

```typescript
// page.tsx - Always load hero, lazy-load everything else
import { Hero } from '@/components/sections/Hero'
import dynamic from 'next/dynamic'

const Services = dynamic(() => import('@/components/sections/Services'), {
  loading: () => <SectionLoader />,
})

const Testimonials = dynamic(() => import('@/components/sections/Testimonials'), {
  loading: () => <SectionLoader />,
})

const Contact = dynamic(() => import('@/components/sections/Contact'), {
  loading: () => <SectionLoader />,
})
```

### What to Lazy-Load

| Component Type | Lazy Load | Reason |
|---------------|-----------|---------|
| Hero sections | ❌ No | Above-fold, needed immediately |
| Services/Features | ✅ Yes | Below-fold |
| Testimonials | ✅ Yes | Below-fold + heavy |
| Blog sections | ✅ Yes | Below-fold |
| 3D scenes | ✅ Yes | Very heavy |
| Charts/Graphs | ✅ Yes | Heavy libraries |
| Contact forms | ⚠️ Maybe | If below-fold |

---

## 3. Animation Performance (Affects TBT)

### The Performance Killers

```typescript
// ❌ KILLER #1 - Infinite spin animation
<span className="animate-[spin_2s_linear_infinite]" />
// Impact: Constant CPU usage, +200ms TBT

// ❌ KILLER #2 - GSAP on hero for simple fade
useEffect(() => {
  gsap.from(".hero-text", { opacity: 0, duration: 1 })
}, [])
// Impact: +1.5s CPU time on mobile

// ❌ KILLER #3 - Character-by-character on mobile
{text.split("").map(char => <span>{char}</span>)}
// Impact: DOM bloat, +500ms rendering
```

### The Solutions

```typescript
// ✅ Use CSS transitions for hover effects
<span className="transition-transform duration-300 hover:scale-105" />

// ✅ Use simple CSS fade for hero
<div className="animate-in fade-in duration-1000">
  <h1>Hero Text</h1>
</div>

// ✅ GSAP only with useGSAP (automatic cleanup)
import { useGSAP } from "@gsap/react"

useGSAP(() => {
  // Animation code here - auto cleaned up
}, { scope: container })
```

### Animation Guidelines

| Scenario | Mobile | Desktop |
|----------|--------|---------|
| Hero text reveal | CSS fade only | GSAP stagger OK |
| Scroll animations | Minimal/light | Full GSAP ScrollTrigger |
| 3D scenes | ❌ Never | ✅ Yes |
| Hover effects | CSS transitions | CSS transitions |
| Loading states | Skeleton/collapse | Spinners OK |

---

## 4. Async Waterfalls (Affects Speed Index)

### The Problem

```typescript
// ❌ WRONG - Sequential execution (3 round trips)
const user = await fetchUser()      // Round trip 1
const posts = await fetchPosts()    // Round trip 2
const comments = await fetchComments() // Round trip 3
// Total: 3 seconds
```

### The Solution

```typescript
// ✅ CORRECT - Parallel execution (1 round trip)
const [user, posts, comments] = await Promise.all([
  fetchUser(),
  fetchPosts(),
  fetchComments()
])
// Total: 1 second
```

### Apply to Server Components

```typescript
// page.tsx
export default async function HomePage() {
  // Parallel fetches
  const [posts, testimonials, caseStudies] = await Promise.all([
    client.fetch(postsQuery),
    client.fetch(testimonialsQuery),
    client.fetch(caseStudiesQuery)
  ])

  return <>{/* render */}</>
}
```

---

## 5. Third-Party Scripts (Affects TBT)

### Defer Analytics

```typescript
// layout.tsx
import Script from 'next/script'

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        {/* ✅ Defer until after hydration */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXX"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXX');`}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  )
}
```

### Script Loading Strategies

| Strategy | When to Use | Impact |
|----------|-------------|--------|
| `beforeInteractive` | Critical CSS only | Blocks render |
| `afterInteractive` | Analytics, non-critical | After hydration |
| `lazyOnload` | Low priority scripts | During idle time |

---

## 6. SSR-Safe Patterns (Prevents Hydration Errors)

### Browser APIs Pattern

```typescript
// ❌ WRONG - Direct access causes hydration error
const [theme, setTheme] = useState(localStorage.getItem('theme'))

// ✅ CORRECT - SSR-safe pattern
const [mounted, setMounted] = useState(false)

useEffect(() => {
  setMounted(true)
}, [])

if (!mounted) return <div>Placeholder</div>

return <div>{/* Browser-dependent content */}</div>
```

### Common SSR Errors

| Error | Cause | Fix |
|-------|--------|-----|
| "Text content does not match" | Browser API in render | Move to useEffect |
| "Maximum update depth exceeded" | Zustand persist during SSR | Use local state |
| "Window is not defined" | Server-side window access | Check `typeof window !== 'undefined'` |

---

## 7. Mobile-Specific Optimizations

### The Mobile-First Hero

```typescript
export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center">
      {/* Mobile: Gradient only (fast) */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 to-slate-900" />

      {/* Desktop: Add image (slower but acceptable) */}
      <div className="hidden md:block absolute inset-0">
        <Image
          src="/hero.webp"
          alt=""
          fill
          sizes="100vw"
          quality={50}
          className="object-cover opacity-20"
          loading="lazy"
        />
      </div>

      {/* Text: Server-rendered, no animations */}
      <div className="relative z-10 text-center">
        <h1 className="text-5xl md:text-7xl font-bold">
          Next Level Digital Growth
        </h1>
      </div>
    </section>
  )
}
```

### Mobile vs Desktop Strategy

| Aspect | Mobile Strategy | Desktop Strategy |
|--------|----------------|------------------|
| Hero image | None/gradient | WebP background |
| Animations | CSS fade only | GSAP ok |
| 3D scenes | Disabled | Enabled |
| Font loading | System font ok | Custom fonts |
| JavaScript | Minimal | Full features |

---

## 8. Development Checklist

### Before Committing

```bash
# 1. Type check
npx tsc --noEmit

# 2. Build check
npm run build

# 3. Lint check
npm run lint

# 4. Image optimization
# - All images are WebP
# - Proper sizes attribute
# - Quality 60-75

# 5. Code splitting
# - Below-fold sections use dynamic()
# - No unused imports
```

### Pre-Deployment Test

- [ ] Run PageSpeed Insights (Mobile 4G throttling)
- [ ] Run Lighthouse (Desktop throttling)
- [ ] Check Network tab for image sizes
- [ ] Verify no hydration errors in console
- [ ] Test on real mobile device

---

## 9. Quick Reference: Performance Decision Matrix

| Feature | Mobile Impact | Desktop Impact | Recommendation |
|---------|---------------|----------------|----------------|
| Hero image | High (-2s LCP) | Low (-0.3s) | Desktop-only |
| GSAP animations | High (+1s CPU) | Low (+200ms) | Minimal on mobile |
| 3D scenes | Critical (+3s) | Medium (+500ms) | Mobile: disable |
| Heavy fonts | Medium (+500ms) | Low (+100ms) | System font on mobile |
| Third-party scripts | High (+300ms TBT) | Medium (+100ms) | Defer all |

---

## 10. Troubleshooting Common Issues

### LCP > 4s

**Check:**
1. Is hero image too large? → Compress or use WebP
2. Is image on mobile? → Remove/make desktop-only
3. Missing `priority` on LCP element? → Add it
4. Large CSS blocking? → Inline critical CSS

### TBT > 300ms

**Check:**
1. GSAP on hero? → Remove, use CSS
2. Infinite animations? → Remove or use `hover:`
3. Large JS bundle? → Dynamic imports
4. Third-party scripts? → Defer with `strategy="afterInteractive"`

### Speed Index > 5s

**Check:**
1. Content not showing quickly? → Server-render hero
2. Large images loading first? → Lazy load below-fold
3. CSS in critical path? → Minimize/inline critical
4. Font loading delayed? → Use `font-display: swap`

---

## Summary: The 90+ Formula

```
Mobile 90+ = Text Hero + No Images + No GSAP + Dynamic Imports + WebP
Desktop 90+ = Priority Image + GSAP OK + Full Features + Proper Sizing
```

**Key Principle:** Progressive enhancement - build fast baseline, enhance desktop.
