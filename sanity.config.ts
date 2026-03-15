'use client'

import { defineConfig } from "sanity"
import { structureTool } from "sanity/structure"
import { visionTool } from "@sanity/vision"
import { schemaTypes } from "./sanity/schemaTypes"

/**
 * Sanity CMS Configuration
 */
export default defineConfig({
  basePath: '/studio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            // Blog Section
            S.listItem()
              .title("Blog Posts")
              .icon(() => "📝")
              .child(
                S.documentTypeList("post")
                  .title("Blog Posts")
                  .filter('_type == "post" && !(_id in path("drafts.**"))')
                  .defaultOrdering([{ field: "publishedAt", direction: "desc" }])
              ),

            S.listItem()
              .title("Featured Posts")
              .icon(() => "⭐")
              .child(
                S.documentList()
                  .title("Featured Posts")
                  .filter('_type == "post" && featured == true')
                  .defaultOrdering([{ field: "featuredOrder", direction: "asc" }])
              ),

            // Case Studies Section
            S.divider(),
            S.listItem()
              .title("Case Studies")
              .icon(() => "💼")
              .child(
                S.documentTypeList("caseStudy")
                  .title("Case Studies")
                  .defaultOrdering([{ field: "order", direction: "asc" }])
              ),

            // Videos Section
            S.divider(),
            S.listItem()
              .title("Videos")
              .icon(() => "🎥")
              .child(
                S.documentTypeList("video")
                  .title("Videos")
                  .defaultOrdering([{ field: "publishedAt", direction: "desc" }])
              ),

            S.listItem()
              .title("Featured Videos")
              .icon(() => "🔥")
              .child(
                S.documentList()
                  .title("Featured Videos")
                  .filter('_type == "video" && featured == true')
                  .defaultOrdering([{ field: "featuredOrder", direction: "asc" }])
              ),

            // Testimonials Section
            S.divider(),
            S.listItem()
              .title("Testimonials")
              .icon(() => "💬")
              .child(
                S.documentTypeList("testimonial")
                  .title("Testimonials")
                  .defaultOrdering([{ field: "order", direction: "asc" }])
              ),

            S.listItem()
              .title("Featured Testimonials")
              .icon(() => "⭐")
              .child(
                S.documentList()
                  .title("Featured Testimonials")
                  .filter('_type == "testimonial" && featured == true')
                  .defaultOrdering([{ field: "order", direction: "asc" }])
              ),

            // Organize Section
            S.divider(),
            S.listItem()
              .title("Categories")
              .icon(() => "🏷️")
              .child(
                S.documentTypeList("category")
                  .title("Categories")
                  .defaultOrdering([{ field: "title", direction: "asc" }])
              ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
