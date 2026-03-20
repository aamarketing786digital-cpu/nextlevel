"use client";

import { Container } from "@/components/layout/Container";
import { SERVICES } from "@/lib/constants";
import { ChevronRight, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// Service categories for organized display
const SERVICE_CATEGORIES = {
  "Digital Marketing": [
    "Search Engine Optimization",
    "Social Media Marketing",
    "Influencer Marketing",
    "PR & Outreach",
    "Email Marketing",
    "Amazon Marketing",
    "E-Commerce Marketplace",
    "SMS Marketing",
  ],
  "Web & App Development": [
    "Web Development",
    "Mobile App Development",
    "Website Hosting",
    "WhatsApp Business API",
    "ZOHO Integration",
  ],
  "Design": [
    "Website Design",
    "Mobile App Design",
    "Graphic Design",
    "Branding",
  ],
  "Paid Media": [
    "Google Ads",
    "Facebook Ads",
    "Instagram Ads",
    "Snapchat Ads",
    "X Ads",
    "Reddit Ads",
    "Pinterest Ads",
    "Linkedin Ads",
    "TikTok Ads",
    "Youtube Ads",
  ],
  "Lead Generation": [
    "LinkedIn Lead Generation",
    "Hospital Marketing",
    "Beauty & Wellness Marketing",
    "Medical Clinic Marketing",
    "Hotel Marketing",
    "Restaurant Marketing",
    "B2B Lead Generation",
    "Real Estate Marketing",
    "Education Marketing",
    "Insurance Marketing",
    "Fintech Marketing",
    "IT Marketing",
    "Security Marketing",
  ],
  "Video Production": [
    "Corporate Video Production",
    "3D Video Production",
    "SaaS Explainer Video",
    "Financial Video",
    "Social Video",
    "Motion Graphics",
  ],
  "Explainer Videos": [
    "Corporate Explainer Videos",
    "B2B Explainer Videos",
    "Tech Explainer Videos",
  ],
  "Animation": [
    "3D Animation",
    "Product Videos",
    "2D Animation",
  ],
  "Events": [
    "Exhibition Stand Design",
  ],
} as const;

export function ExpandedServices() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Get all service titles
  const allServiceTitles = SERVICES.map(s => s.title);

  // Filter services by category
  const getFilteredServices = () => {
    if (!selectedCategory) return allServiceTitles.slice(0, 12);
    const categoryServices = SERVICE_CATEGORIES[selectedCategory as keyof typeof SERVICE_CATEGORIES];
    if (categoryServices) {
      // Match services that contain the category keywords
      return SERVICES.filter(s =>
        categoryServices.some(cat => s.title.includes(cat))
      ).map(s => s.title);
    }
    return allServiceTitles.slice(0, 12);
  };

  const visibleServices = isOpen ? allServiceTitles : getFilteredServices();

  return (
    <section className="section-dark bg-slate-950 py-24 md:py-32 relative overflow-hidden border-t border-white/10">
      {/* Background Effects */}
      <div 
         className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none" 
         style={{ 
             backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.7'/%3E%3C/svg%3E")`,
         }} 
      />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[300px] bg-amber-500/5 rounded-full blur-[120px]" />

      <Container className="relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500/20 to-primary/10 border border-amber-500/20 mb-6">
              <Sparkles className="w-8 h-8 text-amber-400" />
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
              Our Comprehensive Services
            </h2>
            <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto">
              All-in-one digital solutions to elevate your brand and accelerate growth
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <button
              onClick={() => setSelectedCategory(null)}
              className={cn(
                "px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300",
                selectedCategory === null
                  ? "bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20"
                  : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border border-white/10"
              )}
            >
              All Services
            </button>
            {Object.keys(SERVICE_CATEGORIES).map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  "px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap",
                  selectedCategory === category
                    ? "bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20"
                    : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border border-white/10"
                )}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AnimatePresence initial={false} mode="sync">
              {visibleServices.map((serviceTitle, index) => {
                const service = SERVICES.find(s => s.title === serviceTitle);
                if (!service) return null;

                return (
                  <motion.div
                    key={service.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{
                      duration: 0.3,
                      delay: isOpen ? Math.min(index * 0.03, 0.5) : 0
                    }}
                  >
                    <Link
                      href={`/services/${service.slug}`}
                      className="group flex items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-amber-500/30 transition-all duration-300"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Sparkles className="w-5 h-5 text-amber-400" />
                        </div>
                        <div>
                          <h3 className="text-white font-medium text-lg group-hover:text-amber-400 transition-colors">
                            {service.title}
                          </h3>
                          <p className="text-slate-500 text-sm mt-0.5 line-clamp-1">
                            {service.shortDescription}
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                    </Link>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Show More / Show Less Button */}
          {!selectedCategory && (
            <div className="mt-12 text-center">
              <Button
                size="lg"
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                  "rounded-full text-base font-medium px-10 h-14 transition-all duration-300",
                  isOpen
                    ? "bg-white/10 text-white hover:bg-white/20 border border-white/20"
                    : "bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/20 hover:shadow-xl hover:shadow-amber-500/30"
                )}
              >
                {isOpen ? (
                  <>
                    Show Less
                    <ChevronRight className="ml-2 w-5 h-5 rotate-90" />
                  </>
                ) : (
                  <>
                    Explore All Services
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </>
                )}
              </Button>
            </div>
          )}

          {/* Services Counter */}
          <div className="mt-16 text-center">
            <p className="text-slate-500 text-sm">
              Showing {visibleServices.length} of {SERVICES.length} services
              {!isOpen && selectedCategory === null && ` - Click "Explore All" to see more`}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
