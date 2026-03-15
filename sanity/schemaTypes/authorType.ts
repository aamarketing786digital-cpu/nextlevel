import { defineType, defineField } from "sanity"
import { UserIcon } from "@sanity/icons"

/**
 * Author schema for blog posts and case studies
 */
export const authorType = defineType({
  name: "author",
  title: "Author",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "name",
      type: "string",
      title: "Name",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "Slug",
      options: { source: "name" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "role",
      type: "string",
      title: "Role/Title",
      description: "e.g., Marketing Director, SEO Specialist",
    }),
    defineField({
      name: "bio",
      type: "text",
      title: "Short Bio",
      rows: 4,
      description: "Brief author bio (displayed on posts)",
    }),
    defineField({
      name: "image",
      type: "image",
      title: "Profile Image",
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
      name: "email",
      type: "email",
      title: "Email",
    }),
    defineField({
      name: "social",
      type: "object",
      title: "Social Links",
      fields: [
        defineField({
          name: "linkedin",
          type: "url",
          title: "LinkedIn",
        }),
        defineField({
          name: "twitter",
          type: "url",
          title: "Twitter/X",
        }),
        defineField({
          name: "website",
          type: "url",
          title: "Website",
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "role",
      media: "image",
    },
  },
})
