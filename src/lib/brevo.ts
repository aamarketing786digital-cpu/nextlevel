/**
 * Brevo API wrapper for contact form submissions and email sending.
 * Documentation: https://developers.brevo.com/reference
 */

const BREVO_API_BASE = "https://api.brevo.com/v3";
const BREVO_API_KEY = process.env.BREVO_API_KEY;
const BREVO_CONTACT_LIST_ID = process.env.BREVO_CONTACT_LIST_ID;
const BREVO_NEWSLETTER_LIST_ID = process.env.BREVO_NEWSLETTER_LIST_ID;

export interface SendEmailOptions {
  to: { email: string; name: string }[];
  subject: string;
  htmlContent: string;
  sender?: { email: string; name: string };
  replyTo?: { email: string; name: string };
}

export interface AddContactOptions {
  email: string;
  attributes?: Record<string, string | number>;
  listIds?: number[];
  updateEnabled?: boolean;
}

/**
 * Send a transactional email via Brevo API
 */
export async function sendEmail(options: SendEmailOptions): Promise<{ success: boolean; error?: string }> {
  if (!BREVO_API_KEY) {
    return { success: false, error: "Brevo API key not configured" };
  }

  try {
    const response = await fetch(`${BREVO_API_BASE}/smtp/emails`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": BREVO_API_KEY,
      },
      body: JSON.stringify({
        sender: options.sender || {
          email: "noreply@nextlevelmarketerz.com",
          name: "NextLevel Marketerz",
        },
        to: options.to,
        subject: options.subject,
        htmlContent: options.htmlContent,
        replyTo: options.replyTo,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        error: errorData.message || `HTTP ${response.status}: ${response.statusText}`,
      };
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
 * Add or update a contact in Brevo
 */
export async function addContact(options: AddContactOptions): Promise<{ success: boolean; error?: string }> {
  if (!BREVO_API_KEY) {
    return { success: false, error: "Brevo API key not configured" };
  }

  try {
    const listIds = options.listIds || (BREVO_CONTACT_LIST_ID ? [parseInt(BREVO_CONTACT_LIST_ID)] : undefined);

    const response = await fetch(`${BREVO_API_BASE}/contacts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": BREVO_API_KEY,
      },
      body: JSON.stringify({
        email: options.email,
        attributes: options.attributes,
        listIds,
        updateEnabled: options.updateEnabled ?? true,
      }),
    });

    // Contact already exists is not an error for our use case
    if (response.status === 400) {
      const errorData = await response.json().catch(() => ({}));
      if (errorData.code === "duplicate_parameter") {
        return { success: true };
      }
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        error: errorData.message || `HTTP ${response.status}: ${response.statusText}`,
      };
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
 * Add email to newsletter list
 */
export async function addNewsletterSubscriber(
  email: string
): Promise<{ success: boolean; error?: string }> {
  if (!BREVO_NEWSLETTER_LIST_ID) {
    return { success: false, error: "Newsletter list ID not configured" };
  }

  return addContact({
    email,
    listIds: [parseInt(BREVO_NEWSLETTER_LIST_ID)],
    updateEnabled: true,
  });
}
