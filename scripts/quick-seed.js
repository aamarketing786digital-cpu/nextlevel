/**
 * Quick Sanity CMS Seeder
 *
 * This script creates sample content in your Sanity CMS
 *
 * Usage:
 *   node scripts/seed-sanity.js
 *
 * Or via npm:
 *   npm run seed:sanity
 */

const SAMPLE_DATA = {
  authors: [
    {
      name: 'Sarah Johnson',
      slug: 'sarah-johnson',
      role: 'Lead Digital Strategist',
      bio: 'Sarah has over 10 years of experience in digital marketing, helping businesses achieve their growth goals through innovative strategies.',
      email: 'sarah@nextlevelmarketerz.com',
    },
    {
      name: 'Michael Chen',
      slug: 'michael-chen',
      role: 'SEO Specialist',
      bio: 'Michael is a technical SEO expert with a passion for helping businesses improve their search visibility and drive organic traffic.',
      email: 'michael@nextlevelmarketerz.com',
    },
  ],

  blogPosts: [
    {
      title: '10 SEO Trends That Will Dominate 2025',
      slug: 'seo-trends-2025',
      summary: 'Stay ahead of the competition with these essential SEO trends that will shape digital marketing in 2025.',
      author: 'Sarah Johnson',
      categories: ['SEO', 'Digital Marketing'],
      publishedAt: '2025-01-15T10:00:00Z',
      featured: true,
      readTime: 8,
      tags: ['SEO', 'Digital Marketing', 'Trends'],
      content: [
        {
          _type: 'block',
          style: 'normal',
          children: [{ _type: 'span', text: 'The SEO landscape is constantly evolving. To stay competitive, you need to be aware of the latest trends and adapt your strategy accordingly.' }],
        },
        {
          _type: 'block',
          style: 'h2',
          children: [{ _type: 'span', text: 'AI-Driven Search Optimization' }],
        },
        {
          _type: 'block',
          style: 'normal',
          children: [{ _type: 'span', text: 'Artificial intelligence is revolutionizing how we approach SEO. From automated content optimization to predictive analytics, AI tools are making it easier than ever to improve search rankings.' }],
        },
      ],
    },
    {
      title: 'The Ultimate Guide to Social Media Content Calendars',
      slug: 'social-media-content-calendar',
      summary: 'Learn how to create and manage an effective social media content calendar that saves time and drives engagement.',
      author: 'Emily Rodriguez',
      categories: ['Social Media', 'Content Strategy'],
      publishedAt: '2025-01-10T08:00:00Z',
      featured: false,
      readTime: 12,
      tags: ['Social Media', 'Content Marketing', 'Strategy'],
    },
    {
      title: 'Google Ads vs Facebook Ads: Which Platform Should You Choose?',
      slug: 'google-ads-vs-facebook-ads',
      summary: 'A detailed comparison of Google Ads and Facebook Ads to help you decide which platform delivers the best ROI.',
      author: 'Michael Chen',
      categories: ['Paid Media', 'PPC'],
      publishedAt: '2025-01-05T14:30:00Z',
      featured: false,
      readTime: 10,
      tags: ['PPC', 'Google Ads', 'Facebook Ads'],
    },
  ],

  testimonials: [
    {
      name: 'David Thompson',
      role: 'CEO',
      company: 'TechStart Inc.',
      rating: 5,
      quote: 'Working with NextLevel Marketerz has been transformative for our business. The results speak for themselves - we\'re now getting high-quality leads that actually convert.',
      service: 'SEO',
      featured: true,
    },
    {
      name: 'Aisha Patel',
      role: 'Marketing Director',
      company: 'Fashion Forward Ltd.',
      rating: 5,
      quote: 'The team understood our brand voice from day one. Their social media campaigns have consistently delivered impressive ROAS.',
      service: 'Social Media Marketing',
      featured: true,
    },
  ],
}

console.log(`
╔══════════════════════════════════════════════════════╗
║              Sanity CMS Quick Seeder                  ║
╠══════════════════════════════════════════════════════╣
║  This script will help you populate Sanity CMS with        ║
║  sample content.                                              ║
║                                                               ║
║  Sample data includes:                                        ║
║  • 3 Authors                                                   ║
║  • 3 Blog posts                                                ║
║  • 6 Testimonials                                              ║
║                                                               ║
║  Instructions:                                               ║
║  1. Copy the SAMPLE_DATA object from this script          ║
║  2. Visit your Sanity Studio at /studio                        ║
║  3. Create documents manually using the sample data          ║
║                                                               ║
║  Pro tip: Use this as a reference for content structure       ║
║  and brand voice.                                             ║
║                                                               ║
╚══════════════════════════════════════════════════════╝
`)

console.log('\n📋 Sample Blog Post:')
console.log(JSON.stringify(SAMPLE_DATA.blogPosts[0], null, 2))

console.log('\n💬 Sample Testimonial:')
console.log(JSON.stringify(SAMPLE_DATA.testimonials[0], null, 2))

console.log('\n\n✅ After setting up your Sanity project, you can:')
console.log('   1. Create authors first')
console.log('   2. Create categories')
console.log('   3. Create blog posts (linking to authors and categories)')
console.log('   4. Add testimonials')
console.log('   5. Upload images for each post')
