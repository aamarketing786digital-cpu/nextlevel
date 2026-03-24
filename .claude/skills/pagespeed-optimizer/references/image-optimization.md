# Image Optimization Guide

Best practices for optimizing images in Next.js applications.

## Core Principles

1. **Use Next.js `<Image>` component only** - Never raw `<img>` tags
2. **WebP format** - 30-50% smaller than PNG/JPEG
3. **Mobile-first sizes** - `sizes` attribute for responsive loading
4. **Quality trade-off** - 60-75 for balance of size/visuals
5. **Desktop-only heavy images** - Mobile gets gradient/color only

---

## Next.js Image Component

### Basic Usage

```typescript
<Image
  src="/hero.webp"
  alt="Hero background"
  fill
  priority={isAboveFold}
  sizes="(max-width: 768px) 50vw, 100vw"
  quality={75}
  className="object-cover"
/>
```

### Props Reference

| Prop | When to Use | Values |
|------|------------|--------|
| `fill` | Full-size background images | Boolean |
| `priority` | LCP elements only | Boolean |
| `loading` | Below-fold images | `"lazy"` |
| `sizes` | Responsive images | `(max-width: 768px) 50vw, 100vw` |
| `quality` | File size optimization | 1-100, default 75 |

---

## Responsive `sizes` Patterns

### Hero Section (Full Width)

```typescript
sizes="(max-width: 768px) 50vw, 100vw"
```
- Mobile: Loads 50vw width image (384px)
- Desktop: Loads 100vw width image (1920px+)

### Card Image (Fixed Aspect)

```typescript
sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
```
- Mobile: 100vw
- Tablet: 50vw
- Desktop: 33vw (3 columns)

### Content Image (Constraint Based)

```typescript
sizes="(max-width: 640px) 100vw, 640px"
```
- Mobile: Full width
- Desktop+: Fixed 640px max

---

## Quality Guidelines

| Use Case | Quality | Reason |
|----------|---------|--------|
| Hero background (opacity < 30%) | 50-60 | Low opacity hides artifacts |
| Content images (product, photos) | 75-80 | Balance size/quality |
| Icons/logos (simple graphics) | 90-100 | Sharp edges important |
| Thumbnails | 60-70 | Small size tolerates artifacts |

---

## Desktop-Only Pattern

For decorative backgrounds that hurt mobile performance:

```typescript
// Mobile: Fast gradient (no image)
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

**When to use:**
- Hero backgrounds with opacity < 30%
- Decorative textures/patterns
- 3D scene backgrounds (disable 3D on mobile)

**When NOT to use:**
- Product images (needed on all devices)
- Content images (blog posts, case studies)
- User-generated content

---

## WebP Conversion

### Command Line

```bash
# Using cwebp (Google's encoder)
cwebp input.png -o output.webp -q 80

# Using ffmpeg
ffmpeg -i input.png -c:v libwebp -quality 80 output.webp
```

### Online Tools

- [Squoosh](https://squoosh.app/) - Google's image optimizer
- [TinyPNG](https://tinypng.com/) - WebP conversion
- [CloudConvert](https://cloudconvert.com/png-to-webp) - Batch conversion

---

## Common Mistakes

### ❌ Wrong: Raw img tag

```typescript
<img src="/hero.png" alt="hero" width={1920} height={1080} />
```

### ✅ Right: Next.js Image

```typescript
<Image
  src="/hero.webp"
  alt="hero"
  width={1920}
  height={1080}
  priority
/>
```

### ❌ Wrong: High quality for background

```typescript
<Image src="/hero.png" quality={100} />
```

### ✅ Right: Appropriate quality

```typescript
<Image src="/hero.webp" quality={50} className="opacity-20" />
```

### ❌ Wrong: Same sizes for all

```typescript
<Image sizes="100vw" /> // Loads full size on mobile
```

### ✅ Right: Mobile-optimized

```typescript
<Image sizes="(max-width: 768px) 50vw, 100vw" />
```

---

## File Size Targets

| Image Type | Mobile Max | Desktop Max |
|------------|------------|-------------|
| Hero background | 0KB (gradient) | 100KB |
| Product image | 50KB | 200KB |
| Blog thumbnail | 30KB | 100KB |
| Icon/logo | 10KB | 20KB |

---

## Next.js Config for Images

```typescript
// next.config.mjs
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'], // Modern formats
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60, // Cache for 60 seconds
  },
}
```
