---
name: ultimate-frontend
description: The all-in-one frontend architect and builder. This skill should be used when designing high-impact web interfaces, landing pages, or applications. Combines design strategy, animation choreography (GSAP/Three.js), and advanced CSS techniques into a single workflow.
---

# Ultimate Frontend Skill

## Capability
Ignites the creation of **World-Class Web Interfaces**.
Integration of **Design Strategy** (Layout/Copy), **Motion** (GSAP/3D), and **Engineering** (React/Next.js/Tailwind).

## When to use
- "Build a high-converting landing page"
- "Create a 3D interactive hero section"
- "Add glassmorphism and premium animations"
- "Fix this boring UI"

## Before Implementation

Gather context to ensure successful implementation:

| Source | Gather |
|--------|--------|
| **Codebase** | Existing structure, patterns, conventions to integrate with |
| **Conversation** | User's specific requirements, constraints, preferences |
| **Skill References** | Domain patterns from `references/` (GSAP, Three.js, Tailwind) |
| **User Guidelines** | Project-specific conventions, team standards |

Ensure all required context is gathered before implementing.
Only ask user for THEIR specific requirements (domain expertise is in this skill).

## What This Skill Does NOT Do
- Backend API development (databases, server routes)
- DevOps/infrastructure (deployment, CI/CD)
- Native mobile development (iOS/Android)
- Desktop application development

## Workflow

### Phase 1: Strategy & Architecture
Before coding, define the intent.
1. **Analyze Request**: Is it a *Marketing Site* (Landing Page) or *Product UI* (Dashboard)?
   - *Marketing*: Prioritize **Engagement, Storytelling, 3D**. -> Ref: `design/landing-page.md`
   - *Product*: Prioritize **Clarity, Micro-interactions, Speed**. -> Ref: `design/frontend-architect.md`
2. **Select the Engine**:
   - **Scroll Storytelling**: GSAP ScrollTrigger. -> Ref: `animations/gsap.md`
   - **3D Visuals**: Three.js / Globe.gl / Cobe. -> Ref: `animations/`
   - **Physics/Particles**: Matter.js / Vanta.js. -> Ref: `animations/`
3. **Define Mechanics**:
   - Next.js / React / Tailwind is the default stack. -> Ref: `workflow/vercel-best-practices.md`

### Phase 2: Implementation (The Toolkit)
Select the specific techniques to achieve the vision.

#### 🎭 Animation & 3D
| Effect | Tool | Reference |
|--------|------|-----------|
| **Scroll Storytelling** | GSAP ScrollTrigger | `animations/gsap.md` |
| **Text Reveals** | GSAP + overflow-hidden | `animations/text-reveal.md` |
| **Horizontal Scroll** | GSAP Pin + Scrub | `animations/horizontal-scroll.md` |
| **Curtain Reveals** | GSAP Timeline | `animations/curtain-reveal.md` |
| **Preloader Intros** | GSAP Timeline | `animations/preloaders.md` |
| **3D Scenes** | Three.js (Canvas) | `animations/threejs.md` |
| **Data Globes** | Globe.gl (Heavy) | `animations/globe-gl.md` |
| **Decorative Globes** | Cobe.js (Light) | `animations/cobejs.md` |
| **Physics 2D** | Matter.js | `animations/matterjs.md` |
| **Backgrounds** | Vanta.js / Particles | `animations/vantajs.md` |
| **No-Code Embeds** | Unicorn Studio | `animations/unicorn-studio.md` |

#### 🎨 CSS & Visual Polish
| Effect | Technique | Reference |
|--------|-----------|-----------|
| **Responsive Scaling** | Root font-size + Container | `css/responsive-scaling.md` |
| **Glassmorphism** | Backdrop filters + Noise | `css/tailwindcss.md` |
| **Glowing Borders** | Mask Composite / Gradient | `css/border-gradient.md` |
| **Soft Edges** | Alpha Masking | `css/alpha-masking.md` |
| **Blur Gradients** | Progressive Blur | `css/progressive-blur.md` |
| **Scroll Reveal** | IntersectionObserver | `css/animation-on-scroll.md` |

#### 📐 Design Patterns
- **Landing Pages**: `design/landing-page.md` (Structure, Copy, Conversion)
- **Pricing Tables**: `design/pricing-page.md` (Psychology, Layout)
- **Bento Grids**: `design/bento-grid.md` (Asymmetric Card Layouts, Spanning)
- **Tab Navigation**: `design/tabs-navigation.md` (Pill, Underline, Segmented, Sidebar)
- **Section Theming**: `design/section-theming.md` (Contrast, Contact Forms, Dark/Light)

#### ⚠️ Pitfalls & Solutions
- **Common Bugs**: `workflow/pitfalls.md` — 10 most common frontend bugs with fixes

## Phase 3: Execution
1. **Setup**: Initialize components with `workflow/vercel-best-practices.md` constraints (SSR safety).
2. **Build**: Use `css/tailwindcss.md` for layout and `css/` recipes for polish.
3. **Animate**: Apply `animations/` patterns last to bring it to life.

## Required Clarifications

1. **Project Type**: Marketing Site or Product UI?
   - **Marketing**: Prioritize Engagement, Storytelling, 3D → Ref: `design/landing-page.md`
   - **Product**: Prioritize Clarity, Micro-interactions, Speed → Ref: `design/frontend-architect.md`

2. **Primary Goal**: What is the main objective?
   - Conversion (leads, signups, sales)
   - Utility (functional application)
   - Brand awareness (portfolio, showcase)

## Optional Clarifications

3. **Vibe Preference**: Visual style direction
   - Tech-Luxury (Dark/Glass, gradients, premium feel)
   - Clean Minimal (lots of whitespace, sharp typography)
   - Playful (3D elements, physics, experimental)

4. **Performance Constraints**
   - Mobile-first (lightweight, 3G compatible)
   - Desktop-first (full immersion, heavier assets)
   - Progressive enhancement (base + enhanced)

Note: Avoid asking too many questions in a single message. Start with Required clarifications, follow up as needed.

## Official Documentation

| Resource | URL | Use For |
|----------|-----|---------|
| **GSAP** | https://gsap.com/docs | Complex animation scenarios, timelines |
| **GSAP ScrollTrigger** | https://gsap.com/docs/v3/Plugins/ScrollTrigger | Scroll-driven animations |
| **Three.js** | https://threejs.org/docs | 3D scene implementation |
| **React Three Fiber** | https://r3f.docs.pmnd.rs | React 3D integration |
| **@react-three/drei** | https://github.com/pmndrs/drei | R3F helpers and abstractions |
| **Tailwind CSS** | https://tailwindcss.com/docs | Utility patterns, design tokens |
| **Framer Motion** | https://motion.dev | React animations, gestures |
| **Vercel React** | https://nextjs.org/docs | React/Next.js best practices |

## Output Checklist

Before delivering the final implementation, verify:

### Structure & Setup
- [ ] Components follow SSR-safe patterns (client directives where needed)
- [ ] Proper file organization (components/, hooks/, utils/)
- [ ] TypeScript strict mode compliance
- [ ] No console errors or warnings

### Design & Visuals
- [ ] Responsive across all breakpoints (mobile, tablet, desktop)
- [ ] Accessibility compliance (ARIA labels, keyboard navigation)
- [ ] Performance optimized (lazy loading, code splitting)
- [ ] Cross-browser compatibility (Chrome, Firefox, Safari)

### Animations & 3D
- [ ] Smooth 60fps animations
- [ ] Proper cleanup on unmount (GSAP kill(), Three.js dispose())
- [ ] Reduced motion support (prefers-reduced-motion)
- [ ] No memory leaks from animation listeners

### Best Practices
- [ ] Follow Vercel React patterns (no anonymous functions in render)
- [ ] Proper error boundaries for 3D/animation components
- [ ] Semantic HTML structure
- [ ] Optimized images and assets
