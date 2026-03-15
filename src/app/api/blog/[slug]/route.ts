import { client } from "@/sanity/lib/client"
import { NextResponse } from "next/server"
import { notFound } from "next/navigation"

export const dynamic = "force-static"

/**
 * GET /api/blog/[slug]
 * Fetches a single blog post by slug
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params

    const query = `*[_type == "post" && slug.current == $slug && status == "published"][0]{
      _id,
      title,
      "slug": slug.current,
      summary,
      mainImage{asset->{url}, alt},
      content,
      "author": {
        "name": author.name,
        "slug": author.slug.current,
        "role": author.role,
        "image": author.image
      },
      "categories": categories[]{
        "title": title,
        "slug": slug.current,
        "color": color,
        "icon": icon
      },
      tags,
      publishedAt,
      featured,
      readTime,
      "seo": {
        "seoTitle": seo.seoTitle,
        "seoDescription": seo.seoDescription,
        "noIndex": seo.noIndex
      },
      faqs
    }`

    const post = await client.fetch(query, { slug })

    if (!post) {
      return notFound()
    }

    return NextResponse.json(post, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    })
  } catch (error) {
    console.error("Error fetching blog post:", error)
    return NextResponse.json({ error: "Failed to fetch blog post" }, { status: 500 })
  }
}
