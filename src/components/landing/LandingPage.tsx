"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { LandingPageConfig } from "@/lib/landing-pages";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRight, CheckCircle, MessageCircle, Send, Loader2 } from "lucide-react";

// ─── Reusable fade-in wrapper ───
const FadeIn = ({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

// ─── Form component ───
function AuditForm({
  formTitle,
  serviceType,
}: {
  formTitle: string;
  serviceType: string;
}) {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          company: formState.company || "",
          serviceInterest: serviceType,
          budgetRange: "not-sure",
          message: `[Landing Page Lead: ${serviceType}]\nPhone: ${formState.phone}\n\n${formState.message}`,
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
      } else {
        const data = await response.json();
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSuccess) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center">
        <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-slate-900 mb-2">
          We&apos;ve received your request!
        </h3>
        <p className="text-slate-600">
          A team member will reach out within 24 hours. For faster response, WhatsApp us directly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-xl font-bold text-slate-900 mb-1">{formTitle}</h3>
      <p className="text-sm text-slate-500 mb-4">Fill in below and we&apos;ll get back to you within 24 hours.</p>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input
          type="text"
          placeholder="Your Name *"
          required
          value={formState.name}
          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
          className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-orange-500 transition-all bg-slate-50/50"
        />
        <input
          type="email"
          placeholder="Business Email *"
          required
          value={formState.email}
          onChange={(e) => setFormState({ ...formState, email: e.target.value })}
          className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-orange-500 transition-all bg-slate-50/50"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input
          type="tel"
          placeholder="WhatsApp / Phone *"
          required
          value={formState.phone}
          onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
          className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-orange-500 transition-all bg-slate-50/50"
        />
        <input
          type="text"
          placeholder="Company Name"
          value={formState.company}
          onChange={(e) => setFormState({ ...formState, company: e.target.value })}
          className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-orange-500 transition-all bg-slate-50/50"
        />
      </div>
      <textarea
        placeholder="Tell us briefly about your business and goals..."
        rows={3}
        value={formState.message}
        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
        className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-orange-500 transition-all bg-slate-50/50 resize-none"
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-orange-300 disabled:to-orange-300 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 text-lg"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            Submit. It&apos;s Free
          </>
        )}
      </button>
      <p className="text-xs text-slate-400 text-center">
        No spam. No obligation. We&apos;ll respond within 24 hours.
      </p>
    </form>
  );
}

// ─── Main Landing Page Component ───
export function LandingPage({ config }: { config: LandingPageConfig }) {
  const formRef = useRef<HTMLDivElement>(null);

  function scrollToForm() {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const whatsappUrl = `https://wa.me/971568450650?text=${encodeURIComponent(
    config.hero.ctaWhatsApp
  )}`;

  return (
    <>
      {/* ═══════════════════════════════════════════════════
          SECTION 1: HERO - Full-width with hero image
      ═══════════════════════════════════════════════════ */}
      <section className="relative min-h-[90vh] flex items-center bg-teal-950 text-white overflow-hidden">
        {/* Hero background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={config.heroImage}
            alt={config.hero.headline}
            fill
            className="object-cover object-center opacity-30"
            priority
            sizes="100vw"
          />
          {/* Gradient overlays for readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-teal-950 via-teal-950/90 to-teal-950/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-teal-950 via-transparent to-teal-950/40" />
        </div>

        {/* Ambient glow decorations */}
        <div className={`absolute top-20 right-1/4 w-[500px] h-[500px] blur-[150px] rounded-full pointer-events-none ${
          config.hero.accentColor === 'blue' ? 'bg-blue-500/10' :
          config.hero.accentColor === 'emerald' ? 'bg-emerald-500/10' :
          config.hero.accentColor === 'rose' ? 'bg-rose-500/10' :
          config.hero.accentColor === 'orange' ? 'bg-orange-500/10' :
          config.hero.accentColor === 'indigo' ? 'bg-indigo-500/10' :
          'bg-orange-500/8'
        }`} />
        <div className={`absolute bottom-20 left-10 w-[300px] h-[300px] blur-[100px] rounded-full pointer-events-none ${
          config.hero.accentColor === 'blue' ? 'bg-teal-500/8' :
          config.hero.accentColor === 'emerald' ? 'bg-teal-500/8' :
          'bg-teal-500/5'
        }`} />

        {/* Decorative elements */}
        <div className="absolute top-[20%] right-[10%] opacity-20 hidden lg:block animate-pulse">
           <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
             <path d="M60 0L65.4 54.6L120 60L65.4 65.4L60 120L54.6 65.4L0 60L54.6 54.6L60 0Z" fill="white"/>
           </svg>
        </div>
        <div className="absolute bottom-[25%] left-[5%] opacity-10 hidden lg:block">
           <div className={`w-24 h-24 border-2 rounded-full rotate-12 ${
             config.hero.accentColor === 'blue' ? 'border-blue-400/40' :
             config.hero.accentColor === 'orange' ? 'border-orange-400/40' :
             'border-white/40'
           }`} />
        </div>
        <div className="absolute top-[40%] right-[15%] opacity-15 hidden lg:block animate-bounce" style={{ animationDuration: '4s' }}>
           <div className={`w-12 h-12 blur-xl rounded-full ${
             config.hero.accentColor === 'blue' ? 'bg-blue-400/30' :
             config.hero.accentColor === 'emerald' ? 'bg-emerald-400/30' :
             config.hero.accentColor === 'rose' ? 'bg-rose-400/30' :
             config.hero.accentColor === 'orange' ? 'bg-orange-400/30' :
             'bg-orange-400/30'
           }`} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-28 md:py-36 w-full">
          <div className="max-w-3xl">
            <FadeIn>
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.07] border border-white/[0.12] backdrop-blur-md mb-8">
                <span className="text-sm font-semibold tracking-wide text-orange-300">
                  {config.hero.badge}
                </span>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-[-0.03em] mb-8">
                {config.hero.headline}
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="text-lg md:text-xl text-slate-300 max-w-2xl leading-relaxed mb-10">
                {config.hero.subHeadline}
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <button
                  onClick={scrollToForm}
                  className={`group inline-flex items-center justify-center gap-3 text-white font-bold px-6 py-3.5 sm:px-8 sm:py-4 rounded-full transition-all shadow-xl text-base sm:text-lg ${
                    config.hero.accentColor === 'blue' ? 'bg-gradient-to-r from-blue-500 to-blue-600 shadow-blue-500/25 hover:shadow-blue-500/40' :
                    config.hero.accentColor === 'emerald' ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 shadow-emerald-500/25 hover:shadow-emerald-500/40' :
                    config.hero.accentColor === 'rose' ? 'bg-gradient-to-r from-rose-500 to-rose-600 shadow-rose-500/25 hover:shadow-rose-500/40' :
                    config.hero.accentColor === 'orange' ? 'bg-gradient-to-r from-orange-500 to-orange-600 shadow-orange-500/25 hover:shadow-orange-500/40' :
                    'bg-gradient-to-r from-orange-500 to-orange-600 shadow-orange-500/25 hover:shadow-orange-500/40'
                  }`}
                >
                  <span className="whitespace-nowrap">{config.hero.ctaText}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                </button>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3.5 sm:px-8 sm:py-4 rounded-full transition-all shadow-xl shadow-emerald-600/20 text-base sm:text-lg"
                >
                  <MessageCircle className="w-5 h-5 flex-shrink-0" />
                  <span className="whitespace-nowrap">WhatsApp Us Now</span>
                </a>
              </div>
            </FadeIn>

            {/* Trust badges */}
            <FadeIn delay={0.4}>
              <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-slate-400">
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  No lock-in contracts
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  Free audit included
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  Trusted by 50+ UAE brands
                </span>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION 2: PAIN POINTS
      ═══════════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="inline-block text-sm font-semibold text-orange-600 tracking-widest uppercase mb-4">The Problem</span>
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight mb-4">
                {config.painPoints.title}
              </h2>
              <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                If any of these describe your business, we can help.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {config.painPoints.items.map((item, i) => (
              <FadeIn key={i} delay={i * 0.12}>
                <div className="relative bg-gradient-to-br from-slate-50 to-white border border-slate-100 rounded-3xl p-8 lg:p-10 h-full hover:shadow-2xl hover:shadow-slate-200/60 hover:-translate-y-1 transition-all duration-500 group overflow-hidden">
                  {/* Subtle glass overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                  
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center text-3xl mb-6">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-orange-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed text-[15px]">
                      {item.description}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.4}>
            <div className="text-center mt-14">
              <button
                onClick={scrollToForm}
                className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-bold text-lg transition-colors group"
              >
                Let us fix this for you. Get a free audit
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION 3: SOCIAL PROOF - with hero image background
      ═══════════════════════════════════════════════════ */}
      <section className="relative py-24 md:py-32 bg-teal-950 text-white overflow-hidden">
        {/* Background image with heavy overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src={config.heroImage}
            alt="Results"
            fill
            className="object-cover object-center opacity-10"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-teal-950/80" />
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-500/5 blur-[200px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <FadeIn>
            <span className="inline-block text-sm font-semibold text-orange-400 tracking-widest uppercase mb-6">Proven Results</span>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Stat */}
            <FadeIn>
              <div>
                <div className="text-8xl md:text-9xl font-black bg-gradient-to-br from-orange-300 via-orange-400 to-orange-500 bg-clip-text text-transparent mb-3 leading-none">
                  {config.socialProof.stat}
                </div>
                <div className="text-2xl text-slate-200 font-medium">
                  {config.socialProof.statLabel}
                </div>
              </div>
            </FadeIn>

            {/* Testimonial */}
            <FadeIn delay={0.15}>
              <div className="bg-white/[0.04] border border-white/[0.08] rounded-3xl p-8 lg:p-10 backdrop-blur-md">
                <svg className="w-10 h-10 text-orange-400/60 mb-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-slate-200 text-lg leading-relaxed mb-8">
                  {config.socialProof.testimonial}
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-lg">
                    {config.socialProof.clientName.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-white text-lg">
                      {config.socialProof.clientName}
                    </div>
                    <div className="text-sm text-slate-400">
                      {config.socialProof.clientRole}
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION 4: PROCESS STEPS
      ═══════════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="inline-block text-sm font-semibold text-orange-600 tracking-widest uppercase mb-4">How It Works</span>
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight">
                {config.process.title}
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {config.process.steps.map((step, i) => (
              <FadeIn key={i} delay={i * 0.12}>
                <div className="relative bg-white rounded-3xl p-8 lg:p-10 shadow-lg shadow-slate-200/50 border border-slate-100 h-full">
                  {/* Step number */}
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center text-white font-black text-xl mb-6 shadow-lg shadow-orange-400/20">
                    {step.number}
                  </div>
                  {/* Arrow connector for non-last items */}
                  {i < config.process.steps.length - 1 && (
                    <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 z-10">
                      <ArrowRight className="w-8 h-8 text-orange-400/40" />
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-[15px]">
                    {step.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION 5: FAQ
      ═══════════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
          <FadeIn>
            <div className="text-center mb-14">
              <span className="inline-block text-sm font-semibold text-orange-600 tracking-widest uppercase mb-4">Got Questions?</span>
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight">
                Common Questions
              </h2>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="bg-slate-50 rounded-3xl p-6 md:p-10 border border-slate-100">
              <Accordion type="single" collapsible className="w-full">
                {config.faq.items.map((item, index) => (
                  <AccordionItem
                    key={index}
                    value={`lp-faq-${index}`}
                    className="border-b-slate-200/60 last:border-0 py-1"
                  >
                    <AccordionTrigger className="text-left text-lg font-semibold text-slate-800 hover:text-orange-600 transition-colors py-5">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-base text-slate-600 leading-relaxed pb-5">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION 6: FINAL CTA + FORM
      ═══════════════════════════════════════════════════ */}
      <section
        ref={formRef}
        className="relative py-24 md:py-32 bg-teal-950 text-white overflow-hidden"
      >
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={config.heroImage}
            alt="Get started"
            fill
            className="object-cover object-center opacity-8"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-teal-950/90" />
        </div>

        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-500/8 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal-500/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: CTA text */}
            <div>
              <FadeIn>
                <span className="inline-block text-sm font-semibold text-orange-400 tracking-widest uppercase mb-6">Get Started</span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-[1.1]">
                  {config.finalCta.headline}
                </h2>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p className="text-lg text-slate-300 leading-relaxed mb-10">
                  {config.finalCta.subHeadline}
                </p>
              </FadeIn>

              <FadeIn delay={0.2}>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-4 rounded-full transition-all shadow-xl shadow-emerald-600/20 text-lg mb-10"
                >
                  <MessageCircle className="w-6 h-6" />
                  Prefer WhatsApp? Chat now
                </a>
              </FadeIn>

              <FadeIn delay={0.3}>
                <div className="flex flex-col gap-4 text-slate-400">
                  <span className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span>Free. No commitment required</span>
                  </span>
                  <span className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span>We respond within 24 hours</span>
                  </span>
                  <span className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span>UAE-based team, local expertise</span>
                  </span>
                </div>
              </FadeIn>
            </div>

            {/* Right: Form */}
            <FadeIn delay={0.15}>
              <div className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl shadow-black/30">
                <AuditForm
                  formTitle={config.finalCta.formTitle}
                  serviceType={config.serviceType}
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
