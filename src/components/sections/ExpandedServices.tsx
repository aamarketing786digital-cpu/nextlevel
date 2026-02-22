"use client";

import { Container } from "@/components/layout/Container";
import { ALL_SERVICES } from "@/lib/constants";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function ExpandedServices() {
  const [isOpen, setIsOpen] = useState(false);
  
  // Show first 8 on initial load, rest on expand
  const visibleServices = isOpen ? ALL_SERVICES : ALL_SERVICES.slice(0, 8);

  return (
    <section className="section-dark bg-black py-20 md:py-32 relative overflow-hidden border-t border-white/10">
      <Container>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-medium text-white tracking-tight mb-4">
              Comprehensive Services
            </h2>
            <p className="text-slate-400 text-lg">
              Everything you need to scale your brand under one roof.
            </p>
          </div>

          <div className="flex flex-col">
            <AnimatePresence initial={false}>
              {visibleServices.map((service, index) => (
                <motion.div
                  key={service}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, delay: isOpen ? index * 0.05 : 0 }}
                  className="overflow-hidden border-b border-white/5 last:border-0"
                >
                  <Link
                    href="/contact"
                    className="group flex items-center justify-between py-5 px-4 hover:bg-white/5 transition-colors"
                  >
                    <span className="text-lg md:text-xl font-medium text-slate-200 tracking-wide group-hover:text-white transition-colors">{service}</span>
                    <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-white transition-colors transform group-hover:translate-x-1" />
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>

            <div className="mt-10 mx-4">
              <Button
                size="lg"
                className="w-full rounded-2xl bg-[#E53935] hover:bg-[#D32F2F] text-white font-semibold text-lg py-7 transition-colors shadow-[0_4px_14px_0_rgba(229,57,53,0.39)] hover:shadow-[0_6px_20px_rgba(229,57,53,0.23)]"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? "Show Less" : "Explore All"}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
