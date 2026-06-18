#!/usr/bin/env node

/**
 * Update Blog Content
 *
 * This script updates the `content` field of the newly created blog posts
 * using Sanity's PortableText format. The content has been written following
 * the Humanizer guidelines (avoiding AI slop, adding voice, etc.).
 */

import { createClient } from "next-sanity";
import { config } from "dotenv";
import { resolve } from "path";

config({ path: resolve(process.cwd(), ".env.local") });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error("❌ Missing Sanity credentials in .env.local");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  useCdn: false,
  token,
});

// Helper to create a normal paragraph block
function paragraph(text) {
  return {
    _type: "block",
    style: "normal",
    children: [{ _type: "span", text }],
  };
}

// Helper to create a heading block
function heading(text, level = "h2") {
  return {
    _type: "block",
    style: level,
    children: [{ _type: "span", text }],
  };
}

const BLOG_CONTENT = {
  "future-web-development-2026": [
    paragraph("I keep hearing that web development is dead. AI is writing all the code, and edge networks are handling the rest. That is mostly noise. What is actually happening in 2026 is that the baseline has shifted. We are moving away from manual optimization and toward smarter defaults."),
    heading("Server-first architecture"),
    paragraph("React Server Components are now the standard. For years, we sent heavy JavaScript bundles to the browser and hoped the user's device could handle it. Now, we render UI on the server by default. You only send the JavaScript needed for interactivity. This forces a different kind of discipline. You have to decide up front what is static and what needs client-side logic."),
    heading("AI in the workflow"),
    paragraph("AI assistants like Cursor are great at boilerplate. They generate config files and test scaffolding faster than I can type. But they are terrible at context. I have accepted suggestions that compiled perfectly but missed the entire point of the feature. The job is becoming less about writing syntax and more about reviewing architecture."),
    heading("Edge computing"),
    paragraph("Edge computing is finally in production. By processing data closer to the user, we reduce latency for authentication and content delivery without hitting a central server. The performance limits that used to hold the web back are disappearing.")
  ],
  "advanced-seo-strategies-beyond-keywords": [
    paragraph("Keyword stuffing stopped working a decade ago, but many marketers still build their strategy around search volume. In 2026, search engines do not care about exact match keywords. They care about entities."),
    heading("Entity-based SEO"),
    paragraph("Entity-based SEO focuses on the relationships between concepts. If you write an article about web development, Google expects to see related concepts like caching, rendering, and latency. If you just repeat the same phrase fifteen times, you will not rank."),
    heading("Core Web Vitals"),
    paragraph("Speed matters. When users hit a slow page, they leave. Google measures this and penalizes slow sites. You need to optimize your images, defer non-critical scripts, and ensure your server responds quickly."),
    heading("Site architecture"),
    paragraph("I also see a lot of teams ignoring internal linking. Your site architecture tells search engines which pages are important. A flat structure with clear paths between related topics is better than a messy navigation menu.")
  ],
  "maximizing-roi-digital-marketing-analytics": [
    paragraph("Most companies collect too much data and do nothing with it. They look at dashboards filled with vanity metrics and wonder why their revenue is flat. The problem is not a lack of data. The problem is attribution."),
    heading("Fixing attribution"),
    paragraph("Attribution modeling determines which touchpoints get credit for a sale. First-click attribution gives all the credit to the ad that brought the user in. Last-click attribution gives it all to the email they clicked right before buying. Both are flawed. Users rarely buy after one interaction."),
    paragraph("I prefer data-driven attribution models. They assign partial credit to every step in the user journey based on actual conversion data. This gives you a much clearer picture of what is actually driving sales."),
    heading("Zero-party data"),
    paragraph("Privacy changes have made tracking harder. With third-party cookies disappearing, zero-party data is essential. You need to give users a reason to give you their information directly, whether through quizzes, newsletters, or exclusive content. Relying on third-party trackers is a losing strategy.")
  ],
  "mastering-tiktok-reels-business-growth": [
    paragraph("Short-form video is the only format that consistently drives organic reach right now. But treating TikTok like a traditional advertising channel is a mistake. Users can spot a corporate ad in the first second, and they will swipe past it immediately."),
    heading("Keep it authentic"),
    paragraph("Authenticity performs better than production value. Some of the best-performing videos I have seen were shot on a smartphone in a badly lit office. What matters is the hook. You have about two seconds to convince the viewer not to scroll."),
    heading("Volume and consistency"),
    paragraph("Consistency is the other half of the equation. Posting once a month will not trick the algorithm into favoring your content. You need volume to figure out what resonates with your audience. I recommend posting at least three times a week."),
    heading("Adapting trends"),
    paragraph("Do not just copy trends. Participate in them, but add your own angle. A trend is just a format. The value comes from how you apply that format to your specific niche.")
  ]
};

async function main() {
  console.log("📝 Updating blog content...\n");

  const posts = await client.fetch(`*[_type == "post"]{_id, "slug": slug.current, title}`);
  
  let updated = 0;
  for (const [slug, content] of Object.entries(BLOG_CONTENT)) {
    const post = posts.find((p) => p.slug === slug);
    if (!post) {
      console.log(`⚠️ Post not found for slug: ${slug}`);
      continue;
    }

    try {
      await client.patch(post._id).set({ content }).commit();
      console.log(`✅ Updated content for: "${post.title}"`);
      updated++;
    } catch (err) {
      console.error(`❌ Failed to update "${post.title}":`, err.message);
    }
  }

  console.log(`\n✨ Done! Updated ${updated} posts.`);
}

main().catch(console.error);
