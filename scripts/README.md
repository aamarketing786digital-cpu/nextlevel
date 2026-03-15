# Sanity CMS Seeding Scripts

This folder contains scripts to help you populate your Sanity CMS with sample content.

## Scripts

### `seed-sanity.js`
**Full seeder** - Creates sample documents in Sanity CMS

Creates:
- Authors (3 sample)
- Categories (10 sample)
- Blog Posts (3 sample posts with content)
- Case Studies (3 sample)
- Testimonials (6 sample)
- Videos (4 sample)

**Usage:**
```bash
npm run seed:sanity
```

**Or directly:**
```bash
node scripts/seed-sanity.js
```

### `quick-seed.js`
**Quick reference seeder** - Shows sample data format for manual entry

Displays formatted sample data that you can use as reference when manually creating documents in Sanity Studio.

**Usage:**
```bash
npm run seed:quick
```

**Or directly:**
```bash
node scripts/quick-seed.js
```

## Before Running

1. **Set up your Sanity Project:**
   - Create a project at [sanity.io/manage](https://www.sanity.io/manage)
   - Generate a **Write API Token** at: [sanity.io/manage/api](https://www.sanity.io/manage/api)
     - Click "Add API token"
     - Give it a name (e.g., "Seed Script")
     - Select **Write** permissions
     - Copy the generated token
   - Add your credentials to `.env.local`:
     ```env
     NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
     NEXT_PUBLIC_SANITY_DATASET=production
     SANITY_API_WRITE_TOKEN=your_write_token_here
     ```

2. **Install Dependencies (if not already installed):**
   ```bash
   npm install next-sanity @sanity/image-url @portabletext/react
   npm install -D sanity @sanity/vision
   ```

3. **Start Your Development Server:**
   ```bash
   npm run dev
   ```

4. **Access Sanity Studio:**
   - Go to http://localhost:3000/studio
   - Log in to your Sanity account

## Sample Content Overview

### Authors
- **Sarah Johnson** - Lead Digital Strategist
- **Michael Chen** - SEO Specialist
- **Emily Rodriguez** - Content Marketing Lead

### Blog Posts
1. "10 SEO Trends That Will Dominate 2025"
2. "The Ultimate Guide to Social Media Content Calendars"
3. "Google Ads vs Facebook Ads: Which Platform Should You Choose?"

### Case Studies
1. **TechStart** - 300% Revenue Growth with SEO
2. **Fashion Forward** - 8x ROAS with Social Ads
3. **HealthFirst Clinic** - #1 Local Search Results

### Testimonials
- David Thompson (CEO, TechStart Inc.)
- Aisha Patel (Marketing Director, Fashion Forward)
- Dr. Sarah Al-Hassan (Medical Director, HealthFirst Clinic)
- And 3 more...

### Videos
1. "How to Create an Effective SEO Strategy in 2025"
2. "Client Success Story: TechStart"
3. "5 Google Ads Mistakes to Avoid"
4. "Social Media Tips for Small Businesses"

## Customizing Sample Data

You can edit the `SAMPLE_DATA` objects in `seed-sanity.js` to match your brand:

1. **Change author names and details** - Edit `SAMPLE_AUTHORS`
2. **Update blog post titles** - Edit `SAMPLE_BLOG_POSTS`
3. **Modify testimonials** - Edit `SAMPLE_TESTIMONIALS`
4. **Add your own case studies** - Edit `SAMPLE_CASE_STUDIES`

## Adding Images

The script creates placeholder image references. To add real images:

1. Upload images in Sanity Studio
2. Copy the image asset ID
3. Replace the placeholder `image-*` references in the script with real asset IDs

## Troubleshooting

**Error: "Cannot find module '@/sanity/lib/client'"**
- Make sure your Sanity project is set up correctly
- Verify environment variables are in `.env.local`

**Documents not appearing in Studio**
- Refresh the Studio page
- Check that you're in the correct dataset
- Verify your write permissions

**Duplicate slug errors**
- The script automatically skips documents that already exist
- To re-seed, delete existing documents first
