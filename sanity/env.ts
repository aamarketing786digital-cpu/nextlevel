// Sanity environment configuration
// These values should be set in .env.local
// Get your project ID from: https://www.sanity.io/manage

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ''
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
export const apiVersion = '2024-01-01'

// Validate that required env vars are set
if (typeof window === 'undefined') {
  if (!projectId) {
    console.warn('Missing NEXT_PUBLIC_SANITY_PROJECT_ID')
  }
  if (!dataset) {
    console.warn('Missing NEXT_PUBLIC_SANITY_DATASET')
  }
}
