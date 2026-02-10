# Technical Plan Prompt: NextLevel Marketerz

**Role:** Senior Full-Stack Web Architect & Technical Lead
**Task:** Produce a granular, file-by-file technical implementation plan for the NextLevel Marketerz agency website.
**Input Documents:**
-   **Constitution**: `.specify/memory/constitution.md` (v1.0.0) — Supreme law. Every decision below MUST comply.
-   **Specs Prompt**: `model_prompts/specs_prompt.md` — Design vision, sections, and UX choreography.
-   **Project Constitution**: `model_prompts/project_constitution.md` — Runtime development guidelines.

---

## 0. Pre-Planning: Mandatory Research Phase

> **Constitution Principle II (Research-First) is NON-NEGOTIABLE.**

Before writing any plan details, you MUST:

1.  **Use `context7` MCP** to fetch the latest documentation for:
    -   `gsap` (v3.13+) — ScrollTrigger API, `useGSAP` hook, SplitText.
    -   `@react-three/fiber` & `@react-three/drei` — Canvas, useFrame, Environment.
    -   `framer-motion` (motion.dev) — `AnimatePresence`, `layout`, `whileInView`.
    -   `shadcn-ui` — Installation, component registry, theming.
    -   `next` (v14+) — App Router, Server Components, Route Handlers.
    -   `@sendinblue/client` or `sib-api-v3-sdk` — Brevo transactional email API.
2.  **Use `tavily` MCP** to search for:
    -   "Aceternity UI latest components 2025" — Verify available components (Bento Grid, Moving Border, etc.).
    -   "Magic UI components list" — Verify available components.
    -   "GSAP ScrollTrigger Next.js App Router best practices" — SSR-safe patterns.
3.  **Reference Skills** (read the `SKILL.md` file of each before proceeding):
    -   `@.claude/skills/building-nextjs-apps` — App Router file conventions, Server vs Client components.
    -   `@.claude/skills/vercel-react-best-practices` — Bundle optimization, waterfall elimination, caching.
    -   `@.claude/skills/web-design-guidelines` — WCAG compliance, layout rules.
    -   `@.claude/skills/frontend-designer` — Animation-First Design, Choreography Script, Aesthetic Direction.
    -   `@.claude/skills/gsap-scrolltrigger` — ScrollTrigger patterns, performance checklist, SSR-safe setup.
    -   `@.claude/skills/ux-evaluator` — Visual hierarchy analysis, spacing checks.
    -   `@.claude/skills/deployment-engineer` — Vercel deployment, environment variables.

**Document all research findings in a `research_notes.md` file before proceeding.**

---

## 1. Project Initialization Plan

### 1.1 Scaffolding
-   Use `npx create-next-app@latest ./ --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"` (non-interactive).
-   Verify `tsconfig.json` has `strict: true`, `noUnusedLocals: true`, `noUnusedParameters: true`.

### 1.2 Dependencies
Provide the exact `npm install` commands. Group by purpose:
```bash
# UI Libraries
npx shadcn-ui@latest init
npm install aceternity-ui  # or copy components manually

# Animation
npm install gsap @gsap/react
npm install framer-motion

# 3D
npm install three @types/three @react-three/fiber @react-three/drei

# Email
npm install sib-api-v3-sdk  # Brevo SDK
# OR use fetch-based API calls to Brevo REST API

# Validation
npm install zod react-hook-form @hookform/resolvers
```

### 1.3 Environment Variables
```env
BREVO_API_KEY=
NEXT_PUBLIC_SITE_URL=
```

---

## 2. Design System Plan (Constitution Principle III)

### 2.1 CSS Variables (`src/app/globals.css`)
Define the EXACT variable names and values:
```css
:root {
  /* Core Palette */
  --background: 222 47% 6%;        /* Deep Navy/Black */
  --foreground: 0 0% 98%;          /* Off-White */
  --primary: 43 74% 49%;           /* Gold */
  --primary-foreground: 0 0% 100%;
  --secondary: 217 91% 60%;        /* Electric Blue */
  --accent: 43 96% 56%;            /* Bright Gold */
  --muted: 215 25% 15%;
  --muted-foreground: 215 20% 65%;
  --card: 222 40% 10%;
  --card-foreground: 0 0% 98%;
  --border: 215 25% 20%;
  --ring: 43 74% 49%;
  --radius: 0.75rem;

  /* Custom Semantic */
  --glass: 222 47% 11% / 0.6;
  --glass-border: 0 0% 100% / 0.08;
  --gold-glow: 0 0 30px hsl(43 74% 49% / 0.3);
}

/* Light sections override */
.section-light {
  --background: 0 0% 98%;
  --foreground: 222 47% 6%;
  --card: 0 0% 100%;
  --card-foreground: 222 47% 6%;
}
```

### 2.2 Tailwind Config (`tailwind.config.ts`)
Extend theme to consume CSS variables:
```ts
colors: {
  background: "hsl(var(--background))",
  foreground: "hsl(var(--foreground))",
  primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
  secondary: { DEFAULT: "hsl(var(--secondary))", foreground: "..." },
  // ... all semantic tokens
}
```

### 2.3 Typography
-   **Display Font**: `Syne` or `Clash Display` (Google Fonts / local).
-   **Body Font**: `Outfit` or `Manrope` (Google Fonts).
-   Load via `next/font/google` for automatic optimization.

---

## 3. File Structure Plan

Provide the COMPLETE tree with annotations:

```
src/
├── app/
│   ├── layout.tsx               # Root layout (fonts, metadata, Navbar, Footer)
│   ├── page.tsx                 # Home page
│   ├── about/
│   │   └── page.tsx             # About page
│   ├── services/
│   │   └── page.tsx             # Services page
│   ├── work/
│   │   └── page.tsx             # Case Studies page
│   ├── contact/
│   │   └── page.tsx             # Contact page
│   ├── api/
│   │   └── contact/
│   │       └── route.ts         # Brevo API integration
│   └── globals.css              # CSS variables + base styles
│
├── components/
│   ├── ui/                      # Shadcn UI base (Button, Input, Dialog, etc.)
│   ├── aceternity/              # Aceternity/Magic UI adapted components
│   │   ├── bento-grid.tsx
│   │   ├── infinite-moving-cards.tsx
│   │   ├── moving-border.tsx
│   │   └── background-beams.tsx
│   ├── sections/                # Page-level section components
│   │   ├── Hero.tsx             # 3D Hero with ScrollTrigger
│   │   ├── SocialProof.tsx      # Client logos marquee
│   │   ├── ValueProp.tsx        # Bento grid features
│   │   ├── ServicesGrid.tsx     # Service cards grid
│   │   ├── CaseStudies.tsx      # Work showcase
│   │   ├── TeamSection.tsx      # About page team
│   │   ├── ContactForm.tsx      # Brevo-connected form
│   │   └── Newsletter.tsx       # Footer newsletter signup
│   ├── layout/                  # Layout primitives
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── Section.tsx          # Reusable section wrapper
│   │   └── Container.tsx        # Max-width container
│   └── 3d/                      # Three.js components
│       └── HeroScene.tsx        # Main 3D scene
│
├── hooks/                       # Custom React hooks
│   ├── useGSAPScrollTrigger.ts  # Reusable ScrollTrigger setup
│   ├── useMediaQuery.ts         # Responsive breakpoint detection
│   └── useMounted.ts            # SSR-safe mount detection
│
├── lib/                         # Utilities
│   ├── utils.ts                 # cn() helper, misc
│   ├── brevo.ts                 # Brevo API wrapper
│   ├── animations.ts            # GSAP animation presets
│   └── constants.ts             # Site data (services, team, etc.)
│
└── types/                       # TypeScript interfaces
    └── index.ts                 # Service, TeamMember, CaseStudy, ContactForm types
```

---

## 4. Scroll Animation Strategy (Per Section)

For EACH section, specify:
-   **Trigger Element**: Which DOM element starts the animation.
-   **Animation Type**: Reveal, Pin, Parallax, Horizontal Scroll.
-   **GSAP Config**: `start`, `end`, `scrub`, `pin`, `toggleActions`.
-   **Mobile Fallback**: What happens on `< 768px`.

| Section | Animation | GSAP Config | Mobile Fallback |
|---------|-----------|-------------|-----------------|
| **Hero** | 3D object parallax + text reveal | `start: "top top", scrub: 1` | Static image + fade-in text |
| **Social Proof** | Infinite marquee | CSS animation (no GSAP) | Same, slower speed |
| **Value Prop** | Staggered card reveal | `start: "top 80%", stagger: 0.15` | Simple fade-in |
| **Services** | Pinned section, cards stack | `pin: true, scrub: 1, end: "+=300%"` | Standard vertical scroll |
| **Case Studies** | Parallax image shift | `yPercent: -20, scrub: true` | No parallax, standard grid |
| **Team** | Staggered reveal | `batch, stagger: 0.1` | Simple fade |
| **Contact** | Form fields slide in | `x: -50, stagger: 0.1` | Instant render |

---

## 5. Component Specifications

For EACH component, specify:
-   **Props interface** (TypeScript).
-   **Internal state**.
-   **Animation library used** (GSAP vs Motion).
-   **Accessibility** (ARIA roles, keyboard nav).
-   **Responsive behavior**.

### Example: `ServiceCard`
```typescript
interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}
// Animation: Framer Motion whileHover (scale: 1.03, shadow glow)
// Accessibility: role="article", keyboard focusable
// Responsive: Full-width on mobile, 1/3 on desktop
```

---

## 6. Brevo Integration Plan

### 6.1 API Route (`src/app/api/contact/route.ts`)
-   Accept POST with Zod-validated body.
-   Send transactional email via Brevo API.
-   Add contact to Brevo list.
-   Return JSON response.

### 6.2 Client Form (`src/components/sections/ContactForm.tsx`)
-   Use `react-hook-form` + `@hookform/resolvers/zod`.
-   Shadcn `Input`, `Select`, `Textarea`, `Button`.
-   Loading/success/error states with Framer Motion transitions.

### 6.3 Newsletter (`src/components/sections/Newsletter.tsx`)
-   Email-only form in Footer.
-   Adds subscriber to Brevo list via same API pattern.

---

## 7. Mobile Responsiveness Strategy

-   **Breakpoints**: `sm: 640px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`.
-   **3D Hero**: Replace Three.js canvas with optimized static/video on `< 768px`.
-   **GSAP**: Use `ScrollTrigger.matchMedia()` to disable complex animations on mobile.
-   **Navigation**: Hamburger menu with Framer Motion `AnimatePresence` slide-in sheet.
-   **Touch**: Use `normalizeScroll(true)` for iOS momentum scrolling.

---

## 8. Performance Checklist

-   [ ] Next.js Image component for all images.
-   [ ] Dynamic imports (`next/dynamic`) for Three.js and Aceternity components.
-   [ ] `will-change` only on actively animating elements.
-   [ ] Lighthouse score > 90 on mobile.
-   [ ] Bundle analysis — no barrel file imports.
-   [ ] `prefers-reduced-motion` respected globally.

---

## 9. Deployment Plan

-   **Platform**: Vercel.
-   **Environment**: Set `BREVO_API_KEY` in Vercel dashboard.
-   **Build**: `npm run build` must pass with zero TypeScript errors.
-   **Preview**: Each PR gets a preview deployment.

---

## Deliverables

Generate the following files in `model_prompts/`:
1.  `technical_plan.md` — The filled-in version of this template with ALL research findings and exact specifications.
2.  `research_notes.md` — Raw documentation excerpts from MCP research.

**Constitution Compliance Gate**: Before finalizing, re-read `.specify/memory/constitution.md` and verify every section above passes all 6 principles.

**Tone**: Precise, actionable, zero ambiguity. Every file path, every prop, every animation config must be specified.
