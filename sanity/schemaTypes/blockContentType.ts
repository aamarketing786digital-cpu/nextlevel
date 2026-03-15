import { defineType, defineArrayMember } from "sanity"
import { ImageIcon } from "@sanity/icons"

/**
 * Portable Text configuration for rich content
 * Supports headings, lists, links, and inline images
 */
export const blockContentType = defineType({
  title: "Block Content",
  name: "blockContent",
  type: "array",
  of: [
    // Text blocks with rich formatting
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "Heading 1", value: "h1" },
        { title: "Heading 2", value: "h2" },
        { title: "Heading 3", value: "h3" },
        { title: "Heading 4", value: "h4" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Numbered", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
          { title: "Code", value: "code" },
          { title: "Underline", value: "underline" },
          { title: "Strike", value: "strike-through" },
        ],
        annotations: [
          {
            title: "URL",
            name: "link",
            type: "object",
            fields: [
              {
                title: "URL",
                name: "href",
                type: "url",
                validation: (Rule) => Rule.uri({
                  scheme: ["http", "https", "mailto", "tel"],
                }),
              },
              {
                title: "Open in new tab",
                name: "blank",
                type: "boolean",
                initialValue: true,
              },
            ],
          },
          {
            title: "Internal Link",
            name: "internalLink",
            type: "object",
            fields: [
              {
                title: "Reference",
                name: "reference",
                type: "reference",
                weak: true,
                to: [{ type: "post" }, { type: "caseStudy" }],
              },
            ],
          },
        ],
      },
    }),
    // Inline images
    defineArrayMember({
      type: "image",
      icon: ImageIcon,
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
          description: "Important for SEO and accessibility",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "caption",
          type: "string",
          title: "Caption",
          description: "Optional image caption",
        },
      ],
    }),
  ],
})
