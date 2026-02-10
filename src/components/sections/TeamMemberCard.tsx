"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import type { TeamMember } from "@/types";
import { Linkedin, Twitter, Github, Dribbble, ExternalLink } from "lucide-react";

interface TeamMemberCardProps {
  member: TeamMember;
  index?: number;
}

const iconMap: Record<string, React.ReactNode> = {
  linkedin: <Linkedin className="w-5 h-5" />,
  twitter: <Twitter className="w-5 h-5" />,
  github: <Github className="w-5 h-5" />,
  dribbble: <Dribbble className="w-5 h-5" />,
  behance: <ExternalLink className="w-5 h-5" />,
};

export function TeamMemberCard({ member, index = 0 }: TeamMemberCardProps) {
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
    <div
      ref={cardRef}
      className={`group relative bg-card rounded-2xl border border-border overflow-hidden transition-all duration-500 card-shadow-hover hover:shadow-xl ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
    >
      {/* Headshot */}
      <div className="relative h-72 overflow-hidden bg-muted">
        <Image
          src={member.headshot.src}
          alt={member.headshot.alt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        {/* Overlay with social links */}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/95 via-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
          <div className="flex gap-3">
            {member.socialLinks.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-background/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-primary hover:text-white transition-all"
                aria-label={`${member.name}'s ${link.platform}`}
              >
                {iconMap[link.platform] || <ExternalLink className="w-5 h-5" />}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="p-5 text-center">
        <h3 className="text-lg font-bold mb-1">{member.name}</h3>
        <p className="text-primary text-sm font-medium mb-3">{member.role}</p>
        <p className="text-muted-foreground text-sm line-clamp-2">{member.bio}</p>
      </div>
    </div>
  );
}
