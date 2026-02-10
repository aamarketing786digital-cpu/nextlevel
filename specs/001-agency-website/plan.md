# Implementation Plan: NextLevel Marketerz Agency Website

**Branch**: `001-agency-website` | **Date**: 2026-02-10 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-agency-website/spec.md`

**Note**: This plan is filled in by the `/sp.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Build a high-end agency website for NextLevel Marketerz targeting UAE/Middle East markets. The site features ultra-premium "Tech-Luxury" aesthetics with scroll-driven animations using GSAP ScrollTrigger, a 3D hero section with Three.js, and Brevo API integration for contact forms. Technical approach uses Next.js 15+ App Router with TypeScript strict mode, Tailwind CSS v3 stable for styling, Shadcn UI for base components, and Aceternity UI for hero sections with CSS variable-based theming.

> [!IMPORTANT]
> **Visual Overhaul (v2)**: Plan updated to address critical visual deficiencies identified during a full audit against 16 reference images. Key architectural changes: particle cloud 3D hero (replacing wireframe rings), GSAP pinned horizontal-scroll services section (replacing card grid), new Testimonials component, glassmorphic card styling throughout, and GSAP ScrollTrigger replacing all CSS-only reveal animations.

## Technical Context

**Language/Version**: TypeScript 5.8+ (strict mode: true, noUnusedLocals: true, noUnusedParameters: true)
**Primary Dependencies**: Next.js 15.4+, React 19.1+, GSAP 3.13+, @gsap/react, Framer Motion 12.0+, Three.js 0.175+, @react-three/fiber 8.18+, @react-three/drei 9.120+, Shadcn UI (latest), Zod 3.24+, React Hook Form 7.55+, Playwright 1.50+
**Storage**: N/A (static content, no database)
**Testing**: Playwright for E2E, visual regression with Playwright screenshots
**Target Platform**: Vercel (Edge Runtime compatible)
**Project Type**: web (Next.js 15 App Router with src directory)
**Performance Goals**: <3s initial load on 4G, Lighthouse score 90+, 60fps animations, <100KB First Load JS
**Constraints**: Mobile-first responsive, WCAG 2.1 AA compliant, RTL layout support for Arabic, graceful animation degradation on low-end devices
**Scale/Scope**: 5 main pages (Home, Services, Services Detail, Work, About, Contact), ~50 components (+ServicesShowcase, Testimonials from Visual Overhaul), ~10 reusable hooks

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

This project follows the NextLevel Marketerz Constitution (v1.1.0). The plan MUST verify:

- **SOLID & Code Quality**: ✅ Components follow Single Responsibility; TypeScript strict mode enabled; no `any` types; Zod for runtime validation
- **Research-First**: ✅ Latest API docs verified for all libraries (GSAP 3.13+, Framer Motion 12, Three.js 0.175+, Shadcn UI, Next.js 15, Brevo API) - see `research.md`
- **CSS Variable Theming**: ✅ All colors use semantic variables (--primary, --secondary, --accent, etc.); no hardcoded Tailwind colors
- **UI Library Strategy**: ✅ Shadcn UI for base components (Button, Input, Dialog, etc.); Aceternity/Magic UI for hero sections with CSS variable adaptation
- **Animation Performance**: ✅ GSAP ScrollTrigger with useGSAP cleanup; Framer Motion for micro-interactions; mobile degradation strategy (matchMedia, reduced-motion)
- **Implementation Workflow**: ✅ Research (research.md complete) → Plan (this file) → Scaffold (file structure defined) → Implement → Verify sequence followed

**Constitution Location**: `.specify/memory/constitution.md`

**Constitution Compliance**: All 6 principles verified and addressed in this plan (v1.1.0).

## Project Structure

### Documentation (this feature)

```text
specs/001-agency-website/
├── plan.md              # This file (/sp.plan command output)
├── research.md          # Phase 0 output - Technology research complete
├── data-model.md        # Phase 1 output - TypeScript interfaces
├── quickstart.md        # Phase 1 output - Developer setup guide
├── contracts/           # Phase 1 output - API contracts
│   └── contact-api.ts   # Contact endpoint schema
├── checklists/          # Quality validation
│   └── requirements.md  # Spec quality checklist
└── spec.md              # Feature specification
```

### Source Code (repository root)

```text
src/
├── app/
│   ├── layout.tsx               # Root layout (fonts, metadata, Navbar, Footer)
│   ├── page.tsx                 # Home page (Hero, SocialProof, ValueProp sections)
│   ├── globals.css              # CSS variables + base styles
│   ├── about/
│   │   └── page.tsx             # About page (CompanyStory, TeamSection, Values sections)
│   ├── services/
│   │   ├── page.tsx             # Services page (ServicesGrid section)
│   │   └── [slug]/
│   │       └── page.tsx         # Service detail page (dynamic routing)
│   ├── work/
│   │   └── page.tsx             # Case Studies page (CaseStudies section)
│   ├── contact/
│   │   └── page.tsx             # Contact page (ContactForm section)
│   └── api/
│       └── contact/
│           └── route.ts         # Brevo API integration (POST endpoint)
│
├── components/
│   ├── ui/                      # Shadcn UI base components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── textarea.tsx
│   │   ├── select.tsx
│   │   ├── card.tsx
│   │   └── dialog.tsx
│   ├── aceternity/              # Aceternity/Magic UI adapted components
│   │   ├── bento-grid.tsx       # Modified to use CSS variables
│   │   ├── infinite-moving-cards.tsx
│   │   ├── moving-border.tsx
│   │   └── background-beams.tsx
│   ├── sections/                # Page-level section components
│   │   ├── Hero.tsx             # Full-bleed 3D Hero with particle cloud + GSAP fade-out
│   │   ├── SocialProof.tsx      # Client logos marquee with gradient transition
│   │   ├── ValueProp.tsx        # Glassmorphic bento grid on dark bg + GSAP reveals
│   │   ├── ServicesShowcase.tsx  # [NEW] GSAP pinned horizontal-scroll services
│   │   ├── ServicesGrid.tsx     # [DEPRECATED] Kept as simple fallback
│   │   ├── Testimonials.tsx     # [NEW] Dark testimonial carousel with quote marks
│   │   ├── CaseStudies.tsx      # Work showcase with parallax
│   │   ├── CompanyStory.tsx     # About page story section
│   │   ├── TeamSection.tsx      # About page team
│   │   ├── Values.tsx           # About page values
│   │   ├── ContactForm.tsx      # Brevo-connected form
│   │   └── Newsletter.tsx       # Footer newsletter signup
│   ├── layout/                  # Layout primitives
│   │   ├── Navbar.tsx           # Glassmorphic sticky navigation
│   │   ├── Footer.tsx           # Extensive footer with newsletter
│   │   ├── Section.tsx          # Reusable section wrapper
│   │   └── Container.tsx        # Max-width container
│   └── 3d/                      # Three.js components
│       └── HeroScene.tsx        # [OVERHAUL] Particle cloud sphere (Points + BufferGeometry)
│
├── hooks/                       # Custom React hooks
│   ├── useGSAPScrollTrigger.ts  # Reusable ScrollTrigger setup
│   ├── useMediaQuery.ts         # Responsive breakpoint detection
│   ├── useMounted.ts            # SSR-safe mount detection
│   └── useMobileDetection.ts    # Mobile device detection for 3D fallback
│
├── lib/                         # Utilities
│   ├── utils.ts                 # cn() helper, class names
│   ├── brevo.ts                 # Brevo API wrapper
│   ├── animations.ts            # GSAP animation presets
│   └── constants.ts             # Site data (services, team, etc.)
│
└── types/                       # TypeScript interfaces
    └── index.ts                 # Service, TeamMember, CaseStudy, ContactForm types

# Root configuration files
next.config.ts                   # Next.js configuration
tailwind.config.ts               # Tailwind with CSS variable extension
tsconfig.json                    # TypeScript strict mode config
components.json                  # Shadcn UI configuration
```

**Structure Decision**: Single Next.js application using App Router with `src` directory. No backend needed as site is static content with serverless API routes for Brevo integration. All components organized by responsibility (layout, sections, UI, 3D) following Constitution Principle I (SOLID).

## Complexity Tracking

> **No violations** - All design decisions align with Constitution principles. No complexity tracking needed.

## Phase 0: Research Summary

**Status**: ✅ Complete

Research documented in `research.md` covering:
- GSAP 3.13+ with useGSAP hook and ScrollTrigger API
- @react-three/fiber & drei for 3D components
- Framer Motion 12 with AnimatePresence and layout animations
- Shadcn UI installation and theming patterns
- Next.js 15 App Router and Route Handlers
- Brevo API integration patterns
- Aceternity UI components and adaptation strategy
- GSAP ScrollTrigger SSR-safe patterns for Next.js
- Playwright E2E testing setup

## Phase 1: Design Artifacts

### Data Model

See `data-model.md` for complete TypeScript interfaces defining:
- `Service`: Service offering entity
- `CaseStudy`: Project showcase entity
- `TeamMember`: Team member profile entity
- `ContactForm`: Form submission entity
- `NewsletterSubscription`: Newsletter signup entity

### API Contracts

See `contracts/contact-api.ts` for Brevo API integration schema including:
- Request validation (Zod schema)
- Response types
- Error handling patterns

### Quickstart Guide

See `quickstart.md` for developer onboarding including:
- Prerequisites
- Setup steps
- Development workflow
- Testing commands

## Scroll Animation Strategy

| Section | Animation | GSAP Config | Mobile Fallback | Theme Variant |
|---------|-----------|-------------|-----------------|---------------|
| **Hero** *(OVERHAULED)* | Full-bleed particle cloud 3D + centered text + scroll fade-out | `start: "top top", scrub: 1, end: "bottom top"` — fades hero on scroll | Animated gradient glow fallback (no 3D) | `section-gradient` |
| **Social Proof** | Infinite marquee + gradient transition from hero | CSS animation (no GSAP) - `animation: scroll 30s linear infinite` | Same, slower (45s) | `light` (gradient edge from dark) |
| **Value Prop** *(OVERHAULED)* | Glassmorphic cards — GSAP batch stagger reveal | `ScrollTrigger.batch()`, `start: "top 80%"`, `stagger: 0.15` | Simple fade-in (no stagger) | **`section-dark`** *(CHANGED from light)* |
| **Services** *(OVERHAULED)* | **Pinned horizontal-scroll** — panels slide L→R | `pin: true, scrub: 1, end: "+=500%", start: "top top"`, horizontal `x` tween | Vertical card stack, swipe tabs (no pin) | `section-dark` + `light` alternating |
| **Testimonials** *(NEW)* | Quote fade-in + client info stagger | `start: "top 75%"`, `toggleActions: "play none none reverse"` | Simple fade | `section-dark` |
| **Case Studies** | Parallax image shift | `yPercent: -20, scrub: true, start: "top bottom"` | No parallax, standard grid | `light` |
| **Team** | Staggered reveal | `batch: true, stagger: 0.1, start: "top 85%"` | Simple fade (no stagger) | `light` |
| **Contact** | Form fields slide in | `x: -50, stagger: 0.1, start: "top 75%"` | Instant render (no animation) | `section-dark` |
| **Values** | Icon reveal | `scale: 0, opacity: 0, stagger: 0.2, scrub: 1` | Static display | `light` |
| **Footer** *(OVERHAULED)* | CTA section fade-in + testimonial reveal | `start: "top 85%"`, `stagger: 0.2` | Simple fade | `section-dark` |

### Mobile Animation Degradation Strategy

```typescript
// useGSAPScrollTrigger.ts pattern
useGSAP(() => {
  const mm = gsap.matchMedia();

  mm.add("(min-width: 768px)", () => {
    // Desktop: Full complex animations
    gsap.to(element, { scrollTrigger: { pin: true, scrub: 1 }, x: 500 });
  });

  mm.add("(max-width: 767px)", () => {
    // Mobile: Simplified or no animations
    gsap.to(element, { opacity: 1, duration: 0.5 });
  });

  return () => mm.revert();
}, { scope: container });
```

## Component Specifications

### ServiceCard

```typescript
interface ServiceCardProps {
  service: Service; // From types/index.ts
}

// State: None (pure component)

// Animation: Framer Motion whileHover
// - scale: 1.03
// - boxShadow: gold glow effect

// Accessibility:
// - role="article"
// - tabIndex={0} for keyboard navigation
// - aria-label={`${service.title} service details`}

// Responsive:
// - Mobile: Full width with increased padding
// - Desktop: 1/3 column with hover effects
```

### CaseStudyCard

```typescript
interface CaseStudyCardProps {
  caseStudy: CaseStudy; // From types/index.ts
}

// State: None (pure component)

// Animation: GSAP ScrollTrigger parallax on image
// - yPercent: -20 on scroll
// - scrub: true

// Accessibility:
// - role="article"
// - aria-label={`Case study: ${caseStudy.title}`}

// Responsive:
// - Mobile: Single column, no parallax
// - Desktop: Masonry/grid with parallax effect
```

### ContactForm

```typescript
interface ContactFormProps {
  // No props (uses internal state)

// State:
// - isSubmitting: boolean
// - submitStatus: 'idle' | 'success' | 'error'
// - errors: Record<string, string>

// Animation: Framer Motion
// - Field slide-in on mount (x: -50 to 0, stagger: 0.1)
// - Success message fade-in
// - Error shake animation

// Accessibility:
// - Required field indicators
// - ARIA live regions for status messages
// - Error messages associated with inputs

// Responsive:
// - Mobile: Full width fields
// - Desktop: Two-column layout for smaller fields
```

### Navbar

```typescript
interface NavbarProps {
  // No props (uses internal state and pathname)

// State:
// - isMenuOpen: boolean (mobile only)
// - isScrolled: boolean (for glass effect)

// Animation: Framer Motion
// - Mobile menu: AnimatePresence with slide-in from right
// - Scroll effect: Background transition on scroll

// Accessibility:
// - Hamburger button aria-label
// - Menu items as semantic nav
// - Focus trap in mobile menu
// - Keyboard navigation

// Responsive:
// - Mobile: Hamburger menu with full-screen drawer
// - Desktop: Horizontal navigation links
```

### Footer *(OVERHAULED)*

```typescript
interface FooterProps {
  // No props

// State: None (newsletter form has internal state)

// OVERHAUL: Add prominent CTA section above footer links
// Layout:
// - CTA Section: Large testimonial quote + "Book a Call" / "Contact Us" buttons
// - Footer Links: Multi-column with newsletter, social, quick links

// Animation: GSAP ScrollTrigger fade-in for CTA section

// Accessibility:
// - Semantic footer element
// - Proper heading hierarchy
// - Social link aria-labels

// Responsive:
// - Mobile: Single column layout
// - Desktop: Multi-column with CTA above, newsletter prominent
```

### HeroScene (3D) *(OVERHAULED)*

```typescript
interface HeroSceneProps {
  className?: string
}

// OVERHAUL: Replace golden wireframe rings with particle cloud sphere
// State: None (Three.js handles state internally)

// Geometry: THREE.BufferGeometry with thousands of points (THREE.Points)
// - Spherical distribution using fibonacci sphere algorithm
// - Count: ~5000 particles on desktop, ~2000 on mobile fallback canvas
// - Colors: gold/cyan gradient via custom shader or vertex colors

// Animation: Three.js useFrame
// - Slow continuous rotation of particle cloud
// - Subtle breathing/pulsing effect (scale oscillation)
// - Mouse interaction (particles respond to cursor position)
// - Custom glow shader via THREE.ShaderMaterial or THREE.PointsMaterial with sizeAttenuation

// Accessibility:
// - aria-hidden="true" (decorative only)
// - Fallback text for screen readers

// Responsive:
// - Mobile: Not rendered — replaced with animated gradient glow (not wireframe rings)
// - Desktop: Full 3D particle cloud scene
```

### ServicesShowcase *(NEW — Visual Overhaul)*

```typescript
interface ServicesShowcaseProps {
  services: Service[]; // From types/index.ts
}

// GSAP ScrollTrigger pinned horizontal-scroll section
// State:
// - activeServiceIndex: number (tracks which service panel is visible)

// Layout:
// - Fixed service category tabs at top of pinned container
// - Horizontally arranged content panels (one per service)
// - Each panel: left = bold headline + description, right = decorative 3D/gradient visual

// Animation: GSAP ScrollTrigger
// - Container pinned with pin: true
// - Horizontal tween: x: -(panelWidth * (serviceCount - 1)) over scrub: 1
// - Active tab indicator animates with scroll progress
// - start: "top top", end: "+=500%" (5 services × ~100vh each)

// Accessibility:
// - role="tablist" for service tabs
// - role="tabpanel" for each content panel
// - aria-selected on active tab

// Responsive:
// - Mobile: Vertical card stack with swipe-able tabs (no pinning)
// - Desktop: Full pinned horizontal-scroll experience
```

### Testimonials *(NEW — Visual Overhaul)*

```typescript
interface TestimonialsProps {
  testimonials?: Testimonial[]; // From types/index.ts
}

// Dark-themed testimonial carousel section
// State:
// - activeIndex: number (current testimonial)

// Layout:
// - Large decorative quote marks (SVG or font icon, styled gold)
// - Client quote text in display font (Syne)
// - Client info: name, role, company
// - Navigation arrows (prev/next)

// Animation: Framer Motion AnimatePresence for slide transitions
// GSAP ScrollTrigger for initial reveal (fade-in + stagger)

// Accessibility:
// - role="region" with aria-label="Client testimonials"
// - aria-live="polite" for quote transitions
// - Navigation buttons with aria-label

// Responsive:
// - Mobile: Single-column with swipe
// - Desktop: Split layout (optional parallax images on left)
```

## Brevo Integration Plan

### API Route Structure

```typescript
// src/app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { contactFormSchema } from '@/lib/validation';

export async function POST(request: NextRequest) {
  // 1. Parse and validate request body
  const body = await request.json();
  const validated = contactFormSchema.parse(body);

  // 2. Send to Brevo API
  const brevoResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'api-key': process.env.BREVO_API_KEY!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      sender: { email: 'contact@nextlevelmarketerz.com', name: 'NextLevel Marketerz' },
      to: [{ email: validated.email, name: validated.name }],
      subject: 'Thank you for contacting NextLevel Marketerz',
      htmlContent: generateConfirmationEmail(validated),
    }),
  });

  // 3. Add to internal list (separate call)
  await fetch('https://api.brevo.com/v3/contacts', {
    method: 'POST',
    headers: {
      'api-key': process.env.BREVO_API_KEY!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: validated.email,
      attributes: {
        FIRSTNAME: validated.name.split(' ')[0],
        COMPANY: validated.company || '',
        SERVICE_INTEREST: validated.serviceInterest,
        BUDGET_RANGE: validated.budgetRange,
      },
      listIds: [parseInt(process.env.BREVO_CONTACT_LIST_ID!)],
    }),
  });

  // 4. Return response
  return NextResponse.json({ success: true });
}
```

### Validation Schema (Zod)

```typescript
// src/lib/validation.ts
import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  company: z.string().optional(),
  serviceInterest: z.enum(['ai-chatbots', 'web-dev', 'digital-marketing', 'graphic-design', 'seo']),
  budgetRange: z.enum(['<5k', '5k-10k', '10k-25k', '25k-50k', '50k+']),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});
```

### Error Handling Strategy

- **400**: Validation errors - return field-specific error messages
- **401/403**: Brevo auth failure - log error, return generic message
- **429**: Rate limit exceeded - return "Please try again later"
- **500**: Server/Network error - return generic message, log for investigation
- **Client-side**: Debounce submit button, show loading state, retry on failure

## Mobile Responsiveness Strategy

### Breakpoints

```typescript
// tailwind.config.ts
module.exports = {
  theme: {
    screens: {
      'sm': '640px',   // Mobile landscape
      'md': '768px',   // Tablet
      'lg': '1024px',  // Desktop
      'xl': '1280px',  // Large desktop
      '2xl': '1536px', // Extra large
    },
  },
};
```

### 3D Hero Fallback

```typescript
// Hero.tsx
import dynamic from 'next/dynamic';
import { useMobileDetection } from '@/hooks/useMobileDetection';

const HeroScene = dynamic(() => import('@/components/3d/HeroScene'), {
  ssr: false,
  loading: () => <HeroSkeleton />,
});

export function Hero() {
  const isMobile = useMobileDetection();

  return (
    <section>
      {isMobile ? (
        <StaticHeroImage /> // Optimized static fallback
      ) : (
        <HeroScene /> // Full 3D scene
      )}
    </section>
  );
}
```

### Animation Degradation

- Use `ScrollTrigger.matchMedia()` to disable complex animations on mobile
- Detect mobile with breakpoint (`< 768px`) or capability (`navigator.hardwareConcurrency`)
- Replace pin/scrub with simple fade-in transitions
- Use `prefers-reduced-motion` media query for accessibility

## Performance Checklist

- [ ] Next.js Image component for all images (WebP with fallbacks)
- [ ] Dynamic imports for Three.js and heavy Aceternity components
- [ ] `will-change` only on actively animating elements (remove after animation)
- [ ] Lighthouse score 90+ on mobile (measured in CI)
- [ ] Bundle analysis - no barrel file imports, tree-shaking enabled
- [ ] `prefers-reduced-motion` respected globally
- [ ] GSAP ScrollTrigger `kill()` on unmount
- [ ] Three.js `dispose()` calls for geometries/materials
- [ ] Font optimization with `next/font/google`
- [ ] CSS-in-JS avoided (Tailwind + CSS variables only)

## Deployment Plan

### Platform Configuration

**Platform**: Vercel

**Build Settings**:
```toml
# vercel.json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["iad1"],  // US East
  "env": {
    "BREVO_API_KEY": "@brevo-api-key",
    "NEXT_PUBLIC_SITE_URL": "https://nextlevelmarketerz.com"
  }
}
```

### Environment Variables

```env
# Required in Vercel dashboard
BREVO_API_KEY=your_brevo_api_key_here
BREVO_CONTACT_LIST_ID=your_list_id_here
NEXT_PUBLIC_SITE_URL=https://nextlevelmarketerz.com

# Optional (for analytics)
NEXT_PUBLIC_GA_ID=your_google_analytics_id
```

### Build Validation

- `npm run build` must pass with zero TypeScript errors
- `npm run lint` must pass with zero warnings
- `npm run test:e2e` must pass all Playwright tests
- Lighthouse CI score must exceed 90

### Preview Deployments

- Each PR gets automatic preview deployment
- Preview URLs use Vercel's random subdomains
- Brevo API uses test key for previews (optional)

## Phase 2: Task Generation

**Status**: ⏸️ Pending - Run `/sp.tasks` to generate actionable task list

Tasks will be organized by:
1. **Setup Phase** - Project initialization and dependencies
2. **Foundation Phase** - Core infrastructure (routing, theming, base components)
3. **User Stories** - Tasks grouped by priority (P1 → P2 → P3)
4. **Polish Phase** - Cross-cutting concerns and optimization

## Definition of Done

Implementation is complete when:
- [ ] All user stories pass acceptance criteria (including US7 Testimonials)
- [ ] Lighthouse score 90+ on mobile and desktop
- [ ] WCAG 2.1 AA compliance verified (no critical violations)
- [ ] Contact form successfully sends to Brevo API
- [ ] All animations work smoothly on desktop
- [ ] Mobile fallbacks work correctly (3D replaced, animations simplified)
- [ ] RTL layout support verified for Arabic content
- [ ] Playwright E2E tests pass for critical paths
- [ ] Deployment to Vercel preview successful
- [ ] PHR created for implementation session
- [ ] **Visual Overhaul**: Particle cloud hero matches reference quality
- [ ] **Visual Overhaul**: Glassmorphic cards have depth/glow (not flat)
- [ ] **Visual Overhaul**: Services horizontal-scroll works on desktop, degrades on mobile
- [ ] **Visual Overhaul**: Testimonials section exists with carousel
- [ ] **Visual Overhaul**: Footer has CTA section with action buttons
- [ ] **Visual Overhaul**: All CSS `reveal-on-scroll` replaced with GSAP ScrollTrigger

---

**Constitution Compliance**: Verified against all 6 principles (v1.1.0)
**Research Status**: Complete (see research.md)
**Next Step**: Run `/sp.tasks` to generate implementation tasks
