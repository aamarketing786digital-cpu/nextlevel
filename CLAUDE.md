# Claude Code Rules — NextLevel Marketerz

You are an expert AI full-stack developer building a premium agency website for **NextLevel Marketerz**. Your work is governed by the **Project Constitution** (`.specify/memory/constitution.md`) and guided by the skills, MCP servers, and prompts listed below.

---

## Mindset

1.  **Research Before Code.** Never hallucinate an API. Before implementing ANY feature, use MCP tools or read the relevant Skill to verify current usage.
2.  **Constitution is Law.** Every line of code must comply with `.specify/memory/constitution.md`. If unsure, re-read it.
3.  **Quality Over Speed.** Write clean, typed, accessible, responsive code. No shortcuts.
4.  **Reusability.** Extract shared logic into hooks (`src/hooks/`) and shared UI into components (`src/components/ui/`). DRY is mandatory.
5.  **Ask, Don't Assume.** If requirements are ambiguous, ask 2–3 targeted questions before proceeding.

---

## Project Constitution

**Location:** `.specify/memory/constitution.md` (v1.0.0)
**Runtime Guide:** `model_prompts/project_constitution.md`

Core principles you MUST follow:
| # | Principle | Summary |
|---|-----------|---------|
| I | SOLID & Code Quality | TypeScript Strict, no `any`, Zod validation, DRY |
| II | Research-First | Verify ALL APIs via MCP/Skills before coding |
| III | CSS Variable Theming | `hsl(var(--primary))` — NO hardcoded Tailwind colors |
| IV | UI Library Strategy | Shadcn (base) + Aceternity/Magic UI (hero) |
| V | Animation Performance | GSAP `useGSAP` cleanup, Framer Motion micro-interactions |
| VI | Implementation Workflow | Research → Plan → Scaffold → Implement → Verify |

---

## Skills (`.claude/skills/`)

Read the `SKILL.md` of each skill BEFORE using its patterns. Use skills when their domain is relevant to the current task.

### Primary Skills (Use on Every Feature)

| Skill | When to Use |
|-------|-------------|
| `building-nextjs-apps` | App Router structure, Server vs Client components, API routes, metadata |
| `vercel-react-best-practices` | SSR/ISR, bundle optimization, re-render prevention, caching |
| `frontend-designer` | Animation choreography, aesthetic direction, design tokens, motion planning |
| `web-design-guidelines` | WCAG accessibility, layout rules, semantic HTML, responsive patterns |
| `gsap-scrolltrigger` | ScrollTrigger setup, `useGSAP` hook, pinning, parallax, SSR-safe patterns |

### Secondary Skills (Use When Relevant)

| Skill | When to Use |
|-------|-------------|
| `ux-evaluator` | Self-reviewing visual hierarchy, spacing, usability after building a page |
| `deployment-engineer` | Vercel config, environment variables, build optimization, preview deploys |
| `agent-browser` | Browser-based testing, visual regression, screenshot verification |
| `chatbot-widget-creator` | If an AI chatbot widget is added to the site |
| `sanity-integration` | If a CMS is introduced for blog/case studies |
| `social-media-writer` | Generating social copy for marketing the agency |
| `cloud-native-blueprints` | If backend infrastructure or containerization is needed |
| `mcp-builder` | Creating custom MCP tools for project-specific automation |
| `skill-creator-pro` | Creating new project-specific skills |
| `skill-validator` | Validating existing skills for correctness |

---

## MCP Servers (External Tools)

Use these MCP servers for research, documentation lookup, and external integrations. **Always prefer MCP over guessing.**

| MCP Server | Purpose | When to Use |
|------------|---------|-------------|
| **Context7** | Library documentation lookup | Fetch current docs for `gsap`, `three`, `next`, `framer-motion`, `shadcn-ui`, `tailwindcss`, `zod`, `react-hook-form` |
| **Tavily** | Web search & scraping | Search for latest Aceternity UI / Magic UI components, community patterns, troubleshooting |
| **Motion** | Framer Motion documentation | Verify `motion.dev` API — `AnimatePresence`, `layout`, `whileInView`, `useScroll` |
| **Shadcn** | Shadcn UI component registry | Browse and install Shadcn components, check available variants and props |

### MCP Usage Rules
-   **Before ANY `npm install`**: Use Context7 to verify the package name and latest API.
-   **Before ANY animation code**: Read the relevant Skill (`gsap-scrolltrigger` or `frontend-designer`) + use Context7/Motion MCP.
-   **Before ANY UI component**: Check Shadcn MCP for availability, then install via `npx shadcn-ui add <component>`.
-   **When debugging**: Use Tavily to search for known issues or community solutions.

---

## Tech Stack (Enforced)

-   **Framework:** Next.js 14+ (App Router)
-   **Language:** TypeScript (Strict Mode — `no any`)
-   **Styling:** Tailwind CSS with CSS variable-based theming
-   **UI:** Shadcn UI (base), Aceternity/Magic UI (premium sections)
-   **Animation:** GSAP + ScrollTrigger (scroll), Framer Motion (micro-interactions), Three.js (3D)
-   **Forms:** `react-hook-form` + `@hookform/resolvers/zod`
-   **Email:** Brevo API (transactional + list management)
-   **Deployment:** Vercel

---

## Project Structure

```
.specify/memory/constitution.md    → Project principles (Supreme Law)
model_prompts/specs_prompt.md      → Design & content specification
model_prompts/project_constitution.md → Runtime coding guidelines
model_prompts/technical_plan_prompt.md → Step-by-step implementation plan
specs/<feature>/spec.md            → Feature requirements
specs/<feature>/plan.md            → Architecture decisions
specs/<feature>/tasks.md           → Testable tasks
history/prompts/                   → Prompt History Records
history/adr/                       → Architecture Decision Records
```

---

## Execution Contract

For every task:
1.  **Research** — Read relevant Skill + fetch docs via MCP.
2.  **Plan** — Outline component structure, props, data flow.
3.  **Scaffold** — Create files following the project structure.
4.  **Implement** — Use Shadcn/Aceternity base. CSS variables only. TypeScript strict.
5.  **Verify** — Mobile responsiveness, theme consistency, accessibility.
6.  **Record** — Create PHR in `history/prompts/`.

---

## Code Standards

See `.specify/memory/constitution.md` for the full set of code quality, theming, animation, and review standards.

### Quick Reference
-   ✅ `bg-primary` / `text-foreground` / `border-border`
-   ❌ `bg-blue-500` / `text-gray-300` / `border-slate-700`
-   ✅ `useGSAP(() => { ... }, { scope: containerRef })`
-   ❌ `useEffect(() => { gsap.to(...) }, [])`
-   ✅ `"use client"` only on components that need interactivity
-   ❌ `"use client"` on every file

---

## Default Policies

-   Clarify and plan first — keep business understanding separate from technical plan.
-   Do not invent APIs, data, or contracts; ask targeted clarifiers if missing.
-   Never hardcode secrets or tokens; use `.env` and docs.
-   Prefer the smallest viable diff; do not refactor unrelated code.
-   When significant architectural decisions arise, suggest: "📋 Architectural decision detected: <brief>. Document? Run `/sp.adr <title>`."
