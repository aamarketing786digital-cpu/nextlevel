#!/usr/bin/env node

/**
 * Case Studies Seeder - Simple version
 */

import { createClient } from 'next-sanity'
import { config } from 'dotenv'
import { resolve } from 'path'

config({ path: resolve(process.cwd(), '.env') })
config({ path: resolve(process.cwd(), '.env.local') })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_WRITE_TOKEN

if (!projectId) {
  console.error('❌ Error: NEXT_PUBLIC_SANITY_PROJECT_ID is required')
  process.exit(1)
}

if (!token) {
  console.error('❌ Error: SANITY_API_WRITE_TOKEN is required')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: false,
  token,
})

// Simple PortableText blocks
const createBlock = (text, style = 'normal') => ({
  _type: 'block',
  style,
  children: [{ _type: 'span', text }],
})

const SAMPLE_CASE_STUDIES = [
  {
    _type: 'caseStudy',
    title: 'TechStart: 300% Revenue Growth',
    slug: { _type: 'slug', current: 'techstart-revenue-growth' },
    tagline: 'SEO & Content Marketing Success Story',
    description: 'We helped TechStart, a B2B SaaS startup, dominate their market through strategic SEO and content marketing initiatives. The result was 300% increase in organic traffic and $2.3M in additional ARR.',
    challenge: [
      createBlock('TechStart was struggling with low organic visibility despite having an excellent product. Their website was receiving less than 1,000 monthly visitors.'),
      createBlock('Key challenges:'),
      createBlock('• Low domain authority and few quality backlinks', 'normal'),
      createBlock('• Poor keyword targeting and content strategy', 'normal'),
      createBlock('• Technical SEO issues affecting crawlability', 'normal'),
    ],
    solution: [
      createBlock('Our Comprehensive Approach', 'h2'),
      createBlock('We developed and executed a multi-faceted strategy:'),
      createBlock('1. Technical SEO Overhaul', 'h3'),
      createBlock('Fixed site architecture, improved page speed, and optimized crawl budget.'),
      createBlock('2. Content Strategy', 'h3'),
      createBlock('Created comprehensive, long-form content targeting high-intent keywords.'),
      createBlock('3. Link Building Campaign', 'h3'),
      createBlock('Earned high-quality backlinks from industry publications.'),
    ],
    url: 'https://example.com/case-studies/techstart',
    buttonText: 'Read Full Case Study',
    featured: true,
    order: 1,
  },
  {
    _type: 'caseStudy',
    title: 'Fashion Forward: 8x ROAS Achievement',
    slug: { _type: 'slug', current: 'fashion-forward-roas' },
    tagline: 'Social Media Advertising Excellence',
    description: 'We helped Fashion Forward achieve an exceptional 8x return on ad spend through data-driven creative strategy, audience optimization, and campaign restructuring that generated $4.2M in revenue.',
    challenge: [
      createBlock('Fashion Forward was burning through their ad budget with minimal results. Their Facebook and Instagram campaigns were generating sales but at unsustainable costs.'),
      createBlock('Key pain points:'),
      createBlock('• ROAS of only 1.2x (barely breaking even)', 'normal'),
      createBlock('• High cost per acquisition (CPA)', 'normal'),
      createBlock('• Ad creative fatigue and low engagement rates', 'normal'),
    ],
    solution: [
      createBlock('Data-Driven Creative Strategy', 'h2'),
      createBlock('We completely rebuilt their advertising approach:'),
      createBlock('• Creative Testing Framework - Systematic testing of video, carousel, and static ads'),
      createBlock('• Audience Optimization - Custom audiences based on purchase behavior'),
      createBlock('• Campaign Structure Overhaul - Better budget allocation at each funnel stage'),
    ],
    url: 'https://example.com/case-studies/fashion-forward',
    buttonText: 'See How We Did It',
    featured: true,
    order: 2,
  },
  {
    _type: 'caseStudy',
    title: 'HealthFirst Clinic: Local Search Domination',
    slug: { _type: 'slug', current: 'healthfirst-local-seo' },
    tagline: '#1 Rankings Across All Locations',
    description: 'We helped HealthFirst Clinic achieve #1 rankings in Google Maps for all 5 locations through comprehensive local SEO, Google Business Profile optimization, and strategic review management.',
    challenge: [
      createBlock('HealthFirst Clinic had 5 locations but was virtually invisible in local search. Competitors with inferior service were outranking them.'),
      createBlock('Their challenges:'),
      createBlock('• Inconsistent Google Business Profile listings', 'normal'),
      createBlock('• Low review count and poor rating (3.2 stars)', 'normal'),
      createBlock('• No local keyword visibility in map pack', 'normal'),
    ],
    solution: [
      createBlock('Local Search Domination Strategy', 'h2'),
      createBlock('We executed a comprehensive local SEO strategy:'),
      createBlock('• GBP Optimization - Optimized all listings with accurate NAP and categories'),
      createBlock('• Review Campaign - 200+ new 5-star reviews across all locations'),
      createBlock('• Local Citation Building - Built consistent citations across 150+ directories'),
    ],
    url: 'https://example.com/case-studies/healthfirst',
    buttonText: 'View Results',
    featured: false,
    order: 3,
  },
]

async function deleteAllCaseStudies() {
  console.log('🗑️  Deleting all case studies...')

  try {
    const allDocs = await client.fetch(
      `*[_type == "caseStudy"]{ _id }`
    )

    if (allDocs.length === 0) {
      console.log('  ℹ️  No existing case studies found')
      return
    }

    for (const doc of allDocs) {
      await client.delete(doc._id)
      console.log(`  🗑️  Deleted: ${doc._id}`)
    }

    console.log(`  ✅ Deleted ${allDocs.length} documents`)
  } catch (error) {
    console.error('  ❌ Error:', error.message)
  }
}

async function createCaseStudies() {
  console.log('\n📝 Creating new case studies...')

  let createdCount = 0
  let skippedCount = 0

  for (const caseStudy of SAMPLE_CASE_STUDIES) {
    try {
      console.log(`Creating: ${caseStudy.title}`)
      const result = await client.create(caseStudy)
      console.log(`  ✅ Created: ${result._id}`)
      createdCount++
    } catch (error) {
      if (error.message.includes('exists')) {
        console.log(`  ⚠️  Skipped (already exists)`)
        skippedCount++
      } else {
        console.error(`  ❌ Error: ${error.message}`)
      }
    }
  }

  console.log(`\nCase Studies: ${createdCount} created, ${skippedCount} skipped`)
}

async function main() {
  console.log('🌱 Case Studies Seeding Started...\n')
  console.log(`Project: ${projectId}`)
  console.log(`Dataset: ${dataset}\n`)

  await deleteAllCaseStudies()
  await createCaseStudies()

  console.log('\n✨ Seeding Complete!')
  console.log('\nNext Steps:')
  console.log('1. Go to your Sanity Studio at http://localhost:3000/studio')
  console.log('2. Add images to the case studies')
  console.log('3. Update content to match real clients')
}

main().catch(console.error)
