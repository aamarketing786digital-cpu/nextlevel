import { client } from "@/sanity/lib/client"
import { NextResponse } from "next/server"
import { unstable_cache } from "next/cache"

export const dynamic = "force-static"

/**
 * GET /api/videos
 * Fetches all videos with tag-based caching
 */
const getCachedVideos = unstable_cache(
  async (category?: string, featured = false, videoType?: string, limit = 12) => {
    let filter = '_type == "video"'
    if (category) {
      filter += ` && $category in categories[]->slug.current`
    }
    if (featured) {
      filter += " && featured == true"
    }
    if (videoType) {
      filter += ` && videoType == $videoType`
    }

    const query = `*[${filter}] | order(publishedAt desc)[0...$limit]{
      _id,
      title,
      "slug": slug.current,
      youtubeUrl,
      "videoId": videoId,
      description,
      duration,
      videoType,
      customThumbnail{asset->{url}, alt},
      "categories": categories[]{
        "title": title,
        "slug": slug.current,
        "color": color
      },
      featured,
      publishedAt
    }`

    return await client.fetch(query, { limit, category, videoType })
  },
  ['videos'],
  {
    revalidate: 600,
    tags: ['videos'],
  }
)

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category") || undefined
    const featured = searchParams.get("featured") === "true"
    const videoType = searchParams.get("type") || undefined
    const limit = parseInt(searchParams.get("limit") || "12")

    const videos = await getCachedVideos(category, featured, videoType, limit)

    return NextResponse.json({ videos })
  } catch (error) {
    console.error("Error fetching videos:", error)
    return NextResponse.json(
      { error: "Failed to fetch videos" },
      { status: 500 }
    )
  }
}
