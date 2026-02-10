# Developer Quickstart: NextLevel Marketerz Agency Website

**Feature**: 001-agency-website
**Date**: 2026-02-10
**Branch**: `001-agency-website`

This guide will help you set up the development environment and start contributing to the NextLevel Marketerz agency website.

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 20.x or later ([Download](https://nodejs.org/))
- **npm** 10.x or later (comes with Node.js)
- **Git** ([Download](https://git-scm.com/))
- **Visual Studio Code** or your preferred code editor
- **Brevo API Key** (request from project lead)

---

## Initial Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Agency
git checkout 001-agency-website
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required dependencies including:
- Next.js 15+
- React 19+
- TypeScript 5+
- GSAP 3.13+ with @gsap/react
- Framer Motion 12+
- Three.js with React Three Fiber
- Shadcn UI components
- Zod for validation

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Then add your Brevo credentials:

```env
BREVO_API_KEY=your_brevo_api_key_here
BREVO_CONTACT_LIST_ID=your_list_id_here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

> **Note**: Never commit `.env.local` to version control. It's already in `.gitignore`.

---

## Development Workflow

### Start the Development Server

```bash
npm run dev
```

The site will be available at [http://localhost:3000](http://localhost:3000).

### Build for Production

```bash
npm run build
npm start
```

### Type Checking

```bash
npm run type-check
```

### Linting

```bash
npm run lint
```

---

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   ├── services/           # Services pages
│   ├── work/               # Case studies page
│   ├── about/              # About page
│   ├── contact/            # Contact page
│   └── api/                # API routes
│       └── contact/         # Brevo integration
├── components/             # React components
│   ├── ui/                 # Shadcn UI base components
│   ├── aceternity/         # Aceternity adapted components
│   ├── sections/           # Page sections
│   ├── layout/             # Layout components
│   └── 3d/                 # Three.js components
├── hooks/                  # Custom React hooks
├── lib/                    # Utilities and constants
└── types/                  # TypeScript interfaces
```

---

## Coding Standards

### TypeScript Configuration

- **Strict mode enabled**: No `any` types allowed
- **Unused locals/params**: Error on unused variables
- Use Zod for runtime validation

### CSS Variables (Constitution Principle III)

**DO** ✅:
```tsx
className="bg-primary text-primary-foreground"
```

**DON'T** ❌:
```tsx
className="bg-blue-500 text-white"
```

All colors must use semantic variables defined in `src/app/globals.css`.

### Component Guidelines

1. **Use Client Components** (`'use client'`) for:
   - GSAP/ScrollTrigger animations
   - Framer Motion animations
   - Three.js scenes
   - Form inputs and handlers

2. **Use Server Components** (default) for:
   - Static content
   - Data fetching
   - SEO metadata

3. **Follow SOLID Principles**:
   - Single Responsibility: One component, one job
   - Extract reusable logic to hooks
   - Keep components focused and testable

### Animation Performance

- **GSAP ScrollTrigger**: Always use `useGSAP` hook for cleanup
- **Framer Motion**: Use for micro-interactions (hover, tap, modal)
- **Mobile Fallback**: Use `ScrollTrigger.matchMedia()` for responsive animations

```typescript
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

useGSAP(() => {
  const mm = gsap.matchMedia();

  mm.add('(min-width: 768px)', () => {
    // Desktop: Full animation
    gsap.to(element, { scrollTrigger: { pin: true }, x: 500 });
  });

  mm.add('(max-width: 767px)', () => {
    // Mobile: Simplified
    gsap.to(element, { opacity: 1 });
  });

  return () => mm.revert();
}, { scope: container });
```

---

## Adding New Features

### 1. Add a New Service

Edit `src/lib/constants.ts`:

```typescript
export const SERVICES: Service[] = [
  // ... existing services
  {
    id: '6',
    slug: 'new-service',
    title: 'New Service',
    icon: 'sparkles',
    shortDescription: 'Brief description',
    description: 'Full description',
    features: ['Feature 1', 'Feature 2'],
    technologies: ['Tech 1', 'Tech 2'],
  },
];
```

The service detail page will be automatically created at `/services/new-service`.

### 2. Add a New Case Study

Edit `src/lib/constants.ts`:

```typescript
export const CASE_STUDIES: CaseStudy[] = [
  // ... existing case studies
  {
    id: '6',
    title: 'Project Name',
    client: 'Client Name',
    thumbnail: { src: '/images/project.jpg', alt: '...', width: 800, height: 600 },
    challenge: 'The problem we solved',
    solution: 'How we solved it',
    results: 'The outcome',
    tags: ['Web Development', 'E-commerce'],
    year: 2025,
    featured: true,
  },
];
```

### 3. Add a New Shadcn UI Component

**IMPORTANT**: Per Constitution Principle II (Research-First), you MUST use the shadcn MCP tool to add components. MCP tools are NOT optional—they are the mandated approach.

**Step 1**: Use the shadcn MCP tool (`mcp__shadcn`) to:
1. Search for the component you need
2. Get the proper add command for the component
3. Install the component using the MCP-provided command

**Step 2**: If MCP tool is unavailable, use CLI as fallback:

```bash
# First try with @latest
npx shadcn@latest add <component-name>

# Fallback without @latest if above fails
npx shadcn add <component-name>
```

Example:
```bash
npx shadcn@latest add dialog
```

### 4. Add an Aceternity Component

1. Copy the component code from [ui.aceternity.com](https://ui.aceternity.com)
2. Save to `src/components/aceternity/<component-name>.tsx`
3. **IMPORTANT**: Replace hardcoded colors with CSS variables:
   - `bg-blue-500` → `bg-primary`
   - `text-white` → `text-primary-foreground`
   - `border-blue-600` → `border-primary/20`

---

## Testing

### Run E2E Tests

```bash
npm run test:e2e
```

### Run Tests in UI Mode

```bash
npx playwright test --ui
```

### Test Coverage

- Test contact form submission (with mock Brevo API)
- Test mobile responsiveness
- Test navigation
- Test animations (with reduced motion)

---

## Common Tasks

### Update Site Content

**Services**: Edit `src/lib/constants.ts` → `SERVICES`
**Case Studies**: Edit `src/lib/constants.ts` → `CASE_STUDIES`
**Team Members**: Edit `src/lib/constants.ts` → `TEAM_MEMBERS`
**Navigation**: Edit `src/lib/constants.ts` → `NAVIGATION_LINKS`

### Update Colors/Theme

Edit `src/app/globals.css` CSS variables:
```css
:root {
  --primary: 43 74% 49%;           /* Gold */
  --secondary: 217 91% 60%;        /* Electric Blue */
  /* ... */
}
```

All components using these variables will update automatically.

### Add Google Fonts

Edit `src/app/layout.tsx`:

```typescript
import { Syne, Outfit } from 'next/font/google';

const syne = Syne({ subsets: ['latin'], variable: '--font-display' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-body' });

export default function RootLayout({ children }) {
  return (
    <html className={`${syne.variable} ${outfit.variable}`}>
      {children}
    </html>
  );
}
```

---

## Troubleshooting

### GSAP ScrollTrigger Not Working

1. Ensure `'use client'` directive is present
2. Ensure `useGSAP` hook is used (not `useLayoutEffect`)
3. Check that `ScrollTrigger` is registered: `gsap.registerPlugin(ScrollTrigger)`
4. Refresh ScrollTrigger after route changes: `ScrollTrigger.refresh()`

### Three.js Scene Not Rendering

1. Check that `Canvas` is wrapped in `Suspense`
2. Ensure dynamic import: `const HeroScene = dynamic(() => import(...), { ssr: false })`
3. Verify mobile fallback is working (3D disabled on mobile)

### Brevo API Failing

1. Check `.env.local` has valid API key
2. Verify Brevo account has email sending enabled
3. Check Vercel environment variables if deployed
4. Review Brevo API dashboard for rate limits

### Build Errors

```bash
# Clear Next.js cache
rm -rf .next

# Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Rebuild
npm run build
```

---

## Deployment

### Deploy to Vercel (Preview)

```bash
git push origin 001-agency-website
```

Vercel will automatically create a preview deployment.

### Deploy to Production

1. Merge PR to `main` branch
2. Vercel will automatically deploy to production
3. Set environment variables in Vercel dashboard:
   - `BREVO_API_KEY`
   - `BREVO_CONTACT_LIST_ID`
   - `NEXT_PUBLIC_SITE_URL`

### Environment Variables Checklist

Before deploying, ensure these are set in Vercel:

- [ ] `BREVO_API_KEY`
- [ ] `BREVO_CONTACT_LIST_ID`
- [ ] `NEXT_PUBLIC_SITE_URL`

---

## Resources

- **Constitution**: `.specify/memory/constitution.md`
- **Spec**: `specs/001-agency-website/spec.md`
- **Plan**: `specs/001-agency-website/plan.md`
- **Research**: `specs/001-agency-website/research.md`
- **Data Model**: `specs/001-agency-website/data-model.md`
- **API Contract**: `specs/001-agency-website/contracts/contact-api.ts`

---

## Getting Help

1. Check the Constitution for coding standards
2. Review the Spec and Plan for feature details
3. Check the Research docs for library-specific patterns
4. Contact the project lead for clarification

**Happy Coding!** 🚀
