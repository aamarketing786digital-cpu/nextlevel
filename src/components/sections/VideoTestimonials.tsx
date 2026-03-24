"use client";

import { useRef, useState, useEffect } from "react";
import { Container } from "@/components/layout/Container";
import { ChevronRight, ChevronLeft, Play } from "lucide-react";
import { cn } from "@/lib/utils";

export interface VideoTestimonialType {
  _id: string;
  client: string;
  title: string;
  description: string;
  thumbnailUrl?: string; // Resolved from sanity image
  videoUrl?: string;
  youtubeId?: string; // Derived from videoUrl if applicable
}

interface VideoTestimonialsProps {
  testimonials: VideoTestimonialType[];
}

export function VideoTestimonials({ testimonials = [] }: VideoTestimonialsProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

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
              aria-label="Scroll testimonials left"
              className={cn(
                "w-10 h-10 rounded-full border border-white/20 flex items-center justify-center transition-all",
                canScrollLeft ? "text-white hover:bg-white/10" : "text-white/30 cursor-not-allowed"
              )}
            >
              <ChevronLeft className="w-5 h-5" aria-hidden="true" />
            </button>
            <button 
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              aria-label="Scroll testimonials right"
              className={cn(
                "w-10 h-10 rounded-full border border-white/20 flex items-center justify-center transition-all",
                canScrollRight ? "text-white hover:bg-white/10" : "text-white/30 cursor-not-allowed"
              )}
            >
              <ChevronRight className="w-5 h-5" aria-hidden="true" />
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
          {testimonials.map((video) => (
            <div 
              key={video._id} 
              onClick={() => {
                if (video.youtubeId) {
                  setActiveVideo(video.youtubeId);
                } else if (video.videoUrl) {
                  const match = video.videoUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))((\w|-){11})/);
                  if (match && match[1]) {
                    setActiveVideo(match[1]);
                  }
                }
              }}
              className="group relative rounded-3xl overflow-hidden bg-slate-900 border border-white/10 flex-shrink-0 w-[85vw] md:w-[calc(50%-12px)] aspect-[16/9] flex flex-col cursor-pointer transition-transform duration-500 hover:border-primary/50 snap-start"
            >
              {/* Thumbnail Image Background */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 opacity-60"
                style={{ backgroundImage: `url(${video.thumbnailUrl || '/images/case-studies/placeholder.png'})` }}
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
      
      {/* Video Modal Overlay */}
      {activeVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 md:p-8 backdrop-blur-sm" onClick={() => setActiveVideo(null)}>
          <button 
            onClick={() => setActiveVideo(null)}
            className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white/70 hover:text-white transition-colors z-[110]"
          >
            <span className="sr-only">Close</span>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div 
            className="w-full max-w-5xl aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0"
            ></iframe>
          </div>
        </div>
      )}

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
