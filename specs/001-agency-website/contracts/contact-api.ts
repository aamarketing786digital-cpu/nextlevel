# API Contract: Contact Form

**Feature**: 001-agency-website
**Date**: 2026-02-10
**Version**: 1.0.0

This document defines the API contract for the contact form submission endpoint.

---

## Endpoint

```
POST /api/contact
```

### Description

Accepts contact form submissions, validates the input, sends a confirmation email to the user via Brevo API, and adds the contact to the Brevo contact list.

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
interface ContactFormRequest {
  name: string;              // Required, 2-100 characters
  email: string;             // Required, valid email format
  company?: string;          // Optional, max 200 characters
  serviceInterest: ServiceInterest;  // Required
  budgetRange: BudgetRange;  // Required
  message: string;           // Required, 10-2000 characters
}

type ServiceInterest =
  | 'ai-chatbots'
  | 'web-dev'
  | 'digital-marketing'
  | 'graphic-design'
  | 'seo';

type BudgetRange =
  | '<5k'
  | '5k-10k'
  | '10k-25k'
  | '25k-50k'
  | '50k+';
```

### Example Request

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "company": "Acme Corporation",
  "serviceInterest": "web-dev",
  "budgetRange": "10k-25k",
  "message": "I'm interested in building a modern e-commerce platform for our business."
}
```

### Validation Rules

| Field | Rules | Error Message |
|-------|-------|---------------|
| `name` | Min: 2, Max: 100 | "Name must be at least 2 characters" / "Name must be less than 100 characters" |
| `email` | Valid email format | "Invalid email address" |
| `company` | Max: 200 (optional) | "Company name must be less than 200 characters" |
| `serviceInterest` | Required enum | "Please select a service" |
| `budgetRange` | Required enum | "Please select a budget range" |
| `message` | Min: 10, Max: 2000 | "Message must be at least 10 characters" / "Message must be less than 2000 characters" |

---

## Response

### Success Response

**Status Code**: `200 OK`

```typescript
interface ContactFormSuccessResponse {
  success: true;
  message: string;
}
```

**Example**:

```json
{
  "success": true,
  "message": "Thank you for contacting us! We'll be in touch within 24 hours."
}
```

### Error Responses

#### Validation Error (400)

```typescript
interface ValidationErrorResponse {
  success: false;
  error: string;
  fields?: Record<string, string>;  // Field-specific errors
}
```

**Example**:

```json
{
  "success": false,
  "error": "Validation failed",
  "fields": {
    "name": "Name must be at least 2 characters",
    "email": "Invalid email address",
    "message": "Message must be at least 10 characters"
  }
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
  "error": "Unable to send message. Please try again later or contact us directly at contact@nextlevelmarketerz.com"
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
  "error": "Too many requests. Please try again later.",
  "retryAfter": 60
}
```

---

## Implementation Details

### Environment Variables

```env
BREVO_API_KEY=your_brevo_api_key_here
BREVO_CONTACT_LIST_ID=your_list_id_here
NEXT_PUBLIC_SITE_URL=https://nextlevelmarketerz.com
```

### Brevo API Integration

The endpoint makes two calls to Brevo:

1. **Send Transactional Email** (`POST /v3/smtp/email`)
   - Sends confirmation email to the user
   - Template: Auto-generated HTML email

2. **Add Contact to List** (`POST /v3/contacts`)
   - Adds user to the specified contact list
   - Includes form data as contact attributes

### Rate Limiting

- Client-side: Submit button disabled during submission
- Server-side: Consider implementing rate limiting (e.g., 3 submissions per hour per email)

### Error Handling Strategy

| Scenario | Status Code | User Message |
|----------|-------------|--------------|
| Validation fails | 400 | Field-specific error messages |
| Brevo API down | 500 | Generic error, logged for investigation |
| Invalid Brevo API key | 500 | Generic error (do not expose API key) |
| Network timeout | 500 | Generic error with retry suggestion |
| Rate limit exceeded | 429 | "Please try again later" |

---

## TypeScript Types

```typescript
// src/types/contact-form.ts
export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  serviceInterest: ServiceInterest;
  budgetRange: BudgetRange;
  message: string;
}

export interface ContactFormResponse {
  success: boolean;
  message?: string;
  error?: string;
  fields?: Record<string, string>;
}

export type ServiceInterest =
  | 'ai-chatbots'
  | 'web-dev'
  | 'digital-marketing'
  | 'graphic-design'
  | 'seo';

export type BudgetRange =
  | '<5k'
  | '5k-10k'
  | '10k-25k'
  | '25k-50k'
  | '50k+';
```

---

## Zod Validation Schema

```typescript
// src/lib/validation.ts
import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  email: z.string()
    .email('Invalid email address'),
  company: z.string()
    .max(200, 'Company name must be less than 200 characters')
    .optional(),
  serviceInterest: z.enum([
    'ai-chatbots',
    'web-dev',
    'digital-marketing',
    'graphic-design',
    'seo',
  ], { requiredError: 'Please select a service' }),
  budgetRange: z.enum([
    '<5k',
    '5k-10k',
    '10k-25k',
    '25k-50k',
    '50k+',
  ], { requiredError: 'Please select a budget range' }),
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message must be less than 2000 characters'),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
```

---

## Testing

### Request Examples

```bash
# Valid request
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "company": "Acme Corp",
    "serviceInterest": "web-dev",
    "budgetRange": "10k-25k",
    "message": "I need a website built."
  }'

# Invalid request (missing required fields)
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "J",
    "email": "invalid-email",
    "message": "Short"
  }'
```

### Expected Responses

**Valid Request**:
```json
{
  "success": true,
  "message": "Thank you for contacting us! We'll be in touch within 24 hours."
}
```

**Invalid Request**:
```json
{
  "success": false,
  "error": "Validation failed",
  "fields": {
    "name": "Name must be at least 2 characters",
    "email": "Invalid email address",
    "serviceInterest": "Please select a service",
    "budgetRange": "Please select a budget range",
    "message": "Message must be at least 10 characters"
  }
}
```

---

**Last Updated**: 2026-02-10
**Version**: 1.0.0
