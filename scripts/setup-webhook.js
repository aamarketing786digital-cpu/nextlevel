#!/usr/bin/env node

/**
 * Webhook Setup Helper
 *
 * This script helps you set up Sanity webhooks for Next.js ISR.
 * It generates a secure webhook secret and provides setup instructions.
 */

import { randomBytes } from 'crypto'

function generateWebhookSecret() {
  return randomBytes(32).toString('base64')
}

console.log('🔗 Sanity Webhook Setup Helper\n')

const secret = generateWebhookSecret()

console.log('Generated Webhook Secret:')
console.log('─'.repeat(50))
console.log(secret)
console.log('─'.repeat(50))
console.log('\n📋 Setup Steps:\n')

console.log('1. Update your .env.local file:')
console.log(`   SANITY_WEBHOOK_SECRET=${secret}`)
console.log('')

console.log('2. Go to: https://www.sanity.io/manage/project/yhqmz717/api/webhooks')
console.log('')

console.log('3. Create a new webhook with these settings:')
console.log('   Name: Next.js ISR Revalidation')
console.log('   URL: https://yourdomain.com/api/webhook')
console.log('   Secret: ' + secret)
console.log('   Projection: { _type, slug }')
console.log('   📚 Check: All documents')
console.log('')

console.log('4. For local testing, use a tunnel service:')
console.log('   npx localtunnel --port 3000')
console.log('   Then use the provided URL in webhook configuration')
console.log('')

console.log('5. Test the webhook:')
console.log('   - Make a change in Sanity Studio')
console.log('   - Publish the document')
console.log('   - Check server logs for "[Webhook] Revalidated tags"')
console.log('')
