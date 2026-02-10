<!--
Sync Impact Report:
===================
Version change: 1.0.0 → 1.1.0
Modified principles: Principle II (Research-First) and Principle IV (UI Library Strategy)
Added sections:
  - MCP tool usage requirement in Research-First principle
  - Shadcn MCP tool requirement in UI Library Strategy

Templates requiring updates:
  - .specify/templates/plan-template.md: Constitution Check section aligns with principles
  - .specify/templates/spec-template.md: Functional requirements support stack constraints
  - .specify/templates/tasks-template.md: Task organization reflects research-first principle

Follow-up TODOs: None
-->

# NextLevel Marketerz Constitution

## Core Principles

### I. SOLID & Code Quality
Every component and function MUST adhere to SOLID principles (Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion). Extract reusable logic into hooks (`src/hooks`) and UI patterns into components (`src/components/ui`). NO code duplication (DRY). TypeScript Strict Mode is non-negotiable—no `any` types, use Zod for runtime validation. Prefer pure functions; isolate side effects in `useEffect` or event handlers only.

### II. Research-First Development (MANDATORY)
Before writing ANY code, you MUST verify the latest API usage to prevent hallucinations. Use MCP tools (Context7, Tavily, shadcn MCP, motion MCP) as PRIMARY method to fetch current documentation for libraries like `gsap`, `framer-motion`, `three`, `aceternity-ui`, `shadcn-ui`. For Framer Motion specifically, use the motion MCP tool to fetch latest patterns from motion.dev. MCP tools are NOT optional—they are the mandated approach for research and documentation retrieval. This principle is enforced to prevent wasted time on outdated APIs.

### III. CSS Variable-Based Theming
All colors MUST be defined in `src/app/globals.css` as HSL or RGB variables with semantic names (e.g., `--primary`, `--secondary`, `--accent`). Tailwind config MUST extend the theme using these variables. Hardcoded colors like `bg-blue-500` are PROHIBITED. Theme switching MUST work by changing CSS variable values only. This enables instant theme updates across the entire application.

### IV. UI Library Strategy
Shadcn UI MUST be used for ALL base interactive elements (Buttons, Inputs, Dialogs, Sheets, Forms). You MUST use the shadcn MCP tool (mcp__shadcn) to install components—this is NOT optional. First try `npx shadcn@latest add <component>`, then fallback to `npx shadcn add <component>` if needed. Aceternity UI or Magic UI MAY be used for "Hero" sections and high-impact visuals (Bento Grids, Moving Borders). Downloaded components MUST be modified to use the project's CSS theme variables, not hardcoded colors. This ensures visual consistency and maintainability.

### V. Animation Performance & Cleanup
GSAP ScrollTrigger MUST be used for all scroll-driven layout shifts (Pinning, Horizontal Scroll, Parallax). The `useGSAP` hook MUST be used for proper cleanup. Framer Motion MUST be used for micro-interactions (Hover, Tap, Modal Enter/Exit). Prefer `transform` and `opacity` animations for performance. Use `will-change` sparingly. All animations MUST gracefully degrade on mobile devices.

### VI. Implementation Workflow
All features MUST follow this sequence: (1) Research using skills and documentation tools, (2) Plan component structure and props, (3) Scaffold file structure, (4) Implement using Shadcn/Aceternity base patterns, (5) Verify mobile responsiveness and theme consistency. Skipping research or planning results in refactor requests.

## Technology Stack Requirements

### Mandatory Technologies
- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript Strict Mode (no exceptions)
- **Styling**: Tailwind CSS with CSS variable-based theming
- **UI Components**: Shadcn UI (base), Aceternity/Magic UI (hero sections)
- **Animation**: GSAP + ScrollTrigger (scroll), Framer Motion (micro-interactions), Three.js (3D elements)
- **Email/Marketing**: Brevo API integration

### Performance Standards
- Mobile animations MUST be optimized or replaced with lightweight alternatives
- Scroll animations use `scrub` for smooth, reversible behavior
- Three.js elements MUST have proper cleanup and memory management
- All images MUST be optimized (Next.js Image component)

## Development Workflow

### Feature Development
1. **Research Phase**: Fetch latest docs using skills (`@.claude/skills/building-nextjs-apps`, `@.claude/skills/vercel-react-best-practices`, `@.claude/skills/web-design-guidelines`, `@.claude/skills/frontend-designer`, `@.claude/skills/gsap-scrolltrigger`)
2. **Planning Phase**: Outline component structure, props, and data flow
3. **Scaffold Phase**: Create file structure following conventions
4. **Implementation Phase**: Write code using established patterns
5. **Verification Phase**: Test mobile responsiveness and theme consistency

### Code Review Standards
- All PRs MUST verify compliance with these principles
- TypeScript strict mode violations are blocking
- Hardcoded colors result in automatic rejection
- Missing cleanup (especially GSAP/Three.js) results in rejection
- Mobile responsiveness is non-negotiable

## Governance

This Constitution supersedes all other development practices and guidelines. Amendments require:

1. Documentation of the proposed change
2. Approval from project lead
3. Migration plan for existing code
4. Version update following semantic versioning

### Versioning Policy
- **MAJOR**: Backward-incompatible governance changes, principle removals, or redefinitions
- **MINOR**: New principle or section added, materially expanded guidance
- **PATCH**: Clarifications, wording improvements, typo fixes

### Compliance Review
- All code reviews MUST check compliance with these principles
- Complexity MUST be justified against the simplicity principle
- For runtime development guidance, refer to `model_prompts/project_constitution.md`

**Version**: 1.1.0 | **Ratified**: 2026-02-10 | **Last Amended**: 2026-02-10
