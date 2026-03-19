import { Container } from "@/components/layout/Container";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | NextLevel Marketerz",
  description: "Read our Terms of Service to understand the rules and guidelines for using NextLevel Marketerz services.",
  openGraph: {
    title: "Terms of Service | NextLevel Marketerz",
    description: "Read our Terms of Service to understand the rules and guidelines for using NextLevel Marketerz services.",
  },
};

export default function TermsOfServicePage() {
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
              Terms of Service
            </h1>
            <p className="text-muted-foreground text-lg">
              Last updated: {lastUpdated}
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-slate prose-lg max-w-none">
            {/* Introduction */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">1. Introduction</h2>
              <p className="text-muted-foreground mb-4">
                Welcome to NextLevel Marketerz. These Terms of Service (&quot;Terms&quot;) govern your use of our website, services, and digital marketing solutions. By accessing or using our services, you agree to be bound by these Terms.
              </p>
              <p className="text-muted-foreground">
                If you do not agree to these Terms, please do not use our services.
              </p>
            </section>

            {/* Services */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">2. Our Services</h2>
              <p className="text-muted-foreground mb-4">
                NextLevel Marketerz provides digital marketing services, including but not limited to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Web Development and Design</li>
                <li>Social Media Marketing</li>
                <li>Search Engine Optimization (SEO)</li>
                <li>Pay-Per-Click Advertising (PPC)</li>
                <li>Content Marketing</li>
                <li>Brand Strategy and Identity</li>
                <li>Email Marketing Campaigns</li>
                <li>Analytics and Reporting</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                We reserve the right to modify, suspend, or discontinue any aspect of our services at any time.
              </p>
            </section>

            {/* Client Responsibilities */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">3. Client Responsibilities</h2>
              <p className="text-muted-foreground mb-4">
                As a client of NextLevel Marketerz, you agree to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Provide accurate and complete information required for service delivery</li>
                <li>Maintain the security of your account credentials</li>
                <li>Provide timely feedback and approvals for project milestones</li>
                <li>Ensure you have rights to any content, images, or materials you provide</li>
                <li>Comply with all applicable laws and regulations</li>
                <li>Make payments in accordance with agreed-upon terms</li>
              </ul>
            </section>

            {/* Payment Terms */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">4. Payment Terms</h2>
              <p className="text-muted-foreground mb-4">
                Payment terms are as follows:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li><strong>Deposits:</strong> A minimum deposit of 50% is required to commence any project</li>
                <li><strong>Milestone Payments:</strong> Additional payments may be required at project milestones</li>
                <li><strong>Final Payment:</strong> Final payment is due before delivery of final deliverables</li>
                <li><strong>Late Payments:</strong> Late payments may incur interest at 1.5% per month</li>
                <li><strong>Refunds:</strong> Deposits are non-refundable once work has commenced</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                All prices are in UAE Dirhams (AED) unless otherwise stated. We reserve the right to adjust pricing with 30 days notice for ongoing services.
              </p>
            </section>

            {/* Intellectual Property */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">5. Intellectual Property</h2>
              <p className="text-muted-foreground mb-4">
                Ownership of intellectual property is as follows:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li><strong>Our Materials:</strong> All proprietary materials, methodologies, and tools developed by NextLevel Marketerz remain our exclusive property</li>
                <li><strong>Client Materials:</strong> Upon full payment, you own the final deliverables created specifically for your project</li>
                <li><strong>Third-Party Assets:</strong> Licenses for third-party software, stock images, or fonts must be obtained separately</li>
                <li><strong>Preview Work:</strong> You may not use work-in-progress or draft materials without our written consent</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                We grant you a non-exclusive, non-transferable license to use the final deliverables for your business purposes.
              </p>
            </section>

            {/* Confidentiality */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">6. Confidentiality</h2>
              <p className="text-muted-foreground mb-4">
                Both parties agree to maintain the confidentiality of:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Proprietary business information and strategies</li>
                <li>Technical processes and methodologies</li>
                <li>Client data and customer information</li>
                <li>Financial information and pricing</li>
                <li>Any information marked as confidential</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                This obligation survives the termination of our business relationship.
              </p>
            </section>

            {/* Project Timeline and Delivery */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">7. Project Timeline and Delivery</h2>
              <p className="text-muted-foreground mb-4">
                Regarding project timelines and delivery:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Timelines are estimates based on information available at project commencement</li>
                <li>Delays caused by client feedback, content provision, or approvals may extend timelines</li>
                <li>We are not liable for delays caused by third parties or circumstances beyond our control</li>
                <li>Delivery dates may be adjusted by mutual written agreement</li>
              </ul>
            </section>

            {/* Revisions and Changes */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">8. Revisions and Changes</h2>
              <p className="text-muted-foreground mb-4">
                Revision policies are as follows:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Each project includes a specified number of revision rounds as outlined in the project proposal</li>
                <li>Additional revisions beyond the included rounds may incur additional fees</li>
                <li>Changes to project scope after commencement may require a change order and adjusted pricing</li>
                <li>Revisions must be requested within 14 days of deliverable presentation</li>
              </ul>
            </section>

            {/* Client Content and Materials */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">9. Client Content and Materials</h2>
              <p className="text-muted-foreground mb-4">
                Regarding content you provide:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>You represent that you have the right to use all content, images, and materials you provide</li>
                <li>You indemnify us against claims arising from content you provide</li>
                <li>We are not responsible for verifying the accuracy of client-provided information</li>
                <li>You agree to review and approve all content before publication</li>
              </ul>
            </section>

            {/* Termination */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">10. Termination</h2>
              <p className="text-muted-foreground mb-4">
                Either party may terminate the agreement with written notice:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li><strong>By Client:</strong> 30 days written notice; payment for work completed and non-cancelable commitments</li>
                <li><strong>By Us:</strong> Immediate termination for material breach, non-payment, or violation of these Terms</li>
                <li><strong>Effect of Termination:</strong> Upon termination, all fees become immediately due</li>
              </ul>
            </section>

            {/* Limitation of Liability */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">11. Limitation of Liability</h2>
              <p className="text-muted-foreground mb-4">
                To the fullest extent permitted by law:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Our total liability is limited to the amount paid for the specific service in question</li>
                <li>We are not liable for indirect, incidental, special, or consequential damages</li>
                <li>We are not liable for lost profits, revenue, data, or business opportunities</li>
                <li>We do not guarantee specific results, rankings, or performance metrics</li>
              </ul>
            </section>

            {/* Warranties and Disclaimers */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">12. Warranties and Disclaimers</h2>
              <p className="text-muted-foreground mb-4">
                We provide services on an &quot;as is&quot; and &quot;as available&quot; basis. We make no warranties regarding:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Uninterrupted or error-free operation of our services or your website</li>
                <li>Specific marketing results, ROI, or performance outcomes</li>
                <li>Search engine rankings or social media engagement</li>
                <li>Compatibility with third-party platforms or services</li>
              </ul>
            </section>

            {/* Indemnification */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">13. Indemnification</h2>
              <p className="text-muted-foreground">
                You agree to indemnify and hold NextLevel Marketerz harmless from any claims, damages, losses, liabilities, and expenses arising from:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Your use of our services</li>
                <li>Your violation of these Terms</li>
                <li>Your violation of any third-party rights</li>
                <li>Content or materials you provide</li>
              </ul>
            </section>

            {/* Force Majeure */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">14. Force Majeure</h2>
              <p className="text-muted-foreground">
                We are not liable for delays or failures caused by circumstances beyond our reasonable control, including but not limited to natural disasters, war, strikes, government actions, or internet infrastructure failures.
              </p>
            </section>

            {/* Dispute Resolution */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">15. Dispute Resolution</h2>
              <p className="text-muted-foreground mb-4">
                Any disputes arising from these Terms shall be resolved as follows:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Good faith negotiation between parties</li>
                <li>Mediation in Dubai, UAE</li>
                <li>Final resolution through courts of Dubai, UAE</li>
                <li>These Terms are governed by laws of Dubai, UAE</li>
              </ul>
            </section>

            {/* General Provisions */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">16. General Provisions</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li><strong>Entire Agreement:</strong> These Terms constitute the entire agreement between parties</li>
                <li><strong>Severability:</strong> If any provision is found invalid, remaining provisions stay in effect</li>
                <li><strong>Waiver:</strong> Failure to enforce any provision does not constitute a waiver</li>
                <li><strong>Assignment:</strong> You may not assign rights without our written consent</li>
                <li><strong>Notices:</strong> All notices should be sent to legal@nextlevelmarketerz.com</li>
              </ul>
            </section>

            {/* Contact */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">17. Contact Us</h2>
              <p className="text-muted-foreground mb-4">
                For questions about these Terms of Service, please contact us:
              </p>
              <div className="text-muted-foreground space-y-2">
                <p><strong>Email:</strong> legal@nextlevelmarketerz.com</p>
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
