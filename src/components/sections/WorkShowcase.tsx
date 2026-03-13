"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export interface CaseStudyType {
  _id: string;
  title: string;
  slug: string;
  category: string;
  image: string; // URL resolved from heroImage
  description: string; // resolved from tagline
}

const FALLBACK_COLORS = [
  "bg-emerald-950",
  "bg-indigo-950",
  "bg-slate-950",
  "bg-blue-950"
];

interface WorkShowcaseProps {
  caseStudies: CaseStudyType[];
}

export function WorkShowcase({ caseStudies = [] }: WorkShowcaseProps) {
  const containerRef = useRef<HTMLElement>(null);

  // Optional: Add simple GSAP animations for text if needed, 
  // but CSS Sticky handles the main layout perfectly.

  return (
    <section ref={containerRef} className="relative w-full bg-black">
      {caseStudies.map((project, index) => {
        const color = FALLBACK_COLORS[index % FALLBACK_COLORS.length];
        
        return (
        <div
          key={project._id}
          className="sticky top-0 h-screen w-full overflow-hidden bg-black"
          style={{ zIndex: index + 1 }}
        >
          {/* Background Image */}
          <div className="absolute inset-0 w-full h-full">
            <img
              src={project.image || "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"}
              alt={project.title}
              className="w-full h-full object-cover opacity-60 scale-105"
            />
            <div className={cn("absolute inset-0 opacity-80 mix-blend-multiply", color)} />
          </div>

          {/* Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 text-white z-10">
            <span className="text-sm font-medium tracking-[0.2em] uppercase text-white/60 mb-4 block animate-fade-in-up">
              Case Study 0{index + 1}
            </span>
            <h2 className="text-6xl md:text-8xl font-display font-bold mb-6 overflow-hidden">
              {project.title}
            </h2>
            <p className="text-xl md:text-2xl text-white/80 max-w-2xl mb-10 font-light">
              {project.description}
            </p>
            <Link
              href={`/work/${project.slug}`}
              className="group inline-flex items-center gap-2 px-8 py-4 border border-white/30 rounded-full hover:bg-white hover:text-black transition-all duration-300"
            >
              <span>View Project</span>
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </div>
        </div>
      )
      })}
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50 text-white/50 text-sm animate-pulse pointer-events-none mix-blend-difference">
        Scroll to explore
      </div>
    </section>
  );
}
