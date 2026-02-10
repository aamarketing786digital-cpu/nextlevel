import { z } from "zod";

// Contact Form Schema
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  email: z.string().email("Invalid email address"),
  company: z
    .string()
    .max(200, "Company name must be less than 200 characters")
    .optional(),
  serviceInterest: z.enum([
    "ai-chatbots",
    "web-dev",
    "digital-marketing",
    "graphic-design",
    "seo",
  ]),
  budgetRange: z.enum(["<5k", "5k-10k", "10k-25k", "25k-50k", "50k+"]),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must be less than 2000 characters"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// Newsletter Schema
export const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export type NewsletterFormData = z.infer<typeof newsletterSchema>;

// Service Schema (for development-time validation)
export const serviceSchema = z.object({
  id: z.string(),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(1),
  icon: z.string(),
  shortDescription: z.string().min(10).max(200),
  description: z.string().min(50),
  features: z.array(z.string()).min(3),
  pricing: z
    .object({
      name: z.string(),
      price: z.string(),
      deliverables: z.array(z.string()),
    })
    .optional(),
  technologies: z.array(z.string()),
});

// Case Study Schema (for development-time validation)
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
  tags: z.array(
    z.enum(["AI & Automation", "Web Development", "E-commerce", "Brand Identity", "Digital Marketing", "SEO"]),
  ),
  year: z.number().int().min(2020).max(2030).optional(),
  featured: z.boolean().optional(),
});

// Team Member Schema (for development-time validation)
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
  socialLinks: z.array(
    z.object({
      platform: z.enum(["linkedin", "twitter", "github", "dribbble", "behance"]),
      url: z.string().url(),
      icon: z.string(),
    }),
  ),
  order: z.number().int().optional(),
});
