"use client"

import Link from "next/link"
import Image from "next/image"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import { urlFor } from "@/sanity/lib/image"
import type { SanityPostMinimal } from "@/types/sanity"
import { motion } from "framer-motion"

interface BlogSectionProps {
  posts: SanityPostMinimal[]
  title?: string
  subtitle?: string
  showFeatured?: boolean
}

export function BlogSection({
  posts,
  title = "Latest Insights",
  subtitle = "Expert tips and strategies to help grow your business",
  showFeatured = false,
}: BlogSectionProps) {
  // Filter posts
  const displayPosts = showFeatured
    ? posts.filter((p) => p.featured).slice(0, 3)
    : posts.slice(0, 3)

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{title}</h2>
          <p className="text-muted-foreground text-lg">{subtitle}</p>
        </motion.div>

        {/* Blog Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {displayPosts.length > 0 ? (
            displayPosts.map((post, index) => (
            <motion.article
              key={post._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/blog/${post.slug}`} className="block group h-full">
                <div className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all h-full flex flex-col">
                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5">
                    {post.mainImage ? (
                      <Image
                        src={urlFor(post.mainImage)?.width(400).height(250).fit("crop").url() || "/placeholder.png"}
                        alt={post.mainImage.alt || post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 400px"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-6xl font-bold text-primary/20">{post.title.charAt(0)}</span>
                      </div>
                    )}
                    {post.featured && (
                      <div className="absolute top-3 left-3">
                        <span className="px-2 py-1 rounded-full text-xs font-semibold bg-amber-500 text-white">
                          ⭐ Featured
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5 flex-1 flex flex-col">
                    {/* Category */}
                    {post.categories?.[0] && (
                      <span
                        className="text-xs font-semibold mb-2 inline-block px-2 py-0.5 rounded text-white"
                        style={{ backgroundColor: post.categories[0].color || "#f59e0b" }}
                      >
                        {post.categories[0].title}
                      </span>
                    )}

                    {/* Title */}
                    <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>

                    {/* Meta */}
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(post.publishedAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime || 5}m
                      </span>
                    </div>

                    {/* Footer */}
                    <div className="mt-auto pt-3 border-t border-border">
                      <span className="text-primary text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                        Read More <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
            ))
          ) : (
            <div className="md:col-span-3 text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Calendar className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Coming Soon</h3>
                <p className="text-muted-foreground mb-6">
                  We're preparing insightful content to help you grow your business. Check back soon!
                </p>
              </div>
            </div>
          )}
        </div>

        {/* View All Link */}
        {displayPosts.length > 0 && (
          <div className="text-center mt-12">
            <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors"
          >
            View All Posts <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        )}
      </div>
    </section>
  )
}
