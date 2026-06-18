#!/usr/bin/env node

/**
 * Add Stock Images to Blog Posts
 *
 * Downloads relevant stock images from Unsplash and uploads them to Sanity CMS,
 * then patches each blog post with the appropriate featured image.
 *
 * Usage: node scripts/add-blog-images.mjs
 */

import { createClient } from "next-sanity";
import { readFileSync } from "fs";
import { resolve } from "path";
import { config } from "dotenv";
import https from "https";
import http from "http";

// Load .env.local
config({ path: resolve(process.cwd(), ".env.local") });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error(
    "❌ Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN in .env.local"
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  useCdn: false,
  token,
});

// ============================================
// BLOG POST IMAGE MAPPING
// Each entry maps a blog slug to a relevant Unsplash stock image URL
// ============================================

const BLOG_IMAGE_MAP = [
  {
    slug: "seo-trends-2025",
    // SEO / search analytics dashboard
    imageUrl:
      "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?q=80&w=1200&h=630&fit=crop",
    alt: "SEO analytics dashboard showing search trends and performance metrics",
    caption: "Stay ahead with the latest SEO trends for 2025",
  },
  {
    slug: "social-media-content-calendar",
    // Content planning / calendar
    imageUrl:
      "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?q=80&w=1200&h=630&fit=crop",
    alt: "Social media content planning with a digital calendar and engagement analytics",
    caption: "Master your social media content strategy with an effective calendar",
  },
  {
    slug: "google-ads-vs-facebook-ads",
    // Digital advertising / PPC
    imageUrl:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&h=630&fit=crop",
    alt: "Digital advertising analytics comparing paid advertising platform performance",
    caption: "Google Ads vs Facebook Ads — which platform delivers better ROI?",
  },
  {
    slug: "building-brand-from-scratch",
    // Branding / startup creative workspace
    imageUrl:
      "https://images.unsplash.com/photo-1493612276216-ee3925520721?q=80&w=1200&h=630&fit=crop",
    alt: "Creative branding workspace with design elements and color swatches",
    caption: "Building a memorable brand from scratch — lessons from successful startups",
  },
  {
    slug: "future-web-development-2026",
    imageUrl:
      "https://images.unsplash.com/photo-1550439062-609e1531270e?q=80&w=1200&h=630&fit=crop",
    alt: "Abstract digital representation of futuristic web development technologies",
    caption: "The future of web development is edge computing and AI-driven",
  },
  {
    slug: "advanced-seo-strategies-beyond-keywords",
    imageUrl:
      "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=1200&h=630&fit=crop",
    alt: "Marketing professional working on advanced SEO strategies and data analysis",
    caption: "Advanced SEO moves beyond basic keyword research",
  },
  {
    slug: "maximizing-roi-digital-marketing-analytics",
    imageUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&h=630&fit=crop",
    alt: "Digital marketing analytics dashboard showing ROI metrics and data",
    caption: "Maximize your ROI with comprehensive digital marketing analytics",
  },
  {
    slug: "mastering-tiktok-reels-business-growth",
    imageUrl:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1200&h=630&fit=crop",
    alt: "Social media marketing concept with TikTok and Reels apps on smartphone",
    caption: "Mastering TikTok and Reels for explosive business growth",
  },
];

// ============================================
// UTILITY: Follow redirects and download image as Buffer
// ============================================

function downloadImage(url, maxRedirects = 5) {
  return new Promise((resolve, reject) => {
    if (maxRedirects <= 0) {
      return reject(new Error("Too many redirects"));
    }

    const protocol = url.startsWith("https") ? https : http;

    protocol.get(url, (response) => {
      // Handle redirects (3xx)
      if (
        response.statusCode >= 300 &&
        response.statusCode < 400 &&
        response.headers.location
      ) {
        return downloadImage(response.headers.location, maxRedirects - 1)
          .then(resolve)
          .catch(reject);
      }

      if (response.statusCode !== 200) {
        return reject(
          new Error(`Failed to download image: HTTP ${response.statusCode}`)
        );
      }

      const chunks = [];
      response.on("data", (chunk) => chunks.push(chunk));
      response.on("end", () => {
        const buffer = Buffer.concat(chunks);
        const contentType =
          response.headers["content-type"] || "image/jpeg";
        resolve({ buffer, contentType });
      });
      response.on("error", reject);
    }).on("error", reject);
  });
}

// ============================================
// MAIN
// ============================================

async function main() {
  console.log("🖼️  Adding stock images to blog posts...\n");

  // 1. Fetch all published blog posts
  const posts = await client.fetch(
    `*[_type == "post" && status == "published"]{_id, title, "slug": slug.current, "hasImage": defined(mainImage)}`
  );

  console.log(`Found ${posts.length} published blog post(s).\n`);

  let updated = 0;
  let skipped = 0;

  for (const mapping of BLOG_IMAGE_MAP) {
    const post = posts.find((p) => p.slug === mapping.slug);

    if (!post) {
      console.log(`⚠️  Post not found: "${mapping.slug}" — skipping`);
      skipped++;
      continue;
    }

    if (post.hasImage) {
      console.log(
        `⏭️  "${post.title}" already has an image — skipping`
      );
      skipped++;
      continue;
    }

    console.log(`📥 Downloading image for: "${post.title}"...`);

    try {
      // Download the image
      const { buffer, contentType } = await downloadImage(mapping.imageUrl);
      console.log(
        `   Downloaded ${(buffer.length / 1024).toFixed(0)}KB (${contentType})`
      );

      // Upload to Sanity as an asset
      const asset = await client.assets.upload("image", buffer, {
        filename: `blog-${mapping.slug}.jpg`,
        contentType,
      });
      console.log(`   ✅ Uploaded to Sanity: ${asset._id}`);

      // Patch the post with the image
      await client
        .patch(post._id)
        .set({
          mainImage: {
            _type: "image",
            asset: {
              _type: "reference",
              _ref: asset._id,
            },
            alt: mapping.alt,
            caption: mapping.caption,
          },
        })
        .commit();

      console.log(`   ✅ Patched post "${post.title}" with image\n`);
      updated++;
    } catch (err) {
      console.error(
        `   ❌ Error processing "${post.title}":`,
        err.message
      );
    }
  }

  console.log("\n========================================");
  console.log(`✨ Done! ${updated} post(s) updated, ${skipped} skipped.`);
  console.log("========================================\n");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
