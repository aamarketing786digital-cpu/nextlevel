"use client";

import { useRef } from "react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { Check, Mail, Phone } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

export function CtaBento() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -50]);

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
                Dial <span className="font-semibold text-foreground">04-332-0808</span> for a free demo and discovery call!
              </p>
              <p>Let's Connect to discover:</p>
              
              <ul className="space-y-4">
                {[
                  "How Prism Digital accelerates your marketing growth.",
                  "Marketing strategies that are faster, cheaper, and scalable.",
                  "Why we outshine agencies, freelancers, and in-house teams."
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
            >
              <Button size="lg" className="w-fit text-lg px-8 py-6 rounded-full shadow-lg shadow-primary/25 hover:scale-105 transition-transform">
                Get In Touch
              </Button>
            </motion.div>
          </div>

          {/* Right Side - Custom Bento Grid */}
          <div className="grid grid-cols-2 grid-rows-2 gap-4 h-[500px] lg:h-[600px] w-full">
            
            {/* Top Left - Phone Graphic Image */}
            <motion.div 
              style={{ y: y1 }}
              className="col-span-1 row-span-1 rounded-3xl overflow-hidden relative group"
            >
              <div className="absolute inset-0 bg-slate-200/50 mix-blend-multiply z-10 transition-opacity group-hover:opacity-0" />
              <img 
                src="https://images.unsplash.com/photo-1512314889357-e157c22f938d?q=80&w=800&auto=format&fit=crop" 
                alt="Mobile Communication Connect" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Overlay Icons */}
              <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                <div className="flex gap-4 p-4 rounded-full bg-white/20 backdrop-blur-md border border-white/40 shadow-xl">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center"><Mail className="w-5 h-5 text-blue-500" /></div>
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center"><Phone className="w-5 h-5 text-green-500" /></div>
                </div>
              </div>
            </motion.div>

            {/* Top Right - Call Us Card */}
            <motion.div 
              style={{ y: y2 }}
              className="col-span-1 row-span-1 rounded-3xl bg-white border border-border shadow-md p-6 flex flex-col justify-center gap-4 group hover:shadow-xl transition-all"
            >
              <h3 className="text-xl lg:text-3xl text-slate-500 font-light">Call Us Now!</h3>
              <p className="text-2xl lg:text-4xl font-display font-medium text-slate-900 tracking-tight group-hover:text-primary transition-colors">
                04-332-0808
              </p>
            </motion.div>

            {/* Bottom Left - Email Us Card */}
            <motion.div 
              style={{ y: y1 }}
              className="col-span-1 row-span-1 rounded-3xl bg-black text-white p-6 flex flex-col justify-between group hover:shadow-2xl hover:shadow-black/20 transition-all"
            >
              <h3 className="text-2xl lg:text-3xl font-light">Email Us!</h3>
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                <Mail className="w-6 h-6 text-white" />
              </div>
            </motion.div>

            {/* Bottom Right - Agent Image */}
            <motion.div 
              style={{ y: y2 }}
              className="col-span-1 row-span-1 rounded-3xl overflow-hidden relative group"
            >
              <div className="absolute inset-0 bg-primary/10 mix-blend-overlay z-10 transition-opacity group-hover:opacity-0" />
              <img 
                src="https://images.unsplash.com/photo-1598257006626-48b0c252070d?q=80&w=800&auto=format&fit=crop" 
                alt="Customer Service Agent" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </motion.div>

          </div>

        </div>
      </Container>
    </section>
  );
}
