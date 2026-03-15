import { defineType, defineField } from "sanity"
import { TagIcon } from "@sanity/icons"

/**
 * Category schema for organizing posts, case studies, and videos
 */
export const categoryType = defineType({
  name: "category",
  title: "Category",
  type: "document",
  icon: TagIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "Slug",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      type: "text",
      title: "Description",
      rows: 3,
      description: "Brief description of the category",
    }),
    defineField({
      name: "color",
      type: "string",
      title: "Accent Color",
      description: "Hex color code for category badge (e.g., #f59e0b)",
      initialValue: "#f59e0b",
    }),
    defineField({
      name: "icon",
      type: "string",
      title: "Icon",
      description: "Lucide icon name (e.g., TrendingUp, Video, Briefcase)",
    }),
    defineField({
      name: "categoryType",
      type: "string",
      title: "Category Type",
      description: "Which content type this category applies to",
      options: {
        list: [
          { title: "Blog Post", value: "blog" },
          { title: "Case Study", value: "caseStudy" },
          { title: "Video", value: "video" },
          { title: "All", value: "all" },
        ],
      },
      initialValue: "blog",
    }),
    defineField({
      name: "seo",
      type: "seo",
      title: "SEO",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "categoryType",
    },
    prepare(selection) {
      const { title, subtitle } = selection
      return {
        title,
        subtitle: subtitle ? `${subtitle} Category` : "Category",
      }
    },
  },
})
