"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import type { CaseStudy } from "@/types";
import { Badge } from "@/components/ui/badge";

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
  index?: number;
}

export function CaseStudyCard({ caseStudy, index = 0 }: CaseStudyCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = cardRef.current;
    if (!element) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 100);
          observer.unobserve(element);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [index]);

  return (
    <article
      ref={cardRef}
      className={`group bg-card rounded-2xl border border-border overflow-hidden transition-all duration-500 card-shadow-hover hover:shadow-xl hover:shadow-primary/5 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
    >
      {/* Thumbnail */}
      <div className="relative h-64 overflow-hidden bg-muted">
        <Image
          src={caseStudy.thumbnail.src}
          alt={caseStudy.thumbnail.alt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-card/20 to-transparent" />
        {caseStudy.featured && (
          <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground shadow-lg">
            Featured
          </Badge>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Client */}
        <p className="text-sm text-primary font-medium mb-2">{caseStudy.client}</p>

        {/* Title */}
        <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors">
          {caseStudy.title}
        </h3>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {caseStudy.tags.map((tag, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-muted text-muted-foreground text-xs rounded-full border border-border"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Challenge/Solution/Results - Compact */}
        <div className="space-y-3 text-sm mb-4">
          <div className="flex items-start gap-2">
            <span className="text-foreground/50 font-semibold min-w-[70px]">Challenge:</span>
            <p className="text-muted-foreground line-clamp-1">{caseStudy.challenge}</p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-foreground/50 font-semibold min-w-[70px]">Solution:</span>
            <p className="text-muted-foreground line-clamp-1">{caseStudy.solution}</p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-primary font-semibold min-w-[70px]">Results:</span>
            <p className="text-foreground line-clamp-1">{caseStudy.results}</p>
          </div>
        </div>

        {/* Year */}
        {caseStudy.year && (
          <div className="pt-4 border-t border-border text-xs text-muted-foreground">
            {caseStudy.year}
          </div>
        )}
      </div>
    </article>
  );
}
