const { createClient } = require('@sanity/client')
require('dotenv').config({ path: '.env.local' })

/**
 * Bulk Enrichment Script Template
 * 
 * Use this to programmatically update large numbers of documents in Sanity.
 * Ideal for SEO enrichment, technical specs, or batch data corrections.
 */

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_WRITE_TOKEN

const client = createClient({ 
  projectId, 
  dataset, 
  apiVersion: '2024-03-09', 
  token, 
  useCdn: false 
})

// Enrichment data keyed by identifier (e.g., slug)
const enrichments = {
  'example-slug': {
    description: "Detailed description here...",
    specs: [
      { label: 'Material', value: 'High-Grade Polyethylene' },
      { label: 'Origin', value: 'Domestic' },
    ]
  }
}

async function runEnrichment() {
  console.log('📝 Fetching documents...')
  const docs = await client.fetch(`*[_type == "product"]{_id, "slug": slug.current, name}`)
  
  console.log(`Found ${docs.length} documents. Updating...\n`)
  
  for (const doc of docs) {
    const data = enrichments[doc.slug]
    if (!data) continue

    const specs = data.specs.map((s, i) => ({
      _key: `spec${i+1}-${Date.now()}`,
      _type: 'spec', // Matches schema object type
      label: s.label,
      value: s.value,
    }))

    try {
      await client
        .patch(doc._id)
        .set({
          description: data.description,
          specifications: specs,
        })
        .commit()
      
      console.log(`✅ Enriched: ${doc.slug}`)
    } catch (err) {
      console.error(`❌ Error updating ${doc.slug}:`, err.message)
    }
  }
}

runEnrichment().catch(console.error)
