import { revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'
import crypto from 'crypto'

/**
 * Sanity Webhook Handler
 *
 * This endpoint receives webhook events from Sanity when content is published/updated.
 * It revalidates Next.js cache tags for the affected content.
 *
 * Sanity Webhook Signature Format (Timestamp-based):
 * - Header: 'sanity-webhook-signature'
 * - Format: 't=<timestamp>,v1=<signature>'
 * - Algorithm: HMAC-SHA256 of 'timestamp.body' (concatenated)
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
 * The signature is HMAC-SHA256 of 'timestamp.body' (no separator)
 */
function verifySignature(
  body: string,
  signatureHeader: string,
  secret: string
): boolean {
  // Parse the signature header
  const parts = parseSignature(signatureHeader)
  if (!parts) {
    console.error('[Webhook] Invalid signature format:', signatureHeader)
    return false
  }

  const { timestamp, signature: receivedSignature } = parts

  // Sanity sends timestamps in milliseconds, convert to seconds for comparison
  const now = Math.floor(Date.now() / 1000)
  const timestampMs = parseInt(timestamp, 10)
  const timestampSec = Math.floor(timestampMs / 1000)
  const tolerance = 300 // 5 minutes in seconds

  if (Math.abs(now - timestampSec) > tolerance) {
    console.error('[Webhook] Signature timestamp too old or too far in future:', {
      timestamp: timestampSec,
      timestampMs,
      now,
      diff: now - timestampSec,
    })
    return false
  }

  // Create the payload to sign: use the original millisecond timestamp from Sanity
  const payload = `${timestamp}.${body}`

  // Compute HMAC-SHA256
  const hmac = crypto.createHmac('sha256', secret)
  hmac.update(payload, 'utf8')
  const expectedSignature = hmac.digest('hex')

  // Timing-safe comparison
  const receivedBuffer = Buffer.from(receivedSignature, 'utf8')
  const expectedBuffer = Buffer.from(expectedSignature, 'utf8')

  if (receivedBuffer.length !== expectedBuffer.length) {
    console.error('[Webhook] Signature length mismatch:', {
      received: receivedBuffer.length,
      expected: expectedBuffer.length,
      receivedPreview: receivedSignature.substring(0, 20),
      expectedPreview: expectedSignature.substring(0, 20),
    })
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
      console.error('[Webhook] Available headers:', Array.from(req.headers.keys()).join(', '))
      return new Response('Missing signature', { status: 401 })
    }

    // Verify signature
    const isValid = verifySignature(rawBody, signatureHeader, secret)

    if (!isValid) {
      console.error('[Webhook] ❌ Invalid signature')
      console.error('[Webhook] Make sure SANITY_WEBHOOK_SECRET in .env.local matches the webhook secret in Sanity dashboard')
      console.error('[Webhook] Sanity dashboard: https://www.sanity.io/manage/project/yhqmz717/api/webhooks')
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
