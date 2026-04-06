"use client";

import { useRef } from "react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { Check, Mail, Phone, MessageCircle, Linkedin, Instagram, Send, Sparkles } from "lucide-react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

export function CtaBento() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -50]);

  // Contact info - Update these with actual NextLevel Marketerz details
  const CONTACT_INFO = {
    phone: "+971-56-3377016",
    email: "info@nextlevelmarketerz.com",
    whatsapp: "+971563377016",
  };

  return (
    <section ref={containerRef} className="py-24 lg:py-32 bg-background relative overflow-hidden text-foreground">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left Side - Text & Value Prop */}
          <div className="flex flex-col space-y-8">
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-display font-medium tracking-tight leading-[1.1]">
              Ranking #1 with us
            </h2>

            <div className="space-y-6 text-lg md:text-xl text-muted-foreground font-light leading-relaxed">
              <p>
                Reach out to <span className="font-semibold text-foreground">{CONTACT_INFO.email}</span> or <span className="font-semibold text-foreground">{CONTACT_INFO.phone}</span> for a free consultation.
              </p>
              <p>Let's discuss how we can help you:</p>

              <ul className="space-y-4">
                {[
                  "Achieve top rankings in your industry",
                  "Generate qualified leads consistently",
                  "Build a memorable brand presence",
                  "Scale your marketing ROI efficiently",
                  "Outshine your competition online"
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                  >
                    <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-foreground/90">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <Button
                asChild
                size="lg"
                className="rounded-full font-medium text-lg px-8 py-6 shadow-lg shadow-primary/25 hover:scale-105 transition-transform"
              >
                <Link href="/contact" className="flex items-center gap-2">
                  <Send className="w-5 h-5" />
                  Start Your Project
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full font-medium text-lg px-8 py-6 hover:scale-105 transition-transform"
              >
                <Link href="/services" className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Explore Services
                </Link>
              </Button>
            </motion.div>

            {/* Social Links */}
            <div className="flex items-center gap-4 pt-4">
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/20 transition-all"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href={`tel:${CONTACT_INFO.phone}`}
                className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/20 transition-all"
                aria-label="Call"
              >
                <Phone className="w-5 h-5" />
              </a>
              <a
                href={`https://wa.me/${CONTACT_INFO.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-muted-foreground hover:text-green-500 hover:bg-green-500/10 transition-all"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/company/nextlevelmarketerz"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-muted-foreground hover:text-blue-500 hover:bg-blue-500/10 transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com/nextlevelmarketerz"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-muted-foreground hover:text-pink-500 hover:bg-pink-500/10 transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Right Side - Custom Bento Grid */}
          <div className="grid grid-cols-2 grid-rows-2 gap-4 h-[500px] lg:h-[600px] w-full">

            {/* Top Left - Phone Graphic Card */}
            <motion.div
              style={{ y: y1 }}
              className="col-span-1 row-span-1 rounded-3xl overflow-hidden relative group border border-border bg-card"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 z-10" />
              <div className="relative z-20 p-6 h-full flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center mb-4">
                    <MessageCircle className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-2xl font-display font-bold mb-2">
                    Quick Response
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Get answers within 24 hours
                  </p>
                </div>
                <div className="flex gap-2">
                  <a
                    href={`tel:${CONTACT_INFO.phone}`}
                    className="flex-1 bg-primary/10 hover:bg-primary/20 py-3 px-4 rounded-xl border border-border text-center text-sm font-medium transition-all hover:scale-105"
                  >
                    Call Now
                  </a>
                  <a
                    href={`https://wa.me/${CONTACT_INFO.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-green-500/10 hover:bg-green-500/20 py-3 px-4 rounded-xl border border-green-500/20 text-center text-sm font-medium transition-all hover:scale-105"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Top Right - Phone Number Card */}
            <motion.div
              style={{ y: y2 }}
              className="col-span-1 row-span-1 rounded-3xl bg-card border border-border p-6 flex flex-col justify-center gap-4 group hover:border-primary/30 transition-all"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Phone className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl text-muted-foreground font-light mb-2">Call Now</h3>
              <a
                href={`tel:${CONTACT_INFO.phone}`}
                className="text-3xl md:text-4xl font-display font-bold tracking-tight hover:text-primary transition-colors"
              >
                {CONTACT_INFO.phone}
              </a>
              <p className="text-muted-foreground/60 text-sm">
                Sunday - Thursday, 9am - 6pm
              </p>
            </motion.div>

            {/* Bottom Left - Email Card */}
            <motion.div
              style={{ y: y1 }}
              className="col-span-1 row-span-1 rounded-3xl bg-card border border-border p-6 flex flex-col justify-between group hover:border-primary/30 transition-all"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-4">
                  <Mail className="w-7 h-7 text-blue-500" />
                </div>
                <h3 className="text-2xl font-display font-bold mb-2">
                  Email Us
                </h3>
              </div>
              <a
                href={`mailto:${CONTACT_INFO.email}?subject=Inquiry from NextLevel Marketerz`}
                className="text-primary hover:text-primary/80 text-sm font-medium underline underline-offset-4 hover:underline-offset-2 transition-all"
              >
                {CONTACT_INFO.email}
              </a>
              <p className="text-muted-foreground/60 text-sm mt-2">
                We reply within 24 hours
              </p>
            </motion.div>

            {/* Bottom Right - Image/Brand Card */}
            <motion.div
              style={{ y: y2 }}
              className="col-span-1 row-span-1 rounded-3xl overflow-hidden relative group border border-border bg-teal-950"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/5 to-transparent z-10" />
              <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
              <div className="relative z-20 p-6 h-full flex flex-col justify-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center mb-4 mx-auto group-hover:scale-110 group-hover:border-primary/40 transition-all">
                  <Sparkles className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-display font-bold mb-2 text-white">
                  Ready to Start?
                </h3>
                <p className="text-slate-400 text-sm mb-4">
                  Get your free strategy session today
                </p>
                <Button
                  asChild
                  size="sm"
                  className="rounded-full font-medium w-full shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                >
                  <Link href="/contact" className="flex items-center justify-center gap-2">
                    <Send className="w-4 h-4" />
                    Get Started
                  </Link>
                </Button>
              </div>
            </motion.div>

          </div>

        </div>
      </Container>
    </section>
  );
}
