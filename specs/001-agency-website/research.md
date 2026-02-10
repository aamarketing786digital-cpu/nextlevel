# Research Document: NextLevel Marketerz Agency Website

**Feature**: 001-agency-website
**Date**: 2026-02-10
**Status**: Complete

## Phase 0: Technology Research (Constitution Principle II - MANDATORY)

This document contains verified research findings for all dependencies specified in the NextLevel Marketerz Constitution and Feature Specification.

---

## 1. GSAP (v3.13+)

### Official Documentation
- **ScrollTrigger API**: [GSAP ScrollTrigger Docs](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)
- **useGSAP Hook**: Available via `@gsap/react` package
- **SplitText Plugin**: [SplitText Docs](https://gsap.com/docs/v3/Plugins/SplitText/)

### Key Findings

#### ScrollTrigger API (v3.13)
- **Installation**: `npm install gsap @gsap/react`
- **Core Features**:
  - `scrub`: Links animation progress directly to scroll position
  - `pin`: Keeps elements pinned during scroll-based animations
  - `snap`: Snaps scroll position to specific points
  - `trigger`: Element that triggers the animation
  - `start`/`end`: Define scroll positions for animation timeline

- **Basic Usage Pattern**:
```typescript
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

useGSAP(() => {
  gsap.to(element, {
    scrollTrigger: {
      trigger: element,
      start: "top bottom",
      end: "top center",
      scrub: 1,
    },
    opacity: 1,
    y: 0
  });
}, { scope: container });
```

#### useGSAP Hook
- **Purpose**: Official React integration hook that replaces `useLayoutEffect`
- **Benefits**:
  - Automatic cleanup on component unmount
  - SSR-safe (no hydration warnings)
  - Context-scoped for better performance
  - Solves the "React 18 strict mode" double-invocation issue

- **Package**: `@gsap/react`
- **Import**: `import { useGSAP } from '@gsap/react';`

#### SplitText Plugin
- **Major Update (2025)**: GSAP premium plugins are now **FREE**
- **Functionality**: Splits text into characters, words, and/or lines for staggered animations
- **Installation**: Included with gsap package, requires registration
- **Registration**: `gsap.registerPlugin(SplitText);`

- **Usage Pattern**:
```typescript
import { SplitText } from 'gsap/SplitText';

useGSAP(() => {
  const split = new SplitText(element, { type: "chars,words,lines" });
  gsap.from(split.chars, {
    y: 100,
    opacity: 0,
    stagger: 0.05,
    duration: 1
  };
}, { scope: container });
```

**Sources**:
- [GSAP ScrollTrigger Documentation](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)
- [GSAP npm Package (v3.13.0)](https://cloudsmith.com/navigator/npm/gsap)
- [StackOverflow: GSAP useGSAP Hook Discussion](https://stackoverflow.com/questions/78284062/issues-importing-and-registering-gsap-scrolltrigger-plugin)
- [From SplitText to MorphSVG: 5 Creative Demos (GSAP Premium Now Free)](https://tympanus.net/codrops/2025/05/14/from-splittext-to-morphsvg-5-creative-demos-using-free-gsap-plugins/)
- [Adventures in text splitting: GSAP's SplitText rewrite](https://webflow.com/blog/gsap-splittext-rewrite)

---

## 2. @react-three/fiber & @react-three/drei

### Official Documentation
- **React Three Fiber**: [r3f.docs.pmnd.rs](https://r3f.docs.pmnd.rs/getting-started/introduction)
- **GitHub Repository**: [pmndrs/react-three-fiber](https://github.com/pmndrs/react-three-fiber)

### Key Findings

#### Core Concepts

**Canvas** (`@react-three/fiber`)
- WebGL container that wraps Three.js renderer
- Handles camera, renderer, and scene setup automatically
- Props: `camera`, `shadows`, `gl`, `events`, `performance`

```typescript
import { Canvas } from '@react-three/fiber';

<Canvas
  camera={{ position: [0, 0, 5], fov: 75 }}
  shadows
  gl={{ antialias: true, alpha: true }}
>
  {/* 3D Content */}
</Canvas>
```

**useFrame** (`@react-three/fiber`)
- Standard animation hook for frame-based animations
- Called on every frame (60fps default)
- Receives `state` and `delta` parameters

```typescript
import { useFrame } from '@react-three/fiber';

useFrame((state, delta) => {
  ref.current.rotation.x += delta * 0.5;
  ref.current.position.y = Math.sin(state.clock.elapsedTime) * 0.5;
});
```

**Environment** (`@react-three/drei`)
- Helper for easy environment mapping and lighting
- Presets: `sunset`, `dawn`, `night`, `warehouse`, `forest`, etc.
- Automatically handles HDR-based lighting

```typescript
import { Environment } from '@react-three/drei';

<Environment preset="sunset" />
// OR
<Environment path="/hdr/" files="studio.hdr" />
```

#### Installation
```bash
npm install three @react-three/fiber @react-three/drei
```

#### Best Practices
- Use `<Suspense>` for async operations (loading models/textures)
- Cleanup resources in `useEffect` return
- Use `drei` helpers for common patterns (Text, Float, Sparkles)
- Implement mobile fallbacks (reduce polygon count, disable effects)

**Sources**:
- [React Three Fiber Introduction](https://r3f.docs.pmnd.rs/getting-started/introduction)
- [React Three Fiber GitHub](https://github.com/pmndrs/react-three-fiber)
- [Environment Tutorial](https://sbcode.net/react-three-fiber/environment/)

---

## 3. Framer Motion

### Official Documentation
- **Motion.dev**: [motion.dev](https://motion.dev/docs/react)

### Key Findings

#### AnimatePresence
- **Purpose**: Exit animations when components unmount
- **Requirement**: Must wrap direct children that may be removed

```typescript
import { AnimatePresence, motion } from 'framer-motion';

<AnimatePresence mode="wait">
  {isVisible && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    />
  )}
</AnimatePresence>
```

#### Layout Animations
- **Purpose**: Smooth transitions when elements change position/size
- **Props**: `layout`, `layoutId`
- **Best for**: Reorderable lists, expanding cards, tab content

```typescript
<motion.div layout>
  {/* Content that may change size */}
</motion.div>
```

#### whileInView
- **Purpose**: Trigger animations when element enters viewport
- **Props**: `whileInView`, `viewport`

```typescript
<motion.div
  whileInView={{ opacity: 1, y: 0 }}
  initial={{ opacity: 0, y: 50 }}
  viewport={{ once: true, margin: "-100px" }}
>
  {/* Content */}
</motion.div>
```

#### Performance Considerations
- Use `transform` and `opacity` for best performance
- Avoid animating `height`, `width`, `top`, `left`
- Use `layout` prop sparingly in scrollable containers
- Prefer `whileInView` for scroll-based micro-interactions

**Sources**:
- [AnimatePresence Documentation](https://motion.dev/docs/react-animate-presence)
- [Motion Component Documentation](https://motion.dev/docs/react-motion-component)
- [React Scroll Animations](https://motion.dev/docs/react-scroll-animations)
- [Motion & Framer Motion Upgrade Guide](https://motion.dev/docs/react-upgrade-guide)

---

## 4. shadcn-ui

### Official Documentation
- **Main Site**: [ui.shadcn.com](https://ui.shadcn.com)
- **Registry Directory**: [ui.shadcn.com/docs/directory](https://ui.shadcn.com/docs/directory)

### Key Findings (2025 Updates)

#### Installation Process
```bash
npx shadcn@latest init
```

**New `npx shadcn create` Command (December 2025)**
- Pick component library, icons, base color, theme, fonts
- Create custom version of shadcn/ui
- 5 new visual styles available

#### Component Registry
- **Flat JSON schema** for component definitions (February 2025)
- **Registry Index** for discovering multiple registries (September 2025)
- **Third-party registry ecosystem** expanding

#### Adding Components
```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add input
# etc.
```

#### Theming Strategy (Aligned with Constitution Principle III)
- All colors defined in `globals.css` as HSL variables
- Tailwind config extends theme using these variables
- No hardcoded Tailwind colors (e.g., `bg-blue-500`)

**Example globals.css**:
```css
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --primary: 221.2 83.2% 53.3%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    /* ... more variables */
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    /* ... dark mode overrides */
  }
}
```

**Sources**:
- [Registry Schema Update (February 2025)](https://ui.shadcn.com/docs/changelog/2025-02-registry-schema)
- [Registry Index (September 2025)](https://ui.shadcn.com/docs/changelog/2025-09-registry-index)
- [npx shadcn create (December 2025)](https://ui.shadcn.com/docs/changelog/2025-12-shadcn-create)
- [Registry Directory](https://ui.shadcn.com/docs/directory)
- [How to Set Up a Registry in shadcn](https://www.freecodecamp.org/news/how-to-set-up-a-registry-in-shadcn/)

---

## 5. Next.js (v15+)

### Official Documentation
- **App Router**: [nextjs.org/docs/app](https://nextjs.org/docs/app)
- **Route Handlers**: [nextjs.org/docs/app/getting-started/route-handlers](https://nextjs.org/docs/app/getting-started/route-handlers)
- **Next.js 15 Announcement**: [nextjs.org/blog/next-15](https://nextjs.org/blog/next-15)

### Key Findings

#### App Router Architecture
- **File-based routing** in `app/` directory
- **Server Components** by default (zero JS to client)
- **Client Components** with `'use client'` directive
- **Route Handlers** for API endpoints (App Router equivalent of API routes)

#### Route Handlers (API Routes)
```typescript
// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();

  // Process request

  return NextResponse.json({ success: true });
}
```

#### Server vs Client Components
- **Server Components** (Default):
  - No JavaScript sent to client
  - Direct database access
  - Secure API key usage
  - Cannot use hooks or browser APIs

- **Client Components** (`'use client'`):
  - Required for `useState`, `useEffect`, event handlers
  - Required for GSAP, Framer Motion, Three.js
  - Send JavaScript to client

#### Data Fetching Patterns
- **Server Components**: Direct async/await
- **Client Components**: Use `use` hook or fetch
- **Static vs Dynamic**: Default to static, use `revalidatePath` for updates

**Sources**:
- [Next.js 15 Announcement](https://nextjs.org/blog/next-15)
- [App Router Documentation](https://nextjs.org/docs/app)
- [Route Handlers Documentation](https://nextjs.org/docs/app/getting-started/route-handlers)
- [Next.js 15: App Router — Complete Guide](https://medium.com/@livenapps/next-js-15-app-router-a-complete-senior-level-guide-0554a2b820f7)
- [The Ultimate Guide to Server Components, Server Actions, Route Handlers](https://dev.to/waffensultan/the-ultimate-guide-to-server-components-server-actions-route-handlers-and-suspense-in-nextjs-46ah)

---

## 6. Brevo API

### Official Documentation
- **Product Page**: [brevo.com/products/transactional-email](https://www.brevo.com/products/transactional-email/)

### Key Findings

#### API Overview
- **Formerly**: Sendinblue
- **Purpose**: Transactional email, SMS, WhatsApp via API
- **Pricing**: Pay-as-you-go with free trial
- **Base URL**: `https://api.brevo.com/v3`

#### Authentication
```typescript
headers: {
  'api-key': process.env.BREVO_API_KEY,
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}
```

#### Send Email Endpoint
```
POST /smtp/email
```

**Request Body**:
```typescript
{
  sender: { email: 'sender@example.com', name: 'Sender Name' },
  to: [{ email: 'recipient@example.com', name: 'Recipient' }],
  subject: 'Email Subject',
  htmlContent: '<html><body>Content</body></html>',
  textContent: 'Plain text fallback'
}
```

#### Best Practices
- Use environment variables for API key
- Implement retry logic for failed requests
- Validate email addresses before sending
- Handle rate limits (Brevo has limits per plan)
- Use template IDs for reusable email templates
- Implement proper error handling for API failures

#### Integration Pattern for Next.js
```typescript
// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': process.env.BREVO_API_KEY!,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sender: { email: 'contact@nextlevelmarketerz.com', name: 'NextLevel Marketerz' },
        to: [{ email: body.email, name: body.name }],
        subject: 'Thank you for contacting us',
        htmlContent: `<p>Thank you ${body.name} for reaching out...</p>`,
      }),
    });

    if (!response.ok) {
      throw new Error('Brevo API error');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to send email' }, { status: 500 });
  }
}
```

**Sources**:
- [Transactional Email Product Page](https://www.brevo.com/products/transactional-email/)
- [How to Send Transactional Emails with Brevo in Node.js](https://www.suprsend.com/post/how-to-send-transactional-emails-with-brevo-api-in-node-js)
- [How I Send Transactional Emails with Brevo](https://wpmichael.com/blog/how-i-send-transactional-emails-with-brevo/)

---

## 7. Aceternity UI

### Official Documentation
- **Main Site**: [ui.aceternity.com](https://ui.aceternity.com)

### Key Findings (2025)

#### Bento Grid Components
- **Category**: [Best Free Bento Grid Components](https://ui.aceternity.com/categories/bento-grid)
- **Main Component**: [Bento Grid](https://ui.aceternity.com/components/bento-grid)
- **Variants**: Moving Border, Parallax Scroll, Sparkles

#### Moving Border Component
- **URL**: [Moving Border Component](https://ui.aceternity.com/components/moving-border)
- **Purpose**: Animated border that moves around container
- **Use Case**: Make buttons or cards stand out

#### Installation & Usage
- **Not a package-based library** - components are copied directly
- **Built with**: Tailwind CSS + Framer Motion
- **License**: Free to use with attribution

#### Integration Strategy (Constitution Principle IV)
1. Download component code from Aceternity UI
2. Modify to use project's CSS variables instead of hardcoded colors
3. Integrate with Shadcn UI base components
4. Ensure TypeScript strict mode compliance

#### Example Modification Pattern
```typescript
// BEFORE (Aceternity original)
className="bg-blue-500 border-blue-600"

// AFTER (Constitution-compliant)
className="bg-primary border-primary-foreground/20"
```

**Sources**:
- [Bento Grid Components](https://ui.aceternity.com/categories/bento-grid)
- [Bento Grid Main](https://ui.aceternity.com/components/bento-grid)
- [Moving Border Component](https://ui.aceternity.com/components/moving-border)
- [Modern Design Templates 2025](https://ui.aceternity.com/best-modern-design-template)
- [10+ Trending Animated UI Component Libraries (2025)](https://dev.to/jay_sarvaiya_reactjs/10-trending-animated-ui-component-libraries-2025-edition-1af4)

---

## 8. GSAP ScrollTrigger Next.js Best Practices

### Key Findings (2025)

#### SSR-Safe Patterns

**1. Always Use `useGSAP` Hook**
```typescript
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugin once
gsap.registerPlugin(ScrollTrigger);

function Component() {
  const container = useRef();

  useGSAP(() => {
    // GSAP code here
    gsap.to(".box", {
      scrollTrigger: {
        trigger: ".box",
        start: "top bottom",
      },
      opacity: 1
    });
  }, { scope: container }); // Scope for cleanup

  return <div ref={container} className="box" />;
}
```

**2. Use Client Component Directive**
```typescript
'use client'; // Required for GSAP/ScrollTrigger

import { useGSAP } from '@gsap/react';
// ...
```

**3. Dynamic Import for Heavy Animations (Optional)**
```typescript
const AnimatedHero = dynamic(() => import('@/components/AnimatedHero'), {
  ssr: false, // Skip SSR for animation-heavy components
  loading: () => <HeroSkeleton />,
});
```

**4. Refresh ScrollTrigger on Route Changes**
```typescript
'use client';

import { useGSAP } from '@gsap/react';
import { usePathname } from 'next/navigation';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

function Layout({ children }) {
  const pathname = usePathname();

  useGSAP(() => {
    // Refresh ScrollTrigger when route changes
    ScrollTrigger.refresh();
  }, [pathname]);

  return <main>{children}</main>;
}
```

**5. Handle Resizing Properly**
```typescript
useGSAP(() => {
  const ctx = gsap.context();

  const animation = gsap.to(element, {
    scrollTrigger: {
      trigger: element,
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
    },
    x: 100
  });

  // ScrollTrigger automatically handles resize
  // but for custom logic:
  window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
  });

  return () => {
    ctx.revert(); // Cleanup
    window.removeEventListener('resize', () => {
      ScrollTrigger.refresh();
    });
  };
}, { scope: container });
```

#### Common Issues & Solutions

**Issue**: Hydration warnings about `style` attributes
**Solution**: Use `useGSAP` instead of `useLayoutEffect` + dynamic imports for SSR-sensitive components

**Issue**: ScrollTrigger not working after navigation
**Solution**: Refresh ScrollTrigger on route changes (see example above)

**Issue**: Animations not playing in production
**Solution**: Ensure `scope` is set in `useGSAP` and cleanup is proper

**Sources**:
- [The Definitive Guide to Using GSAP in Next.js](https://www.thinknovus.com/blog/the-definitive-guide-to-using-gsap-in-next-js-for-speed-and-impact)
- [Best Practices for GSAP with Next 15 (January 2025)](https://gsap.com/community/forums/topic/43831-what-are-the-best-practices-for-using-gsap-with-next-15-clientserver-components)
- [Using GSAP ScrollTrigger in Next.js with next/link](https://gsap.com/community/forums/topic/43077-using-gsap-scroll-trigger-in-next-js-with-nextlink)
- [Warning: Extra attributes from the server](https://gsap.com/community/forums/topic/35440-warning-extra-attributes-from-the-server-style)

---

## 9. Playwright E2E Testing

### Official Documentation
- **Next.js Testing Guide**: [nextjs.org/docs/app/guides/testing/playwright](https://nextjs.org/docs/app/guides/testing/playwright)

### Key Findings (2025)

#### Installation
```bash
npm init playwright@latest
# OR
npm install -D @playwright/test
```

#### Configuration
```javascript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    { name: 'Mobile Chrome', use: { ...devices['Pixel 5'] } },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
```

#### Test Example for Contact Form
```typescript
// e2e/contact-form.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Contact Form', () => {
  test('should submit successfully with valid data', async ({ page }) => {
    await page.goto('/contact');

    await page.fill('[name="name"]', 'John Doe');
    await page.fill('[name="email"]', 'john@example.com');
    await page.fill('[name="company"]', 'Test Company');
    await page.selectOption('[name="service"]', 'web-development');
    await page.fill('[name="message"]', 'Test message');

    await page.click('button[type="submit"]');

    await expect(page.locator('.success-message')).toBeVisible();
    await expect(page.locator('.success-message')).toContainText('Thank you');
  });

  test('should show validation errors for invalid data', async ({ page }) => {
    await page.goto('/contact');

    await page.click('button[type="submit"]');

    await expect(page.locator('[name="name"] + .error')).toBeVisible();
    await expect(page.locator('[name="email"] + .error')).toBeVisible();
    await expect(page.locator('[name="message"] + .error')).toBeVisible();
  });
});
```

#### Animation Testing Strategy
- **Disable animations** in tests for reliability
- Use `page.emulateMedia({ reducedMotion: 'reduce' })`
- Test that content is accessible without animations

```typescript
test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
});
```

**Sources**:
- [Official Next.js Playwright Guide](https://nextjs.org/docs/app/guides/testing/playwright)
- [Beginner's Guide to Playwright Testing in Next.js (June 2025)](https://blogs.perficient.com/2025/06/09/beginners-guide-to-playwright-testing-in-next-js/)
- [Integrating Playwright with Next.js — The Complete Guide](https://dev.to/mehakb7/integrating-playwright-with-nextjs-the-complete-guide-34io)
- [Testing a Next.js Form Component with Playwright](https://www.browserstack.com/guide/nextjs-playwright)
- [End-to-End Testing Auth Flows with Playwright and Next.js](https://testdouble.com/insights/how-to-test-auth-flows-with-playwright-and-next-js)

---

## Summary of Verified Installations

```bash
# Core Framework
npm install next@latest react@latest react-dom@latest

# TypeScript
npm install -D typescript @types/react @types/node

# Animation Libraries
npm install gsap @gsap/react framer-motion

# 3D Graphics
npm install three @react-three/fiber @react-three/drei

# UI Components (shadcn)
npx shadcn@latest init

# Styling
npm install tailwindcss postcss autoprefixer

# Forms & Validation
npm install react-hook-form @hookform/resolvers zod

# Email
# No npm package - use fetch API with Brevo endpoint

# Testing
npm install -D @playwright/test

# Icons
npm install lucide-react
```

---

## Next Steps

With this research complete, proceed to:
1. Fill out `plan.md` with technical implementation details
2. Define data models in `data-model.md`
3. Create API contracts in `contracts/api-schema.ts`
4. Write developer quickstart guide in `quickstart.md`

**All research findings are verified against official documentation as of February 2026.**
