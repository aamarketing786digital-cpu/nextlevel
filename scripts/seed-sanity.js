#!/usr/bin/env node

/**
 * Sanity CMS Sample Data Seeder
 *
 * This script populates your Sanity CMS with sample content for:
 * - Blog posts
 * - Case studies
 * - Testimonials
 * - Videos
 * - Categories
 * - Authors
 *
 * Usage:
 *   1. Make sure your .env.local has:
 *      - NEXT_PUBLIC_SANITY_PROJECT_ID
 *      - NEXT_PUBLIC_SANITY_DATASET
 *      - SANITY_API_WRITE_TOKEN
 *   2. Run: node scripts/seed-sanity.js
 */

import { createClient } from 'next-sanity'
import 'dotenv/config'

// Note: dotenv/config automatically loads .env and .env.local

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_WRITE_TOKEN

if (!projectId) {
  console.error('❌ Error: NEXT_PUBLIC_SANITY_PROJECT_ID is required in .env.local')
  process.exit(1)
}

if (!token) {
  console.error('❌ Error: SANITY_API_WRITE_TOKEN is required in .env.local')
  console.error('Get your token at: https://www.sanity.io/manage')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: false,
  token,
})

// ============================================
// SAMPLE DATA
// ============================================

const SAMPLE_AUTHORS = [
  {
    _type: 'author',
    name: 'Sarah Johnson',
    slug: { _type: 'slug', current: 'sarah-johnson' },
    role: 'Lead Digital Strategist',
    bio: 'Sarah has over 10 years of experience in digital marketing, helping businesses achieve their growth goals through innovative strategies and data-driven campaigns.',
    email: 'sarah@nextlevelmarketerz.com',
    social: {
      linkedin: 'https://linkedin.com/in/sarahjohnson',
      twitter: 'https://twitter.com/sarahjohnson',
    },
  },
  {
    _type: 'author',
    name: 'Michael Chen',
    slug: { _type: 'slug', current: 'michael-chen' },
    role: 'SEO Specialist',
    bio: 'Michael is a technical SEO expert with a passion for helping businesses improve their search visibility and drive organic traffic.',
    email: 'michael@nextlevelmarketerz.com',
    social: {
      linkedin: 'https://linkedin.com/in/michaelchen',
    },
  },
  {
    _type: 'author',
    name: 'Emily Rodriguez',
    slug: { _type: 'slug', current: 'emily-rodriguez' },
    role: 'Content Marketing Lead',
    bio: 'Emily specializes in creating compelling content that engages audiences and drives conversions across all digital channels.',
    email: 'emily@nextlevelmarketerz.com',
    social: {
      linkedin: 'https://linkedin.com/in/emilyrodriguez',
    },
  },
]

const SAMPLE_CATEGORIES = [
  // Blog categories
  { _type: 'category', title: 'Digital Marketing', slug: { _type: 'slug', current: 'digital-marketing' }, color: '#f59e0b', icon: 'TrendingUp', categoryType: 'blog', description: 'Comprehensive digital marketing strategies' },
  { _type: 'category', title: 'SEO', slug: { _type: 'slug', current: 'seo' }, color: '#10b981', icon: 'Search', categoryType: 'blog', description: 'Search engine optimization techniques' },
  { _type: 'category', title: 'Social Media', slug: { _type: 'slug', current: 'social-media' }, color: '#ec4899', icon: 'Share2', categoryType: 'blog', description: 'Social media marketing and management' },
  { _type: 'category', title: 'Content Strategy', slug: { _type: 'slug', current: 'content-strategy' }, color: '#8b5cf6', icon: 'FileText', categoryType: 'blog', description: 'Content planning and strategy' },

  // Case study categories
  { _type: 'category', title: 'E-Commerce', slug: { _type: 'slug', current: 'ecommerce' }, color: '#ef4444', icon: 'ShoppingCart', categoryType: 'caseStudy', description: 'Online retail and e-commerce solutions' },
  { _type: 'category', title: 'SaaS', slug: { _type: 'slug', current: 'saas' }, color: '#6366f1', icon: 'Cloud', categoryType: 'caseStudy', description: 'Software as a service marketing' },
  { _type: 'category', title: 'Healthcare', slug: { _type: 'slug', current: 'healthcare' }, color: '#14b8a6', icon: 'Heart', categoryType: 'caseStudy', description: 'Healthcare and medical marketing' },

  // Video categories
  { _type: 'category', title: 'Tutorials', slug: { _type: 'slug', current: 'tutorials' }, color: '#f59e0b', icon: 'PlayCircle', categoryType: 'video', description: 'Educational video content' },
  { _type: 'category', title: 'Case Studies', slug: { _type: 'slug', current: 'case-studies' }, color: '#10b981', icon: 'Briefcase', categoryType: 'video', description: 'Customer success stories' },

  // General
  { _type: 'category', title: 'Lead Generation', slug: { _type: 'slug', current: 'lead-generation' }, color: '#f59e0b', icon: 'Users', categoryType: 'all', description: 'Generating quality leads' },
  { _type: 'category', title: 'Brand Strategy', slug: { _type: 'slug', current: 'brand-strategy' }, color: '#8b5cf6', icon: 'Palette', categoryType: 'all', description: 'Building strong brands' },
]

const SAMPLE_BLOG_POSTS = [
  {
    _type: 'post',
    title: '10 SEO Trends That Will Dominate 2025',
    slug: { _type: 'slug', current: 'seo-trends-2025' },
    summary: 'Stay ahead of the competition with these essential SEO trends that will shape digital marketing in 2025. From AI-driven search to voice optimization, discover what strategies will drive organic growth.',
    status: 'published',
    featured: true,
    readTime: 8,
    publishedAt: new Date('2025-01-15T10:00:00Z').toISOString(),
    tags: ['SEO', 'Digital Marketing', 'Trends', '2025'],
    faqs: [
      { question: 'What is AI-driven SEO?', answer: 'AI-driven SEO uses artificial intelligence to analyze search patterns, optimize content automatically, and predict ranking changes.' },
      { question: 'How important is voice search?', answer: 'Voice search is becoming crucial as more users rely on smart speakers and mobile voice assistants for searches.' },
    ],
    seo: {
      seoTitle: 'SEO Trends 2025: 10 Strategies to Boost Your Rankings',
      seoDescription: 'Discover the top SEO trends for 2025. Learn about AI-driven search, voice optimization, and more strategies to improve your rankings.',
    },
  },
  {
    _type: 'post',
    title: 'The Ultimate Guide to Social Media Content Calendars',
    slug: { _type: 'slug', current: 'social-media-content-calendar' },
    summary: 'Learn how to create and manage an effective social media content calendar that saves time, maintains consistency, and drives engagement across all your platforms.',
    status: 'published',
    featured: false,
    readTime: 12,
    publishedAt: new Date('2025-01-10T08:00:00Z').toISOString(),
    tags: ['Social Media', 'Content Marketing', 'Strategy'],
    faqs: [
      { question: 'How far in advance should I plan content?', answer: 'Ideally, plan your content 2-4 weeks in advance, but always leave room for timely posts and trends.' },
      { question: 'Which tools are best for content calendars?', answer: 'Popular tools include Trello, Asana, Notion, and specialized social media management tools like Buffer and Hootsuite.' },
    ],
    seo: {
      seoTitle: 'Social Media Content Calendar: The Complete Guide',
      seoDescription: 'Master social media planning with our comprehensive guide to content calendars. Save time and boost engagement.',
    },
  },
  {
    _type: 'post',
    title: 'Google Ads vs Facebook Ads: Which Platform Should You Choose?',
    slug: { _type: 'slug', current: 'google-ads-vs-facebook-ads' },
    summary: 'A detailed comparison of Google Ads and Facebook Ads to help you decide which paid advertising platform delivers the best ROI for your business goals and budget.',
    status: 'published',
    featured: false,
    readTime: 10,
    publishedAt: new Date('2025-01-05T14:30:00Z').toISOString(),
    tags: ['PPC', 'Google Ads', 'Facebook Ads', 'Advertising'],
    faqs: [
      { question: 'Which platform is better for beginners?', answer: 'Facebook Ads is generally more beginner-friendly with simpler targeting options. Google Ads has a steeper learning curve but can offer more precise intent targeting.' },
      { question: 'What budget should I start with?', answer: 'Start with a daily budget of $10-20 per platform to test and learn. Scale up once you identify what works best for your business.' },
    ],
    seo: {
      seoTitle: 'Google Ads vs Facebook Ads: Which Platform is Right for You?',
      seoDescription: 'Compare Google Ads and Facebook Ads head-to-head. Learn which PPC platform offers better ROI for your business.',
    },
  },
  {
    _type: 'post',
    title: 'Building a Brand from Scratch: Lessons from Successful Startups',
    slug: { _type: 'slug', current: 'building-brand-from-scratch' },
    summary: 'Discover the key elements that go into building a memorable brand, from defining your unique value proposition to creating visual identities that resonate with your target audience.',
    status: 'published',
    featured: true,
    readTime: 15,
    publishedAt: new Date('2025-01-01T09:00:00Z').toISOString(),
    tags: ['Branding', 'Strategy', 'Startups', 'Marketing'],
    faqs: [
      { question: 'What are the first steps in branding?', answer: 'Start by defining your brand mission, values, and target audience. Then develop your visual identity including logo, colors, and typography.' },
      { question: 'How much does branding cost?', answer: 'Branding costs vary widely, but expect to invest $5,000-50,000+ for professional branding including strategy, visual design, and brand guidelines.' },
    ],
    seo: {
      seoTitle: 'How to Build a Brand from Scratch: Complete Guide',
      seoDescription: 'Learn how successful startups build memorable brands. A step-by-step guide to brand development.',
    },
  },
]

const SAMPLE_CASE_STUDIES = [
  {
    _type: 'caseStudy',
    title: 'TechStart: 300% Revenue Growth with SEO & Content Marketing',
    slug: { _type: 'slug', current: 'techstart-seo-case-study' },
    tagline: 'How we helped a SaaS startup achieve 300% revenue growth in 6 months',
    featured: true,
    services: ['SEO', 'Content Marketing', 'PPC', 'Email Marketing'],
    duration: '6 months',
    teamSize: '4 members',
    client: {
      industry: 'SaaS / B2B Software',
      location: 'United States',
      website: 'https://techstart-example.com',
    },
    projectSummary: 'TechStart came to us looking to scale their organic traffic and improve lead quality. They had a great product but were struggling to get noticed in a crowded SaaS market.',
    results: [
      { metric: '300% increase in organic traffic', icon: 'TrendingUp' },
      { metric: '65% improvement in lead quality', icon: 'Target' },
      { metric: '$2.5M additional pipeline value', icon: 'DollarSign' },
      { metric: '150% increase in trial signups', icon: 'UserPlus' },
    ],
    testimonial: 'NextLevel Marketerz transformed our approach to marketing. The results speak for themselves - we\'re now getting high-quality leads that actually convert.',
    publishedAt: new Date('2025-01-20T10:00:00Z').toISOString(),
  },
  {
    _type: 'caseStudy',
    title: 'Fashion Forward: E-commerce Success with Social Ads',
    slug: { _type: 'slug', current: 'fashion-forward-ecommerce-case-study' },
    tagline: 'Achieving 8x ROAS through strategic social media advertising',
    featured: false,
    services: ['Facebook Ads', 'Instagram Ads', 'Pinterest Ads', 'Social Media Management'],
    duration: '3 months',
    teamSize: '3 members',
    client: {
      industry: 'E-Commerce / Fashion',
      location: 'United Kingdom',
    },
    projectSummary: 'Fashion Forward is an online fashion retailer looking to scale their paid social advertising across multiple platforms while maintaining profitability.',
    results: [
      { metric: '8x return on ad spend', icon: 'TrendingUp' },
      { metric: '250% increase in online sales', icon: 'ShoppingCart' },
      { metric: '45% decrease in cost per acquisition', icon: 'ArrowDown' },
      { metric: '120K+ new customers acquired', icon: 'Users' },
    ],
    publishedAt: new Date('2025-01-10T14:00:00Z').toISOString(),
  },
  {
    _type: 'caseStudy',
    title: 'HealthFirst Clinic: Dominating Local Healthcare Search',
    slug: { _type: 'slug', current: 'healthfirst-clinic-seo-case-study' },
    tagline: 'From page 5 to #1 in local search results for healthcare keywords',
    featured: true,
    services: ['Local SEO', 'Google Business Profile', 'Content Marketing', 'Review Management'],
    duration: '4 months',
    teamSize: '2 members',
    client: {
      industry: 'Healthcare / Medical',
      location: 'UAE',
    },
    projectSummary: 'HealthFirst Clinic needed to improve their local search visibility to attract more patients to their multiple clinic locations.',
    results: [
      { metric: '#1 ranking for 50+ keywords', icon: 'Search' },
      { metric: '400% increase in appointment bookings', icon: 'Calendar' },
      { metric: '200% increase in website traffic', icon: 'Users' },
      { metric: '4.9 star average rating', icon: 'Star' },
    ],
    publishedAt: new Date('2025-01-05T09:00:00Z').toISOString(),
  },
]

const SAMPLE_TESTIMONIALS = [
  {
    _type: 'testimonial',
    name: 'David Thompson',
    role: 'CEO',
    company: 'TechStart Inc.',
    rating: 5,
    quote: 'Working with NextLevel Marketerz has been transformative for our business. Their data-driven approach to SEO and content marketing helped us achieve results we never thought possible. The team is responsive, strategic, and truly cares about our success.',
    service: 'SEO',
    featured: true,
    order: 1,
    publishedAt: new Date('2025-01-20T10:00:00Z').toISOString(),
  },
  {
    _type: 'testimonial',
    name: 'Aisha Patel',
    role: 'Marketing Director',
    company: 'Fashion Forward Ltd.',
    rating: 5,
    quote: 'The NextLevel team understood our brand voice from day one. Their social media campaigns have consistently delivered impressive ROAS, and they\'re always proactive with new ideas and optimizations.',
    service: 'Social Media Marketing',
    featured: true,
    order: 2,
    publishedAt: new Date('2025-01-15T14:30:00Z').toISOString(),
  },
  {
    _type: 'testimonial',
    name: 'Dr. Sarah Al-Hassan',
    role: 'Medical Director',
    company: 'HealthFirst Clinic',
    rating: 5,
    quote: 'We needed a partner who understood healthcare marketing. NextLevel Marketerz delivered a local SEO strategy that put our clinics on the map. Patient inquiries have increased dramatically, and we\'re now the go-to-choice in our area.',
    service: 'Local SEO',
    featured: true,
    order: 3,
    publishedAt: new Date('2025-01-10T09:00:00Z').toISOString(),
  },
  {
    _type: 'testimonial',
    name: 'James Wilson',
    role: 'Founder',
    company: 'GrowthStack.io',
    rating: 4,
    quote: 'The team at NextLevel helped us scale from $10k to $100k MRR in just 8 months. Their expertise in B2B marketing and lead generation is unmatched. Highly recommend for any SaaS company looking to grow.',
    service: 'Lead Generation',
    featured: false,
    order: 4,
    publishedAt: new Date('2025-01-05T08:00:00Z').toISOString(),
  },
  {
    _type: 'testimonial',
    name: 'Maria Santos',
    role: 'E-commerce Manager',
    company: 'StyleHub',
    rating: 5,
    quote: 'Our paid ad spend was going nowhere until we partnered with NextLevel. They completely restructured our campaigns and achieved an 8x ROAS within the first quarter. Outstanding results!',
    service: 'Google Ads',
    featured: false,
    order: 5,
    publishedAt: new Date('2025-01-03T16:00:00Z').toISOString(),
  },
  {
    _type: 'testimonial',
    name: 'Robert Chang',
    role: 'CMO',
    company: 'FinanceFlow',
    rating: 5,
    quote: 'NextLevel Marketerz has been instrumental in our content marketing efforts. Their blog strategy alone has increased our organic traffic by 200%. They\'re not just an agency, they\'re true partners.',
    service: 'Content Marketing',
    featured: true,
    order: 6,
    publishedAt: new Date('2024-12-20T11:00:00Z').toISOString(),
  },
]

const SAMPLE_VIDEOS = [
  {
    _type: 'video',
    title: 'How to Create an Effective SEO Strategy in 2025',
    slug: { _type: 'slug', current: 'effective-seo-strategy-2025' },
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Replace with real URL
    videoId: 'dQw4w9WgXcQ',
    description: 'Learn the step-by-step process for creating an SEO strategy that drives results in 2025. We cover keyword research, on-page optimization, link building, and technical SEO essentials for modern websites.',
    duration: '12:45',
    videoType: 'tutorial',
    featured: true,
    publishedAt: new Date('2025-01-18T10:00:00Z').toISOString(),
  },
  {
    _type: 'video',
    title: 'Client Success Story: How TechStart Scaled to $1M ARR',
    slug: { _type: 'slug', current: 'techstart-client-success-story' },
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Replace with real URL
    videoId: 'dQw4w9WgXcQ',
    description: 'Discover how TechStart used NextLevel Marketerz\'s strategies to scale from $250k to $1M in annual recurring revenue. A deep dive into their marketing playbook and the tactics that drove growth.',
    duration: '18:30',
    videoType: 'caseStudy',
    featured: true,
    publishedAt: new Date('2025-01-15T14:00:00Z').toISOString(),
  },
  {
    _type: 'video',
    title: '5 Google Ads Mistakes That Are Wasting Your Budget',
    slug: { _type: 'slug', current: 'google-ads-mistakes' },
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Replace with real URL
    videoId: 'dQw4w9WgXcQ',
    description: 'Are you making these common Google Ads mistakes? Learn how to identify and fix budget-draining errors that could be costing your business thousands of dollars every month.',
    duration: '8:15',
    videoType: 'tips',
    featured: false,
    publishedAt: new Date('2025-01-10T09:00:00Z').toISOString(),
  },
  {
    _type: 'video',
    title: 'Social Media Marketing Tips for Small Businesses',
    slug: { _type: 'slug', current: 'social-media-tips-small-business' },
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Replace with real URL
    videoId: 'dQw4w9WgXcQ',
    description: 'Essential social media marketing tips that every small business owner should know. From content planning to community engagement, learn how to maximize your social media ROI with limited resources.',
    duration: '15:20',
    videoType: 'insight',
    featured: false,
    publishedAt: new Date('2025-01-05T08:00:00Z').toISOString(),
  },
]

// ============================================
// UTILITY FUNCTIONS
// ============================================

async function slugExists(type, slug) {
  const existing = await client.fetch(
    `*[_type == $type && slug.current == $slug][0]`,
    { type, slug }
  )
  return !!existing
}

async function createDocument(doc, type) {
  try {
    console.log(`Creating ${type}: ${doc.title || doc.name}`)

    // Check if document with this slug already exists (only for types with slugs)
    const slugValue = doc.slug?.current || doc.slug
    if (slugValue) {
      const exists = await slugExists(type, slugValue)
      if (exists) {
        console.log(`  ⚠️  Skipped (already exists)`)
        return null
      }
    }

    const result = await client.create(doc)
    console.log(`  ✅ Created: ${result._id}`)
    return result
  } catch (error) {
    console.error(`  ❌ Error creating ${type}:`, error.message)
    return null
  }
}

async function main() {
  console.log('🌱 Starting Sanity CMS Seeding...\n')

  let createdCount = 0
  let skippedCount = 0

  // ============================================
  // 1. CREATE AUTHORS
  // ============================================
  console.log('📝 Creating Authors...')
  for (const author of SAMPLE_AUTHORS) {
    const result = await createDocument(author, 'author')
    if (result) createdCount++
    else skippedCount++
  }
  console.log(`\nAuthors: ${createdCount} created, ${skippedCount} skipped\n`)

  createdCount = 0
  skippedCount = 0

  // ============================================
  // 2. CREATE CATEGORIES
  // ============================================
  console.log('🏷️  Creating Categories...')
  for (const category of SAMPLE_CATEGORIES) {
    const result = await createDocument(category, 'category')
    if (result) createdCount++
    else skippedCount++
  }
  console.log(`Categories: ${createdCount} created, ${skippedCount} skipped\n`)

  // Fetch category IDs for references
  const categories = await client.fetch(`*[_type == "category"]{
    _id,
    "slug": slug.current,
    title
  }`)

  const getCategoryIds = (names) => {
    return categories
      .filter((cat) => names.includes(cat.title))
      .map((cat) => ({ _type: 'reference', _ref: cat._id }))
  }

  const getAuthor = async (name) => {
    const author = await client.fetch(`*[_type == "author" && name == $name][0]`, { name })
    return author ? { _type: 'reference', _ref: author._id } : undefined
  }

  createdCount = 0
  skippedCount = 0

  // ============================================
  // 3. CREATE BLOG POSTS
  // ============================================
  console.log('📰 Creating Blog Posts...')
  const author = await getAuthor('Sarah Johnson')

  for (const post of SAMPLE_BLOG_POSTS) {
    const categoryNames = ['Digital Marketing', 'SEO', 'Social Media', 'Content Strategy']
    const postWithRefs = {
      ...post,
      author,
      categories: getCategoryIds(categoryNames),
      // Note: mainImage removed - you can add images later in Sanity Studio
    }
    const result = await createDocument(postWithRefs, 'post')
    if (result) createdCount++
    else skippedCount++
  }
  console.log(`Blog Posts: ${createdCount} created, ${skippedCount} skipped\n`)

  createdCount = 0
  skippedCount = 0

  // ============================================
  // 4. CREATE CASE STUDIES
  // ============================================
  console.log('💼 Creating Case Studies...')
  for (const caseStudy of SAMPLE_CASE_STUDIES) {
    const result = await createDocument(caseStudy, 'caseStudy')
    if (result) createdCount++
    else skippedCount++
  }
  console.log(`Case Studies: ${createdCount} created, ${skippedCount} skipped\n`)

  createdCount = 0
  skippedCount = 0

  // ============================================
  // 5. CREATE TESTIMONIALS
  // ============================================
  console.log('💬 Creating Testimonials...')
  for (const testimonial of SAMPLE_TESTIMONIALS) {
    const result = await createDocument(testimonial, 'testimonial')
    if (result) createdCount++
    else skippedCount++
  }
  console.log(`Testimonials: ${createdCount} created, ${skippedCount} skipped\n`)

  createdCount = 0
  skippedCount = 0

  // ============================================
  // 6. CREATE VIDEOS
  // ============================================
  console.log('🎥 Creating Videos...')
  const videoCategories = ['Digital Marketing', 'SEO', 'Content Strategy']

  for (const video of SAMPLE_VIDEOS) {
    const videoWithRefs = {
      ...video,
      categories: getCategoryIds(videoCategories),
    }
    const result = await createDocument(videoWithRefs, 'video')
    if (result) createdCount++
    else skippedCount++
  }
  console.log(`Videos: ${createdCount} created, ${skippedCount} skipped\n`)

  // ============================================
  // SUMMARY
  // ============================================
  console.log('\n✨ Seeding Complete!\n')
  console.log('Next Steps:')
  console.log('1. Go to your Sanity Studio at http://localhost:3000/studio')
  console.log('2. Update image placeholders with real images')
  console.log('3. Replace YouTube URLs with actual video URLs')
  console.log('4. Review and edit content to match your brand voice')
  console.log('5. Add real author photos and avatars')
}

// ============================================
// RUN
// ============================================
main().catch(console.error)
