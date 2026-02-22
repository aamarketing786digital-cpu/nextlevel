"use client";

import { useState } from "react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { MEGA_SERVICES } from "@/lib/constants";

type CategoryName = keyof typeof MEGA_SERVICES;
const categories = Object.keys(MEGA_SERVICES) as CategoryName[];

export function ServiceExpertise() {
  const [activeCategoryId, setActiveCategoryId] = useState<CategoryName>("Digital Marketing");
  // Track open state for mobile accordion
  const [openMobileCategoryId, setOpenMobileCategoryId] = useState<CategoryName | null>(null);

  const activeCategoryItems = MEGA_SERVICES[activeCategoryId] || [];

  const toggleMobileCategory = (category: CategoryName) => {
    setOpenMobileCategoryId(openMobileCategoryId === category ? null : category);
  };

  return (
    <section className="section-dark bg-background py-20 px-4 md:py-32 relative overflow-hidden border-t border-border/10">
      <Container className="max-w-[1800px] w-full px-4 md:px-8">
        <div className="w-full mx-auto">
          {/* Header */}
          <div className="text-center mb-12 lg:mb-24">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-medium text-foreground tracking-tight">
              Our Comprehensive Services
            </h2>
          </div>

          {/* ======================================================== */}
          {/* MOBILE VIEW (List with Red Button - matches 1st image)   */}
          {/* ======================================================== */}
          <div className="flex flex-col lg:hidden">
            <AnimatePresence>
                {categories.map((category, index) => {
                  const isOpen = openMobileCategoryId === category;
                  const categoryItems = MEGA_SERVICES[category] || [];

                  return (
                    <motion.div
                      key={category}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="border-b border-white/5 last:border-0"
                    >
                      <button
                        onClick={() => toggleMobileCategory(category)}
                        className="w-full group flex items-center justify-between py-5 px-2 hover:bg-white/5 transition-colors"
                      >
                        <span className={`text-lg md:text-xl font-medium tracking-wide transition-colors ${isOpen ? "text-primary" : "text-muted-foreground group-hover:text-foreground"}`}>
                          {category}
                        </span>
                        {isOpen ? (
                          <ChevronDown className="w-5 h-5 text-primary transition-colors" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors transform group-hover:translate-x-1" />
                        )}
                      </button>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="px-4 pb-6 pt-2 space-y-4">
                              <ul className="space-y-3 mb-6">
                                {categoryItems.map((item, idx) => (
                                  <li key={idx} className="flex items-start">
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-2 mr-3 shrink-0" />
                                    <span className="text-slate-300 text-sm md:text-base">{item}</span>
                                  </li>
                                ))}
                              </ul>
                              
                              <div className="flex flex-col gap-3">
                                <Button 
                                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-medium h-12"
                                >
                                  Get In Touch
                                </Button>
                                <Button 
                                  variant="outline"
                                  className="w-full bg-transparent border-white/20 text-white hover:bg-white/10 h-12"
                                >
                                  Learn More
                                </Button>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
            </AnimatePresence>
            <div className="mt-10 mx-2">
              <Button
                size="lg"
                className="w-full rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg py-7 transition-colors shadow-lg shadow-primary/20"
              >
                Explore All
              </Button>
            </div>
          </div>

          {/* ======================================================== */}
          {/* DESKTOP VIEW (Split Layout - matches 2nd image)          */}
          {/* ======================================================== */}
          <div className="hidden lg:flex gap-12 lg:gap-24 relative">
            {/* Left side: Navigation List */}
            {/* The vertical track bar (grey line) */}
            <div className="absolute left-[30px] top-4 bottom-4 w-[2px] bg-white/10" />

            {/* Scroll thumb indicator (White line moving based on active index) */}
            <div 
              className="absolute left-[30px] w-[3px] bg-primary transition-all duration-300 ease-out z-10"
              style={{
                height: '40px',
                top: `calc(${categories.indexOf(activeCategoryId)} * 64px + 16px)`
              }}
            />

            <div className="w-[400px] xl:w-[450px] shrink-0 relative pl-12 py-4 space-y-6 flex flex-col justify-start">
              {categories.map((category) => {
                const isActive = activeCategoryId === category;
                
                return (
                  <button
                    key={category}
                    onClick={() => setActiveCategoryId(category)}
                    className={`block w-full text-left transition-all duration-300 ${
                      isActive ? "opacity-100" : "opacity-60 hover:opacity-100"
                    }`}
                    style={{ height: '40px' }} // fixed height to match the math above
                  >
                    <div className={`
                      inline-flex items-center h-full px-6 rounded-full text-lg tracking-wide transition-all duration-300
                      ${isActive ? "text-foreground border border-primary" : "text-foreground border border-transparent hover:bg-white/5"}
                    `}>
                      {category}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right side: Dynamic Content Area */}
            <div className="flex-1 lg:pl-16 xl:pl-24 flex flex-col justify-start min-h-[500px] border-l border-white/5 pt-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategoryId}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="w-full relative"
                >
                  <h3 className="text-4xl lg:text-5xl font-display font-medium text-foreground tracking-tight mb-12">
                    {activeCategoryId}
                  </h3>
                  
                  {/* Grid formatting for the huge sub-lists */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 mb-16">
                    {activeCategoryItems.map((item, idx) => (
                      <div key={idx} className="flex items-start group">
                         <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 mr-4 shrink-0 transition-transform group-hover:scale-150" />
                         <span className="text-muted-foreground text-xl md:text-2xl font-light hover:text-foreground transition-colors cursor-pointer">
                            {item}
                         </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-4">
                    <Button 
                      className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 py-6 text-base font-medium transition-all"
                    >
                      Get In Touch
                    </Button>
                    <Button 
                      variant="outline"
                      className="bg-transparent border-foreground/30 text-foreground hover:bg-foreground/10 hover:border-foreground rounded-full px-8 py-6 text-base font-medium transition-all"
                    >
                      Learn More
                    </Button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
