# Vercel / Next.js Best Practices

## SSR Safety
- **Problem**: Accessing `window` or `localStorage` during Server-Side Rendering.
- **Fix**: Use `useEffect` or check `typeof window !== 'undefined'`.

```tsx
"use client";
import { useEffect, useState } from "react";

export function ClientOnly() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null; // Or skeleton
  return <div>Browser only content</div>;
}
```

## TypeScript Production Safety
1. **No Implicit Any**: Explicitly type all props and state.
2. **No Unused Vars**: Remove them (build will fail).
3. **Enums**: Use string unions `type Status = 'active' | 'inactive'` over generic Enums where possible for simpler interop.

## image Optimization
- Use `<Image />` component with `priority` for LCP (Largest Contentful Paint) element.
- Define explicit `width`/`height` to avoid CLS (Cumulative Layout Shift).
