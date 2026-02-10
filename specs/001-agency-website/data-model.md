# Data Model: NextLevel Marketerz Agency Website

**Feature**: 001-agency-website
**Date**: 2026-02-10
**Status**: Final

This document defines the TypeScript interfaces and data structures used throughout the application.

---

## Overview

The site uses static content with no persistent database. All data is defined in `lib/constants.ts` and consumed via TypeScript interfaces. The only server-side data handling is the contact form submission to Brevo API.

---

## Core Entities

### Service

Represents a service offering displayed on the Services page and service detail pages.

```typescript
// src/types/index.ts
export interface Service {
  id: string;
  slug: string;              // URL-friendly identifier for routing
  title: string;
  icon: string;              // Lucide icon name or SVG path
  shortDescription: string;  // Displayed on card
  description: string;       // Full description for detail page
  features: string[];        // Bullet points of capabilities
  pricing?: PricingTier;     // Optional pricing information
  technologies: string[];    // Related technologies/tools
}

export interface PricingTier {
  name: string;              // e.g., "Starter", "Professional", "Enterprise"
  price: string;             // e.g., "$2,500", "Contact for pricing"
  deliverables: string[];    // What's included
}
```

**Data Source**: `lib/constants.ts` - Hardcoded array of 5 services
**Lifecycle**: Static (no create/update/delete)
**Validation**: Zod schema for type safety

```typescript
import { z } from 'zod';

export const serviceSchema = z.object({
  id: z.string(),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(1),
  icon: z.string(),
  shortDescription: z.string().min(10).max(200),
  description: z.string().min(50),
  features: z.array(z.string()).min(3),
  pricing: z.object({
    name: z.string(),
    price: z.string(),
    deliverables: z.array(z.string()),
  }).optional(),
  technologies: z.array(z.string()),
});
```

---

### CaseStudy

Represents a past project showcased on the Work page. All details are displayed directly on the card (no detail page).

```typescript
// src/types/index.ts
export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  thumbnail: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  challenge: string;         // "The Problem" section
  solution: string;          // "What We Did" section
  results: string;           // "The Outcome" section
  tags: CaseStudyTag[];      // Industry/service tags
  year?: number;             // Optional year of project
  featured?: boolean;        // Whether to highlight in layout
}

export type CaseStudyTag =
  | 'AI & Automation'
  | 'Web Development'
  | 'E-commerce'
  | 'Brand Identity'
  | 'Digital Marketing'
  | 'SEO';
```

**Data Source**: `lib/constants.ts` - Hardcoded array of case studies
**Lifecycle**: Static (no create/update/delete)
**Validation**: Zod schema for type safety

```typescript
export const caseStudySchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  client: z.string().min(1),
  thumbnail: z.object({
    src: z.string(),
    alt: z.string(),
    width: z.number().positive(),
    height: z.number().positive(),
  }),
  challenge: z.string().min(50),
  solution: z.string().min(50),
  results: z.string().min(50),
  tags: z.array(z.enum(['AI & Automation', 'Web Development', 'E-commerce', 'Brand Identity', 'Digital Marketing', 'SEO'])),
  year: z.number().int().min(2020).max(2030).optional(),
  featured: z.boolean().optional(),
});
```

---

### TeamMember

Represents a team member displayed on the About page.

```typescript
// src/types/index.ts
export interface TeamMember {
  id: string;
  name: string;
  role: string;              // Job title
  bio: string;               // Brief professional bio
  headshot: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  socialLinks: SocialLink[]; // Social media profiles
  order?: number;            // Display order on page
}

export interface SocialLink {
  platform: 'linkedin' | 'twitter' | 'github' | 'dribbble' | 'behance';
  url: string;
  icon: string;              // Lucide icon name
}
```

**Data Source**: `lib/constants.ts` - Hardcoded array of team members
**Lifecycle**: Static (no create/update/delete)
**Validation**: Zod schema for type safety

```typescript
export const teamMemberSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  role: z.string().min(1),
  bio: z.string().min(50).max(500),
  headshot: z.object({
    src: z.string(),
    alt: z.string(),
    width: z.number().positive(),
    height: z.number().positive(),
  }),
  socialLinks: z.array(z.object({
    platform: z.enum(['linkedin', 'twitter', 'github', 'dribbble', 'behance']),
    url: z.string().url(),
    icon: z.string(),
  })),
  order: z.number().int().optional(),
});
```

---

### ContactForm

Represents a contact form submission (sent to Brevo API, not stored locally).

```typescript
// src/types/index.ts
export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  serviceInterest: ServiceInterest;
  budgetRange: BudgetRange;
  message: string;
}

export type ServiceInterest =
  | 'ai-chatbots'
  | 'web-dev'
  | 'digital-marketing'
  | 'graphic-design'
  | 'seo';

export type BudgetRange =
  | '<5k'
  | '5k-10k'
  | '10k-25k'
  | '25k-50k'
  | '50k+';

export interface ContactFormResponse {
  success: boolean;
  message?: string;
  error?: string;
}
```

**Data Flow**: Client → API Route → Brevo API → Email sent
**Storage**: Not stored locally (handled by Brevo)
**Validation**: Zod schema with detailed error messages

```typescript
// src/lib/validation.ts
import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  email: z.string()
    .email('Invalid email address'),
  company: z.string()
    .max(200, 'Company name must be less than 200 characters')
    .optional(),
  serviceInterest: z.enum([
    'ai-chatbots',
    'web-dev',
    'digital-marketing',
    'graphic-design',
    'seo',
  ], { required_error: 'Please select a service' }),
  budgetRange: z.enum([
    '<5k',
    '5k-10k',
    '10k-25k',
    '25k-50k',
    '50k+',
  ], { required_error: 'Please select a budget range' }),
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message must be less than 2000 characters'),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
```

---

### NewsletterSubscription

Represents a newsletter signup (sent to Brevo API, not stored locally).

```typescript
// src/types/index.ts
export interface NewsletterFormData {
  email: string;
}

export interface NewsletterFormResponse {
  success: boolean;
  message?: string;
  error?: string;
}
```

**Data Flow**: Client → API Route → Brevo API → Added to contact list
**Storage**: Not stored locally (handled by Brevo)
**Validation**: Zod schema

```typescript
// src/lib/validation.ts
export const newsletterSchema = z.object({
  email: z.string()
    .email('Please enter a valid email address'),
});

export type NewsletterFormData = z.infer<typeof newsletterSchema>;
```

---

## Site Configuration Data

### Navigation Links

```typescript
// src/lib/constants.ts
export const NAVIGATION_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/work', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
] as const;

export type NavLink = typeof NAVIGATION_LINKS[number];
```

### Social Media Links (Footer)

```typescript
// src/lib/constants.ts
export const SOCIAL_LINKS = [
  { platform: 'twitter', url: 'https://twitter.com/nextlevelmarketerz', icon: 'twitter' },
  { platform: 'linkedin', url: 'https://linkedin.com/company/nextlevelmarketerz', icon: 'linkedin' },
  { platform: 'github', url: 'https://github.com/nextlevelmarketerz', icon: 'github' },
  { platform: 'dribbble', url: 'https://dribbble.com/nextlevelmarketerz', icon: 'dribbble' },
] as const;

export type SocialLink = typeof SOCIAL_LINKS[number];
```

### Footer Links

```typescript
// src/lib/constants.ts
export const FOOTER_LINKS = {
  company: [
    { href: '/about', label: 'About Us' },
    { href: '/work', label: 'Case Studies' },
    { href: '/contact', label: 'Contact' },
  ],
  services: [
    { href: '/services/ai-chatbots', label: 'AI Chatbots' },
    { href: '/services/web-development', label: 'Web Development' },
    { href: '/services/digital-marketing', label: 'Digital Marketing' },
    { href: '/services/graphic-design', label: 'Graphic Design' },
    { href: '/services/seo', label: 'SEO Services' },
  ],
  legal: [
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' },
  ],
} as const;
```

---

## Data Access Patterns

### Static Data Access

```typescript
// src/lib/constants.ts
export const SERVICES: Service[] = [
  {
    id: '1',
    slug: 'ai-chatbots',
    title: 'AI Chatbots',
    icon: 'bot',
    shortDescription: 'Custom AI-powered chatbots for customer engagement',
    description: 'Full-featured AI chatbot development...',
    features: ['NLP Integration', 'Multi-language Support', 'Analytics Dashboard'],
    technologies: ['OpenAI', 'LangChain', 'Vector DBs'],
  },
  // ... 4 more services
];

// Usage in components
import { SERVICES } from '@/lib/constants';

export function ServicesGrid() {
  return (
    <div>
      {SERVICES.map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </div>
  );
}
```

### Dynamic Route Data Access

```typescript
// src/app/services/[slug]/page.tsx
import { SERVICES } from '@/lib/constants';
import { notFound } from 'next/navigation';

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = SERVICES.find(s => s.slug === params.slug);

  if (!service) {
    notFound();
  }

  return <ServiceDetail service={service} />;
}

// Generate static paths
export function generateStaticParams() {
  return SERVICES.map((service) => ({
    slug: service.slug,
  }));
}
```

---

## Type Exports

All types are exported from `src/types/index.ts` for consistent imports:

```typescript
// src/types/index.ts
export * from './service';
export * from './case-study';
export * from './team-member';
export * from './contact-form';
export * from './newsletter';
```

---

## Validation Summary

| Entity | Validation | Error Handling |
|--------|------------|----------------|
| Service | Zod schema (constants.ts) | Development-time only |
| CaseStudy | Zod schema (constants.ts) | Development-time only |
| TeamMember | Zod schema (constants.ts) | Development-time only |
| ContactForm | Zod schema + runtime validation | User-facing error messages |
| Newsletter | Zod schema + runtime validation | User-facing error messages |

---

**Last Updated**: 2026-02-10
**Next Review**: After implementation phase
