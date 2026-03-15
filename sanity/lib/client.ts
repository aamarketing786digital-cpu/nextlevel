import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '../env'

/**
 * Sanity CMS client configuration
 * - useCdn: false for ISR support
 * - stega: enabled in development for visual editing
 * - perspective: 'published' to avoid draft timeout issues
 * - cache: 'force-cache' for Next.js 15 tag-based revalidation
 */
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Required for ISR revalidation
  perspective: 'published', // Only fetch published documents
  stega: {
    enabled: process.env.NODE_ENV === 'development',
    studioUrl: '/studio',
    filter: (props) => {
      // Don't encode the URL field
      if (props.sourcePath.at(-1) === 'url') return false
      return props.filterDefault(props)
    },
  },
  // Add request tag for debugging
  requestTagPrefix: 'nextlevel-marketerz',
  // Default caching for all fetches (can be overridden per-request)
  cache: 'force-cache',
})

/**
 * Helper function to fetch data with error handling
 */
export async function sanityFetch<T>(
  query: string,
  params?: Record<string, unknown>
): Promise<T> {
  try {
    return await client.fetch<T>(query, params || {})
  } catch (error) {
    console.error("Sanity fetch error:", error)
    throw error
  }
}
