#!/usr/bin/env node
import { createClient } from "next-sanity";
import { config } from "dotenv";
import { resolve } from "path";

config({ path: resolve(process.cwd(), ".env.local") });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});

async function main() {
  const posts = await client.fetch(`*[_type == "post"]`);
  for (const post of posts) {
    // Check array fields
    const arrayFields = ['faqs', 'categories', 'tags', 'content'];
    for (const field of arrayFields) {
      if (post[field]) {
        if (!Array.isArray(post[field])) {
          console.log(`❌ ERROR: post "${post.title}" has field "${field}" which is of type ${typeof post[field]}, expected Array! Value:`, post[field]);
        }
      }
    }
  }
  console.log("Done checking arrays.");
}

main().catch(console.error);
