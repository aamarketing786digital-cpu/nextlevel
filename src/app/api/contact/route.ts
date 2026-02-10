import { NextRequest, NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validation";
import { sendEmail, addContact } from "@/lib/brevo";
import { SERVICE_INTEREST_OPTIONS, BUDGET_RANGE_OPTIONS } from "@/lib/constants";

// Simple in-memory rate limiter (for production, use Redis/Vercel KV)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX_REQUESTS = 3;

function checkRateLimit(email: string): { allowed: boolean; remaining?: number } {
  const now = Date.now();
  const record = rateLimitMap.get(email);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(email, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
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
    const validationResult = contactFormSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Invalid form data", details: validationResult.error.issues },
        { status: 400 }
      );
    }

    const { name, email, company, serviceInterest, budgetRange, message } = validationResult.data;

    // Rate limiting
    const rateLimit = checkRateLimit(email);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: "Too many submissions. Please try again later." },
        { status: 429 }
      );
    }

    // Add contact to Brevo
    const contactResult = await addContact({
      email,
      attributes: {
        FIRSTNAME: name.split(" ")[0],
        LASTNAME: name.split(" ").slice(1).join(" ") || name,
        COMPANY: company || "",
        SERVICE_INTEREST: serviceInterest,
        BUDGET_RANGE: budgetRange,
      },
      updateEnabled: true,
    });

    if (!contactResult.success) {
      console.error("Failed to add contact:", contactResult.error);
      // Continue anyway - don't block submission if contact add fails
    }

    // Get service and budget labels
    const serviceLabel =
      SERVICE_INTEREST_OPTIONS.find((s) => s.value === serviceInterest)?.label || serviceInterest;
    const budgetLabel =
      BUDGET_RANGE_OPTIONS.find((b) => b.value === budgetRange)?.label || budgetRange;

    // Send notification email to agency
    const agencyEmailHtml = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Company:</strong> ${company || "Not provided"}</p>
      <p><strong>Service Interest:</strong> ${serviceLabel}</p>
      <p><strong>Budget Range:</strong> ${budgetLabel}</p>
      <h3>Message:</h3>
      <p>${message.replace(/\n/g, "<br>")}</p>
    `;

    const agencyEmailResult = await sendEmail({
      to: [{ email: "info@nextlevelmarketerz.com", name: "NextLevel Marketerz" }],
      subject: `New Contact: ${name} - ${serviceLabel}`,
      htmlContent: agencyEmailHtml,
    });

    if (!agencyEmailResult.success) {
      console.error("Failed to send agency email:", agencyEmailResult.error);
    }

    // Send confirmation email to user
    const userEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #c9a227;">Thank you for reaching out!</h1>
        <p>Hi ${name.split(" ")[0]},</p>
        <p>Thank you for your interest in NextLevel Marketerz. We've received your message and will get back to you within 24 hours.</p>
        <h3>Your Message:</h3>
        <p style="background: #f5f5f5; padding: 15px; border-radius: 5px;">${message.replace(/\n/g, "<br>")}</p>
        <h3>What's Next?</h3>
        <ul>
          <li>We'll review your inquiry</li>
          <li>A team member will reach out to discuss your project</li>
          <li>We'll provide a tailored proposal based on your needs</li>
        </ul>
        <p>In the meantime, feel free to explore our <a href="https://nextlevelmarketerz.com/work">case studies</a> to see what we've done for other clients.</p>
        <p style="margin-top: 30px;">
          Best regards,<br>
          <strong>The NextLevel Marketerz Team</strong>
        </p>
        <p style="font-size: 12px; color: #666;">
          Dubai, UAE | info@nextlevelmarketerz.com
        </p>
      </div>
    `;

    const userEmailResult = await sendEmail({
      to: [{ email, name }],
      subject: "Thank you for contacting NextLevel Marketerz",
      htmlContent: userEmailHtml,
      replyTo: { email: "info@nextlevelmarketerz.com", name: "NextLevel Marketerz" },
    });

    if (!userEmailResult.success) {
      console.error("Failed to send user email:", userEmailResult.error);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for your message! We'll be in touch soon.",
        rateLimit: { remaining: rateLimit.remaining },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
