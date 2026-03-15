import { client } from "@/sanity/lib/client"
import { NextResponse } from "next/server"
import { unstable_cache } from "next/cache"

/**
 * GET /api/case-studies
 * Fetches all case studies with tag-based caching
 *
 * Cache Strategy:
 * - Uses Next.js 15 fetch with tags for on-demand revalidation
 * - Webhook triggers revalidation when content changes in Sanity
 */
export const dynamic = "force-static"

// Cached fetch with tags
const getCachedCaseStudies = unstable_cache(
  async (featured = false, limit = 12) => {
    let filter = '_type == "caseStudy"'
    if (featured) {
      filter += " && featured == true"
    }

    const query = `*[${filter}] | order(order asc)[0...$limit]{
      _id,
      title,
      "slug": slug.current,
      tagline,
      image{asset->{url}, alt},
      description,
      url,
      buttonText,
      featured,
      order
    }`

    const caseStudies = await client.fetch(query, { limit })
    return caseStudies
  },
  ['case-studies'],
  {
    revalidate: 600, // 10 minutes fallback
    tags: ['case-studies', 'caseStudies'],
  }
)

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get("featured") === "true"
    const limit = parseInt(searchParams.get("limit") || "12")

    const caseStudies = await getCachedCaseStudies(featured, limit)

    return NextResponse.json({ caseStudies })
  } catch (error) {
    console.error("Error fetching case studies:", error)
    return NextResponse.json(
      { error: "Failed to fetch case studies" },
      { status: 500 }
    )
  }
}
