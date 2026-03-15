import { Metadata } from "next"
import { client } from "@/sanity/lib/client"
import { PortableText } from "@/components/blog/PortableText"
import { urlFor } from "@/sanity/lib/image"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, ArrowLeft, Share2 } from "lucide-react"
import type { SanityPostWithAuthor, SanityPostMinimal } from "@/types/sanity"
import { Container } from "@/components/layout/Container"
import { CopyLinkButton } from "@/components/blog/CopyLinkButton"

// ISR: Revalidate every 60 seconds
export const revalidate = 60
export const dynamicParams = true

/**
 * Generate static params at build time
 */
export async function generateStaticParams() {
  const query = `*[_type == "post" && status == "published"]{
    "slug": slug.current
  }`

  const posts = await client.fetch<{ slug: string }[]>(query)
  return posts.map((post) => ({ slug: post.slug }))
}

/**
 * Generate SEO metadata for each post
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params

  const query = `*[_type == "post" && slug.current == $slug && status == "published"][0]{
    title,
    summary,
    mainImage,
    "seo": {
      "seoTitle": seo.seoTitle,
      "seoDescription": seo.seoDescription,
      "noIndex": seo.noIndex
    }
  }`

  const post = await client.fetch(query, { slug })

  if (!post) {
    return {
      title: "Post Not Found",
    }
  }

  const seoTitle = post.seo?.seoTitle || post.title
  const seoDescription = post.seo?.seoDescription || post.summary
  const ogImage = post.mainImage ? urlFor(post.mainImage)?.width(1200).height(630).fit("crop").url() || "" : ""

  return {
    title: `${seoTitle} | NextLevel Marketerz`,
    description: seoDescription,
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: `/blog/${slug}`,
      siteName: "NextLevel Marketerz",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      type: "article",
      publishedTime: post.publishedAt,
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDescription,
      images: [ogImage],
    },
    alternates: {
      canonical: `/blog/${slug}`,
    },
    robots: {
      index: !post.seo?.noIndex,
      follow: true,
    },
  }
}

/**
 * Blog post page
 */
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  // Fetch post
  const postQuery = `*[_type == "post" && slug.current == $slug && status == "published"][0]{
    _id,
    title,
    "slug": slug.current,
    summary,
    mainImage{asset->{url}, alt},
    content,
    publishedAt,
    readTime,
    "categories": categories[]{
      title,
      "slug": slug.current,
      color,
      icon
    },
    tags,
    "seo": {
      "seoTitle": seo.seoTitle,
      "seoDescription": seo.seoDescription,
      "noIndex": seo.noIndex,
      "keywords": seo.keywords
    },
    faqs
  }`

  const post: SanityPostWithAuthor | null = await client.fetch(postQuery, { slug })

  if (!post) {
    notFound()
  }

  // Fetch related posts
  const relatedQuery = `*[_type == "post" && _id != $_id && status == "published"]{
    _id,
    title,
    "slug": slug.current,
    summary,
    mainImage{asset->{url}, alt},
    "categories": categories[]{
      "title": title,
      "slug": slug.current,
      "color": color
    },
    publishedAt,
    readTime
  } | order(publishedAt desc)[0...3]`

  const relatedPosts: SanityPostMinimal[] = await client.fetch(relatedQuery, { _id: post._id })

  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.summary,
    image: post.mainImage ? urlFor(post.mainImage)?.url() : undefined,
    datePublished: post.publishedAt,
    dateModified: post._updatedAt,
    publisher: {
      "@type": "Organization",
      name: "NextLevel Marketerz",
      logo: {
        "@type": "ImageObject",
        url: "https://nextlevelmarketerz.com/logo.png",
      },
    },
  }

  const publishedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-slate-950 py-20 md:py-28 relative overflow-hidden border-b border-white/10">
          {/* Decorative Elements */}
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 pointer-events-none" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

          <Container className="relative z-10">
            {/* Back Button */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>

            <div className="max-w-4xl">
              {/* Categories */}
              {post.categories && post.categories.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {post.categories.map((cat) => cat.slug?.current ? (
                    <Link
                      key={cat.slug.current}
                      href={`/blog?category=${cat.slug.current}`}
                      className="px-3 py-1 rounded-full text-sm font-medium text-white transition-opacity hover:opacity-80"
                      style={{ backgroundColor: cat.color || "#f59e0b" }}
                    >
                      {cat.title}
                    </Link>
                  ) : null)}
                </div>
              )}

              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 tracking-tight">
                {post.title}
              </h1>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-6 text-slate-300">
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {publishedDate}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {post.readTime || 5} min read
                </span>
              </div>
            </div>
          </Container>
        </section>

        {/* Article */}
        <article className="py-12 md:py-20">
          <Container>
            <div className="max-w-4xl mx-auto">
              {/* Featured Image */}
              <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden mb-8 bg-gradient-to-br from-primary/20 to-primary/5">
                {post.mainImage ? (
                  <Image
                    src={urlFor(post.mainImage)?.width(1200).height(630).url() || "/placeholder.png"}
                    alt={post.mainImage.alt || post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 1200px"
                    priority
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-8xl font-bold text-primary/20">{post.title.charAt(0)}</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="prose prose-lg max-w-none mb-16">
                <PortableText value={post.content} />
              </div>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="border-t border-border pt-8 mb-12">
                  <h3 className="text-sm font-semibold mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-muted rounded-full text-sm text-muted-foreground"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Share */}
              <div className="border-t border-border pt-8 mb-12">
                <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
                  <Share2 className="w-4 h-4" />
                  Share this post
                </h3>
                <CopyLinkButton />
              </div>

              {/* FAQs */}
              {post.faqs && post.faqs.length > 0 && (
                <div className="border-t border-border pt-8 mb-12">
                  <h3 className="text-2xl font-bold mb-6">Frequently Asked Questions</h3>
                  <dl className="space-y-6">
                    {post.faqs.map((faq, index) => (
                      <div key={index} className="border-b border-border pb-6 last:border-0">
                        <dt className="font-semibold mb-2">{faq.question}</dt>
                        <dd className="text-muted-foreground">{faq.answer}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}
            </div>
          </Container>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="py-12 bg-muted/30">
            <Container>
              <h2 className="text-2xl md:text-3xl font-bold mb-8">Related Posts</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedPosts.map((post) => (
                  <Link
                    key={post._id}
                    href={`/blog/${post.slug}`}
                    className="group"
                  >
                    <div className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all h-full">
                      <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5">
                        {post.mainImage ? (
                          <Image
                            src={urlFor(post.mainImage)?.width(400).height(225).fit("crop").url() || "/placeholder.png"}
                            alt={post.mainImage.alt || post.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 400px"
                            className="object-cover group-hover:scale-105 transition-transform"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-5xl font-bold text-primary/20">{post.title.charAt(0)}</span>
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold group-hover:text-primary transition-colors line-clamp-2 mb-2">
                          {post.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">{post.summary}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </Container>
          </section>
        )}
      </main>
    </>
  )
}
