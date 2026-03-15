import { revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'
import crypto from 'crypto'

/**
 * Sanity Webhook Handler
 *
 * This endpoint receives webhook events from Sanity when content is published/updated.
 * It revalidates Next.js cache tags for the affected content.
 *
 * Setup:
 * 1. Add SANITY_WEBHOOK_SECRET to .env.local
 * 2. Create webhook at: https://www.sanity.io/manage/project/[projectId]/api/webhooks
 * 3. URL: https://yourdomain.com/api/webhook
 * 4. Secret: Use the same value as SANITY_WEBHOOK_SECRET
 * 5. Events: Check "All documents" or specific types
 */

export const runtime = 'nodejs'

export async function POST(req: Request) {
  try {
    // Get the raw body for signature verification
    const rawBody = await req.text()

    // Get the signature from headers
    const signature = req.headers.get('sanity-webhook-signature')
    const secret = process.env.SANITY_WEBHOOK_SECRET

    if (!signature || !secret) {
      return new Response('Missing signature or secret', { status: 401 })
    }

    // Verify HMAC signature
    const hmac = crypto.createHmac('sha256', secret)
    hmac.update(rawBody)
    const digest = hmac.digest('base64')
    const expectedSignature = `sha256=${digest}`

    // Use timing-safe comparison
    const cryptoTimingSafeEqual = (
      a: string,
      b: string
    ): boolean => {
      if (a.length !== b.length) {
        return false
      }
      const bufA = Buffer.from(a)
      const bufB = Buffer.from(b)
      for (let i = 0; i < a.length; i++) {
        if (bufA[i] !== bufB[i]) {
          return false
        }
      }
      return true
    }

    if (!cryptoTimingSafeEqual(signature, expectedSignature)) {
      return new Response('Invalid signature', { status: 401 })
    }

    // Parse the body
    let body: { _type?: string } = {}
    try {
      body = JSON.parse(rawBody)
    } catch {
      return new Response('Invalid JSON body', { status: 400 })
    }

    // Get the document type from the webhook payload
    const docType = body?._type

    if (!docType) {
      return new Response('No document type in payload', { status: 400 })
    }

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

    console.log(`[Webhook] Revalidated tags for ${docType}:`, tagsToRevalidate)

    return NextResponse.json({
      revalidated: true,
      tags: tagsToRevalidate,
    })
  } catch (error) {
    console.error('[Webhook] Error:', error)
    return new Response('Error processing webhook', { status: 500 })
  }
}
