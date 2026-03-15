import { defineType, defineField } from "sanity"

/**
 * Reusable SEO object type
 * Can be embedded in any document type
 */
export const seoType = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  icon: () => "🌍",
  fields: [
    defineField({
      name: "seoTitle",
      type: "string",
      title: "SEO Title",
      description: "Override page title (recommended: 50-60 characters)",
      validation: (Rule) => Rule.max(60).warning("Title should be under 60 characters"),
    }),
    defineField({
      name: "seoDescription",
      type: "text",
      title: "SEO Description",
      rows: 3,
      description: "Meta description (recommended: 150-160 characters)",
      validation: (Rule) => Rule.max(160).warning("Description should be under 160 characters"),
    }),
    defineField({
      name: "ogImage",
      type: "image",
      title: "Open Graph Image",
      description: "Image for social media sharing (recommended: 1200x630px)",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
        },
      ],
    }),
    defineField({
      name: "noIndex",
      type: "boolean",
      title: "No Index",
      description: "Prevent search engines from indexing this page",
      initialValue: false,
    }),
    defineField({
      name: "keywords",
      type: "array",
      title: "Focus Keywords",
      of: [{ type: "string" }],
      description: "Primary keywords for SEO",
    }),
  ],
  preview: {
    select: {
      title: "seoTitle",
      subtitle: "seoDescription",
    },
    prepare(selection) {
      const { title, subtitle } = selection
      return {
        title: title || "SEO Settings",
        subtitle: subtitle ? `${subtitle.substring(0, 50)}...` : "No description",
      }
    },
  },
})
