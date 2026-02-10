"use client";

import { ServiceCard } from "./ServiceCard";
import { SERVICES } from "@/lib/constants";
import { Container } from "@/components/layout/Container";

export function ServicesGrid() {
  return (
    <section className="py-20 md:py-28 bg-background border-t border-border">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
            Our <span className="text-gradient-gold">Services</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive digital solutions tailored to your business needs. From
            AI-powered automation to stunning web experiences, we've got you covered.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {SERVICES.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}
