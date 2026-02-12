# Bento Grid Layouts — Modern Card Grids

## When to Use
- Feature showcases, service overviews, capability highlights
- Dashboard-style layouts with mixed content sizes
- Any section requiring visual hierarchy with cards of different importance

## The Pattern
A CSS Grid with spanning cells that creates an asymmetric, Apple/Linear-style "bento box" layout.

## Implementation

### Basic 4-Column Bento
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
  {/* Large feature card — spans 2 cols */}
  <div className="md:col-span-2 md:row-span-2 glass-card rounded-2xl p-8 min-h-[300px]">
    <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center mb-6">
      <Icon className="w-7 h-7 text-primary" />
    </div>
    <h3 className="text-2xl font-bold mb-3">Primary Feature</h3>
    <p className="text-muted-foreground">Extended description...</p>
  </div>

  {/* Standard cards */}
  <div className="glass-card rounded-2xl p-6">
    <h3 className="font-bold mb-2">Feature B</h3>
    <p className="text-sm text-muted-foreground">Description</p>
  </div>

  <div className="glass-card rounded-2xl p-6">
    <h3 className="font-bold mb-2">Feature C</h3>
    <p className="text-sm text-muted-foreground">Description</p>
  </div>

  {/* Wide card — spans 2 cols */}
  <div className="md:col-span-2 glass-card rounded-2xl p-6">
    <h3 className="font-bold mb-2">Wide Feature</h3>
    <p className="text-sm text-muted-foreground">Description</p>
  </div>
</div>
```

### 3-Column Asymmetric
```tsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {/* Tall left card */}
  <div className="md:row-span-2 bg-white rounded-2xl p-8 border border-slate-200 shadow-lg">
    <Icon className="w-10 h-10 text-primary mb-6" />
    <h3 className="text-xl font-bold mb-3">Main Feature</h3>
    <p className="text-slate-600">Longer description with details...</p>
    <ul className="mt-6 space-y-2">
      <li className="flex items-center gap-2 text-sm text-slate-600">
        <CheckCircle className="w-4 h-4 text-emerald-500" /> Benefit one
      </li>
    </ul>
  </div>

  {/* Top right */}
  <div className="md:col-span-2 bg-slate-900 text-white rounded-2xl p-8">
    <h3 className="text-xl font-bold mb-3">Dark Accent Card</h3>
    <p className="text-slate-400">Creates visual contrast</p>
  </div>

  {/* Bottom right pair */}
  <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-lg">
    <h3 className="font-bold mb-2">Card D</h3>
  </div>
  <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-lg">
    <h3 className="font-bold mb-2">Card E</h3>
  </div>
</div>
```

## Card Styling Recipes

### Glass Card (Light Background)
```tsx
className="bg-white/60 backdrop-blur-md border border-white/60 
           shadow-lg hover:shadow-xl transition-all duration-300
           rounded-2xl p-6"
```

### Elevated Card (Strong Contrast)
```tsx
className="bg-white rounded-2xl p-6 border border-slate-200 
           shadow-xl shadow-slate-200/50 
           hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
```

### Dark Accent Card
```tsx
className="bg-slate-900 text-white rounded-2xl p-8 
           border border-white/5 shadow-xl"
```

### Gradient Border Card
```tsx
<div className="relative p-[1px] rounded-2xl bg-gradient-to-br from-primary/50 to-accent/50">
  <div className="bg-white rounded-2xl p-6">
    Content here
  </div>
</div>
```

## GSAP Staggered Entrance
```tsx
useGSAP(() => {
  gsap.from(".bento-card", {
    y: 60,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out",
    stagger: {
      amount: 0.6,   // total time for all staggers
      from: "start",  // or "center", "edges", "random"
    },
    scrollTrigger: {
      trigger: ".bento-grid",
      start: "top 80%",
    }
  });
}, { scope: sectionRef });
```

## Responsive Behavior
```
Desktop (lg):   4 columns — full bento layout
Tablet (md):    2 columns — simplified grid
Mobile:         1 column  — stacked cards
```

Key: Use `md:col-span-2` and `md:row-span-2` for spanning. Remove spans on mobile so cards stack cleanly.

## ⚠️ Pitfalls

### Cards Not Equal Height
CSS Grid handles this automatically IF cards are in the same row. But if one card has much more content, add `min-h-[200px]` or `h-full` to enforce consistency.

### Hover Effects on Touch Devices
`:hover` states stick on mobile. Use `@media (hover: hover)` or an intermediate approach:
```tsx
className="md:hover:shadow-xl md:hover:-translate-y-1 transition-all"
```

### Icon Consistency
Keep all icon containers the same size across cards:
```tsx
<div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
  <Icon className="w-6 h-6 text-primary" />
</div>
```

## Related
- `design/section-theming.md` — Card contrast on different backgrounds
- `css/tailwindcss.md` — Glass effects, gradients
- `animations/gsap.md` — Staggered scroll reveals
