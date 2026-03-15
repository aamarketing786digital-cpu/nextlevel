/**
 * Sanity Schema Types Index
 * Exports all document and object schemas
 */

// Import all schema types
import { postType } from "./postType"
import { categoryType } from "./categoryType"
import { authorType } from "./authorType"
import { caseStudyType } from "./caseStudyType"
import { testimonialType } from "./testimonialType"
import { videoType } from "./videoType"
import { seoType } from "./seoType"
import { blockContentType } from "./blockContentType"

// Export all as array for config
export const schemaTypes = [
  postType,
  categoryType,
  authorType,
  caseStudyType,
  testimonialType,
  videoType,
  seoType,
  blockContentType,
]
