"use client";

import { Container } from "@/components/layout/Container";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

const FAQ_ITEMS = [
  {
    question: "Do you offer tailored digital marketing packages?",
    answer: "Yes, we understand that every business is unique. We offer comprehensive, bespoke digital marketing strategies tailored specifically to your goals, industry, and target audience to ensure maximum ROI."
  },
  {
    question: "How long does it take to see results from SEO?",
    answer: "SEO is a long-term strategy. While some improvements can be seen in the first 30-60 days, significant ranking changes and organic traffic growth typically take 3 to 6 months of consistent, high-quality optimization."
  },
  {
    question: "What makes your agency different from freelancers?",
    answer: "Unlike freelancers who often specialize in only one area, we provide a full-stack in-house team of experts across SEO, Paid Media, Development, and Design. This ensures cohesive strategy, enterprise-level reliability, and faster scalable execution."
  },
  {
    question: "Can you guarantee reaching the #1 spot on Google?",
    answer: "No reputable agency can guarantee a #1 spot due to the constantly changing nature of search algorithms. However, our proven, data-driven strategies consistently place our clients on the first page, driving highly qualified organic traffic."
  }
];

export function FaqSection() {
  return (
    <section className="py-24 lg:py-32 bg-slate-50 relative overflow-hidden">
      <Container>
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 space-y-4"
          >
            <h2 className="text-3xl md:text-5xl font-display font-medium text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto font-light">
              Everything you need to know about partnering with us and accelerating your digital growth.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="w-full bg-white p-6 md:p-10 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100"
          >
            <Accordion type="single" collapsible className="w-full">
              {FAQ_ITEMS.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-b-slate-100 last:border-0 py-2">
                  <AccordionTrigger className="text-left text-lg md:text-xl font-medium text-slate-800 hover:text-primary transition-colors py-4">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-slate-500 leading-relaxed pb-6">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>

        </div>
      </Container>
    </section>
  );
}
