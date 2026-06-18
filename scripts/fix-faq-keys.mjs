#!/usr/bin/env node

import { createClient } from "next-sanity";
import { config } from "dotenv";
import { resolve } from "path";
import { randomUUID } from "crypto";

config({ path: resolve(process.cwd(), ".env.local") });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error("Missing Sanity credentials in .env.local");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  useCdn: false,
  token,
});

async function main() {
  console.log("🔍 Finding posts with missing FAQ keys...");
  const posts = await client.fetch(`*[_type == "post" && defined(faqs)]`);
  
  let updatedCount = 0;

  for (const post of posts) {
    let needsUpdate = false;
    const newFaqs = post.faqs.map(faq => {
      if (!faq._key) {
        needsUpdate = true;
        return {
          ...faq,
          _key: randomUUID().replace(/-/g, '').substring(0, 12) // Sanity keys usually just alphanumeric
        };
      }
      return faq;
    });

    if (needsUpdate) {
      console.log(`🔧 Fixing FAQs for post: ${post.title}`);
      try {
        await client.patch(post._id).set({ faqs: newFaqs }).commit();
        updatedCount++;
      } catch (err) {
        console.error(`❌ Failed to update post: ${post.title}`, err.message);
      }
    }
  }

  console.log(`✨ Done! Fixed FAQs for ${updatedCount} posts.`);
}

main().catch(console.error);
