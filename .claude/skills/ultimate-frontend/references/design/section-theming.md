# Section Theming & Contact Forms — Contrast & Styling

## Section Theming Strategy

### Light vs Dark Sections
Agency/marketing sites typically alternate between light and dark sections. The key is **strong contrast** between the section background and its content.

### Light Section (High Contrast)
```tsx
<section className="py-16 md:py-24 bg-slate-50">
  <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50 to-white pointer-events-none" />
  <Container>
    <div className="relative z-10">
      <h2 className="text-slate-900">Heading</h2>
      <p className="text-slate-600">Body text</p>
    </div>
  </Container>
</section>
```

### Key Contrast Rules

| Element | Light Section | Dark Section |
|---------|--------------|--------------|
| Background | `bg-slate-50` or `bg-white` | `bg-slate-950` or `section-dark` |
| Headings | `text-slate-900` | `text-white` |
| Body text | `text-slate-600` | `text-slate-400` |
| Links | `text-slate-600 hover:text-primary` | `text-slate-400 hover:text-primary` |
| Borders | `border-slate-200` | `border-white/10` |
| Cards | `bg-white border-slate-200 shadow-xl` | `bg-slate-900/80 border-white/10` |

## ⚠️ Pitfall: Minty/Pale Backgrounds

### The Bug
Using the theme's `bg-background` (e.g. minty cyan `#F1FEFC`) creates very low contrast with white cards and pale text. Everything blends together and looks washed out.

### The Fix
Use **explicit neutral colors** instead of theme tokens for section backgrounds:
```tsx
// ❌ BAD — washed out, low contrast
className="bg-background"  // #F1FEFC — too similar to white cards

// ✅ GOOD — clear visual separation
className="bg-slate-50"    // Neutral gray — cards pop against it
className="bg-white"       // Pure white — with shadow on cards
```

### Card Contrast on Light Backgrounds
```tsx
// ❌ BAD — invisible card on pale background
<div className="bg-card border-foreground/10">

// ✅ GOOD — strong visual depth
<div className="bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/50">
```

## Contact Form Styling

### Dark Theme Form (Glass)
```tsx
<div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10 shadow-2xl">
  <ContactForm />
</div>
```

### Light Theme Form (Elevated Card)
```tsx
<div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-xl shadow-slate-200/50">
  <ContactForm />
</div>
```

### Form Input Styling (Important!)
Inputs must contrast with their parent card:

```tsx
// Light card → inputs need visible borders
<input className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200
                  text-slate-900 placeholder:text-slate-400
                  focus:border-primary focus:ring-1 focus:ring-primary
                  transition-all outline-none" />

// Dark card → inputs need glass effect  
<input className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10
                  text-white placeholder:text-white/50
                  focus:bg-white/10 focus:border-white/30
                  transition-all outline-none" />
```

## Contact Info Section Pattern

```tsx
<div className="space-y-6">
  <div className="flex items-start gap-4">
    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
      <Mail className="w-5 h-5 text-primary" />
    </div>
    <div>
      <h3 className="font-semibold mb-1 text-slate-900">Email</h3>
      <a href="mailto:email@example.com"
         className="text-slate-600 hover:text-primary transition-colors">
        email@example.com
      </a>
    </div>
  </div>
</div>
```

## CTA Section Buttons

```tsx
<div className="flex flex-col sm:flex-row gap-4 justify-center">
  {/* Primary action */}
  <a className="inline-flex items-center justify-center px-6 py-3
                bg-primary text-primary-foreground rounded-lg font-semibold
                hover:bg-primary/90 transition-colors">
    View Our Work
  </a>
  {/* Secondary action */}
  <a className="inline-flex items-center justify-center px-6 py-3
                border border-slate-300 text-slate-700 rounded-lg font-semibold
                hover:bg-slate-50 transition-colors">
    Our Services
  </a>
</div>
```

## Related
- `css/tailwindcss.md` — Glass effects, dark mode
- `css/responsive-scaling.md` — Section sizing
