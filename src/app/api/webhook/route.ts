import { revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'
import crypto from 'crypto'

/**
 * Sanity Webhook Handler
 *
 * This endpoint receives webhook events from Sanity when content is published/updated.
 * It revalidates Next.js cache tags for the affected content.
 *
 * Manual signature verification for Next.js 15+ compatibility
 *
 * Sanity Webhook Signature Format:
 * - Header: 'sanity-webhook-signature'
 * - Format: 'sha256=<hex>' or just '<hex>'
 * - Algorithm: HMAC-SHA256
 *
 * Setup:
 * 1. Add SANITY_WEBHOOK_SECRET to .env.local
 * 2. Create webhook at: https://www.sanity.io/manage/project/[projectId]/api/webhooks
 * 3. URL: https://yourdomain.com/api/webhook
 * 4. Secret: Use the same value as SANITY_WEBHOOK_SECRET
 * 5. Events: Check "All documents" or specific types
 * 6. IMPORTANT: For GROQ-powered webhooks, use the exact secret in both places
 */

export const runtime = 'nodejs'

type WebhookPayload = {
  _type: string
  _id?: string
  slug?: { current: string }
}

/**
 * Verify webhook signature
 * Handles both 'sha256=<hex>' and '<hex>' formats
 */
function verifySignature(
  body: string,
  signature: string,
  secret: string
): boolean {
  // Compute HMAC-SHA256 signature
  const hmac = crypto.createHmac('sha256', secret)
  hmac.update(body, 'utf8')
  const digest = hmac.digest('hex')

  // Sanity may send signature in different formats:
  // 1. 'sha256=<hex>' (with prefix)
  // 2. '<hex>' (without prefix, just the hash)

  // Extract the actual signature value if it has a prefix
  let receivedSignature = signature.trim()

  // Handle 'sha256=' prefix format
  if (receivedSignature.startsWith('sha256=')) {
    receivedSignature = receivedSignature.substring(7) // Remove 'sha256='
  }

  // Also handle other possible prefixes
  const match = receivedSignature.match(/^[a-z0-9_]+=(.+)$/)
  if (match) {
    receivedSignature = match[1]
  }

  // Compare using timing-safe comparison
  // Convert to buffers for safe comparison
  const receivedBuffer = Buffer.from(receivedSignature, 'utf8')
  const expectedBuffer = Buffer.from(digest, 'utf8')

  // First check length (timingSafeEqual throws if lengths differ)
  if (receivedBuffer.length !== expectedBuffer.length) {
    console.error('[Webhook] Signature length mismatch:', {
      received: receivedBuffer.length,
      expected: expectedBuffer.length,
      receivedPreview: receivedSignature.substring(0, 20),
      expectedPreview: digest.substring(0, 20),
    })
    return false
  }

  // Timing-safe comparison
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

    // Try multiple possible header names for the signature
    const signatureHeaders = [
      'sanity-webhook-signature',
      'x-sanity-webhook-signature',
      'sanity-signature',
    ]

    let signature: string | null = null
    for (const headerName of signatureHeaders) {
      const headerValue = req.headers.get(headerName)
      if (headerValue) {
        signature = headerValue
        console.log(`[Webhook] Found signature in header: ${headerName}`)
        break
      }
    }

    if (!signature) {
      console.error('[Webhook] Missing signature header. Tried:', signatureHeaders.join(', '))
      console.error('[Webhook] Available headers:', Array.from(req.headers.keys()).join(', '))
      return new Response('Missing signature', { status: 401 })
    }

    // Verify signature
    const isValid = verifySignature(rawBody, signature, secret)

    if (!isValid) {
      console.error('[Webhook] Invalid signature')
      console.error('[Webhook] Signature received:', signature.substring(0, 50))

      // Log what we expected for debugging
      const hmac = crypto.createHmac('sha256', secret)
      hmac.update(rawBody, 'utf8')
      const expected = `sha256=${hmac.digest('hex')}`
      console.error('[Webhook] Expected format:', expected.substring(0, 50))

      return new Response('Invalid signature', { status: 401 })
    }

    // Parse body
    let body: WebhookPayload
    try {
      body = JSON.parse(rawBody)
    } catch (parseError) {
      console.error('[Webhook] Failed to parse JSON body:', parseError)
      return new Response('Invalid JSON body', { status: 400 })
    }

    console.log('[Webhook] ✅ Valid signature for', body._type || 'unknown type')

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
      try {
        revalidateTag(tag, {})
      } catch (revalidateError) {
        console.error(`[Webhook] Failed to revalidate tag "${tag}":`, revalidateError)
      }
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
