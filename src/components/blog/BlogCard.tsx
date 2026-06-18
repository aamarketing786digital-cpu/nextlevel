"use client"

import Link from "next/link"
import Image from "next/image"
import { Calendar, Clock, ArrowRight, Star } from "lucide-react"
import { urlFor } from "@/sanity/lib/image"
import type { SanityPostMinimal } from "@/types/sanity"
import { motion } from "framer-motion"

interface BlogCardProps {
  post: SanityPostMinimal
  index?: number
}

export function BlogCard({ post, index = 0 }: BlogCardProps) {
  const category = post.categories?.[0]
  const publishedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group"
    >
      <Link href={`/blog/${post.slug}`} className="block h-full">
        <div className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 h-full flex flex-col">
          {/* Image */}
          <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5">
            {post.mainImage ? (
              <Image
                src={urlFor(post.mainImage)?.width(600).height(400).fit("crop").url() || "/placeholder.png"}
                alt={post.mainImage.alt || post.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-7xl font-bold text-primary/20">{post.title.charAt(0)}</span>
              </div>
            )}
            {/* Category Badge */}
            {category && (
              <div className="absolute top-4 left-4">
                <span
                  className="px-3 py-1 rounded-full text-xs font-semibold text-white"
                  style={{ backgroundColor: category.color || "#f59e0b" }}
                >
                  {category.title}
                </span>
              </div>
            )}
            {/* Featured Badge */}
            {post.featured && (
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-orange-500 text-white flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-current" /> Featured
                </span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-6 flex-1 flex flex-col">
            {/* Meta */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {publishedDate}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {post.readTime || 5} min read
              </span>
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
              {post.title}
            </h3>

            {/* Summary */}
            <p className="text-muted-foreground mb-4 line-clamp-2 flex-1">{post.summary}</p>

            {/* Footer */}
            <div className="flex items-center justify-end pt-4 border-t border-border">
              <span className="text-primary font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                Read More <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
