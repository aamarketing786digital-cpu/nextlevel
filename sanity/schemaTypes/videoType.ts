import { defineType, defineField } from "sanity"
import { VideoIcon } from "@sanity/icons"

/**
 * Video schema for YouTube videos and video content
 */
export const videoType = defineType({
  name: "video",
  title: "Video",
  type: "document",
  icon: VideoIcon,
  fields: [
    // --- Core Fields ---
    defineField({
      name: "title",
      type: "string",
      title: "Video Title",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "slug",
      type: "slug",
      title: "Slug",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    }),

    // --- YouTube URL ---
    defineField({
      name: "youtubeUrl",
      type: "url",
      title: "YouTube URL",
      description: "Full YouTube video URL (e.g., https://www.youtube.com/watch?v=xxx)",
      validation: (Rule) =>
        Rule.required().uri({
          scheme: ["http", "https"],
        }).custom((url) => {
          if (!url) return true
          // Check if it's a valid YouTube URL
          const youtubePatterns = [
            /youtube\.com\/watch\?v=/,
            /youtu\.be\//,
            /youtube\.com\/embed\//,
            /youtube\.com\/shorts\//,
          ]
          const isValid = youtubePatterns.some((pattern) => pattern.test(url))
          return isValid ? true : "Please enter a valid YouTube URL"
        }),
    }),

    defineField({
      name: "videoId",
      type: "string",
      title: "YouTube Video ID",
      description: "Auto-extracted from URL (11 character ID)",
      readOnly: true,
    }),

    // --- Thumbnail ---
    defineField({
      name: "customThumbnail",
      type: "image",
      title: "Custom Thumbnail",
      description: "Override YouTube thumbnail (optional)",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
        },
      ],
    }),

    // --- Video Info ---
    defineField({
      name: "description",
      type: "text",
      title: "Description",
      rows: 4,
      description: "Video description/summary",
      validation: (Rule) => Rule.required().min(50),
    }),

    defineField({
      name: "duration",
      type: "string",
      title: "Duration",
      description: "Video duration (e.g., '5:30', '12:45')",
    }),

    // --- Categories & Tags ---
    defineField({
      name: "categories",
      type: "array",
      title: "Categories",
      of: [{ type: "reference", to: [{ type: "category" }] }],
    }),

    defineField({
      name: "tags",
      type: "array",
      title: "Tags",
      of: [{ type: "string" }],
      description: "Additional tags for filtering",
    }),

    // --- Video Type ---
    defineField({
      name: "videoType",
      type: "string",
      title: "Video Type",
      options: {
        list: [
          { title: "Tutorial", value: "tutorial" },
          { title: "Case Study", value: "caseStudy" },
          { title: "Testimonial", value: "testimonial" },
          { title: "Tips & Tricks", value: "tips" },
          { title: "Industry Insight", value: "insight" },
          { title: "Product Demo", value: "demo" },
          { title: "Webinar", value: "webinar" },
          { title: "Other", value: "other" },
        ],
      },
      initialValue: "tutorial",
    }),

    // --- Featured ---
    defineField({
      name: "featured",
      type: "boolean",
      title: "Featured Video",
      description: "Show in featured section",
      initialValue: false,
    }),

    defineField({
      name: "featuredOrder",
      type: "number",
      title: "Featured Order",
      description: "Order for featured videos (lower = higher priority)",
    }),

    // --- Related Content ---
    defineField({
      name: "relatedBlog",
      type: "reference",
      title: "Related Blog Post",
      to: [{ type: "post" }],
      description: "Link to related blog post",
    }),

    defineField({
      name: "relatedCaseStudy",
      type: "reference",
      title: "Related Case Study",
      to: [{ type: "caseStudy" }],
      description: "Link to related case study",
    }),

    // --- SEO ---
    defineField({
      name: "seo",
      type: "seo",
      title: "SEO Settings",
    }),

    // --- Publication ---
    defineField({
      name: "publishedAt",
      type: "datetime",
      title: "Published Date",
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
  ],

  preview: {
    select: {
      title: "title",
      description: "description",
      youtubeUrl: "youtubeUrl",
      videoType: "videoType",
    },
    prepare(selection) {
      const { title, description, youtubeUrl, videoType } = selection

      // Extract video ID for preview
      let videoId = "N/A"
      if (youtubeUrl) {
        const match = youtubeUrl.match(
          /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/
        )
        if (match) videoId = match[1]
      }

      return {
        title,
        subtitle: `${videoType} • ID: ${videoId}`,
        description: description ? description.substring(0, 80) + "..." : "",
      }
    },
  },
})
