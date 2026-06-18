import { Metadata } from "next"
import Link from "next/link"
import { Star } from "lucide-react"
import { client } from "@/sanity/lib/client"
import { BlogCard } from "@/components/blog/BlogCard"
import { Container } from "@/components/layout/Container"
import type { SanityPostMinimal } from "@/types/sanity"

export const dynamic = "force-static"
export const revalidate = 60

/**
 * Generate metadata for blog listing page
 */
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Blog | NextLevel Marketerz - Digital Marketing Insights",
    description:
      "Expert insights, tips, and strategies for digital marketing success. Stay updated with the latest trends in SEO, social media, PPC, and more.",
    openGraph: {
      title: "Blog | NextLevel Marketerz",
      description: "Expert insights, tips, and strategies for digital marketing success.",
      url: "/blog",
    },
    alternates: {
      canonical: "/blog",
    },
  }
}

/**
 * Blog listing page
 */
export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const params = await searchParams
  const category = params.category

  // Fetch posts
  const postsQuery = `*[_type == "post" && status == "published"${category ? ` && $category in categories[]->slug.current` : ""}] | order(publishedAt desc){
    _id,
    title,
    "slug": slug.current,
    summary,
    mainImage{asset->{url}, alt},
    "categories": categories[]->{
      "title": title,
      "slug": slug.current,
      "color": color
    },
    publishedAt,
    featured,
    readTime
  }`

  const posts: SanityPostMinimal[] = await client.fetch(postsQuery, { category })

  // Fetch categories
  const categoriesQuery = `*[_type == "category" && categoryType in ["blog", "all"]] | order(title asc){
    title,
    "slug": slug.current,
    color
  }`
  const categories = await client.fetch(categoriesQuery)

  // Featured posts
  const allFeatured = posts.filter((p) => p.featured)
  const featuredPosts = allFeatured.slice(0, 3)
  const regularPosts = posts.filter((p) => !p.featured).concat(allFeatured.slice(3))

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-teal-950 py-32 md:py-40 relative overflow-hidden border-b border-white/10">
        {/* Decorative Elements */}
        <div className="absolute inset-0 bg-[url('/images/blog-hero.png')] bg-cover bg-center opacity-30 pointer-events-none" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

        <Container className="relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-8 tracking-tight">
              Digital Marketing <span className="text-gradient-gold">Insights</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed font-light">
              Expert tips, strategies, and industry trends to help your business grow online.
            </p>
          </div>
        </Container>
      </section>

      {/* Category Filter */}
      <section className="py-8 border-b border-border bg-background">
        <Container>
          <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-hide">
            <Link
              href="/blog"
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                !category
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              All Posts
            </Link>
            {categories.map((cat: { title: string; slug: string }) => cat.slug ? (
              <Link
                key={cat.slug}
                href={`/blog?category=${cat.slug}`}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  category === cat.slug
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {cat.title}
              </Link>
            ) : null)}
          </div>
        </Container>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-16">
          <Container>
            <h2 className="text-2xl md:text-3xl font-bold mb-8 flex items-center gap-2">
              <Star className="w-6 h-6 text-orange-500 fill-orange-500" /> Featured Posts
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPosts.map((post, index) => (
                <BlogCard key={post._id} post={post} index={index} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Divider */}
      {featuredPosts.length > 0 && regularPosts.length > 0 && (
        <Container>
          <hr className="border-border" />
        </Container>
      )}

      {/* All Posts */}
      <section className="py-16">
        <Container>
          {category && (
            <h2 className="text-2xl md:text-3xl font-bold mb-8">
              {categories.find((c: { slug: string }) => c.slug === category)?.title || category} Posts
            </h2>
          )}
          {regularPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post, index) => (
                <BlogCard key={post._id} post={post} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No posts found in this category.</p>
              <Link href="/blog" className="text-primary hover:underline mt-2 inline-block">
                View all posts →
              </Link>
            </div>
          )}
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary/5">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Need Help With Your Marketing?</h2>
            <p className="text-muted-foreground mb-8">
              Let's discuss how we can help grow your business with our digital marketing expertise.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition-colors"
            >
              Get in Touch
            </a>
          </div>
        </Container>
      </section>
    </main>
  )
}
