"use client"

import { PortableText as ReactPortableText } from "@portabletext/react"
import type { PortableTextBlockContent } from "@/types/sanity"
import { urlFor } from "@/sanity/lib/image"
import Image from "next/image"
import Link from "next/link"
import type { PortableTextComponentProps } from "@portabletext/react"

/**
 * Custom Portable Text renderer for Sanity content
 * Handles blocks, lists, marks, and inline images
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const components: any = {
  // Block types
  block: {
    normal: ({ children }: PortableTextComponentProps<any>) => <p className="text-base leading-relaxed mb-4">{children}</p>,
    h1: ({ children }: PortableTextComponentProps<any>) => (
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 mt-8 first:mt-0">{children}</h1>
    ),
    h2: ({ children }: PortableTextComponentProps<any>) => (
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 mt-8 first:mt-0">{children}</h2>
    ),
    h3: ({ children }: PortableTextComponentProps<any>) => (
      <h3 className="text-2xl md:text-3xl font-semibold tracking-tight mb-3 mt-6 first:mt-0">{children}</h3>
    ),
    h4: ({ children }: PortableTextComponentProps<any>) => (
      <h4 className="text-xl md:text-2xl font-semibold tracking-tight mb-2 mt-4 first:mt-0">{children}</h4>
    ),
    blockquote: ({ children }: PortableTextComponentProps<any>) => (
      <blockquote className="border-l-4 border-primary/30 pl-4 italic text-muted-foreground my-6 py-2 bg-primary/5 rounded-r">
        {children}
      </blockquote>
    ),
  },

  // List types
  list: {
    bullet: ({ children }: PortableTextComponentProps<any>) => (
      <ul className="list-disc list-inside space-y-2 my-4 marker:text-primary">{children}</ul>
    ),
    number: ({ children }: PortableTextComponentProps<any>) => (
      <ol className="list-decimal list-inside space-y-2 my-4 marker:text-primary">{children}</ol>
    ),
  },

  // List item
  listItem: ({ children }: PortableTextComponentProps<any>) => <li className="ml-4">{children}</li>,

  // Marks (decorations)
  marks: {
    strong: ({ children }: PortableTextComponentProps<any>) => <strong className="font-semibold text-foreground">{children}</strong>,
    em: ({ children }: PortableTextComponentProps<any>) => <em className="italic">{children}</em>,
    code: ({ children }: PortableTextComponentProps<any>) => (
      <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-primary">
        {children}
      </code>
    ),
    underline: ({ children }: PortableTextComponentProps<any>) => <u className="underline decoration-2 underline-offset-2">{children}</u>,
    "strike-through": ({ children }: PortableTextComponentProps<any>) => <s className="line-through opacity-70">{children}</s>,
    link: ({ value, children }: { value?: { href?: string; blank?: boolean }; children: React.ReactNode }) => {
      const href = value?.href
      const blank = value?.blank
      return (
        <Link
          href={href || "#"}
          target={blank ? "_blank" : undefined}
          rel={blank ? "noopener noreferrer" : undefined}
          className="text-primary hover:text-primary/80 underline underline-offset-4 decoration-primary/30 hover:decoration-primary transition-all"
        >
          {children}
        </Link>
      )
    },
    internalLink: ({ value, children }: { value?: { reference?: { _type: string; slug?: { current: string } } }; children: React.ReactNode }) => {
      const ref = value?.reference
      if (!ref) return <span>{children}</span>

      // Handle different reference types
      const hrefMap: Record<string, string> = {
        post: "/blog",
        caseStudy: "/case-studies",
        page: "",
      }

      const baseHref = hrefMap[ref._type] || ""
      const slug = ref.slug?.current || ""

      return (
        <Link
          href={`${baseHref}/${slug}`}
          className="text-primary hover:text-primary/80 underline underline-offset-4 decoration-primary/30 hover:decoration-primary transition-all"
        >
          {children}
        </Link>
      )
    },
  },

  // Custom types (inline images)
  types: {
    image: ({ value }: { value: { asset: { _ref: string }; alt?: string; caption?: string } }) => {
      const imageUrl = urlFor(value)
        ?.width(800)
        .fit("max")
        .auto("format")
        .url()

      if (!imageUrl) return null

      return (
        <figure className="my-8 relative aspect-video rounded-lg overflow-hidden bg-muted">
          <Image
            src={imageUrl}
            alt={value.alt || ""}
            fill
            sizes="(max-width: 768px) 100vw, 800px"
            className="object-cover"
          />
          {value.caption && (
            <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <p className="text-white text-sm">{value.caption}</p>
            </figcaption>
          )}
        </figure>
      )
    },
  },
}

interface PortableTextProps {
  value: PortableTextBlockContent[]
  className?: string
}

export function PortableText({ value, className }: PortableTextProps) {
  return (
    <div className={className}>
      <ReactPortableText value={value} components={components} />
    </div>
  )
}

/**
 * Excerpt renderer - renders first paragraph only
 */
export function PortableTextExcerpt({ value, maxLength = 200 }: { value: PortableTextBlockContent[]; maxLength?: number }) {
  // Get first text block
  const firstBlock = value?.find((block) => block._type === "block")
  if (!firstBlock || firstBlock._type !== "block") return null

  const text = firstBlock.children?.map((span: any) => span.text).join("") || ""
  const excerpt = text.length > maxLength ? text.substring(0, maxLength) + "..." : text

  return <p className="text-muted-foreground">{excerpt}</p>
}
