import { client } from "@/sanity/lib/client"
import { NextResponse } from "next/server"
import { unstable_cache } from "next/cache"

export const dynamic = "force-static"

/**
 * GET /api/testimonials
 * Fetches all testimonials with tag-based caching
 */
const getCachedTestimonials = unstable_cache(
  async (featured = false, service?: string, limit = 20) => {
    let filter = '_type == "testimonial"'
    if (featured) {
      filter += " && featured == true"
    }
    if (service) {
      filter += ` && service == $service`
    }

    const query = `*[${filter}] | order(order asc, publishedAt desc)[0...$limit]{
      _id,
      name,
      role,
      company,
      avatar{asset->{url}, alt},
      rating,
      quote,
      service,
      videoUrl,
      order
    }`

    return await client.fetch(query, { limit, service })
  },
  ['testimonials'],
  {
    revalidate: 600,
    tags: ['testimonials'],
  }
)

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get("featured") === "true"
    const service = searchParams.get("service") || undefined
    const limit = parseInt(searchParams.get("limit") || "20")

    const testimonials = await getCachedTestimonials(featured, service, limit)

    return NextResponse.json({ testimonials })
  } catch (error) {
    console.error("Error fetching testimonials:", error)
    return NextResponse.json(
      { error: "Failed to fetch testimonials" },
      { status: 500 }
    )
  }
}
