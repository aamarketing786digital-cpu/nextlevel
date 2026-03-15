import { client } from "@/sanity/lib/client"
import { NextResponse } from "next/server"
import { unstable_cache } from "next/cache"

/**
 * GET /api/blog
 * Fetches all published blog posts with tag-based caching
 *
 * Cache Strategy:
 * - Uses Next.js 15 fetch with tags for on-demand revalidation
 * - Webhook triggers revalidation when content changes in Sanity
 * - Falls back to 5-minute time-based revalidation as backup
 */
export const dynamic = "force-static"

// Cached fetch with tags
const getCachedPosts = unstable_cache(
  async (category?: string, featured?: boolean, limit = 12, skip = 0) => {
    let filter = '_type == "post" && status == "published"'
    if (category) {
      filter += ` && $category in categories[]->slug.current`
    }
    if (featured) {
      filter += " && featured == true"
    }

    const query = `*[${filter}] | order(publishedAt desc)[$skip...$skip + $limit]{
      _id,
      title,
      "slug": slug.current,
      summary,
      mainImage{asset->{url}, alt},
      "author": {
        "name": author.name,
        "slug": author.slug.current
      },
      "categories": categories[]{
        "title": title,
        "slug": slug.current,
        "color": color
      },
      tags,
      publishedAt,
      featured,
      readTime
    }`

    const countQuery = `count(*[${filter}])`

    const [posts, total] = await Promise.all([
      client.fetch(query, { limit, skip, category }),
      client.fetch(countQuery, { category }),
    ])

    return { posts, total }
  },
  ['blog-posts'],
  {
    revalidate: 300, // 5 minutes fallback
    tags: ['posts', 'blog'],
  }
)

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category") || undefined
    const featured = searchParams.get("featured") === "true" || undefined
    const limit = parseInt(searchParams.get("limit") || "12")
    const skip = parseInt(searchParams.get("skip") || "0")

    const { posts, total } = await getCachedPosts(category, featured, limit, skip)

    return NextResponse.json({
      posts,
      pagination: {
        total,
        limit,
        skip,
        hasMore: skip + limit < total,
      },
    })
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return NextResponse.json(
      { error: "Failed to fetch blog posts" },
      { status: 500 }
    )
  }
}
