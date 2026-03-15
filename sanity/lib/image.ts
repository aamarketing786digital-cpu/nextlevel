import { createImageUrlBuilder } from '@sanity/image-url'
import { dataset, projectId } from '../env'

/**
 * Image URL builder for Sanity assets
 * Provides optimized image URLs with resizing, cropping, and quality control
 */
const builder = createImageUrlBuilder({ projectId, dataset })

export const urlFor = (source: any) => {
  return builder.image(source)
}

/**
 * Helper function to get optimized image URL
 * @param source - Sanity image object
 * @param width - Image width (default: 800)
 * @param quality - Image quality 1-100 (default: 80)
 */
export function getOptimizedImageUrl(
  source: any,
  width: number = 800,
  quality: number = 80
): string | null {
  if (!source) return null
  return urlFor(source).width(width).quality(quality).url() || null
}

/**
 * Helper function for Open Graph images (1200x630)
 */
export function getOgImageUrl(source: any): string | null {
  if (!source) return null
  return urlFor(source)
    .width(1200)
    .height(630)
    .fit('crop')
    .quality(90)
    .url() || null
}
