import { MetadataRoute } from "next"
import { client } from "@/sanity/lib/client"
import { SERVICES } from "@/lib/constants"

/**
 * Dynamic sitemap for NextLevel Marketerz
 * Includes all blog posts, case studies, videos from Sanity CMS, and all 55 services
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nextlevelmarketerz.com"
  const currentDate = new Date()

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/work`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    // SEO landing pages
    {
      url: `${baseUrl}/seo-for-restaurants-dubai`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/seo-for-clinics-uae`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/seo-for-real-estate-dubai`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/restaurant-website-dubai`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/clinic-website-design-uae`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ecommerce-website-dubai`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ]

  // All 55 services from constants
  const servicePages: MetadataRoute.Sitemap = SERVICES.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: currentDate,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }))

  // Blog category pages
  const blogCategories = ["seo", "social-media", "digital-marketing", "content-strategy", "lead-generation", "brand-strategy"]
  const blogCategoryPages: MetadataRoute.Sitemap = blogCategories.map((category) => ({
    url: `${baseUrl}/blog?category=${category}`,
    lastModified: currentDate,
    changeFrequency: "daily" as const,
    priority: 0.64,
  }))

  // Fetch blog posts
  const blogQuery = `*[_type == "post" && status == "published"]{
    "slug": slug.current,
    _updatedAt
  }`
  const blogPosts = await client.fetch<
    { slug: string; _updatedAt: string }[]
  >(blogQuery)

  // Fetch case studies
  const caseStudiesQuery = `*[_type == "caseStudy"]{
    "slug": slug.current,
    _updatedAt
  }`
  const caseStudies = await client.fetch<
    { slug: string; _updatedAt: string }[]
  >(caseStudiesQuery)

  // Fetch videos
  const videosQuery = `*[_type == "video"]{
    "slug": slug.current,
    _updatedAt
  }`
  const videos = await client.fetch<
    { slug: string; _updatedAt: string }[]
  >(videosQuery)

  // Dynamic pages from Sanity
  const dynamicPages: MetadataRoute.Sitemap = [
    // Blog listing
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.9,
    },
    // Blog category pages
    ...blogCategoryPages,
    // Blog posts
    ...blogPosts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post._updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    // Case studies listing
    {
      url: `${baseUrl}/case-studies`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    // Case studies
    ...caseStudies.map((cs) => ({
      url: `${baseUrl}/case-studies/${cs.slug}`,
      lastModified: new Date(cs._updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    // Videos listing
    {
      url: `${baseUrl}/videos`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    // Videos
    ...videos.map((video) => ({
      url: `${baseUrl}/videos/${video.slug}`,
      lastModified: new Date(video._updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ]

  return [...staticPages, ...servicePages, ...dynamicPages]
}
