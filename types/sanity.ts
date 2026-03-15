/**
 * TypeScript types for Sanity CMS documents
 */

// ===========================================
// Base Types
// ===========================================

export interface SanityDocument {
  _id: string
  _type: string
  _createdAt: string
  _updatedAt: string
  _rev?: string
}

export interface SanityImage {
  _type: "image"
  asset: {
    _ref: string
    _type: "reference"
  }
  alt?: string
  caption?: string
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
  crop?: {
    top: number
    bottom: number
    left: number
    right: number
  }
}

export interface SanitySlug {
  _type: "slug"
  current: string
}

// ===========================================
// Portable Text Types
// ===========================================

export interface PortableTextBlock {
  _type: "block"
  _key?: string
  style: "normal" | "h1" | "h2" | "h3" | "h4" | "blockquote"
  list?: "bullet" | "number"
  level?: number
  children: PortableTextSpan[]
  markDefs?: MarkDefinition[]
}

export interface PortableTextSpan {
  _type: "span"
  _key?: string
  text: string
  marks?: string[]
}

export interface MarkDefinition {
  _type: "link" | "internalLink"
  _key: string
  href?: string
  blank?: boolean
  reference?: {
    _ref: string
    _type: "reference"
  }
}

export interface PortableTextImage {
  _type: "image"
  _key?: string
  asset: {
    _ref: string
  }
  alt: string
  caption?: string
}

export type PortableTextBlockContent = PortableTextBlock | PortableTextImage

// ===========================================
// SEO Type
// ===========================================

export interface SanitySEO {
  seoTitle?: string
  seoDescription?: string
  ogImage?: SanityImage
  noIndex?: boolean
  keywords?: string[]
}

// ===========================================
// Author Type
// ===========================================

export interface SanityAuthor extends SanityDocument {
  _type: "author"
  name: string
  slug: SanitySlug
  role?: string
  bio?: string
  image?: SanityImage
  email?: string
  social?: {
    linkedin?: string
    twitter?: string
    website?: string
  }
}

// ===========================================
// Category Type
// ===========================================

export interface SanityCategory extends SanityDocument {
  _type: "category"
  title: string
  slug: SanitySlug
  description?: string
  color?: string
  icon?: string
  categoryType: "blog" | "caseStudy" | "video" | "all"
  seo?: SanitySEO
}

// ===========================================
// Post (Blog) Type
// ===========================================

export interface SanityPost extends SanityDocument {
  _type: "post"
  title: string
  slug: SanitySlug
  summary: string
  mainImage?: SanityImage
  content: PortableTextBlockContent[]
  categories: SanityCategory[]
  tags?: string[]
  publishedAt: string
  status: "draft" | "published"
  featured?: boolean
  featuredOrder?: number
  readTime?: number
  seo?: SanitySEO
  faqs?: Array<{
    question: string
    answer: string
  }>
}

// ===========================================
// Case Study Type
// ===========================================

export interface SanityCaseStudy extends SanityDocument {
  _type: "caseStudy"
  title: string
  slug: SanitySlug
  tagline: string
  description: string
  image?: SanityImage
  challenge?: PortableTextBlockContent[]
  solution?: PortableTextBlockContent[]
  gallery?: SanityImage[]
  url?: string
  buttonText?: string
  featured?: boolean
  order?: number
}

// ===========================================
// Testimonial Type
// ===========================================

export interface SanityTestimonial extends SanityDocument {
  _type: "testimonial"
  name: string
  role?: string
  company: string
  avatar?: SanityImage
  rating: number
  quote: string
  project?: {
    _ref: string
    _type: "reference"
  }
  service?: string
  featured?: boolean
  order?: number
  videoUrl?: string
  publishedAt: string
}

// ===========================================
// Video Type
// ===========================================

export interface SanityVideo extends SanityDocument {
  _type: "video"
  title: string
  slug: SanitySlug
  youtubeUrl: string
  videoId?: string
  customThumbnail?: SanityImage
  description: string
  duration?: string
  categories: SanityCategory[]
  tags?: string[]
  videoType: "tutorial" | "caseStudy" | "testimonial" | "tips" | "insight" | "demo" | "webinar" | "other"
  featured?: boolean
  featuredOrder?: number
  relatedBlog?: {
    _ref: string
    _type: "reference"
  }
  relatedCaseStudy?: {
    _ref: string
    _type: "reference"
  }
  seo?: SanitySEO
  publishedAt: string
}

// ===========================================
// Reference Types (for dereferenced queries)
// ===========================================

export type SanityPostWithAuthor = Omit<SanityPost, "categories"> & {
  categories: Pick<SanityCategory, "title" | "slug" | "color" | "icon">[]
}

export type SanityPostMinimal = Pick<
  SanityPost,
  "_id" | "title" | "slug" | "summary" | "mainImage" | "publishedAt" | "featured" | "readTime"
> & {
  categories: Pick<SanityCategory, "title" | "slug" | "color">[]
}

export type SanityCaseStudyMinimal = Pick<
  SanityCaseStudy,
  "_id" | "title" | "slug" | "tagline" | "featured" | "order"
> & {
  image?: SanityImage
}

export type SanityVideoMinimal = Pick<
  SanityVideo,
  "_id" | "title" | "slug" | "youtubeUrl" | "videoId" | "description" | "duration" | "featured" | "publishedAt"
> & {
  categories: Pick<SanityCategory, "title" | "slug" | "color">[]
}

// ===========================================
// GROQ Query Result Types
// ===========================================

export interface BlogIndexData {
  posts: SanityPostMinimal[]
  featuredPosts: SanityPostMinimal[]
  categories: (Pick<SanityCategory, "title" | "slug" | "color" | "icon" | "categoryType">)[]
}

export interface PostPageData {
  post: SanityPostWithAuthor
  relatedPosts?: SanityPostMinimal[]
}

export interface CaseStudyIndexData {
  caseStudies: SanityCaseStudyMinimal[]
  featuredCaseStudies: SanityCaseStudyMinimal[]
  categories: (Pick<SanityCategory, "title" | "slug" | "color">)[]
}

export interface VideoIndexData {
  videos: SanityVideoMinimal[]
  featuredVideos: SanityVideoMinimal[]
  categories: (Pick<SanityCategory, "title" | "slug" | "color">)[]
}

export interface TestimonialsData {
  testimonials: SanityTestimonial[]
  featuredTestimonials: SanityTestimonial[]
}
