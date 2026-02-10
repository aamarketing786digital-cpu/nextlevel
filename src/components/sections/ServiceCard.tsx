"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/types";

interface ServiceCardProps {
  service: Service;
  index?: number;
}

export function ServiceCard({ service, index = 0 }: ServiceCardProps) {
  return (
    <Link
      href={`/services/${service.slug}`}
      role="article"
      tabIndex={0}
      aria-label={`Learn more about ${service.title}`}
      className="group block reveal-on-scroll"
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="h-full p-8 bg-card rounded-2xl border border-border hover:border-primary/50 transition-all duration-300 card-shadow-hover hover:shadow-primary/10">
        {/* Icon */}
        <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
          {typeof service.icon === "string" ? (
            <span className="text-2xl">{service.icon}</span>
          ) : (
            service.icon
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-muted-foreground mb-6 line-clamp-3">
          {service.shortDescription}
        </p>

        {/* Link indicator */}
        <div className="flex items-center text-primary font-medium group-hover:gap-3 transition-all duration-300">
          <span>Learn more</span>
          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}
