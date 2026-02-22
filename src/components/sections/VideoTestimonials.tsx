"use client";

import { useRef, useState, useEffect } from "react";
import { Container } from "@/components/layout/Container";
import { ChevronRight, ChevronLeft, Play } from "lucide-react";
import { cn } from "@/lib/utils";

const VIDEO_TESTIMONIALS = [
  {
    id: "1",
    client: "Cert",
    title: "CERT's Success Story",
    description: "Learn how we helped them launch a powerful eCommerce presence from website to full-scale digital marketing & PR success.",
    thumbnail: "/images/case-studies/telecom-ai.jpg", 
    brandColor: "bg-emerald-500", 
  },
  {
    id: "2",
    client: "Nereen Healthcare",
    title: "How Nereen Healthcare Built Its Digital Identity",
    description: "See how we helped them launch a powerful eCommerce presence. From website to full-scale digital marketing & PR success.",
    thumbnail: "/images/case-studies/fashion-ecommerce.jpg",
    brandColor: "bg-blue-600",
  },
  {
    id: "3",
    client: "EZ Deals",
    title: "How we generated massive leads & sales for EZ Deals",
    description: "Powerful SEO & digital marketing ranked their website on Google's 1st page. Real growth, real results achieved with the same budget.",
    thumbnail: "/images/case-studies/real-estate-seo.jpg",
    brandColor: "bg-cyan-500",
  },
  {
    id: "4",
    client: "TechVentures",
    title: "Scaling TechVentures in the GCC",
    description: "How our AI chatbot integration and digital strategy reduced their acquisition costs by 40% in just 3 months.",
    thumbnail: "/images/case-studies/fintech-brand.jpg",
    brandColor: "bg-purple-500",
  }
];

export function VideoTestimonials() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollState = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5); // 5px buffer
    }
  };

  useEffect(() => {
    checkScrollState();
    window.addEventListener('resize', checkScrollState);
    return () => window.removeEventListener('resize', checkScrollState);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      // On desktop, scroll exactly one card width (50% + gap). On mobile, scroll 85% of viewport.
      const scrollAmount = window.innerWidth >= 768 
        ? (scrollContainerRef.current.clientWidth + 24) / 2 
        : scrollContainerRef.current.clientWidth * 0.8;
        
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="section-dark bg-black pt-20 pb-0">
      <Container>
        {/* Header with Navigation */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-medium text-white tracking-tight">
            What Our Clients Say About Our Digital Marketing Services
          </h2>
          
          <div className="flex gap-3 shrink-0">
            <button 
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className={cn(
                "w-10 h-10 rounded-full border border-white/20 flex items-center justify-center transition-all",
                canScrollLeft ? "text-white hover:bg-white/10" : "text-white/30 cursor-not-allowed"
              )}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className={cn(
                "w-10 h-10 rounded-full border border-white/20 flex items-center justify-center transition-all",
                canScrollRight ? "text-white hover:bg-white/10" : "text-white/30 cursor-not-allowed"
              )}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Scroll Container */}
        <div 
          ref={scrollContainerRef}
          onScroll={checkScrollState}
          className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory hide-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {VIDEO_TESTIMONIALS.map((video) => (
            <div 
              key={video.id} 
              className="group relative rounded-3xl overflow-hidden bg-slate-900 border border-white/10 flex-shrink-0 w-[85vw] md:w-[calc(50%-12px)] aspect-[16/9] flex flex-col cursor-pointer transition-transform duration-500 hover:border-primary/50 snap-start"
            >
              {/* Thumbnail Image Background */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 opacity-60"
                style={{ backgroundImage: `url(${video.thumbnail})` }}
              />
              
              {/* Dark Gradient Overlay for Text */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

              {/* Play Button Overlay (Centered) */}
              <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                <div className="w-16 h-16 rounded-full bg-black/40 backdrop-blur-md border border-white/30 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:border-primary">
                  <Play className="w-6 h-6 text-white ml-1" fill="currentColor" />
                </div>
              </div>

              {/* Content (Bottom Anchored) */}
              <div className="relative z-10 flex flex-col justify-end h-full p-6 md:p-8">
                {/* Branding / Logo Area */}
                <div className="absolute top-6 left-6 flex items-center gap-3">
                   <div className="px-3 py-1.5 rounded-md bg-white text-black font-bold text-sm shadow-lg">
                       {video.client}
                   </div>
                </div>

                <h3 className="text-xl md:text-2xl font-bold text-white mb-2 leading-tight max-w-[85%]">
                  {video.title}
                </h3>
                
                {/* Optional features list (hidden on small mobile) */}
                <div className="hidden md:flex flex-col gap-1.5 mt-2 mb-4">
                    <div className="flex items-start gap-2 text-sm text-slate-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5" />
                        <p>{video.description.split('.')[0]}.</p>
                    </div>
                </div>

                <div className="mt-auto md:mt-0 max-w-fit">
                  <div className="px-5 py-2.5 rounded-full bg-blue-600 text-white font-semibold text-sm transition-colors group-hover:bg-blue-500">
                    Watch the Success Story Now!
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
      
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
