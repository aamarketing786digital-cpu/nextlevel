import { defineType, defineField } from "sanity"

/**
 * Case Study schema - Clean, simple structure
 */
export const caseStudyType = defineType({
  name: "caseStudy",
  title: "Case Study",
  type: "document",
  icon: () => "💼",
  fields: [
    // Title (Heading)
    defineField({
      name: "title",
      type: "string",
      title: "Heading",
      description: "Client name or project title",
      validation: (Rule) => Rule.required(),
    }),

    // Slug
    defineField({
      name: "slug",
      type: "slug",
      title: "Slug",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    }),

    // Tagline (Subheading)
    defineField({
      name: "tagline",
      type: "string",
      title: "Subheading",
      description: "One-line summary",
      validation: (Rule) => Rule.required(),
    }),

    // Description
    defineField({
      name: "description",
      type: "text",
      title: "Description",
      rows: 3,
      description: "Brief overview of the project",
      validation: (Rule) => Rule.required(),
    }),

    // Image
    defineField({
      name: "image",
      type: "image",
      title: "Image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
        },
      ],
    }),

    // Challenge (Portable Text)
    defineField({
      name: "challenge",
      type: "array",
      title: "The Challenge",
      of: [{ type: "block" }],
    }),

    // Solution (Portable Text)
    defineField({
      name: "solution",
      type: "array",
      title: "Our Solution",
      of: [{ type: "block" }],
    }),

    // Gallery
    defineField({
      name: "gallery",
      type: "array",
      title: "Gallery",
      of: [{ type: "image" }],
    }),

    // URL
    defineField({
      name: "url",
      type: "url",
      title: "Link URL",
    }),

    // Button Text
    defineField({
      name: "buttonText",
      type: "string",
      title: "Button Text",
      initialValue: "View Case Study",
    }),

    // Featured
    defineField({
      name: "featured",
      type: "boolean",
      title: "Featured",
      initialValue: false,
    }),

    // Order
    defineField({
      name: "order",
      type: "number",
      title: "Display Order",
      initialValue: 100,
    }),
  ],

  preview: {
    select: {
      title: "title",
      subtitle: "tagline",
      media: "image",
    },
  },
})
