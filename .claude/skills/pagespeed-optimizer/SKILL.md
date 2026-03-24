---
name: pagespeed-optimizer
description: |
  Optimize web applications to achieve 90+ PageSpeed scores on Mobile and Desktop.
  This skill should be used when users ask to improve PageSpeed Insights scores, fix
  performance issues, optimize Core Web Vitals (LCP, TBT, CLS, FCP, Speed Index),
  or eliminate render-blocking resources.
allowed-tools: Read, Edit, Write, Bash, Glob, Grep
---

# PageSpeed Optimizer

Achieve 90+ PageSpeed scores through systematic optimization of Next.js applications.

## What This Skill Does
- Analyzes PageSpeed Insights results to identify bottlenecks
- Implements performance fixes for images, CSS, JavaScript, and rendering
- Configures Next.js for optimal Core Web Vitals
- Provides mobile-first optimization strategies
- Eliminates render-blocking resources
- Removes legacy polyfills for modern browsers

## What This Skill Does NOT Do
- Handle backend API performance (database queries, server optimization)
- Manage CDN configuration (Cloudflare, AWS CloudFront)
- Optimize third-party scripts that require account access
- Perform load testing or stress testing

---

## Before Implementation

Gather context to ensure successful implementation:

| Source | Gather |
|--------|--------|
| **Codebase** | Existing Next.js config, package.json, component structure |
| **Conversation** | User's PageSpeed results, target scores, specific constraints |
| **Skill References** | Optimization patterns from `references/` |
| **User Guidelines** | Project-specific requirements (animation requirements, branding) |

Ensure all required context is gathered before implementing.
Only ask user for THEIR specific requirements (domain expertise is in this skill).

---

## Required Clarifications

Before proceeding, ask:

1. **PageSpeed Results**: "Share your PageSpeed Insights report (Mobile and Desktop)"
   - Include FCP, LCP, TBT, CLS, Speed Index scores
   - Include any insights/warnings from PageSpeed

2. **Target Platform**: "Which platform needs optimization?"
   - Mobile only (common bottleneck)
   - Desktop only (rarely needed)
   - Both Mobile and Desktop

3. **Constraints**: "Any features that cannot be removed or modified?"
   - Required animations (GSAP, 3D scenes)
   - Required images/visuals
   - Third-party integrations (analytics, chat)

## Optional Clarifications

4. **Current Score**: "What are your current PageSpeed scores?"
   - Helps prioritize fixes

5. **Build Tool**: "Which build system are you using?"
   - Next.js Turbopack (default) or Webpack

---

## Quality Criteria

| Metric | 90+ Target | Mobile Strategy | Desktop Strategy |
|--------|-----------|-----------------|------------------|
| **LCP** | < 2.5s | Text-only hero, lazy images | Priority images OK |
| **TBT** | < 200ms | No 3D, minimal JS, defer analytics | More JS acceptable |
| **Speed Index** | < 3.4s | Critical CSS only, defer fonts | Full assets OK |
| **CLS** | < 0.1 | Reserve space for dynamic content | Same |

---

## Workflow

### Phase 1: Analyze PageSpeed Results

1. **Identify the LCP Element**
   - Check PageSpeed "LCP breakdown" or "LCP request discovery"
   - Determine if LCP is an image, text, or other element

2. **Identify Blocking Resources**
   - Check "Render blocking requests" insight
   - Note CSS files blocking initial render
   - Note legacy JavaScript polyfills

3. **Identify JavaScript Execution Time**
   - Check "Reduce JavaScript execution time" diagnostics
   - Note which chunks consume most CPU time
   - Identify GSAP, Three.js, or other heavy libraries

### Phase 2: Implement Critical Fixes

**Apply fixes in order of impact:**

1. **Render-blocking CSS** → Enable `inlineCss: true`
2. **Legacy polyfills** → Configure modern browserslist
3. **Image optimization** → WebP, proper sizes, quality reduction
4. **Code splitting** → Dynamic imports for below-fold sections
5. **Animation removal** → Remove GSAP from hero, infinite animations

### Phase 3: Verify and Iterate

1. Build the application: `npm run build`
2. Deploy or test locally
3. Run PageSpeed Insights again
4. If score < 90, repeat Phase 2

---

## Standards Enforcement

### Must Follow
- [ ] Use Next.js `<Image>` component for all images
- [ ] Use WebP format (30-50% smaller than PNG)
- [ ] Mobile-first: optimize for Mobile, enhance for Desktop
- [ ] Desktop-only heavy assets (images, 3D) using `hidden md:block`
- [ ] Lazy-load below-fold sections with `next/dynamic`
- [ ] Defer third-party scripts with `strategy="afterInteractive"`

### Must Avoid
- [ ] `animate-[spin_2s_linear_infinite]` - constant CPU usage
- [ ] GSAP on hero for simple fade effects
- [ ] Character-by-character animation on mobile
- [ ] Large hero images on mobile
- [ ] Hardcoded hex colors (use CSS variables)

---

## Fix Patterns

### Render-Blocking CSS (570ms potential savings)

**Problem:** CSS files block initial render

**Solution:** Enable inline CSS in Next.js config

```typescript
// next.config.mjs
experimental: {
  inlineCss: true,  // Inlines critical CSS
}
```

### Legacy JavaScript Polyfills (13.4 KiB potential savings)

**Problem:** Polyfills for modern features (Array.at, flat, etc.)

**Solution:** Configure modern browser targets in package.json

```json
{
  "browserslist": {
    "production": ["chrome 111", "edge 111", "firefox 111", "safari 16.4"]
  }
}
```

### Hero Image LCP Issues (2-4s delay on Mobile)

**Problem:** Hero image is LCP element on mobile

**Solution:** Desktop-only hero image

```typescript
// Mobile: Gradient only (fast LCP)
<div className="absolute inset-0 bg-gradient-to-br from-slate-950 to-slate-900" />

// Desktop: Add image
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
```

### Infinite Animation CPU Drain

**Problem:** `animate-[spin_2s_linear_infinite]` consumes constant CPU

**Solution:** Use CSS transitions or remove entirely

```typescript
// ❌ Wrong
<span className="animate-[spin_2s_linear_infinite]" />

// ✅ Right
<span className="hover:rotate-180 transition-transform duration-300" />
```

### GSAP on Hero (1.5s CPU time)

**Problem:** GSAP used for simple fade effect on hero

**Solution:** Use CSS animation or remove animation

```typescript
// ❌ Wrong
useEffect(() => {
  gsap.from(ref.current, { opacity: 0, duration: 1 })
}, [])

// ✅ Right
<div className="animate-in fade-in duration-1000">
  <h1>Hero Text</h1>
</div>
```

---

## Output Checklist

Before delivering, verify:

### Configuration
- [ ] `experimental.inlineCss: true` in next.config.mjs
- [ ] Modern browserslist in package.json
- [ ] Images using Next.js `<Image>` component
- [ ] WebP format for all images

### Code Quality
- [ ] No infinite CSS animations
- [ ] No GSAP on hero sections
- [ ] Desktop-only heavy assets
- [ ] Dynamic imports for below-fold sections

### Performance Targets
- [ ] Mobile LCP < 2.5s
- [ ] Desktop LCP < 2.5s
- [ ] Mobile TBT < 200ms
- [ ] Desktop TBT < 300ms
- [ ] CLS < 0.1

### Testing
- [ ] Build succeeds: `npm run build`
- [ ] No TypeScript errors
- [ ] No unused imports
- [ ] PageSpeed tested on Mobile 4G throttling

---

## Reference Files

| File | When to Read |
|------|--------------|
| `references/fixes.md` | Common issues and solutions |
| `references/image-optimization.md` | Image best practices |
| `references/nextjs-config.md` | Next.js configuration options |
| `references/troubleshooting.md` | Debugging performance issues |

---

## Official Documentation

| Resource | URL | Use For |
|----------|-----|---------|
| Next.js inlineCss | https://nextjs.org/docs/app/api-reference/config/next-config-js/inlineCss | Critical CSS inlining |
| Next.js Image | https://nextjs.org/docs/app/api-reference/components/image | Image optimization |
| Core Web Vitals | https://web.dev/vitals/ | Metric definitions |
| PageSpeed Insights | https://pagespeed.web.dev/ | Performance testing |

For patterns not covered here, fetch from official docs and apply same quality standards.
