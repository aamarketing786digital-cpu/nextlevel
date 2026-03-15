import { defineType, defineField } from "sanity"
import { DocumentIcon } from "@sanity/icons"

/**
 * Blog Post schema with SEO optimization
 */
export const postType = defineType({
  name: "post",
  title: "Blog Post",
  type: "document",
  icon: DocumentIcon,
  fields: [
    // --- Core Fields ---
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      validation: (Rule) => Rule.required().min(10).max(100),
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "Slug",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "summary",
      type: "text",
      title: "Summary/Excerpt",
      rows: 3,
      description: "Brief summary for blog listing and meta description (150-160 chars)",
      validation: (Rule) => Rule.required().min(100).max(160),
    }),

    // --- Featured Image ---
    defineField({
      name: "mainImage",
      type: "image",
      title: "Featured Image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
          description: "Important for SEO and accessibility",
        },
        {
          name: "caption",
          type: "string",
          title: "Image Caption",
        },
      ],
      description: "Optional - a gradient placeholder will be shown if no image is provided",
    }),

    // --- Content ---
    defineField({
      name: "content",
      type: "array",
      of: [{ type: "blockContent" }],
      title: "Content",
      description: "Main blog post content with rich text formatting",
    }),

    // --- Categories ---
    defineField({
      name: "categories",
      type: "array",
      title: "Categories",
      of: [{ type: "reference", to: [{ type: "category" }] }],
    }),

    // --- Tags ---
    defineField({
      name: "tags",
      type: "array",
      title: "Tags",
      of: [{ type: "string" }],
      description: "Additional tags for filtering",
    }),

    // --- Publication Settings ---
    defineField({
      name: "publishedAt",
      type: "datetime",
      title: "Published Date",
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "status",
      type: "string",
      title: "Status",
      options: {
        list: [
          { title: "Draft", value: "draft" },
          { title: "Published", value: "published" },
        ],
      },
      initialValue: "draft",
    }),

    // --- Featured ---
    defineField({
      name: "featured",
      type: "boolean",
      title: "Featured Post",
      description: "Show in featured section",
      initialValue: false,
    }),
    defineField({
      name: "featuredOrder",
      type: "number",
      title: "Featured Order",
      description: "Order for featured posts (lower number = higher priority)",
      hidden: ({ parent }) => !parent?.featured,
    }),

    // --- Reading Time ---
    defineField({
      name: "readTime",
      type: "number",
      title: "Reading Time (minutes)",
      description: "Estimated reading time",
      initialValue: 5,
    }),

    // --- SEO Settings ---
    defineField({
      name: "seo",
      type: "seo",
      title: "SEO Settings",
      description: "Override default SEO metadata",
    }),

    // --- FAQ Section ---
    defineField({
      name: "faqs",
      type: "array",
      title: "FAQs",
      of: [
        {
          type: "object",
          name: "faqItem",
          title: "FAQ Item",
          fields: [
            defineField({
              name: "question",
              type: "string",
              title: "Question",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "answer",
              type: "text",
              title: "Answer",
              rows: 3,
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: "question" },
          },
        },
      ],
    }),
  ],

  // --- Preview Configuration ---
  preview: {
    select: {
      title: "title",
      subtitle: "summary",
      media: "mainImage",
      status: "status",
    },
    prepare(selection) {
      const { title, subtitle, media, status } = selection
      return {
        title,
        subtitle: subtitle ? `${subtitle.substring(0, 60)}...` : "No summary",
        media,
        // Add status badge
        badge: status === "published" ? "Published" : "Draft",
      }
    },
  },

  // --- Order in Studio ---
  orderings: [
    {
      title: "Published Date (Newest)",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
    {
      title: "Published Date (Oldest)",
      name: "publishedAtAsc",
      by: [{ field: "publishedAt", direction: "asc" }],
    },
    {
      title: "Title (A-Z)",
      name: "titleAsc",
      by: [{ field: "title", direction: "asc" }],
    },
  ],
})
