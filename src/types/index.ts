// Service Types
export interface Service {
  id: string;
  slug: string;
  title: string;
  icon: string;
  shortDescription: string;
  description: string;
  features: string[];
  pricing?: PricingTier;
  technologies: string[];
}

export interface PricingTier {
  name: string;
  price: string;
  deliverables: string[];
}

// Case Study Types
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
  challenge: string;
  solution: string;
  results: string;
  tags: CaseStudyTag[];
  year?: number;
  featured?: boolean;
}

export type CaseStudyTag =
  | "AI & Automation"
  | "Web Development"
  | "E-commerce"
  | "Brand Identity"
  | "Digital Marketing"
  | "SEO";

// Team Member Types
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  headshot: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  socialLinks: SocialLink[];
  order?: number;
}

export interface SocialLink {
  platform: "linkedin" | "twitter" | "github" | "dribbble" | "behance";
  url: string;
  icon: string;
}

// Contact Form Types
export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  serviceInterest: ServiceInterest;
  budgetRange: BudgetRange;
  message: string;
}

export interface ContactFormResponse {
  success: boolean;
  message?: string;
  error?: string;
  fields?: Record<string, string>;
}

export type ServiceInterest =
  | "ai-chatbots"
  | "web-dev"
  | "digital-marketing"
  | "graphic-design"
  | "seo";

export type BudgetRange = "<5k" | "5k-10k" | "10k-25k" | "25k-50k" | "50k+";

// Newsletter Types
export interface NewsletterFormData {
  email: string;
}

export interface NewsletterFormResponse {
  success: boolean;
  message?: string;
  error?: string;
  field?: string;
  code?: "ALREADY_SUBSCRIBED";
}

// Navigation & Site Config Types
export interface NavLink {
  href: string;
  label: string;
}

export interface FooterLinkGroup {
  title: string;
  links: NavLink[];
}

// Client Logo Type
export interface ClientLogo {
  name: string;
  src: string;
  alt: string;
  href: string;
}

// Testimonial Types
export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  image?: string;
}
