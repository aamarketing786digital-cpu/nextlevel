---
id: 001
title: Agency Website Specification
stage: spec
date: 2026-02-10
surface: agent
model: claude-opus-4-6
feature: 001-agency-website
branch: 001-agency-website
user: K TECH
command: /sp.specify
labels: ["spec","sdd","agency","website"]
links:
  spec: specs/001-agency-website/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/001-agency-website/spec.md (created)
  - specs/001-agency-website/checklists/requirements.md (created)
tests:
  - N/A (specification phase)
---

## Prompt

# Agency Website Specification Prompt

**Role:** Expert Web Architect & Creative Director
**Task:** Create a comprehensive technical and design specification for a high-end agency website.
**Project Name:** NextLevel Marketerz

## Context & Vision
We are building a flagship agency website for **"NextLevel Marketerz"**. The goal is to attract high-value international clients, with a specific focus on the **UAE and Middle East** markets.

**Brand Identity:**
-   **Concept**: "Ascension / The Future of Growth".
-   **Visuals**: Ultra-premium, Futuristic, "Tech-Luxury". Think Dubai skyline at night—slick, modern, with touches of gold and neon.
-   **Reference**: **Abstract Kinetic Geometry** (e.g., floating golden rings, digital polygons, or a futuristic network globe) to symbolize connection, wealth, and future tech.

## Design Requirements
1.  **Aesthetic strategy**:
    -   **Palette**: Deep Navy/Black (Authority), **Gold/Bronze** (Luxury/Success), **Electric Blue** (Technology).
    -   **Typography**: high-end, editorial feel (e.g., `Outfit` or `Manrope` mixed with display fonts).
2.  **User Experience (Critical)**:
    -   **Scroll-Triggered Everything**: almost every section should react to scroll (Parallax, Pinning, Reveal).
    -   **Responsiveness**: Mobile experience must be flawless (e.g., replace heavy 3D with optimized video or lightweight canvas on mobile).
    -   **Feel**: "Smooth and Heavy" (Luxury). No janky or fast animations.

## Technology Stack (Strict)
-   **Framework**: Next.js 14+ (App Router).
-   **Language**: TypeScript (Strict mode).
-   **Styling**: Tailwind CSS.
-   **UI Libraries (Mandatory)**:
    -   **Shadcn UI**: For all base components (Forms, Dialogs, Buttons, Inputs).
    -   **Aceternity UI / Magic UI**: For high-impact "Hero" moments.
-   **Animation**:
    -   **GSAP + ScrollTrigger**: Primary driver. Use `scrub`, `pin`, and `parallax` effects extensively.
    -   **Framer Motion**: Micro-interactions.
    -   **Three.js**: **Hero 3D Element**.
-   **Email/Marketing**: **Brevo** API.

## Required Sections & Detailed Strategy

### 1. Global Elements
-   **Navigation**: Glassmorphic, sticky. Links: Home, Services, Work, About, Contact.
-   **Footer**: Extensive. Includes "Newsletter Signup" (Brevo).

### 2. Home Page (The "Hook")
-   **Hero Section**:
    -   **Visual**: Interactive 3D Abstract Object.
    -   **Headline**: Animated reveal.
-   **Social Proof**:
    -   **Logos**: Aceternity "Infinite Moving Cards".
-   **Value Proposition**:
    -   **Visual**: High-end Bento Grid layout.

### 3. Services Page (The "Offer")
-   **Architecture**:
    -   **Service Cards**: Reusable components.
    -   **Core Services**: AI Chatbots, Web Dev, Digital Marketing, Graphic Design, SEO.
-   **Interaction**: Hover effects lift cards, border glow (Gold).

### 4. Work / Case Studies (The "Proof")
-   **Layout**: Masonry or Grid (Parallax Scroll).
-   **Content**: "Challenge", "Solution", "Results".

### 5. About Page (The "Vision")
-   **Story**: "Born to disrupt." The journey of NextLevel Marketerz.
-   **Team**: "The Visionaries". Clean headshots with hover social links.
-   **Values**: "Excellence, Integrity, Speed."

### 6. Contact Page (The "Conversion")
-   **Form**:
    -   **Fields**: Name, Email, Company, Budget Range (Dropdown), Message.
    -   **Tech**: **Brevo Integration** for instant email capture and auto-response.
    -   **Copy**: "Ready to Scale? Let's Talk."
-   **Visual**: Simple, elegant, distraction-free.
    -   **Fields**: Name, Email, Company, Service Interest (AI, Web, Marketing, etc.), Budget, Message.
    -   **Tech**: **Brevo Integration** for instant email capture.
    -   **UI**: Shadcn Form components.

## Reusable Components (Best Practices)
-   **`Button`**: Primary (Gold), Secondary (Outline), Ghost. All with `Framer Motion` tap/hover states.
-   **`Section`**: Wrapper with standard padding and container constraints.
-   **`Card`**: Base component for Services, Testimonials, Team. Glassmorphism support.
-   **`Input/Textarea`**: Custom styled form elements (transparent bg, bottom border).

## Deliverables
Please generate a detailed **`specifications.md`** file that includes:
1.  **File Structure**: Complete tree of `src/app`, `src/components`, `src/lib`.
2.  **Component Specifications**: Details for `Hero3D`, `BentoGrid`, `ServiceCard`.
3.  **Scroll Strategy**: Explicitly define how GSAP ScrollTrigger will be used.
4.  **Mobile Strategy**: How animations degrade gracefully.
5.  **UI Library Strategy**: Which specific Aceternity/Magic UI components to use.
6.  **Brevo Integration Plan**: API route setup.
7.  **Design System**: Exact colors (Hex), Fonts, and Shadow utilities.

**Tone of Output**: Visionary, sophisticated, and technically precise.

## Response snapshot

Successfully created feature specification for NextLevel Marketerz Agency Website:

**Feature**: 001-agency-website
**Branch**: 001-agency-website
**Spec File**: specs/001-agency-website/spec.md

**User Stories Created** (6 total, prioritized):
1. P1: Discover Agency & Value Proposition (Hero with 3D, animated headline, bento grid)
2. P2: Explore Services & Capabilities (5 service cards with hover effects)
3. P2: Review Case Studies & Social Proof (Masonry layout with parallax)
4. P3: Learn About Company Vision & Team (Story, team profiles, values)
5. P1: Contact & Convert (Form with Brevo integration)
6. P3: Newsletter Signup (Footer signup with Brevo)

**Functional Requirements**: 47 total covering:
- Navigation & Global Elements (5)
- Home Page (6)
- Services Page (5)
- Work/Case Studies (5)
- About Page (4)
- Contact Page (7)
- Newsletter Signup (3)
- Design & Animation (8)
- Performance & Accessibility (5)

**Success Criteria**: 10 measurable outcomes
**Edge Cases**: 8 identified
**Key Entities**: 5 defined
**Assumptions**: 8 documented
**Out of Scope**: 10 items explicitly excluded

## Outcome

- ✅ Impact: Complete, validated specification ready for planning phase
- 🧪 Tests: N/A (specification phase)
- 📁 Files: spec.md, checklists/requirements.md (quality validation)
- 🔁 Next prompts: /sp.plan to create implementation plan
- 🧠 Reflection: Spec passed all quality validations - no clarifications needed, all requirements testable, success criteria measurable and technology-agnostic

## Evaluation notes (flywheel)

- Failure modes observed: None - specification created successfully
- Graders run and results (PASS/FAIL): PASS - all checklist items passed
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Proceed to /sp.plan for architectural planning; monitor if any clarifications needed during implementation
