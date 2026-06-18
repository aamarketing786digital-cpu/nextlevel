#!/usr/bin/env node

import { createClient } from "next-sanity";
import { config } from "dotenv";
import { resolve } from "path";

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
  const posts = await client.fetch(`*[_type == "post"]{_id, title}`);
  
  for (const post of posts) {
    if (post.title) {
      // Regex to remove emojis from string
      const newTitle = post.title.replace(/[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1F600}-\u{1F64F}]|[\u{1F680}-\u{1F6FF}]/gu, '').trim();
      
      if (newTitle !== post.title) {
        console.log(`Fixing title: ${post.title} -> ${newTitle}`);
        await client.patch(post._id).set({ title: newTitle }).commit();
      }
    }
  }
  console.log("Done fixing titles.");
}

main().catch(console.error);
