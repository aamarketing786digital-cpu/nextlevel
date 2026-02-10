# API Contract: Newsletter Signup

**Feature**: 001-agency-website
**Date**: 2026-02-10
**Version**: 1.0.0

This document defines the API contract for the newsletter signup endpoint.

---

## Endpoint

```
POST /api/newsletter
```

### Description

Accepts newsletter signup requests, validates the email address, and adds the subscriber to the Brevo contact list.

---

## Request

### Method

`POST`

### Headers

```http
Content-Type: application/json
```

### Body Schema

```typescript
interface NewsletterRequest {
  email: string;  // Required, valid email format
}
```

### Example Request

```json
{
  "email": "john@example.com"
}
```

### Validation Rules

| Field | Rules | Error Message |
|-------|-------|---------------|
| `email` | Valid email format | "Please enter a valid email address" |

---

## Response

### Success Response

**Status Code**: `200 OK`

```typescript
interface NewsletterSuccessResponse {
  success: true;
  message: string;
}
```

**Example**:

```json
{
  "success": true,
  "message": "Thank you for subscribing! You'll receive our latest updates."
}
```

### Error Responses

#### Validation Error (400)

```typescript
interface ValidationErrorResponse {
  success: false;
  error: string;
  field?: string;  // Field with error
}
```

**Example**:

```json
{
  "success": false,
  "error": "Please enter a valid email address",
  "field": "email"
}
```

#### Already Subscribed (409)

```typescript
interface AlreadySubscribedResponse {
  success: false;
  error: string;
  code: "ALREADY_SUBSCRIBED";
}
```

**Example**:

```json
{
  "success": false,
  "error": "You're already subscribed to our newsletter!",
  "code": "ALREADY_SUBSCRIBED"
}
```

#### Server Error (500)

```typescript
interface ServerErrorResponse {
  success: false;
  error: string;
}
```

**Example**:

```json
{
  "success": false,
  "error": "Unable to subscribe. Please try again later."
}
```

#### Rate Limit Error (429)

```typescript
interface RateLimitResponse {
  success: false;
  error: string;
  retryAfter?: number;  // Seconds to wait before retrying
}
```

**Example**:

```json
{
  "success": false,
  "error": "Too many signup attempts. Please try again later.",
  "retryAfter": 60
}
```

---

## Implementation Details

### Environment Variables

```env
BREVO_API_KEY=your_brevo_api_key_here
BREVO_NEWSLETTER_LIST_ID=your_newsletter_list_id_here
```

### Brevo API Integration

The endpoint makes one call to Brevo:

1. **Add Contact to List** (`POST /v3/contacts`)
   - Adds email to the newsletter contact list
   - Uses double opt-in if configured in Brevo settings
   - Returns 409 if email already exists (handle gracefully)

### Rate Limiting

- Client-side: Submit button disabled during submission
- Server-side: Consider implementing rate limiting (e.g., 3 signups per hour per IP)

### Error Handling Strategy

| Scenario | Status Code | User Message |
|----------|-------------|--------------|
| Validation fails | 400 | "Please enter a valid email address" |
| Already subscribed | 409 | "You're already subscribed to our newsletter!" |
| Brevo API down | 500 | Generic error, logged for investigation |
| Invalid Brevo API key | 500 | Generic error (do not expose API key) |
| Network timeout | 500 | Generic error with retry suggestion |
| Rate limit exceeded | 429 | "Too many signup attempts. Please try again later." |

---

## TypeScript Types

```typescript
// src/types/newsletter.ts
export interface NewsletterFormData {
  email: string;
}

export interface NewsletterFormResponse {
  success: boolean;
  message?: string;
  error?: string;
  field?: string;
  code?: "ALREADY_SUBSCRIBED";
}

export type NewsletterFormData = z.infer<typeof newsletterSchema>;
```

---

## Zod Validation Schema

```typescript
// src/lib/validation.ts
import { z } from 'zod';

export const newsletterSchema = z.object({
  email: z.string()
    .email('Please enter a valid email address'),
});

export type NewsletterFormData = z.infer<typeof newsletterSchema>;
```

---

## Testing

### Request Examples

```bash
# Valid request
curl -X POST http://localhost:3000/api/newsletter \
  -H "Content-Type: application/json" \
  -d '{"email": "john@example.com"}'

# Invalid request
curl -X POST http://localhost:3000/api/newsletter \
  -H "Content-Type: application/json" \
  -d '{"email": "invalid-email"}'
```

### Expected Responses

**Valid Request**:
```json
{
  "success": true,
  "message": "Thank you for subscribing! You'll receive our latest updates."
}
```

**Invalid Request**:
```json
{
  "success": false,
  "error": "Please enter a valid email address",
  "field": "email"
}
```

**Already Subscribed**:
```json
{
  "success": false,
  "error": "You're already subscribed to our newsletter!",
  "code": "ALREADY_SUBSCRIBED"
}
```

---

**Last Updated**: 2026-02-10
**Version**: 1.0.0
