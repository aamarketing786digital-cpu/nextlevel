# Troubleshooting Performance Issues

Debugging guide for common PageSpeed problems.

## Diagnostic Tools

### Chrome DevTools

**Performance Tab:**
- Shows main-thread activity
- Identifies long tasks (>50ms)
- Reveals JavaScript execution time
- Captures FPS during animations

**Network Tab:**
- Shows resource load order
- Identifies blocking requests
- Reveals file sizes
- Shows waterfall timing

**Coverage Tab:**
- Identifies unused CSS
- Identifies unused JavaScript

### PageSpeed Insights

**Key Sections to Check:**
1. **LCP breakdown** - What element is the LCP?
2. **Render blocking requests** - CSS files blocking render
3. **Reduce JavaScript execution time** - Heavy JS chunks
4. **Diagnostics** - Forced reflow, long tasks

---

## Common Issues & Solutions

### Issue: Score Decreased After Changes

**Symptoms:**
- Mobile score was 75, now 70
- Desktop score was 95, now 88

**Possible Causes:**
1. New image added to hero
2. GSAP animation added
3. Third-party script added
4. Build configuration changed

**Debug Steps:**
```bash
# Check what changed
git diff HEAD~1 next.config.mjs
git diff HEAD~1 package.json
git diff HEAD~1 src/components/sections/Hero.tsx
```

---

### Issue: LCP Not Improving Despite Image Optimization

**Symptoms:**
- Converted to WebP, reduced quality
- LCP still > 4s on mobile

**Root Cause:** Image is still the LCP element on mobile

**Solution:**
1. Make image desktop-only: `<div className="hidden md:block">`
2. Or remove `priority` and let text be LCP
3. Or use CSS gradient instead of image

---

### Issue: TBT Still High After Removing GSAP

**Symptoms:**
- Removed GSAP from hero
- TBT still 200ms+

**Debug Steps:**
```bash
# Check PageSpeed "Reduce JavaScript execution time"
# Look for other heavy chunks:
# - Three.js (3D scenes)
# - Framer Motion (heavy animations)
# - Analytics scripts
```

**Common Culprits:**
1. **Three.js still loading** - Check imports in 3D components
2. **Framer Motion** - Consider removing from hero sections
3. **Google Analytics** - Defer with `strategy="afterInteractive"`

---

### Issue: Hydration Mismatch Errors

**Symptoms:**
```
Warning: Text content does not match server-rendered HTML
```

**Common Causes:**
1. Browser extension adding attributes (bis_skin_checked)
2. `localStorage` accessed during render
3. Date.now() or Math.random() in render

**Solutions:**
```typescript
// ❌ Wrong - Browser API in render
const date = new Date().toLocaleDateString()

// ✅ Right - Use useEffect
const [date, setDate] = useState()
useEffect(() => {
  setDate(new Date().toLocaleDateString())
}, [])

// ✅ Right - SSR-safe with placeholder
const [mounted, setMounted] = useState(false)
useEffect(() => setMounted(true), [])
if (!mounted) return <div>Loading...</div>
```

---

### Issue: Build Fails with TypeScript Errors

**Symptoms:**
```
Error: 'CheckCircle2' is declared but its value is never read
```

**Solution:**
```bash
# Find and remove unused imports
npx tsc --noEmit

# Or use lint
npm run lint
```

---

### Issue: inlineCss Not Working

**Symptoms:**
- Enabled `inlineCss: true`
- CSS still blocking render

**Possible Causes:**
1. Next.js version < 15.1
2. Using Pages Router (not App Router)
3. Large CSS bundle (>100KB)

**Check:**
```bash
# Verify Next.js version
npm list next

# Check router structure
ls -la src/app  # App Router has app/
```

---

## Performance Regression Checklist

Use this checklist when performance decreases:

| Check | Command | Expected |
|-------|---------|----------|
| Next.js version | `npm list next` | 16.1.6+ |
| inlineCss enabled | Check `next.config.mjs` | `true` |
| Modern browserslist | Check `package.json` | Chrome 111+ |
| WebP images | Check `public/images/` | `.webp` files |
| No infinite animations | Grep `animate-\[spin` | No results |
| GSAP on hero | Check `Hero.tsx` | No GSAP imports |
| Desktop-only images | Check `Hero.tsx` | `hidden md:block` |
| Build succeeds | `npm run build` | No errors |

---

## Quick Wins

| Fix | Time to Implement | Expected Impact |
|-----|-------------------|-----------------|
| Enable inlineCss | 1 min | +400ms FCP |
| Add browserslist | 1 min | +200ms parse |
| Reduce image quality to 50 | 2 min | -20KB file size |
| Desktop-only hero image | 5 min | -2s Mobile LCP |
| Remove infinite spin | 10 min | +200ms TBT |
| Remove GSAP from hero | 15 min | +1.5s JS time |
