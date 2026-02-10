# Tailwind CSS — Utility-first Styling Skill

## When to use
- Rapid UI building with consistent spacing/typography scales
- Design systems where composition beats bespoke CSS
- Glassmorphism, gradient borders, and modern UI effects

## Official Documentation
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Tailwind v3**: https://tailwindcss.com/docs/v3 (current stable)

## Key concepts
- **Utilities**: `flex`, `grid`, `p-4`, `text-lg`, `rounded-xl`
- **Responsive variants**: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`
- **State variants**: `hover:`, `focus:`, `active:`, `group-hover:`, `peer-hover:`
- **Arbitrary values**: `w-[42px]`, `bg-[#1a1a1a]`, `gap-[2.5rem]`
- **CSS variables**: `bg-[var(--my-color)]`, `text-[hsl(var(--foreground))]`

## Best Practices (2025)

### 1. Design Token System
Define semantic tokens in `tailwind.config.js`:

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        // Semantic names for easy updates
      },
      spacing: {
        '18': '4.5rem',   // 72px
        '128': '32rem',   // 512px
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
};
```

### 2. Reusable Component Patterns
Use `@apply` for frequently repeated combinations:

```css
/* components.css */
@layer components {
  .btn-primary {
    @apply px-6 py-3 rounded-xl font-semibold
           bg-indigo-600 text-white
           hover:bg-indigo-500 active:bg-indigo-700
           transition-colors duration-200;
  }

  .glass-card {
    @apply bg-white/10 backdrop-blur-xl
           border border-white/20
           rounded-2xl shadow-xl;
  }
}
```

### 3. Arbitrary Values for Precision
Use bracket syntax for exact values:

```html
<!-- Exact pixel values -->
<div class="w-[184px] h-[42px]">

<!-- Hex colors directly -->
<button class="bg-[#084163] hover:bg-[#0a5a8f]">

<!-- CSS variables -->
<div class="text-[var(--my-custom-color)]">

<!-- Complex properties -->
<div class="[mask-image:linear-gradient(to_bottom,black,transparent)]">
```

### 4. Group and Peer States
Style elements based on parent/sibling state:

```html
<!-- Group: parent affects children -->
<div class="group">
  <p class="text-gray-500 group-hover:text-indigo-600">
    Changes on parent hover
  </p>
</div>

<!-- Peer: sibling affects element -->
<label>
  <input type="checkbox" class="peer">
  <span class="peer-checked:bg-green-500 peer-checked:text-white">
    Changes when checkbox is checked
  </span>
</label>
```

### 5. Gradient Text
Create eye-catching gradient text:

```html
<h1 class="text-6xl font-bold text-transparent
          bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500
          bg-clip-text">
  Gradient Headline
</h1>
```

## Glassmorphism Recipe (2025 Trend)

### Modern Glass Effect
```html
<div class="relative overflow-hidden">
  <!-- Background gradient -->
  <div class="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20" />

  <!-- Glass card -->
  <div class="relative bg-white/10 backdrop-blur-xl
              border border-white/20 rounded-2xl
              shadow-xl p-6">
    <h3 class="text-white font-bold">Glassmorphic Card</h3>
    <p class="text-white/80">Content goes here</p>
  </div>
</div>
```

### Glassmorphic Form
```html
<form class="bg-black/30 backdrop-blur-md
             border border-white/10 rounded-3xl
             p-8 shadow-2xl">
  <input type="email"
         placeholder="Enter your email"
         class="w-full px-4 py-3 rounded-xl
                bg-white/5 border border-white/10
                text-white placeholder:text-white/50
                focus:bg-white/10 focus:border-white/30
                transition-all outline-none" />
</form>
```

## Quick recipes

### Clean CTA button
```html
<button class="inline-flex items-center justify-center
               rounded-xl px-5 py-3
               bg-indigo-600 text-white font-medium
               hover:bg-indigo-500 active:bg-indigo-700
               transition-colors duration-200
               focus:outline-none focus:ring-2 focus:ring-indigo-400">
  Get started
</button>
```

### Center content perfectly
```html
<div class="min-h-screen flex items-center justify-center">
  <!-- Content is centered vertically and horizontally -->
</div>
```

### Responsive grid
```html
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
  <!-- 1 col mobile, 2 tablet, 4 desktop -->
</div>
```

### Hero section with gradient overlay
```html
<section class="relative min-h-screen flex items-center">
  <!-- Background image -->
  <div class="absolute inset-0 bg-[url('/hero.jpg')] bg-cover bg-center" />

  <!-- Gradient overlay -->
  <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

  <!-- Content -->
  <div class="relative z-10 px-6 max-w-4xl mx-auto text-center">
    <h1 class="text-5xl font-bold text-white mb-6">Hero Text</h1>
  </div>
</section>
```

## Animation Utilities

### Built-in transitions
```html
<div class="transition-all duration-300 ease-out
            hover:scale-105 hover:shadow-xl">
  Smooth scale and shadow on hover
</div>
```

### Custom animation in config
```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
};
```

### Staggered animations
```html
<div class="space-y-4">
  <div class="animate-fade-in" style="animation-delay: 0ms">Item 1</div>
  <div class="animate-fade-in" style="animation-delay: 100ms">Item 2</div>
  <div class="animate-fade-in" style="animation-delay: 200ms">Item 3</div>
</div>
```

## Dark Mode Best Practices

### Class-based dark mode (recommended)
```html
<!-- In HTML -->
<html class="dark">
```

```css
/* In CSS */
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222 47% 11%;
  }

  .dark {
    --background: 222 47% 11%;
    --foreground: 0 0% 98%;
  }
}
```

### Dark mode variants
```html
<div class="bg-white dark:bg-gray-900
            text-gray-900 dark:text-gray-100">
  Adapts to dark mode automatically
</div>
```

## Performance Tips

1. **Purge unused styles**: Configure `content` paths correctly
2. **Use JIT mode**: Enabled by default in v3
3. **Avoid dynamic class strings**: Use complete class names
4. **Limit color palette**: Define in config, don't use arbitrary values excessively

## Common Pitfalls

| Pitfall | Solution |
|---------|----------|
| Large CSS bundle | Configure `content` paths properly |
| Inconsistent spacing | Use spacing scale (`p-4`, not `p-[17px]`) |
| Hard-to-maintain CSS | Extract repeated patterns to `@apply` |
| Hover states not working on mobile | Use `focus-visible:` for keyboard |

## Accessibility

```html
<!-- Focus visible for keyboard users -->
<button class="focus:outline-none focus-visible:ring-2 ring-indigo-400">
  Accessible button
</button>

<!-- Reduced motion -->
<div class="transition-all duration-300
            motion-reduce:transition-none">
  Respects prefers-reduced-motion
</div>
```

## Resources
- **Tailwind UI**: https://tailwindui.com (paid components)
- **Headless UI**: https://headlessui.com (unstyled accessible components)
- **Heroicons**: https://heroicons.com (SVG icons)
