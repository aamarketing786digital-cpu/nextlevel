/**
 * Sanity Webhook Handler Template
 *
 * This is a production-ready webhook handler for Sanity CMS webhooks in Next.js 15+.
 *
 * KEY DISCOVERIES (2025-03-15):
 * - Sanity uses timestamp-based signature format: t=<timestamp>,v1=<signature>
 * - Timestamp is in MILLISECONDS (13 digits), not seconds
 * - Signature is Base64-encoded (43-44 chars), NOT hex (64 chars)
 * - Payload to sign: timestamp.body (concatenated with a dot)
 * - Header name: 'sanity-webhook-signature'
 *
 * SETUP:
 * 1. Add SANITY_WEBHOOK_SECRET to .env.local
 * 2. Create webhook at: https://www.sanity.io/manage/project/[projectId]/api/webhooks
 * 3. URL: https://yourdomain.com/api/webhook
 * 4. Secret: Use the same value as SANITY_WEBHOOK_SECRET
 */

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
 *
 * @param body - Raw request body as string
 * @param signatureHeader - Value from 'sanity-webhook-signature' header
 * @param secret - SANITY_WEBHOOK_SECRET from environment
 * @returns true if signature is valid, false otherwise
 */
function verifySignature(
  body: string,
  signatureHeader: string,
  secret: string
): boolean {
  const parts = parseSignature(signatureHeader)
  if (!parts) {
    console.error('[Webhook] Invalid signature format:', signatureHeader)
    return false
  }

  const { timestamp, signature: receivedSignature } = parts

  // Sanity sends timestamps in MILLISECONDS, convert to seconds for comparison
  const now = Math.floor(Date.now() / 1000)
  const timestampMs = parseInt(timestamp, 10)
  const timestampSec = Math.floor(timestampMs / 1000)
  const tolerance = 300 // 5 minutes in seconds

  // Reject timestamps too far from now (prevents replay attacks)
  if (Math.abs(now - timestampSec) > tolerance) {
    console.error('[Webhook] Signature timestamp too old or too far in future:', {
      timestamp: timestampSec,
      timestampMs,
      now,
      diff: now - timestampSec,
    })
    return false
  }

  // Create the payload to sign: timestamp.body (with dot separator)
  const payload = `${timestamp}.${body}`

  // Compute HMAC-SHA256
  const hmac = crypto.createHmac('sha256', secret)
  hmac.update(payload, 'utf8')
  const digest = hmac.digest()

  // Sanity uses Base64 encoding, NOT hex
  const expectedSignature = digest.toString('base64')
  const receivedBuffer = Buffer.from(receivedSignature, 'base64')
  const expectedBuffer = digest

  if (receivedBuffer.length !== expectedBuffer.length) {
    console.error('[Webhook] Signature length mismatch:', {
      received: receivedBuffer.length,
      expected: expectedBuffer.length,
      receivedPreview: receivedSignature.substring(0, 30),
      expectedPreview: expectedSignature.substring(0, 30),
    })
    return false
  }

  // Timing-safe comparison
  return crypto.timingSafeEqual(receivedBuffer, expectedBuffer)
}

/**
 * Map Sanity document types to Next.js cache tags
 * Customize this based on your content types and caching strategy
 */
const TAG_MAP: Record<string, string[]> = {
  post: ['posts', 'blog'],
  caseStudy: ['case-studies', 'caseStudies'],
  video: ['videos'],
  testimonial: ['testimonials'],
  category: ['categories'],
  author: ['authors', 'posts'],
  product: ['products', 'featured'],
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
    const tagsToRevalidate = TAG_MAP[docType] || []

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
