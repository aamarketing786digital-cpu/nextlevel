# Project Constitution: NextLevel Marketerz

This document serves as the **Supreme Law** for all coding, design, and implementation tasks on the "NextLevel Marketerz" project. All AI agents and developers must adhere to these rules without exception.

## 1. Core Philosophy & Code Quality
-   **SOLID Principles**: Every component and function must adhere to Single Responsibility, Open/Closed, etc.
-   **DRY (Don't Repeat Yourself)**: Extract reusable logic into hooks (`src/hooks`) and UI patterns into components (`src/components/ui`).
-   **Type Safety**: `TypeScript` Strict Mode is non-negotiable. No `any`. Zod for validation.
-   **Functional Purity**: Prefer pure functions. Isolate side effects in `useEffect` or event handlers.

## 2. Research & Knowledge Retrieval (MANDATORY)
**Before writing ANY code**, you must verify the latest API usage to prevent hallucinations.
-   **Use MCP Tools (MANDATORY)**: Context7, Tavily, shadcn MCP, motion MCP as PRIMARY methods to fetch documentation.
-   **Libraries**: `gsap`, `framer-motion` (use motion MCP), `three`, `aceternity-ui`, `shadcn-ui` (use shadcn MCP).
-   **Reference Skills**:
    1.  `@.claude/skills/building-nextjs-apps`: For App Router structure, Server Components, and API routes.
    2.  `@.claude/skills/vercel-react-best-practices`: For SSR/ISR/Performance optimization.
    3.  `@.claude/skills/web-design-guidelines`: For WCAG Accessibility and Layout best practices.
    4.  `@.claude/skills/frontend-designer`: For Motion Choreography and aesthetic direction.
    5.  `@.claude/skills/gsap-scrolltrigger`: For implementing complex scroll animations.
    6.  `@.claude/skills/ux-evaluator`: For self-reviewing design hierarchy and usability.
    7.  `@.claude/skills/deployment-engineer`: For Vercel build configuration and environment setup.

## 3. Styling & Theming System
-   **CSS Variables**: All colors must be defined in `src/app/globals.css` as HSL/RGB variables.
    -   **Bad**: `bg-blue-500`
    -   **Good**: `bg-primary` (where `--primary` is defined in CSS).
-   **Tailwind Config**: Extend the theme in `tailwind.config.ts` using these variables.
    -   `colors: { primary: "hsl(var(--primary))", ... }`
-   **Theme Switching**: Changing the CSS variable values must instantly update the entire application theme.

## 4. UI Library Strategy (Reusable Components)
-   **Shadcn UI**: Use for ALL base interactive elements (Buttons, Inputs, Dialogs, Sheets, Forms).
    -   **MUST use shadcn MCP tool** (mcp__shadcn) to install components.
    -   First try: `npx shadcn@latest add <component>`, then fallback: `npx shadcn add <component>`.
-   **Aceternity / Magic UI**: Use for "Hero" sections and high-impact visuals (Bento Grids, Moving Borders).
    -   Copy the code into `src/components/aceternity/...`.
    -   **Modify to use Tailwind Variables**: Ensure downloaded components use OUR theme variables, not hardcoded colors.

## 5. Animation & Interaction
-   **GSAP ScrollTrigger**: For all scroll-driven layout shifts (Pinning, Horizontal Scroll, Parallax).
    -   MUST use `useGSAP` hook for cleanup.
-   **Framer Motion**: For all micro-interactions (Hover, Tap, Modal Enter/Exit).
-   **Performance**: Use `will-change` sparingly. Prefer `transform` and `opacity` animations.

## 6. Implementation Workflow
1.  **Research**: Fetch docs for the specific task using the listed Skills and Tools.
2.  **Plan**: Outline the component structure and props.
3.  **Scaffold**: Create the file structure.
4.  **Implement**: Write the code using Shadcn/Aceternity base.
5.  **Verify**: Check mobile responsiveness and theme consistency.

**Violation of this constitution will result in a refactor request.**
