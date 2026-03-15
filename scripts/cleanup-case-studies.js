#!/usr/bin/env node

import { createClient } from 'next-sanity'
import { config } from 'dotenv'
import { resolve } from 'path'

config({ path: resolve(process.cwd(), '.env') })
config({ path: resolve(process.cwd(), '.env.local') })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_WRITE_TOKEN

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: false,
  token,
})

async function cleanupCaseStudies() {
  console.log('🧹 Cleaning up ALL case studies (including drafts)...\n')

  try {
    // Fetch ALL case studies (published + drafts)
    const allDocs = await client.fetch(
      `*[_type == "caseStudy"]{ _id }`
    )

    console.log(`Found ${allDocs.length} case study documents`)

    if (allDocs.length === 0) {
      console.log('No case studies to delete')
      return
    }

    for (const doc of allDocs) {
      await client.delete(doc._id)
      console.log(`  🗑️  Deleted: ${doc._id}`)
    }

    console.log(`\n✅ Deleted ${allDocs.length} case studies`)
  } catch (error) {
    console.error('Error:', error.message)
  }
}

cleanupCaseStudies().catch(console.error)
