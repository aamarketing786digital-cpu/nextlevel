import { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { ContactForm } from "@/components/sections/ContactForm";
import { Mail, MapPin, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | NextLevel Marketerz",
  description:
    "Get in touch with NextLevel Marketerz. Let's discuss how we can transform your digital presence with AI-powered marketing and cutting-edge web solutions.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-slate-950 py-32 md:py-40 relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 pointer-events-none" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

        <Container>
          <div className="text-center max-w-3xl mx-auto relative z-10">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-display font-bold text-white mb-8 tracking-tight">
              Let's Build Something <span className="text-gradient-gold">Amazing</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed font-light">
              Ready to transform your digital presence? We'd love to hear about your
              project. Fill out the form below and we'll get back to you within 24 hours.
            </p>
          </div>
        </Container>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 md:py-24 relative overflow-hidden bg-slate-50">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50 to-white pointer-events-none" />
        <Container>
          <div className="grid lg:grid-cols-3 gap-12 relative z-10">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-6 text-slate-900">Get in Touch</h2>
                <p className="text-slate-600 mb-8">
                  Whether you have a question about our services, want to discuss a project,
                  or just want to say hello, we'd love to hear from you.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-slate-900">Email</h3>
                    <a
                      href="mailto:info@nextlevelmarketerz.com"
                      className="text-slate-600 hover:text-primary transition-colors"
                    >
                      info@nextlevelmarketerz.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-slate-900">Phone</h3>
                    <a
                      href="tel:+9714XXXXXXX"
                      className="text-slate-600 hover:text-primary transition-colors"
                    >
                      +971 4 XXX XXXX
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-slate-900">Location</h3>
                    <p className="text-slate-600">Dubai, UAE</p>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div className="pt-6 border-t border-slate-200">
                <h3 className="font-semibold mb-3 text-slate-900">Business Hours</h3>
                <div className="text-sm text-slate-600 space-y-1">
                  <p>Monday - Friday: 9:00 AM - 6:00 PM GST</p>
                  <p>Saturday: 10:00 AM - 4:00 PM GST</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-xl shadow-slate-200/50">
                <ContactForm />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-white border-t border-slate-100">
        <Container>
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">
              Not Ready to Reach Out?
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto mb-8">
              Explore our case studies to see what we've built for other clients, or
              learn more about our services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/work"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                View Our Work
              </a>
              <a
                href="/services"
                className="inline-flex items-center justify-center px-6 py-3 border border-slate-300 text-slate-700 rounded-lg font-semibold hover:bg-slate-50 transition-colors"
              >
                Our Services
              </a>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
