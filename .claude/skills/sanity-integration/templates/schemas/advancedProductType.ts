import { defineArrayMember, defineField, defineType } from "sanity"
import { SparklesIcon } from "@sanity/icons"

/**
 * Advanced Product Schema Template
 * 
 * Features: 
 * - Multi-field pricing object
 * - Key-value pair specifications
 * - Rich SEO metadata
 */
export const advancedProductType = defineType({
  name: "product",
  title: "Product",
  type: "document",
  icon: SparklesIcon,
  fields: [
    defineField({
      name: "name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "name" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      type: "reference",
      to: [{ type: "category" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      type: "text",
      rows: 5,
    }),
    defineField({
      name: "specifications",
      title: "Technical Specifications",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "spec",
          fields: [
            { name: "label", type: "string", title: "Label (e.g. Material)" },
            { name: "value", type: "string", title: "Value (e.g. Steel)" },
          ],
          preview: {
            select: { title: "label", subtitle: "value" }
          }
        })
      ]
    }),
    defineField({
      name: "pricing",
      type: "object",
      fields: [
        { name: "price", type: "number" },
        { name: "currency", type: "string", initialValue: "AED" },
      ]
    }),
    defineField({
      name: "images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }]
    }),
  ]
})
