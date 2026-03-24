# Common Performance Fixes

Quick reference for fixing the most common PageSpeed issues.

## Render-Blocking CSS (570ms potential savings)

### Issue
CSS files block initial render, delaying FCP and LCP.

### Solution

**Next.js 15+:** Enable `inlineCss` experimental feature

```typescript
// next.config.mjs
experimental: {
  inlineCss: true,
}
```

**Result:** Critical CSS inlined in HTML, eliminates network round-trip.

---

## Legacy JavaScript Polyfills (13-14 KiB potential savings)

### Issue
Next.js includes polyfills for modern features already supported by browsers:
- `Array.prototype.at`
- `Array.prototype.flat`
- `Array.prototype.flatMap`
- `Object.fromEntries`
- `Object.hasOwn`
- `String.prototype.trimEnd/Start`

This wastes 13-14 KiB on modern browsers even with browserslist configuration.

### Solution

**Turbopack (Recommended):** Replace polyfills with empty file via resolveAlias

```typescript
// next.config.mjs
const nextConfig = {
  turbopack: {
    resolveAlias: {
      '../build/polyfills/polyfill-module': './src/lib/empty-polyfill.js',
      'next/dist/build/polyfills/polyfill-module': './src/lib/empty-polyfill.js',
    },
  },
}

// src/lib/empty-polyfill.js - Create this empty file
export {}
```

**Webpack (Fallback):** Configure modern browser targets in `package.json`:

```json
{
  "browserslist": {
    "production": ["chrome 111", "edge 111", "firefox 111", "safari 16.4"],
    "development": ["last 1 chrome version", "last 1 firefox version", "last 1 safari version"]
  }
}
```

**Result:** PageSpeed "Legacy JavaScript" insight shows 0 KiB.

---

## Hero Image LCP Issues (2-4s delay on Mobile)

### Issue
Hero image is the LCP element on mobile, causing slow LCP.

### Detection
PageSpeed "LCP breakdown" shows hero image as LCP element.

### Solution

**Desktop-only hero image:**

```typescript
<section className="relative min-h-screen flex items-center justify-center">
  {/* Mobile: Gradient only (LCP = text, ~1s) */}
  <div className="absolute inset-0 bg-gradient-to-br from-slate-950 to-slate-900" />

  {/* Desktop: Add image (LCP ~0.8s) */}
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

  {/* Text renders immediately on both */}
  <h1 className="text-5xl md:text-7xl font-bold">
    Next Level Digital Growth
  </h1>
</section>
```

**Key Principles:**
- Mobile: No image download → text becomes LCP
- Desktop: Image loads after HTML → faster LCP
- `loading="lazy"` for non-LCP images
- WebP format for smaller file size

---

## Infinite Animation CPU Drain

### Issue
`animate-[spin_2s_linear_infinite]` causes constant CPU usage, increasing TBT.

### Detection
Chrome DevTools Performance tab shows constant 60fps animation.

### Solution

```typescript
// ❌ Wrong - Constant CPU usage
<span className="animate-[spin_2s_linear_infinite]" />

// ✅ Right - Only animate on interaction
<span className="hover:rotate-180 transition-transform duration-300" />

// ✅ Right - One-time entrance animation
<span className="animate-in spin-once duration-1000" />
```

---

## GSAP on Hero Section (1.5s CPU time)

### Issue
GSAP used for simple fade effect adds 1.5s JavaScript execution time.

### Detection
PageSpeed "Reduce JavaScript execution time" shows GSAP chunk consuming 1.2s+.

### Solution

**For simple fade: Use CSS**

```typescript
// ❌ Wrong - GSAP for simple fade
useEffect(() => {
  gsap.from(ref.current, { opacity: 0, duration: 1 })
}, [])

// ✅ Right - CSS animation
<div className="animate-in fade-in duration-1000">
  <h1>Hero Text</h1>
</div>
```

**For complex scroll animations: Use GSAP properly**

```typescript
import { useGSAP } from "@gsap/react";

// ✅ Right - Automatic cleanup
useGSAP(() => {
  gsap.to(".element", { x: 100 })
}, { scope: container })
```

---

## Forced Reflow Issues

### Issue
Reading layout properties after style changes causes reflow.

### Detection
PageSpeed "Forced reflow" diagnostic shows 194ms+ reflow time.

### Solution

```typescript
// ❌ Wrong - Causes reflow
element.style.height = element.scrollHeight + "px"

// ✅ Right - Batch DOM reads
const height = element.offsetHeight
element.style.height = height + "px"
```

---

## Third-Party Script Blocking

### Issue
Google Analytics, chat widgets block initial render.

### Solution

```typescript
// layout.tsx
import Script from 'next/script'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>{children}</body>
      {/* Defer until after hydration */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-XXX"
        strategy="afterInteractive"
      />
    </html>
  )
}
```

---

## Quick Reference Table

| Issue | Impact | Fix | Time Saved |
|-------|--------|-----|------------|
| Legacy polyfills | 13-14 KiB | Turbopack resolveAlias | ~13 KiB |
| Render-blocking CSS | 570ms | `inlineCss: true` | ~400ms FCP |
| GSAP forced reflows | 100-200ms | `gsap.fromTo()` | ~150ms TBT |
| Three.js/WebGL blocking | 1000ms+ | Deferred init | ~1000ms TBT |
| Hero image mobile | 2-4s LCP | Desktop-only | ~2s LCP |
| Infinite animations | +200ms TBT | Remove/use CSS | ~200ms TBT |
| GSAP on hero | +1.5s CPU | Use CSS fade | ~1.5s JS |
| Third-party scripts | +300ms TBT | Defer loading | ~300ms TBT |
