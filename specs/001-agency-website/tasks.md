# Tasks: NextLevel Marketerz Agency Website

**Input**: Design documents from `/specs/001-agency-website/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/ (contact-api.ts, newsletter-api.ts)
**Tests**: Tests are OPTIONAL - only include them if explicitly requested in the feature specification.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/`, `tests/` at repository root
- **Web app**: `backend/src/`, `frontend/src/`
- **Mobile**: `api/src/`, `ios/src/` or `android/src/`
- Paths shown below assume single project - adjust based on plan.md structure

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 Initialize Next.js 15 project with TypeScript strict mode in src/app directory
- [X] T002 Install core dependencies (gsap, @gsap/react, framer-motion, three, @react-three/fiber, @react-three/drei, zod, react-hook-form, @hookform/resolvers)
- [X] T003 [P] Install and configure Shadcn UI using shadcn MCP tool (mcp__shadcn) with CSS variable theming - MUST use MCP, try `npx shadcn@latest init` first, fallback to `npx shadcn init` if needed
- [X] T004 [P] Install Lucide React icons for icon components
- [X] T005 [P] Install Playwright for E2E testing
- [X] T006 Configure tsconfig.json with strict mode (strict: true, noUnusedLocals: true, noUnusedParameters: true)
- [X] T007 Configure tailwind.config.ts with CSS variable extension for theming
- [X] T008 Create src/app/globals.css with CSS variables in HSL format (Light theme base: white/cream backgrounds with Deep Navy/Gold accents, includes section-dark and section-gradient variants for dark/gradient sections)
- [X] T009 [P] Create Google fonts configuration (Syne/Outfit) in src/app/layout.tsx
- [X] T010 [P] Create next.config.ts with image optimization and bundle settings
- [X] T011 [P] Create components.json for Shadcn UI component registry
- [X] T012 Create .env.example with BREVO_API_KEY, BREVO_CONTACT_LIST_ID, BREVO_NEWSLETTER_LIST_ID, NEXT_PUBLIC_SITE_URL
- [X] T013 [P] Create .gitignore with .next, node_modules, .env.local

**Checkpoint**: Project structure ready, dependencies installed, configuration files created ✅

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

### Type Definitions & Data

- [X] T014 Create src/types/index.ts with all TypeScript interfaces (Service, CaseStudy, TeamMember, ContactForm, Newsletter)
- [X] T015 Create src/lib/constants.ts with NAVIGATION_LINKS, SOCIAL_LINKS, FOOTER_LINKS, SERVICES, CASE_STUDIES, TEAM_MEMBERS data
- [X] T016 Create src/lib/validation.ts with Zod schemas (contactFormSchema, newsletterSchema, serviceSchema, caseStudySchema, teamMemberSchema)
- [X] T017 Create src/lib/utils.ts with cn() class name utility function

### Base Layout Components

- [X] T018 [P] Create src/components/layout/Container.tsx with max-width constraint and responsive padding
- [X] T019 [P] Create src/components/layout/Section.tsx with standard padding and section wrapper
- [X] T020 Create src/components/layout/Navbar.tsx with glassmorphic sticky navigation, mobile hamburger menu using Framer Motion AnimatePresence
- [X] T021 Create src/components/layout/Footer.tsx with newsletter signup section, social links, and footer navigation

### Root Application Structure

- [X] T022 Create src/app/layout.tsx root layout with fonts, metadata, Navbar, and Footer integration
- [X] T023 [P] Create src/app/page.tsx home page skeleton with Hero section placeholder

### Custom Hooks

- [X] T025 [P] Create src/hooks/useMounted.ts for SSR-safe mount detection
- [X] T026 [P] Create src/hooks/useMediaQuery.ts for responsive breakpoint detection
- [X] T027 Create src/hooks/useGSAPScrollTrigger.ts with matchMedia pattern for mobile animation degradation
- [X] T028 [P] Create src/hooks/useMobileDetection.ts for 3D fallback on mobile devices

### Shadcn UI Base Components

- [X] T029 [P] Use shadcn MCP tool (mcp__shadcn) to add Button component - try `npx shadcn@latest add button` first, fallback to `npx shadcn add button`
- [X] T030 [P] Use shadcn MCP tool (mcp__shadcn) to add Input component - try `npx shadcn@latest add input` first, fallback to `npx shadcn add input`
- [X] T031 [P] Use shadcn MCP tool (mcp__shadcn) to add Textarea component - try `npx shadcn@latest add textarea` first, fallback to `npx shadcn add textarea`
- [X] T032 [P] Use shadcn MCP tool (mcp__shadcn) to add Select component - try `npx shadcn@latest add select` first, fallback to `npx shadcn add select`
- [X] T033 [P] Use shadcn MCP tool (mcp__shadcn) to add Card component - try `npx shadcn@latest add card` first, fallback to `npx shadcn add card`

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel ✅

---

## Phase 3: User Story 1 - Discover Agency & Value Proposition (Priority: P1) 🎯 MVP

**Goal**: Deliver immersive hero experience with 3D abstract object, animated headline, social proof logos, and bento grid value proposition

**Independent Test**: Visit homepage and verify: hero section loads with 3D interactive element (desktop) or static fallback (mobile), headline animates on load, social proof logos scroll infinitely, bento grid displays with hover effects

### 3D Hero Components

- [X] T034 [P] [US1] Create src/components/3d/HeroScene.tsx with Three.js Canvas, golden rings/polygons geometry, useFrame animation for rotation and floating motion - define HERO_SCENE_CONFIG in src/lib/constants.ts with rings array (radius, tube, segments, color), animationSpeed (0.001 radians/frame), floatingAmplitude (0.5), material properties (metalness: 0.8, roughness: 0.2 for gold appearance)
- [X] T035 [US1] Add mouse interaction parallax effect to HeroScene.tsx based on cursor position
- [x] Create core site structure (Next.js 14, Tailwind, Framer Motion/GSAP)
- [x] Implement "Hero" section with 3D elements (Spline/Three.js) or Video Background
- [x] Implement "Services" section (Bento Grid layout)
  - [x] Fix AI Card Visualization (Neural Network)
  - [x] Add Globe to Global Reach Card
- [x] Implement "Work" section (Parallax Scroll/Case Studies)
- [X] T036 [US1] Create src/components/sections/Hero.tsx with dynamic import of HeroScene (ssr: false), mobile detection for fallback image
- [X] T037 [US1] Implement mobile fallback in Hero.tsx with StaticHeroImage component when isMobile is true
- [X] T038 [US1] Add animated headline reveal in Hero.tsx using CSS letter-spacing animation OR GSAP SplitText (requires Club GSAP membership - paid plugin) with stagger character animation - prefer CSS approach to avoid licensing cost - Hero section should use `section-gradient` class for dark gradient background

### Social Proof Section

- [X] T039 [P] [US1] Create src/components/aceternity/infinite-moving-cards.tsx adapted from Aceternity UI with CSS variable theming
- [X] T040 [US1] Create src/components/sections/SocialProof.tsx using InfiniteMovingCards for client logos marquee with 30s scroll animation (45s on mobile)
- [X] T041 [US1] Add client logo placeholder data to src/lib/constants.ts (CLIENT_LOGOS array) - minimum 6 logos for effective marquee effect, store in public/logos/ directory, use SVG format with transparency, include placeholder company names for development

### Value Proposition (Bento Grid)

- [X] T042 [P] [US1] Create src/components/aceternity/bento-grid.tsx adapted from Aceternity UI with CSS variable theming
- [X] T043 [US1] Create src/components/sections/ValueProp.tsx using BentoGrid with value proposition cards and hover effects
- [X] T044 [US1] Add GSAP ScrollTrigger animation to ValueProp.tsx for staggered card reveal (start: "top 80%", stagger: 0.15)

### Home Page Integration

- [X] T045 [US1] Update src/app/page.tsx to compose Hero, SocialProof, and ValueProp sections
- [X] T046 [US1] Add ScrollTrigger.refresh() on route change in src/app/layout.tsx for proper animation cleanup

**Checkpoint**: User Story 1 complete - homepage with immersive hero, social proof, and value proposition independently functional

---

## Phase 4: User Story 5 - Contact & Convert (Priority: P1) 🎯 MVP

**Goal**: Deliver working contact form with Brevo API integration for lead generation

**Independent Test**: Navigate to /contact, fill out form with valid data, submit, and receive email confirmation with auto-response

### Validation & API Layer

- [X] T047 [P] [US5] Create src/lib/brevo.ts with Brevo API wrapper functions (sendEmail, addContact)
- [X] T048 [US5] Create Zod validation schemas in src/lib/validation.ts for contactFormSchema (name, email, company, serviceInterest, budgetRange, message)
- [X] T049 [US5] Create src/app/api/contact/route.ts POST endpoint with request validation, Brevo API calls, error handling, and rate limiting (3 submissions/hour per email using Upstash Redis or Vercel KV, fallback to IP-based limiting)

### Contact Form Component

- [X] T050 [P] [US5] Create src/components/sections/ContactForm.tsx with React Hook Form integration, Zod validation, and form state management
- [X] T051 [US5] Add form fields to ContactForm.tsx: Name (Input), Email (Input), Company (Input), Service Interest (Select), Budget Range (Select), Message (Textarea)
- [X] T052 [US5] Implement Framer Motion field animations in ContactForm.tsx (x: -50 to 0, stagger: 0.1 on mount)
- [X] T053 [US5] Add loading state (isSubmitting), success state (submitStatus), and error display to ContactForm.tsx
- [X] T054 [US5] Implement submit button debouncing and disable on submit in ContactForm.tsx

### Contact Page

- [X] T055 [US5] Create src/app/contact/page.tsx with ContactForm section and clean, distraction-free layout
- [X] T056 [US5] Add contact page metadata (title, description) to src/app/contact/page.tsx - use `section-dark` variant on Contact form section for visual hierarchy

**Checkpoint**: User Story 5 complete - contact form functional with Brevo API integration

---

## Phase 5: User Story 2 - Explore Services & Capabilities (Priority: P2)

**Goal**: Display 5 service cards with hover effects and navigate to dedicated service detail pages

**Independent Test**: Click Services in navigation, verify 5 service cards display with hover lift and gold border glow, click card to navigate to detail page

### Service Components

- [X] T057 [P] [US2] Create src/components/sections/ServicesGrid.tsx with grid layout for service cards
- [X] T058 [P] [US2] Create src/components/sections/ServiceCard.tsx with Framer Motion whileHover (scale: 1.03), gold border glow effect, and link wrapping
- [X] T059 [US2] Add accessibility attributes to ServiceCard.tsx (role="article", tabIndex, aria-label)

### Services Pages

- [X] T060 [US2] Create src/app/services/page.tsx with ServicesGrid section and page metadata
- [X] T061 [US2] Create src/app/services/[slug]/page.tsx dynamic route with service lookup from SERVICES constant and notFound() for invalid slugs
- [X] T062 [US2] Add generateStaticParams() to src/app/services/[slug]/page.tsx for static generation of service detail pages
- [X] T063 [US2] Create service detail page layout in src/app/services/[slug]/page.tsx with description, features list, technologies, and pricing (if applicable)
- [X] T064 [US2] Add GSAP ScrollTrigger animation to ServicesGrid.tsx for sequential card reveal on scroll

**Checkpoint**: User Story 2 complete - services page with cards and detail pages independently functional

---

## Phase 6: User Story 3 - Review Case Studies & Social Proof (Priority: P2)

**Goal**: Display case studies in masonry/grid layout with parallax scroll effects, all details visible on card

**Independent Test**: Click Work in navigation, verify case studies display in masonry layout with parallax, Challenge/Solution/Results visible on each card

### Case Study Components

- [X] T065 [P] [US3] Create src/components/sections/CaseStudies.tsx with masonry/grid layout for case studies
- [X] T066 [P] [US3] Create src/components/sections/CaseStudyCard.tsx with thumbnail, title, client, Challenge/Solution/Results sections displayed directly on card
- [X] T067 [US3] Add GSAP ScrollTrigger parallax effect to CaseStudyCard.tsx image (yPercent: -20, scrub: true, start: "top bottom")
- [X] T068 [US3] Implement mobile fallback in CaseStudies.tsx for single-column layout without parallax

### Work Page

- [X] T069 [US3] Create src/app/work/page.tsx with CaseStudies section and page metadata
- [X] T070 [US3] Add case study data to src/lib/constants.ts (CASE_STUDIES array with at least 3 example projects)

**Checkpoint**: User Story 3 complete - work page with case studies independently functional

---

## Phase 7: User Story 4 - Learn About Company Vision & Team (Priority: P3)

**Goal**: Display company story with scroll-triggered text reveals, team member profiles with hover social links, and values with animated icons

**Independent Test**: Click About in navigation, verify company story displays with text reveals, team cards show with hover social links, values section displays

### About Page Sections

- [X] T071 [P] [US4] Create src/components/sections/CompanyStory.tsx with company story ("Born to disrupt") and GSAP ScrollTrigger text reveal animations
- [X] T072 [P] [US4] Create src/components/sections/TeamSection.tsx with team member cards in grid layout
- [X] T073 [P] [US4] Create src/components/sections/TeamMemberCard.tsx with headshot, name, role, and Framer Motion hover effect revealing social links
- [X] T074 [P] [US4] Create src/components/sections/Values.tsx with "Excellence, Integrity, Speed" values and animated icons

### About Page

- [X] T075 [US4] Create src/app/about/page.tsx composing CompanyStory, TeamSection, and Values sections
- [X] T076 [US4] Add GSAP ScrollTrigger batch animation to TeamSection.tsx for staggered reveal (batch: true, stagger: 0.1, start: "top 85%")
- [X] T077 [US4] Add GSAP ScrollTrigger icon animation to Values.tsx (scale: 0, opacity: 0, stagger: 0.2, scrub: 1)

**Checkpoint**: User Story 4 complete - about page with story, team, and values independently functional

---

## Phase 8: User Story 6 - Newsletter Signup (Priority: P3)

**Goal**: Footer newsletter signup form with Brevo API integration

**Independent Test**: Scroll to footer, enter valid email, click subscribe, receive confirmation message

### Newsletter Component

- [X] T078 [P] [US6] Create src/components/sections/Newsletter.tsx with email input field and subscribe button
- [X] T079 [US6] Integrate Newsletter.tsx into Footer component with proper positioning
- [X] T080 [US6] Add form validation (Zod email validation) and error handling to Newsletter.tsx - use newsletterSchema from src/lib/validation.ts
- [X] T081 [US6] Create src/app/api/newsletter/route.ts POST endpoint with Brevo contact list integration - see specs/001-agency-website/contracts/newsletter-api.ts for full contract

**Checkpoint**: User Story 6 complete - newsletter signup independently functional

---

## Phase 9: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [X] T082 [P] Add prefers-reduced-motion media query respect globally to src/app/globals.css
- [X] T083 [P] Optimize images using Next.js Image component with WebP format and fallbacks
- [X] T084 [P] Implement dynamic imports for heavy components (HeroScene, Aceternity components) using next/dynamic
- [ ] T085 [P] Add will-change CSS property only to actively animating elements, remove after animation
- [X] T086 [P] Verify RTL layout support for Arabic content (add dir="rtl" attribute to html element)
- [X] T087 Add bundle analysis script to package.json for monitoring bundle size
- [X] T088 [P] Create vercel.json with build configuration and environment variables
- [ ] T089 Add Lighthouse CI configuration for performance regression testing
- [ ] T090 [P] Create Playwright E2E test for contact form submission in tests/e2e/contact-form.spec.ts

---

## Phase 10: Visual Overhaul *(NEW — 2026-02-10)*

**Purpose**: Address critical visual deficiencies identified by comparing current site against 16 reference images. This phase replaces flat/generic styling with immersive, luxurious "Tech-Luxury" aesthetics.

> [!IMPORTANT]
> This phase modifies existing completed tasks. Some Phase 3–9 components will be significantly reworked. Tasks are ordered by visual impact priority.

### Phase 10A: Design System Fixes (Foundation)

- [X] T096 [US1] Update src/app/globals.css: change `--color-background` from `0 0% 100%` (pure white) to **`40 20% 97%`** (warm cream `#f8f7f5`), `--color-card` to `40 15% 98%`, `--color-border` from `214 20% 92%` (invisible) to **`220 15% 85%`** (`#d1d5db`), `--color-popover` to `40 15% 98%`. Add new tokens: `--color-glow: 43 77% 55% / 0.25`, `--color-surface-glass: 0 0% 100% / 0.06`, `--color-surface-elevated: 222 47% 16%`, `--color-electric-blue: 217 91% 60%`, `--color-cyan-glow: 185 70% 55%`. Fix broken `.section-dark` border (`255 255 255 0.1` → `0 0% 100% / 0.1`) and `.section-gradient` cards/borders. Add `.shadow-luxury` and `.shadow-luxury-lg` utilities, noise/grain overlay, gradient border utility. Increase `--radius` to `1rem`.
- [X] T097 [P] [US1] Update tailwind.config.ts to extend theme with new design tokens from globals.css

### Phase 10B: Hero Section Overhaul

- [X] T098 [US1] Rewrite src/components/3d/HeroScene.tsx: replace golden wireframe torus rings with **particle cloud sphere** — use THREE.BufferGeometry + THREE.Points (~5000 particles), fibonacci sphere distribution, gold/cyan gradient vertex colors, custom THREE.PointsMaterial with sizeAttenuation + glow, slow rotation + breathing scale oscillation + mouse parallax interaction
- [X] T099 [US1] Rewrite src/components/sections/Hero.tsx: change from 2-column grid to **full-bleed centered** layout with 3D scene as full background, massive centered headline (text-9xl+ on desktop), gradient overlay at bottom for readability, replace CSS @keyframes with GSAP `useGSAP` for headline character animation, add GSAP ScrollTrigger scroll-triggered fade-out
- [X] T100 [US1] Update StaticHeroImage fallback in Hero.tsx: replace wireframe ring circles with animated gradient/glow element

### Phase 10C: Social Proof Rework

- [X] T101 [P] [US1] Update src/components/sections/SocialProof.tsx: add gradient transition from dark hero section above (dark→light fade), improve logo placeholders (use text-based logos with proper styling instead of "C" in bordered circles), add GSAP ScrollTrigger fade-in animation

### Phase 10D: Value Proposition Visual Upgrade

- [X] T102 [US1] Update src/components/sections/ValueProp.tsx: change section background from light `bg-background` to **`section-dark`** variant, change card styling to glassmorphic (`backdrop-filter: blur()`, subtle gold border glow, gradient backgrounds), replace CSS `reveal-on-scroll` classes with GSAP `useGSAP` + `ScrollTrigger.batch()` for staggered reveal
- [X] T103 [P] [US1] Update src/components/aceternity/bento-grid.tsx: update default card styling to support glassmorphic dark look — add inner gradient, glow border on hover, improve icon container with gold accent

### Phase 10E: Services — Horizontal Scroll (Major New Component)

- [X] T104 [US2] Create src/components/sections/ServicesShowcase.tsx: **GSAP ScrollTrigger pinned horizontal-scroll section** — Container pinned with `pin: true`, horizontal `x` tween across service panels, `scrub: 1`, `end: "+=500%"`
- [X] T105 [US2] Add service category tabs to ServicesShowcase.tsx: fixed at top of pinned container, active indicator follows scroll progress, tabs = AI Chatbots, Web Dev, Marketing, Design, SEO
- [X] T106 [US2] Create service panel content in ServicesShowcase.tsx: each panel = left (bold headline + description text) + right (decorative 3D/gradient visual or image), dark bg for coding panels, light bg for design panels
- [X] T107 [US2] Add mobile fallback to ServicesShowcase.tsx: replace horizontal scroll with vertical card stack + swipe-able tabs (no pinning) using GSAP matchMedia
- [X] T108 [US2] Update src/app/services/page.tsx: replace ServicesGrid with ServicesShowcase component, keep ServicesGrid as deprecated fallback

### Phase 10F: Testimonials + Footer

- [X] T109 [P] [US7] Add Testimonial type to src/types/index.ts: `{ quote: string, name: string, role: string, company: string, image?: string }`
- [X] T110 [P] [US7] Add TESTIMONIALS data array to src/lib/constants.ts with at least 3 placeholder testimonials
- [X] T111 [US7] Create src/components/sections/Testimonials.tsx: dark-themed section, large decorative SVG quote marks (gold), client quote in Syne display font, client info (name, role, company), prev/next navigation arrows with Framer Motion AnimatePresence slide transitions, GSAP ScrollTrigger for initial reveal
- [X] T112 [US7] Update src/app/page.tsx: add Testimonials section between ValueProp and footer
- [X] T113 [US7] Update src/components/layout/Footer.tsx: add prominent CTA section above footer links — large testimonial quote, "Book a Call" + "Contact Us" action buttons with primary styling, GSAP fade-in animation

### Phase 10G: GSAP ScrollTrigger Migration

- [X] T114 [P] Remove all CSS `reveal-on-scroll`, `fade-from-left`, `fade-from-right`, `scale-in` classes from globals.css (keep the `.is-visible` variants for brief backward compat)
- [X] T115 Update src/components/sections/CompanyStory.tsx: replace CSS reveal classes with GSAP `useGSAP` + ScrollTrigger for text reveals
- [X] T116 [P] Update src/components/sections/TeamSection.tsx: replace CSS reveal classes with GSAP `useGSAP` + `ScrollTrigger.batch()` for staggered card reveal
- [X] T117 [P] Update src/components/sections/Values.tsx: replace CSS reveal classes with GSAP `useGSAP` + ScrollTrigger for icon reveal
- [X] T118 [P] Update src/components/sections/CaseStudies.tsx: verify GSAP parallax is working (not CSS-only), add proper `useGSAP` cleanup
- [X] T119 Add `ScrollTrigger.normalizeScroll(true)` for mobile smooth scrolling in src/app/layout.tsx or a global ScrollTrigger setup hook

**Checkpoint**: Visual Overhaul complete — site matches reference quality with immersive particle hero, horizontal-scroll services, glassmorphic cards, testimonials, and GSAP throughout

---

### Accessibility (WCAG 2.1 AA Compliance)

- [ ] T091 [P] Run axe-core or Lighthouse accessibility audit and address all violations to achieve WCAG 2.1 AA compliance
- [X] T092 [P] Add skip-to-content link for keyboard navigation (hidden until focused, jumps to main content)
- [X] T093 [P] Verify focus indicators visible on all interactive elements (buttons, links, form inputs) - add custom focus styles if needed
- [X] T094 [P] Add ARIA labels to all icon-only buttons and decorative elements
- [ ] T095 [P] Test screen reader compatibility with NVDA (Windows) or VoiceOver (macOS) for critical user paths (Hero → Contact form submission)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-8)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order: P1 (US1, US5) → P2 (US2, US3) → P3 (US4, US6)
- **Polish (Phase 9)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 5 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 3 (P2)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 4 (P3)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 6 (P3)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 7 (P2) *(NEW)***: Can start after Foundational (Phase 2) - No dependencies on other stories (but logically follows US1)

### Visual Overhaul Dependencies

- **Phase 10A** (Design System): No dependencies — can start immediately
- **Phase 10B** (Hero): Depends on 10A (needs new CSS variables and tokens)
- **Phase 10C** (Social Proof): Depends on 10B (needs hero dark bg for gradient transition)
- **Phase 10D** (Value Prop): Depends on 10A (needs glassmorphic tokens)
- **Phase 10E** (Services Horizontal Scroll): Depends on 10A (needs design tokens). Most complex phase.
- **Phase 10F** (Testimonials + Footer): Depends on 10A. Can run in parallel with 10E.
- **Phase 10G** (GSAP Migration): Can run incrementally with each phase above.

### Within Each Phase

- All tasks marked [P] can run in parallel
- Tasks without [P] depend on earlier tasks in the same phase
- Stories complete and integrate independently

### Parallel Opportunities

- Phase 1: All tasks (T002-T013) can run in parallel after T001
- Phase 2: T014-T017, T018-T021, T025-T028, T029-T033 can run in parallel within their groups
- User Story phases: All [P] marked tasks can run in parallel
- Different user stories can be worked on in parallel by different team members

### Parallel Example: User Story 1

```bash
# Launch all 3D Hero components together:
Task: T034 - Create HeroScene.tsx with Three.js
Task: T037 - Implement mobile fallback in Hero.tsx

# Launch all Social Proof components together:
Task: T039 - Create InfiniteMovingCards component
Task: T041 - Add client logo data

# Launch ValueProp components together:
Task: T042 - Create BentoGrid component
Task: T043 - Create ValueProp section
```

---

### Phase 10H: Visual Polish (Feedback Fixes)

- [x] T120 [P] [Design] Update src/components/layout/Footer.tsx: Enhance CTA section with glassmorphic container (`bg-card/30 backdrop-blur`), boost background gradient opacity, and add "floating" style to Newsletter input.
- [x] T121 [P] [Design] Update src/components/sections/Testimonials.tsx: Increase quote mark opacity/visibility, add subtle shadow/glow to cards, scale up navigation arrows.
- [x] T122 [P] [Design] Update src/components/sections/ValueProp.tsx: Enhance glassmorphism (`backdrop-blur-md`, `bg-white/5`), add subtle gradient borders.
- [x] T123 [P] [Design] Update src/app/globals.css: Tune `section-dark` border/surface colors to be less "flat" (add subtle noise or top highlight).

## Implementation Strategy

### MVP First (User Stories 1 & 5 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1 (Hero, SocialProof, ValueProp)
4. Complete Phase 4: User Story 5 (Contact Form with Brevo)
5. **STOP and VALIDATE**: Test both stories independently
6. Deploy/demo if ready

**MVP Deliverable**: Homepage with immersive hero experience + working contact form for lead generation

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP Part 1)
3. Add User Story 5 → Test independently → Deploy/Demo (MVP Complete!)
4. Add User Story 2 → Test independently → Deploy/Demo
5. Add User Story 3 → Test independently → Deploy/Demo
6. Add User Story 4 → Test independently → Deploy/Demo
7. Add User Story 6 → Test independently → Deploy/Demo
8. Complete Polish phase → Deploy/Demo (Final!)

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (Hero sections)
   - Developer B: User Story 5 (Contact form)
   - Developer C: User Story 2 (Services)
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
- Follow Constitution principles (SOLID, Research-First, CSS Variables, UI Library Strategy, Animation Performance)
- Use useGSAP hook for all GSAP ScrollTrigger animations with proper cleanup
- All colors must use CSS variables (--primary, --secondary, etc.)
- Shadcn UI for base components, Aceternity UI for hero sections (adapted with CSS variables)

---

**Total Task Count**: 123 tasks (94 original + 29 visual overhaul)
**Tasks per User Story**:
- User Story 1: 13 tasks (T034-T046) + 8 visual overhaul tasks (T096-T103)
- User Story 5: 10 tasks (T047-T056)
- User Story 2: 8 tasks (T057-T064) + 5 visual overhaul tasks (T104-T108)
- User Story 3: 6 tasks (T065-T070) + 1 visual overhaul task (T118)
- User Story 4: 7 tasks (T071-T077) + 2 visual overhaul tasks (T115-T116, T117)
- User Story 6: 4 tasks (T078-T081)
- **User Story 7 *(NEW)*: 5 tasks (T109-T113)**
- Setup: 13 tasks (T001-T013)
- Foundational: 15 tasks (T014-T033)
- Polish: 14 tasks (T082-T095, includes 5 accessibility tasks for WCAG 2.1 AA compliance)
- **Visual Overhaul: 29 tasks (T096-T123)** — covers design system, hero, social proof, value prop, services horizontal-scroll, testimonials, footer, GSAP migration, and visual polish

**MVP Scope** (Recommended starting point): Phases 1, 2, 3, 4 (User Stories 1 & 5) = 47 tasks
**Visual Overhaul Priority**: Phase 10A → 10B → 10D → 10C → 10E → 10F → 10G → 10H (ordered by visual impact)
