import { Container } from "@/components/layout/Container";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | NextLevel Marketerz",
  description: "Learn how NextLevel Marketerz collects, uses, and protects your personal information.",
  openGraph: {
    title: "Privacy Policy | NextLevel Marketerz",
    description: "Learn how NextLevel Marketerz collects, uses, and protects your personal information.",
  },
};

export default function PrivacyPolicyPage() {
  const lastUpdated = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="min-h-screen bg-background py-24 md:py-32">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-16">
            <h1 className="font-display text-5xl md:text-7xl font-bold text-foreground mb-6">
              Privacy Policy
            </h1>
            <p className="text-muted-foreground text-lg">
              Last updated: {lastUpdated}
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-slate prose-lg max-w-none">
            {/* Introduction */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">Introduction</h2>
              <p className="text-muted-foreground mb-4">
                Welcome to NextLevel Marketerz ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website nextlevelmarketerz.com and use our services.
              </p>
              <p className="text-muted-foreground">
                By using our website and services, you agree to the collection and use of information in accordance with this policy.
              </p>
            </section>

            {/* Information We Collect */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">Information We Collect</h2>

              <h3 className="text-xl font-semibold text-foreground mb-3">Personal Information</h3>
              <p className="text-muted-foreground mb-4">
                We may collect personal information that you provide directly to us, including:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
                <li>Name and contact information (email, phone number)</li>
                <li>Company information and job title</li>
                <li>Account credentials</li>
                <li>Payment information (processed securely through third-party providers)</li>
                <li>Communication preferences</li>
              </ul>

              <h3 className="text-xl font-semibold text-foreground mb-3">Automatically Collected Information</h3>
              <p className="text-muted-foreground mb-4">
                When you visit our website, we automatically collect certain information, including:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
                <li>IP address and browser type</li>
                <li>Device information and operating system</li>
                <li>Referring website and pages viewed</li>
                <li>Time and date of visit</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </section>

            {/* How We Use Your Information */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">How We Use Your Information</h2>
              <p className="text-muted-foreground mb-4">We use the collected information for various purposes, including:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Providing and maintaining our services</li>
                <li>Processing transactions and sending related information</li>
                <li>Sending technical notices and support messages</li>
                <li>Responding to comments, questions, and customer service requests</li>
                <li>Communicating about products, services, and events</li>
                <li>Monitoring and analyzing trends, usage, and activities</li>
                <li>Detecting, preventing, and addressing technical issues and fraudulent activity</li>
                <li>Complying with legal obligations</li>
              </ul>
            </section>

            {/* Data Sharing and Disclosure */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">Data Sharing and Disclosure</h2>
              <p className="text-muted-foreground mb-4">
                We may share your personal information with third parties in the following circumstances:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li><strong>Service Providers:</strong> With trusted third parties who assist us in operating our platform and providing services</li>
                <li><strong>Business Partners:</strong> With carefully selected partners whose products or services we think may interest you</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights, property, or safety</li>
                <li><strong>Business Transfers:</strong> In connection with any merger, sale of company assets, or acquisition</li>
              </ul>
            </section>

            {/* Cookies and Tracking */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">Cookies and Tracking Technologies</h2>
              <p className="text-muted-foreground mb-4">
                We use cookies and similar tracking technologies to collect and track information about your activities on our website. Cookies are small data files stored on your device that help us improve your experience, remember your preferences, and analyze usage patterns.
              </p>
              <p className="text-muted-foreground">
                You can control cookie settings through your browser preferences. However, disabling cookies may affect the functionality of our website.
              </p>
            </section>

            {/* Data Security */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">Data Security</h2>
              <p className="text-muted-foreground mb-4">
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            {/* Your Rights */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">Your Privacy Rights</h2>
              <p className="text-muted-foreground mb-4">
                Depending on your location, you may have certain rights regarding your personal information, including:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Access to your personal information</li>
                <li>Correction of inaccurate information</li>
                <li>Deletion of your personal information</li>
                <li>Objection to processing of your information</li>
                <li>Data portability</li>
                <li>Restriction of processing</li>
                <li>Withdrawal of consent</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                To exercise these rights, please contact us at privacy@nextlevelmarketerz.com
              </p>
            </section>

            {/* Third-Party Services */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">Third-Party Services</h2>
              <p className="text-muted-foreground mb-4">
                Our website may contain links to third-party websites and integrate with third-party services, including:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Social media platforms</li>
                <li>Analytics services (e.g., Google Analytics)</li>
                <li>Payment processors</li>
                <li>Email marketing services</li>
                <li>Content management systems</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                These third parties have their own privacy policies, and we are not responsible for their practices.
              </p>
            </section>

            {/* Children's Privacy */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">Children&apos;s Privacy</h2>
              <p className="text-muted-foreground">
                Our services are not intended for children under the age of 16. We do not knowingly collect personal information from children under 16. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
              </p>
            </section>

            {/* International Data Transfers */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">International Data Transfers</h2>
              <p className="text-muted-foreground">
                Your information may be transferred to and processed in countries other than your country of residence. We ensure appropriate safeguards are in place to protect your information in accordance with this Privacy Policy.
              </p>
            </section>

            {/* Changes to This Policy */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">Changes to This Privacy Policy</h2>
              <p className="text-muted-foreground">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the &quot;Last updated&quot; date. We encourage you to review this policy periodically.
              </p>
            </section>

            {/* Contact */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">Contact Us</h2>
              <p className="text-muted-foreground mb-4">
                If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="text-muted-foreground space-y-2">
                <p><strong>Email:</strong> privacy@nextlevelmarketerz.com</p>
                <p><strong>Website:</strong> nextlevelmarketerz.com</p>
                <p><strong>Location:</strong> Dubai, UAE</p>
              </div>
            </section>
          </div>
        </div>
      </Container>
    </main>
  );
}
