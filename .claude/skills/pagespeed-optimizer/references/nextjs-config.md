# Next.js Configuration Reference

Configuration options for optimal PageSpeed performance in Next.js 16+.

## Essential Configurations

### inlineCss (Critical for 90+ scores)

```typescript
// next.config.mjs
experimental: {
  inlineCss: true,
}
```

**What it does:** Inlines critical CSS directly in HTML, eliminating render-blocking CSS requests.

**Impact:**
- FCP improvement: ~400ms
- Eliminates CSS round-trip
- First-time visitors benefit most

**When to use:**
- App Router with Tailwind CSS
- Small CSS bundles (<50KB)
- Targeting 90+ PageSpeed scores

**Trade-offs:**
- Slightly larger initial HTML
- Returning visitors don't benefit (already cached)

---

## Image Optimization

### Modern Formats

```typescript
images: {
  formats: ['image/avif', 'image/webp'],
}
```

**Best practices:**
- AVIF: Better compression, wider browser support
- WebP: Fallback for older browsers
- Next.js自动 serves appropriate format

### Device Sizes

```typescript
images: {
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
}
```

**Mobile-first approach:**
- 640px: Mobile (most common)
- 750px: Tablet
- 828px: Tablet landscape
- 1080px+: Desktop

### Remote Patterns

```typescript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: '**',
    },
  ],
}
```

**For CDN images:**
```typescript
remotePatterns: [
  {
    protocol: 'https',
    hostname: 'cdn.example.com',
    pathname: '/images/**',
  },
]
```

---

## Package Imports Optimization

```typescript
experimental: {
  optimizePackageImports: [
    'lucide-react',      // Tree-shake icons
    'framer-motion',    // Tree-shake animations
    'gsap',             // Tree-shake animations
    '@gsap/react',      // Tree-shake React hooks
  ],
}
```

**Impact:** Reduces bundle size by importing only used components.

---

## Compiler Options

### Remove Console in Production

```typescript
compiler: {
  removeConsole: process.env.NODE_ENV === 'production',
}
```

**What it removes:** `console.log`, `console.warn`, `console.error`

**When to use:** Production builds only (keep for debugging)

---

## Production Optimizations

```typescript
productionBrowserSourceMaps: false,
```

**What it does:** Disables source maps in production

**Benefits:**
- Smaller bundle size
- Faster build times
- Exposes less source code

**Trade-off:** Harder to debug production issues

---

## Complete Optimized Config

```typescript
// next.config.mjs
import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },

  // Performance experiments
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      'framer-motion',
      'gsap',
      '@gsap/react',
    ],
    inlineCss: true,  // Critical for 90+ scores
  },

  // Production optimizations
  productionBrowserSourceMaps: false,

  // Compiler options
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Caching headers
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|jpeg|png|gif|webp|avif|ico)',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);
```

---

## package.json Browserslist

```json
{
  "browserslist": {
    "production": [
      "chrome 111",
      "edge 111",
      "firefox 111",
      "safari 16.4"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
```

**Why these versions:**
- Matches Next.js default targets
- Removes polyfills for modern features
- Array.at, flat, flatMap: Chrome 97+, Safari 15.1+
- Object.fromEntries: Chrome 85+, Safari 14.1+
- Object.hasOwn: Chrome 93+, Safari 15.4+

---

## Turbopack Notes

Next.js 16 uses Turbopack by default. Some config options may differ:

### Turbopack-Specific

```typescript
// Turbopack ignores these (legacy):
// - swcMinify (always enabled)
// - webpack middleware
```

### Current Limitations

Some Next.js plugins may not yet support Turbopack.

Check Next.js documentation for latest compatibility.
