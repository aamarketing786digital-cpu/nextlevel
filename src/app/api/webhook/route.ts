import { revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'

/**
 * Sanity Webhook Handler
 *
 * This endpoint receives webhook events from Sanity when content is published/updated.
 * It revalidates Next.js cache tags for the affected content.
 *
 * Manual signature verification for Next.js 15+ compatibility
 *
 * Setup:
 * 1. Add SANITY_WEBHOOK_SECRET to .env.local
 * 2. Create webhook at: https://www.sanity.io/manage/project/[projectId]/api/webhooks
 * 3. URL: https://yourdomain.com/api/webhook
 * 4. Secret: Use the same value as SANITY_WEBHOOK_SECRET
 * 5. Events: Check "All documents" or specific types
 */

export const runtime = 'nodejs'

type WebhookPayload = {
  _type: string
  _id?: string
  slug?: { current: string }
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
    const signature = req.headers.get('sanity-webhook-signature')

    if (!signature) {
      console.error('[Webhook] Missing signature header')
      return new Response('Missing signature', { status: 401 })
    }

    // Compute HMAC-SHA256 signature
    const crypto = require('crypto')
    const hmac = crypto.createHmac('sha256', secret)
    hmac.update(rawBody, 'utf8')
    const expectedSignature = `sha256=${hmac.digest('hex')}`

    // Timing-safe comparison
    const isValid = crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    )

    if (!isValid) {
      console.error('[Webhook] Invalid signature')
      console.error('[Webhook] Received:', signature.substring(0, 30))
      console.error('[Webhook] Expected:', expectedSignature.substring(0, 30))
      return new Response('Invalid signature', { status: 401 })
    }

    // Parse body
    let body: WebhookPayload
    try {
      body = JSON.parse(rawBody)
    } catch {
      return new Response('Invalid JSON body', { status: 400 })
    }

    console.log('[Webhook] Valid signature for', body._type)

    if (!body?._type) {
      console.log('[Webhook] No document type in payload')
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
