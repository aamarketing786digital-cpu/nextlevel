# Responsive Scaling — Site-Wide Sizing Strategy

## Problem
Websites designed with default 16px base often look "too zoomed" on standard 1080p laptop screens. Users report the site "only looks good at 80-90% browser zoom." This is because Tailwind's spacing/typography scale was designed for slightly higher-DPI contexts.

## Solution: Adaptive Root Font-Size
Scale the **entire site** proportionally by adjusting `html { font-size }`. Since all Tailwind `rem`-based classes (text, padding, margin, gap, max-width, etc.) are relative to the root font-size, a single change cascades everywhere.

### Implementation

```css
@layer base {
  html {
    font-size: 14px; /* ~87.5% of 16px — natural feel at 100% zoom on 1080p */
  }
  @media (min-width: 1536px) {
    html {
      font-size: 15px; /* 2K screens */
    }
  }
  @media (min-width: 1920px) {
    html {
      font-size: 16px; /* 4K / ultrawide — full default */
    }
  }
}
```

### Why This Works
- `14px` base = every Tailwind class shrinks by ~12.5% (text-4xl, p-8, gap-6, max-w-7xl, etc.)
- It's equivalent to viewing at ~87% zoom — exactly the range users preferred
- No need to edit hundreds of component files

### Choosing the Right Value

| Base Size | Effective Zoom | Best For |
|-----------|---------------|----------|
| `13px` | ~81% | Very compact / data-heavy UIs |
| `14px` | ~87% | Standard 1080p laptops (recommended) |
| `15px` | ~94% | Large desktops / 1440p |
| `16px` | 100% | 4K / ultrawide (browser default) |

## Container Max-Widths

Pair root scaling with sensible container widths. Default `max-w-7xl` (1280px) is wide for narrower screens.

### Recommended Container Tiers

```tsx
const sizeClasses = {
  sm: "max-w-3xl",   //  672px — narrow content
  md: "max-w-5xl",   //  896px — form pages, text-heavy
  lg: "max-w-6xl",   // 1024px — default content (recommended)
  xl: "max-w-7xl",   // 1152px — wide layouts
  full: "max-w-full",
};

// Default to "lg" (max-w-6xl)
```

### Usage Pattern

```tsx
<Container>          {/* default lg = 1024px */}
<Container size="md"> {/* narrower = 896px */}
<Container size="xl"> {/* wider = 1152px */}
```

## Pitfalls

### ⚠️ Viewport Units Are NOT Affected
`vw`, `vh`, `dvh` — these bypass rem scaling entirely. If you use them for hero heights or typography, they won't shrink:

```tsx
// ❌ Won't scale with root font-size
className="text-[15vw] min-h-screen"

// ✅ Will scale with root font-size
className="text-8xl py-24"
```

### ⚠️ Pixel Values Are NOT Affected
Explicit `px` values (e.g. `w-[500px]`) won't scale either. Prefer rem-based Tailwind classes.

### ⚠️ Don't Go Below 13px
Below `13px` base, small text (`text-xs`, `text-sm`) becomes unreadable. Form inputs and labels suffer first.

## Related
- `css/tailwindcss.md` — Design token system
- `design/landing-page.md` — Section spacing patterns
