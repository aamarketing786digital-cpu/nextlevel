import { NextRequest, NextResponse } from "next/server";
import { newsletterSchema } from "@/lib/validation";
import { addNewsletterSubscriber } from "@/lib/brevo";

// Simple in-memory rate limiter for newsletter
const newsletterRateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX_REQUESTS = 5;

function checkNewsletterRateLimit(email: string): { allowed: boolean; remaining?: number } {
  const now = Date.now();
  const record = newsletterRateLimitMap.get(email);

  if (!record || now > record.resetTime) {
    newsletterRateLimitMap.set(email, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - 1 };
  }

  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return { allowed: false };
  }

  record.count++;
  return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - record.count };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    const validationResult = newsletterSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Invalid email address", details: validationResult.error.issues },
        { status: 400 }
      );
    }

    const { email } = validationResult.data;

    // Rate limiting
    const rateLimit = checkNewsletterRateLimit(email);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: "Too many subscription attempts. Please try again later." },
        { status: 429 }
      );
    }

    // Add to Brevo newsletter list
    const result = await addNewsletterSubscriber(email);

    if (!result.success) {
      console.error("Newsletter subscription failed:", result.error);
      return NextResponse.json(
        { error: "Failed to subscribe. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for subscribing! Check your inbox for a confirmation email.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Newsletter API error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
