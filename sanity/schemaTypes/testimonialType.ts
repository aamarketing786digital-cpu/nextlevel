import { defineType, defineField } from "sanity"

/**
 * Testimonial schema for client reviews
 */
export const testimonialType = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  icon: () => "💬",
  fields: [
    // --- Core Fields ---
    defineField({
      name: "name",
      type: "string",
      title: "Client Name",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "role",
      type: "string",
      title: "Role/Position",
      description: "e.g., CEO, Marketing Director",
    }),

    defineField({
      name: "company",
      type: "string",
      title: "Company",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "avatar",
      type: "image",
      title: "Photo/Avatar",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
          description: "Important for accessibility",
        },
      ],
    }),

    defineField({
      name: "rating",
      type: "number",
      title: "Rating",
      description: "Star rating (1-5)",
      validation: (Rule) => Rule.required().min(1).max(5).integer(),
      initialValue: 5,
    }),

    defineField({
      name: "quote",
      type: "text",
      title: "Testimonial Quote",
      rows: 6,
      description: "The client's testimonial",
      validation: (Rule) => Rule.required().min(20),
    }),

    // --- Project Reference ---
    defineField({
      name: "project",
      type: "reference",
      title: "Related Case Study",
      to: [{ type: "caseStudy" }],
      description: "Link to the case study this testimonial is from",
    }),

    // --- Service Context ---
    defineField({
      name: "service",
      type: "string",
      title: "Service",
      description: "What service was this testimonial for?",
      options: {
        list: [
          { title: "SEO", value: "SEO" },
          { title: "Social Media Marketing", value: "Social Media Marketing" },
          { title: "Google Ads", value: "Google Ads" },
          { title: "Web Development", value: "Web Development" },
          { title: "Content Marketing", value: "Content Marketing" },
          { title: "Email Marketing", value: "Email Marketing" },
          { title: "Video Production", value: "Video Production" },
          { title: "Branding", value: "Branding" },
          { title: "Other", value: "Other" },
        ],
      },
    }),

    // --- Featured ---
    defineField({
      name: "featured",
      type: "boolean",
      title: "Featured Testimonial",
      description: "Show on homepage/high-priority sections",
      initialValue: false,
    }),

    defineField({
      name: "order",
      type: "number",
      title: "Display Order",
      description: "Lower number = higher priority",
      initialValue: 100,
    }),

    // --- Video Testimonial ---
    defineField({
      name: "videoUrl",
      type: "url",
      title: "Video Testimonial URL",
      description: "YouTube or video platform URL",
    }),

    // --- Publication ---
    defineField({
      name: "publishedAt",
      type: "datetime",
      title: "Date Received",
      initialValue: () => new Date().toISOString(),
    }),
  ],

  preview: {
    select: {
      title: "name",
      subtitle: "company",
      media: "avatar",
      rating: "rating",
      quote: "quote",
    },
    prepare(selection) {
      const { title, subtitle, media, rating, quote } = selection
      const stars = "⭐".repeat(rating || 5)
      return {
        title,
        subtitle: `${subtitle} ${stars}`,
        media,
        description: quote ? quote.substring(0, 100) + "..." : "",
      }
    },
  },
})
