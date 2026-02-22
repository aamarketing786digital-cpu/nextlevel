"use client";

import { Container } from "@/components/layout/Container";
import { motion } from "framer-motion";

const BASE_LOGOS = [
  { name: "ADGULLY", src: "/images/Logos/adgully.svg", isText: true, alt: "Adgully" },
  { name: "Campaign", src: "/images/Logos/campaign.svg", isText: true, alt: "Campaign Middle East" },
  { name: "MENAFN", src: "/images/Logos/menafn.svg", isText: true, alt: "MENAFN" },
  { name: "PR.com", src: "/images/Logos/prcom.svg", isText: true, alt: "PR.com" },
];

// Duplicate the array multiple times to ensure enough width for the 50% seamless loop trick
const PRESS_LOGOS = [...BASE_LOGOS, ...BASE_LOGOS, ...BASE_LOGOS, ...BASE_LOGOS];

export function PressLogos() {
  return (
    <section className="section-dark bg-black pb-12 pt-6 border-b border-white/5 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-white/10" />
      <Container>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12 pl-4 pr-4">
          <h2 className="text-2xl md:text-3xl font-display font-medium text-white tracking-wide shrink-0">
            As Seen In
          </h2>

      {/* Marquee Wrapper */}
      <div className="relative flex overflow-x-hidden group flex-1 w-full max-w-5xl">
        <div className="absolute inset-y-0 left-0 w-8 md:w-16 bg-gradient-to-r from-black to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-8 md:w-16 bg-gradient-to-l from-black to-transparent z-10" />

        <motion.div
           className="flex whitespace-nowrap gap-8 md:gap-16 items-center w-max px-4"
           animate={{ x: ["0%", "-50%"] }}
           transition={{
             ease: "linear",
             duration: 25,
             repeat: Infinity,
           }}
        >
          {PRESS_LOGOS.map((logo, index) => (
            <div
              key={`${logo.name}-${index}`}
              className="flex items-center justify-center opacity-80 hover:opacity-100 transition-all duration-300"
            >
              <div className="bg-white px-6 py-3 rounded text-xl md:text-2xl font-bold text-black border border-white/20 uppercase tracking-tighter">
                {logo.name}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
      
      </div>
      </Container>
    </section>
  );
}
