"use client";

import { Container } from "@/components/layout/Container";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const PAIN_POINTS = [
  {
    icon: "💸",
    title: "Burning budget with no results",
    description:
      "Tried Google or Meta ads and spent AED 3,000–15,000 with nothing to show for it. Deep distrust of agencies who promise the world and deliver dashboards.",
    cta: "We fix that →",
  },
  {
    icon: "👁️",
    title: "Invisible on Google",
    description:
      "You search your own service in Dubai and your competitor appears first. You don't understand why or how to fix it — and every day it stays that way, you lose clients.",
    cta: "We fix that →",
  },
  {
    icon: "🌐",
    title: "Dead website that doesn't convert",
    description:
      "You paid someone to build a website. It looks okay but gets no traffic, no inquiries, and zero ROI. It's a digital brochure, not a sales machine.",
    cta: "We fix that →",
  },
  {
    icon: "📱",
    title: "Social media with zero leads",
    description:
      "You post regularly but get likes and zero DMs. Follower count means nothing to your revenue. You need customers, not vanity metrics.",
    cta: "We fix that →",
  },
];

export function PainPoints() {
  return (
    <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
      
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="text-3xl md:text-5xl font-display font-medium text-slate-900 tracking-tight">
            Sound Familiar?
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto font-light">
            These are the most common frustrations we hear from UAE business owners. If any of these describe you, you&apos;re in the right place.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {PAIN_POINTS.map((pain, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
              className="group relative bg-slate-50 border border-slate-100 rounded-2xl p-8 hover:shadow-xl hover:shadow-slate-200/40 hover:border-amber-200/60 transition-all duration-500"
            >
              <div className="text-4xl mb-5">{pain.icon}</div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3 group-hover:text-amber-600 transition-colors">
                {pain.title}
              </h3>
              <p className="text-slate-600 leading-relaxed mb-5">
                {pain.description}
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 text-amber-600 font-medium text-sm hover:text-amber-700 transition-colors group-hover:gap-2.5"
              >
                {pain.cta}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
