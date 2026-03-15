# Next.js ISR & Caching Strategies

## ⚠️ Next.js 15 Critical Changes

Next.js 15 introduced breaking changes to caching. **You must update your code:**

### 1. `cache: 'force-cache'` is Now Required

```typescript
// ❌ WRONG (Next.js 15) - cache not set, default may be 'no-store'
await client.fetch(query, params, {
  next: { revalidate: 60, tags: ['posts'] }
})

// ✅ CORRECT - Explicitly set cache mode
await client.fetch(query, params, {
  cache: 'force-cache', // Required in Next.js 15
  next: { revalidate: 60, tags: ['posts'] }
})
```

### 2. When Using Tags, Set `revalidate: false`

```typescript
// ✅ When using webhook-based tag revalidation
await client.fetch(query, params, {
  cache: 'force-cache',
  next: {
    revalidate: false, // Disable time-based revalidation
    tags: ['products']  // Use webhook for on-demand updates
  }
})

// ✅ When using time-based ISR (no tags)
await client.fetch(query, params, {
  cache: 'force-cache',
  next: {
    revalidate: 3600 // Revalidate every hour
  }
})
```

### 3. `revalidateTag` Now Requires 2 Arguments

```typescript
// ❌ WRONG (Next.js 15)
revalidateTag('posts')

// ✅ CORRECT - Second arg is CacheLifeConfig
revalidateTag('posts', {})
```

### Recommended Helper Pattern

```typescript
// lib/sanity.ts
export async function sanityFetch<T>(
  query: string,
  params?: Record<string, unknown>,
  tags?: string[]
): Promise<T> {
  return client.fetch<T>(query, params || {}, {
    cache: 'force-cache', // Required for Next.js 15
    next: {
      revalidate: tags && tags.length > 0 ? false : 3600,
      tags,
    },
  })
}

// Usage
const posts = await sanityFetch(
  postQuery,
  { limit: 10 },
  ['posts'] // Triggers webhook revalidation
)
```

## Understanding Caching in Next.js 15

### Cache Hierarchy

```
Browser → CDN (Vercel) → Next.js Server → Sanity API
```

### Cache Strategy Decision Tree

```
Content Type
├── Static (rarely changes)
│   └→ Use: generateStaticParams + dynamic = "force-static"
├── Semi-static (changes periodically)
│   └→ Use: revalidate = N (ISR)
├── Dynamic (changes frequently)
│   └→ Use: fetch with { next: { tags: [] } }
└── Real-time (user-specific)
    └→ Use: Client-side fetch or route handlers
```

## Static Generation (force-static)

**Use for:** Homepage, about pages, static content

```typescript
export const dynamic = "force-static"

export async function generateStaticParams() {
  const items = await client.fetch(`*[_type == "page"]{
    "slug": slug.current
  }`)

  return items.map((item: { slug: string }) => ({ slug: item.slug }))
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const page = await client.fetch(`*[_type == "page" && slug.current == "${slug}"]`)
  // ...
}
```

**Benefits:**
- Fastest performance (served from CDN)
- No database queries on requests
- Best for SEO

**When to use:**
- Content that rarely changes
- No personalization needed
- Build-time generation acceptable

## Incremental Static Regeneration (ISR)

**Use for:** Blog posts, products, services (changes periodically)

```typescript
// Revalidate every 60 seconds
export const revalidate = 60

export const dynamicParams = true

export async function generateStaticParams() {
  const posts = await client.fetch(`*[_type == "post"]{
    "slug": slug.current
  }`)

  return posts.map((post: { slug: string }) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  // Metadata also benefits from ISR
  return {
    title: "...",
  }
}
```

**Benefits:**
- Fast (served from CDN)
- Updates automatically in background
- No full rebuild needed

**When to use:**
- Content updates periodically (not instantly)
- Multiple pages of same type
- Can accept slightly stale content

## On-Demand Revalidation (Tags)

**Use for:** E-commerce inventory, user dashboards, frequently changing content

```typescript
import { unstable_cacheLife } from 'next/cache'

export async function GET() {
  const products = await client.fetch(
    `*[_type == "product"]{
      title,
      slug,
      price,
      inStock
    }`,
    {
      next: {
        tags: ['products'],
        // OR
        revalidate: 60,
      }
    }
  )

  return Response.json(products)
}

// Server Action for revalidation
'use server'

import { revalidateTag } from 'next/cache'

export async function revalidateProduct(slug: string) {
  // Trigger revalidation
  revalidateTag(`product:${slug}`)
}
```

**Benefits:**
- Instant updates when content changes
- Control over cache invalidation
- Can use tags for granular invalidation

**When to use:**
- Content needs instant updates
- E-commerce inventory
- User-generated content

## Client-Side Fetching

**Use for:** Real-time data, user-specific content, frequent updates

```typescript
"use client"

import { useEffect, useState } from 'react'

export function UserProfile() {
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    async function fetchProfile() {
      const response = await fetch('/api/profile')
      const data = await response.json()
      setProfile(data)
    }

    fetchProfile()
  }, [])

  if (!profile) return <Skeleton />

  return <ProfileDisplay profile={profile} />
}
```

**When to use:**
- User-specific data
- Frequently changing content
- Requires authentication

## Cache Configuration

### Environment Variables

```bash
# .env.local
NEXT_PUBLIC_SANITY_PROJECT_ID=...
NEXT_PUBLIC_SANITY_DATASET=production
```

### Client Configuration

**v8+ Stega Configuration (Recommended):**
```typescript
// sanity/lib/client.ts
import { createClient } from 'next-sanity'

export const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',

  // CDN: Disable for ISR, enable for static content
  useCdn: false,

  // Stega: Visual editing with Sanity Studio (v8+)
  stega: {
    enabled: process.env.NODE_ENV === 'development',
    studioUrl: '/studio',
    // Optional: Filter sensitive fields from visual editing
    filter: (props) => {
      if (props.sourcePath.at(-1) === 'url') {
        return false
      }
      return props.filterDefault(props)
    },
  },
})
```

**Legacy Configuration:**
```typescript
export const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
  stega: process.env.NODE_ENV === 'development', // Simple boolean
})
```

**useCdn Guidelines:**
| Content Type | useCdn |
|-------------|---------|
| Static pages | `true` |
| ISR pages | `false` (may serve stale content) |
| Real-time | `false` |
| Preview mode | `false` |

## Advanced Patterns

### Route Segment Config

```typescript
// app/[content]/[slug]/page.tsx
export const revalidate = 300  // 5 minutes
export const dynamicParams = true
export const dynamic = "force-static"  // Build-time static for known paths

// Alternative: Mixed strategy
export const dynamic = "force-dynamic"  // Always server-render
```

### Fetch with Custom Cache

```typescript
const cachedFetch = unstable_cache(
  async (slug: string) => {
    return await client.fetch(
      `*[_type == "post" && slug.current == "${slug}"]{title, content}`
    )
  },
  {
    revalidate: 60,
    tags: [`post:${slug}`],
  }
)
```

### Parallel Fetching

```typescript
// Fetch in parallel for better performance
const [post, relatedPosts] = await Promise.all([
  client.fetch(`*[_type == "post" && slug.current == "${slug}"]`),
  client.fetch(`*[_type == "post" && _id != $currentId][0...3]`),
])
```

## Revalidation Strategies

### Time-Based Revalidation

```typescript
// Revalidate every N seconds
export const revalidate = 60  // 1 minute
```

### On-Demand Revalidation

```typescript
// Triggered by:
// 1. Webhook from Sanity
// 2. Server action
// 3. API route

'use server'

import { revalidatePath } from 'next/cache'

export async function revalidateContent() {
  revalidatePath('/blog')
  revalidatePath('/blog/[slug]')
}
```

### Tag-Based Revalidation

```typescript
'use server'

import { revalidateTag } from 'next/cache'

// Revalidate specific tag
export async function revalidatePost(slug: string) {
  revalidateTag(`post:${slug}`)
}

// Revalidate all posts
export async function revalidateAllPosts() {
  revalidateTag('posts')
}
```

## Webhook Integration

### ⚠️ CRITICAL: Sanity Webhook Signature Format (2025)

**Sanity uses a timestamp-based signature format with Base64 encoding**, NOT the simple `sha256=<hex>` format.

**Actual Sanity webhook signature format:**
```
t=1773590898651,v1=JVRM7HlAas1l5Y90JUxyfiB5rbpHbLi...
```

- `t=<timestamp>` - Unix timestamp in **milliseconds** (13 digits)
- `v1=<signature>` - HMAC-SHA256 signature, **Base64-encoded**
- **Payload to sign:** `timestamp.body` (concatenated with a dot)

### Manual Implementation (Recommended for Next.js 15+)

Due to type incompatibilities with `next-sanity/webhook` and Next.js 15+ App Router's standard `Request` type, manual implementation is recommended:

**Webhook route (`app/api/webhook/route.ts`):**
```typescript
import { revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'
import crypto from 'crypto'

export const runtime = 'nodejs'

type WebhookPayload = {
  _type: string
  _id?: string
  slug?: { current: string }
}

interface SignatureParts {
  timestamp: string
  signature: string
}

/**
 * Parse Sanity's timestamp-based signature format
 * Format: 't=<timestamp>,v1=<signature>'
 */
function parseSignature(signatureHeader: string): SignatureParts | null {
  const parts = signatureHeader.split(',')
  const result: Partial<SignatureParts> = {}

  for (const part of parts) {
    const [key, value] = part.split('=')
    if (key === 't') {
      result.timestamp = value
    } else if (key === 'v1') {
      result.signature = value
    }
  }

  if (!result.timestamp || !result.signature) {
    return null
  }

  return result as SignatureParts
}

/**
 * Verify webhook signature using Sanity's timestamp-based format
 * The signature is HMAC-SHA256 of 'timestamp.body' (concatenated)
 */
function verifySignature(
  body: string,
  signatureHeader: string,
  secret: string
): boolean {
  const parts = parseSignature(signatureHeader)
  if (!parts) {
    return false
  }

  const { timestamp, signature: receivedSignature } = parts

  // Sanity sends timestamps in milliseconds, convert to seconds for comparison
  const now = Math.floor(Date.now() / 1000)
  const timestampMs = parseInt(timestamp, 10)
  const timestampSec = Math.floor(timestampMs / 1000)
  const tolerance = 300 // 5 minutes in seconds

  if (Math.abs(now - timestampSec) > tolerance) {
    console.error('[Webhook] Signature timestamp too old or too far in future')
    return false
  }

  // Create the payload to sign: timestamp.body (with dot)
  const payload = `${timestamp}.${body}`

  // Compute HMAC-SHA256
  const hmac = crypto.createHmac('sha256', secret)
  hmac.update(payload, 'utf8')
  const digest = hmac.digest()

  // Sanity uses Base64 encoding, not hex
  const expectedSignature = digest.toString('base64')
  const receivedBuffer = Buffer.from(receivedSignature, 'base64')
  const expectedBuffer = digest

  if (receivedBuffer.length !== expectedBuffer.length) {
    return false
  }

  return crypto.timingSafeEqual(receivedBuffer, expectedBuffer)
}

export async function POST(req: Request) {
  try {
    const secret = process.env.SANITY_WEBHOOK_SECRET

    if (!secret) {
      console.error('[Webhook] Missing SANITY_WEBHOOK_SECRET environment variable')
      return new Response('Server configuration error', { status: 500 })
    }

    // Get raw body for signature verification
    const rawBody = await req.text()

    // Get signature header - Sanity uses 'sanity-webhook-signature'
    const signatureHeader = req.headers.get('sanity-webhook-signature')

    if (!signatureHeader) {
      console.error('[Webhook] Missing signature header')
      return new Response('Missing signature', { status: 401 })
    }

    // Verify signature
    const isValid = verifySignature(rawBody, signatureHeader, secret)

    if (!isValid) {
      console.error('[Webhook] Invalid signature')
      return new Response('Invalid signature', { status: 401 })
    }

    // Parse body
    let body: WebhookPayload
    try {
      body = JSON.parse(rawBody)
    } catch {
      return new Response('Invalid JSON body', { status: 400 })
    }

    if (!body?._type) {
      return NextResponse.json({ revalidated: false, reason: 'No document type' })
    }

    const docType = body._type

    // Map document types to cache tags
    const tagMap: Record<string, string[]> = {
      post: ['posts', 'blog'],
      caseStudy: ['case-studies', 'caseStudies'],
      video: ['videos'],
      testimonial: ['testimonials'],
      category: ['categories'],
      author: ['authors', 'posts'],
    }

    const tagsToRevalidate = tagMap[docType] || []

    // Revalidate each tag (Next.js 15 requires 2 arguments)
    for (const tag of tagsToRevalidate) {
      revalidateTag(tag, {})
    }

    console.log(`[Webhook] ✅ Revalidated tags for ${docType}:`, tagsToRevalidate)

    return NextResponse.json({
      revalidated: true,
      tags: tagsToRevalidate,
      docType,
    })
  } catch (error) {
    console.error('[Webhook] Error:', error)
    return new Response((error as Error).message, { status: 500 })
  }
}
```

### Important Notes

1. **Timestamp in milliseconds**: Sanity sends timestamps as 13-digit millisecond values
2. **Base64 encoding**: Signatures are Base64-encoded (43-44 chars), not hex (64 chars)
3. **Payload format**: The signature is computed from `timestamp.body` (with a dot separator)
4. **Header name**: Use `sanity-webhook-signature` header (not `x-sanity-webhook-signature`)
5. **Timing validation**: Rejects signatures older than 5 minutes to prevent replay attacks

### Webhook Signature & Secret Setup

#### Step 1: Generate Webhook Secret

Generate a cryptographically secure random secret for webhook signature verification:

```bash
# Option 1: Using Node.js (recommended)
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Option 2: Using Python
python3 -c "import secrets; print(secrets.token_urlsafe(32))"

# Option 3: Using OpenSSL
openssl rand -base64 32
```

**Example output:** `YOUR_GENERATED_SECRET_HERE_REPLACE_THIS=`

> ⚠️ **Never share your actual secret or commit it to git.** The output above is an example format only.

#### Step 2: Add to Environment Variables

Add the generated secret to your `.env.local` file:

```bash
# .env.local
SANITY_WEBHOOK_SECRET=your_generated_secret_here
```

**IMPORTANT:**
- Never commit `.env.local` to git. Add it to `.gitignore`.
- Use a different secret for production vs development.
- Rotate secrets periodically.

#### Step 3: Configure Webhook in Sanity Dashboard

1. Go to [sanity.io/manage](https://www.sanity.io/manage)
2. Select your project
3. Navigate to **API** → **Webhooks**
4. Click **Create new webhook**

Fill in the form:

| Field | Value | Description |
|-------|-------|-------------|
| **Name** | `Next.js ISR Revalidation` | Descriptive name for the webhook |
| **URL** | `https://your-domain.com/api/webhook/sanity` | Your API route (use ngrok for local testing) |
| **Secret** | `aQOH5Yf3fnMnbhsI4Mr3Xv7SGmcaPf5CU6jA8r+ysCY=` | Paste the secret you generated |
| **Projection** | `{ "_type", "slug": slug.current, "operation" }` | Fields to include in webhook payload |
| **Filter** | `_type in ["product", "post", "postCategory", "category"]` | Only trigger for these types |

**Projection Examples:**
```javascript
// Minimal (recommended)
{ "_type", "slug": slug.current }

// Include operation type
{ "_type", "slug": slug.current, "operation" }

// Include more fields
{ "_type", "slug": slug.current, "_id", "publishedAt" }
```

**Filter Examples:**
```javascript
// All documents
_type in defined().select()

// Specific types only
_type in ["product", "post"]

// Exclude drafts
!(_id in path("drafts.**"))

// Only published documents
_id in path("published.**")
```

#### Step 4: Local Testing with ngrok

For local development, expose your local server to the internet:

```bash
# Install ngrok
npm install -g ngrok

# Start your Next.js dev server
npm run dev

# In another terminal, start ngrok
ngrok http 3000
```

Use the ngrok URL in your Sanity webhook configuration:
```
URL: https://abc123.ngrok-free.app/api/webhook/sanity
```

**Note:** Update the webhook URL when deploying to production.

#### Step 5: Test Webhook

1. In Sanity Studio, create/update a document
2. Check your server logs for webhook payload:
```
Webhook received: { type: 'product', operation: 'update', slug: 'my-product' }
Revalidated tag: products
Revalidated tag: featured
Revalidated tag: categories
```

3. Verify the response in Sanity webhook logs (should show 200 OK)

### Complete Environment Setup

```bash
# .env.local - Template (replace values with your own)
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_WEBHOOK_SECRET=your_generated_secret_here
SANITY_API_READ_TOKEN=your_api_read_token_here
```

**Where to find values:**
| Variable | Where to Get |
|----------|-------------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | sanity.io/manage → Project → Settings → API |
| `NEXT_PUBLIC_SANITY_DATASET` | Usually "production" (create custom in dataset settings) |
| `SANITY_WEBHOOK_SECRET` | Generate yourself using commands above |
| `SANITY_API_READ_TOKEN` | sanity.io/manage → API → Tokens → Add API token |

**Token Generation:**
1. Go to [sanity.io/manage](https://www.sanity.io/manage)
2. Navigate to **API** → **Tokens**
3. Click **Add API token**
4. Select permissions: `Read` for webhooks
5. Copy the generated token (starts with `sk`)

### Sanity Dashboard Configuration

Configure your webhook at [sanity.io/manage](https://www.sanity.io/manage):

| Field | Value |
|-------|-------|
| **URL** | `https://your-domain.com/api/webhook/sanity` |
| **Secret** | Generate and add to `.env.local` as `SANITY_WEBHOOK_SECRET` |
| **Projection** | `{ "_type", "slug": slug.current }` |
| **Filter** | `_type in ["product", "post", "category"]` |

**Generate webhook secret:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### Common Webhook Pitfalls

| Issue | Cause | Solution |
|-------|--------|----------|
| 401 Invalid signature | Using `@sanity/webhook` directly | Use `parseBody` from `next-sanity/webhook` |
| Body already read | Calling `request.json()` before verification | `parseBody` handles raw body internally |
| Stale data after update | Not waiting for Content Lake consistency | Set `waitForConsistency: true` |
| Cache not clearing | Forgetting to revalidate dependent tags | Map content relationships (e.g., product → categories) |
| CORS errors | Missing CORS headers | Add `Access-Control-Allow-*` headers |
| Next.js 15 type error | `revalidateTag(tag)` with 1 arg | Use `revalidateTag(tag, {})` |
| Secret mismatch | Secret differs between `.env` and Sanity dashboard | Copy secret exactly, no extra spaces |

### Webhook Constants Reference

```typescript
// Signature header name (exported for reference)
export const WEBHOOK_SIGNATURE_HEADER = 'x-sanity-webhook-signature'

// Sanity sends this header with HMAC signature
// parseBody validates it automatically
```

**Headers Sanity Sends:**
```http
POST /api/webhook/sanity HTTP/1.1
Content-Type: application/json
X-Sanity-Webhook-Signature: sha256=<hmac-signature>
X-Sanity-Webhook-ID: <unique-webhook-id>
X-Sanity-Project-ID: <your-project-id>
```

### CORS Configuration

If your Next.js app is on a different domain than Sanity:

```typescript
// app/api/webhook/sanity/route.ts
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': process.env.SANITY_WEBHOOK_ORIGIN || '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, X-Sanity-Webhook-Signature',
    },
  })
}
```

Set `SANITY_WEBHOOK_ORIGIN` in `.env.local`:
```bash
SANITY_WEBHOOK_ORIGIN=https://your-sanity-project.api.sanity.io
```

### Tag Revalidation Strategy

Design your tags based on **content relationships**, not just document types:

| Content Type Change | Tags to Revalidate | Reason |
|---------------------|-------------------|--------|
| `product` | `products`, `featured`, `categories`, `product:{slug}` | Products appear in listings, featured section, and affect categories |
| `post` | `posts`, `post:{slug}` | Blog posts and their detail pages |
| `postCategory` | `blogCategories`, `posts` | Category changes affect blog listings |
| `category` | `categories`, `products`, `featured` | Category changes affect product listings |
| `settings` | All tags | Settings affect entire site |

## Best Practices

### DO's

1. **Use ISR for semi-static content** - Blog posts, products, services
2. **Use force-static for static content** - About pages, homepage
3. **Always project specific fields** - Never fetch entire documents
4. **Set appropriate revalidate times** - Balance freshness vs performance
5. **Use tags for on-demand updates** - E-commerce, user dashboards
6. **Cache at API route level** - Add Cache-Control headers
7. **Revalidate selectively** - Only invalidate what changed

### DON'Ts

1. **Don't useCdn: true with ISR** - May serve stale content
2. **Don't fetch all fields** - Always use GROQ projections
3. **Don't revalidate too frequently** - Causes unnecessary API calls
4. **Don't use fetch in Server Components without proper caching**
5. **Don't forget to await params** - Next.js 15 requires it

## Performance Metrics

| Strategy | TTFB (Time to First Byte) | Updates |
|----------|----------------------------|---------|
| **force-static** | Fastest | Build-time only |
| **ISR (revalidate)** | Fast | Periodic background updates |
| **On-demand (tags)** | Fast | Instant on-demand |
| **Client fetch** | Slower | Real-time |

## Monitoring

### Cache Hit Rate Monitoring

```typescript
export async function GET() {
  const posts = await client.fetch(query, {
    cache: 'force-cache',  // Force cache
    next: { revalidate: 60 },
  })

  return Response.json(posts, {
    headers: {
      'x-cache': 'HIT',
    },
  })
}
```

### Cache Header Patterns

```typescript
// Static content (1 day)
'Cache-Control': 'public, max-age=86400, stale-while-revalidate=86400'

// ISR (1 minute, 5 minutes stale)
'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300'

// On-demand (cache until revalidation)
'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=3600'
```

## Troubleshooting

### Content Not Updating

1. **Check revalidate value** - Too high means long refresh time
2. **Check CDN settings** - May be caching at edge
3. **Check browser cache** - May need hard refresh
4. **Check tags** - Not matching between fetch and revalidation
5. **Check webhooks** - Sanity webhooks not firing?

### Slow Performance

1. **Reduce query size** - Use GROQ projections
2. **Increase revalidate time** - Reduce server load
3. **Enable CDN** - Set useCdn: true (when not using ISR)
4. **Parallel fetch** - Use Promise.all() for independent queries
5. **Check Sanity query performance** - Use Sanity's query logs

### Build Size Issues

1. **Don't fetch unused fields** - Projections reduce data transfer
2. **Use dynamic imports** - For client-side heavy components
3. **Avoid huge image payloads** - Use image optimization

## Live Content API (Real-Time Updates)

**New in next-sanity v8+**: The Live Content API provides real-time content updates without webhooks or manual revalidation. Content updates automatically trigger revalidation via server-sent events.

### Setup Live Content API

```typescript
// sanity/lib/live.ts
import { createClient } from 'next-sanity'
import { defineLive } from 'next-sanity/live'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false, // Required for live content
  apiVersion: '2025-01-01',
  stega: {
    enabled: process.env.NODE_ENV === 'development',
    studioUrl: '/studio',
  },
})

// Requires SANITY_API_READ_TOKEN with Viewer rights
const token = process.env.SANITY_API_READ_TOKEN
if (!token) {
  throw new Error('Missing SANITY_API_READ_TOKEN')
}

export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: token,
  browserToken: token,
})
```

### Using sanityFetch in Components

```typescript
// app/blog/[slug]/page.tsx
import { sanityFetch, SanityLive } from '@/sanity/lib/live'
import { PortableText } from '@portabletext/react'

export const revalidate = 60

export async function generateStaticParams() {
  const { data: posts } = await sanityFetch({
    query: `*[_type == "post"]{ "slug": slug.current }`,
    perspective: 'published',
  })

  return posts.map((post: any) => ({ slug: post.slug }))
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const { data: post } = await sanityFetch({
    query: `*[_type == "post" && slug.current == $slug][0]{
      title,
      content,
      publishedAt
    }`,
    params: { slug },
    perspective: 'published',
  })

  return (
    <article>
      <h1>{post.title}</h1>
      <PortableText value={post.content} />
      <SanityLive /> {/* Enables real-time updates */}
    </article>
  )
}
```

### Live Content API Benefits

| Feature | Description |
|---------|-------------|
| **Real-time updates** | Content changes appear instantly without refresh |
| **No webhooks needed** | Eliminates webhook signature verification complexity |
| **Automatic revalidation** | Next.js cache invalidates automatically |
| **Draft mode support** | Preview unpublished content with `perspective: 'previewDrafts'` |
| **Server-sent events** | Efficient push-based updates (no polling) |

### Environment Variables Required

```bash
# .env.local
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=your_token_with_viewer_rights
```

### Perspective Modes

```typescript
// Published content only (production)
sanityFetch({ perspective: 'published', query: '...' })

// Include drafts (preview mode)
sanityFetch({ perspective: 'previewDrafts', query: '...' })

// Raw drafts only (editing)
sanityFetch({ perspective: 'raw', query: '...' })
```

### When to Use Live Content API vs ISR

| Scenario | Recommended Approach |
|----------|---------------------|
| **Content editors need instant updates** | Live Content API |
| **Simpler setup, no tokens** | Traditional ISR |
| **Preview unpublished content** | Live Content API with `previewDrafts` |
| **High-traffic production** | ISR with CDN + webhook revalidation |
| **Real-time collaboration** | Live Content API |
