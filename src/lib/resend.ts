/**
 * Resend API wrapper for contact form submissions and email sending.
 * Documentation: https://resend.com/docs
 * 
 * Replaces Brevo — same interface, drop-in swap.
 */

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "NextLevel Marketerz <noreply@nextlevelmarketerz.com>";

export interface SendEmailOptions {
  to: { email: string; name: string }[];
  subject: string;
  htmlContent: string;
  replyTo?: { email: string; name: string };
}

export interface AddContactOptions {
  email: string;
  attributes?: Record<string, string | number>;
  listIds?: number[];
  updateEnabled?: boolean;
}

/**
 * Send a transactional email via Resend
 */
export async function sendEmail(options: SendEmailOptions): Promise<{ success: boolean; error?: string }> {
  if (!process.env.RESEND_API_KEY) {
    console.warn("Resend API key not configured — skipping email send");
    return { success: false, error: "Resend API key not configured" };
  }

  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: options.to.map((r) => r.email),
      subject: options.subject,
      html: options.htmlContent,
      replyTo: options.replyTo?.email,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Add a contact — with Resend we use Audiences API.
 * For now, this is a no-op that logs the contact for manual CRM entry.
 * Resend Audiences can be configured later via the dashboard.
 */
export async function addContact(options: AddContactOptions): Promise<{ success: boolean; error?: string }> {
  if (!process.env.RESEND_API_KEY) {
    return { success: false, error: "Resend API key not configured" };
  }

  try {
    const audienceId = process.env.RESEND_AUDIENCE_ID;
    
    if (audienceId) {
      // If an audience is configured, add the contact to it
      const { error } = await resend.contacts.create({
        audienceId,
        email: options.email,
        firstName: options.attributes?.FIRSTNAME as string || "",
        lastName: options.attributes?.LASTNAME as string || "",
        unsubscribed: false,
      });

      if (error) {
        // "already exists" is fine
        if (error.message?.includes("already exists")) {
          return { success: true };
        }
        return { success: false, error: error.message };
      }
    } else {
      console.log(`[Resend] Contact logged (no audience configured): ${options.email}`);
    }

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Add email to newsletter audience
 */
export async function addNewsletterSubscriber(
  email: string
): Promise<{ success: boolean; error?: string }> {
  const audienceId = process.env.RESEND_NEWSLETTER_AUDIENCE_ID || process.env.RESEND_AUDIENCE_ID;
  
  if (!audienceId) {
    console.log(`[Resend] Newsletter subscriber logged (no audience configured): ${email}`);
    return { success: true }; // Don't block the UX if audience isn't set up yet
  }

  return addContact({
    email,
    listIds: [], // not used with Resend, kept for interface compat
    updateEnabled: true,
  });
}
