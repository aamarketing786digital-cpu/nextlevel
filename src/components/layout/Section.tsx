import React from "react";
import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  id?: string;
  variant?: "default" | "muted" | "gradient";
  py?: "sm" | "md" | "lg" | "xl";
}

const variantClasses = {
  default: "bg-background",
  muted: "bg-muted",
  gradient: "bg-gradient-to-b from-background to-muted",
};

const paddingClasses = {
  sm: "py-12 md:py-16",
  md: "py-16 md:py-24",
  lg: "py-24 md:py-32",
  xl: "py-32 md:py-40",
};

export const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ children, id, variant = "default", py = "lg", className, ...props }, ref) => {
    return (
      <section
        ref={ref}
        id={id}
        className={cn(variantClasses[variant], paddingClasses[py], className)}
        {...props}
      >
        {children}
      </section>
    );
  }
);

Section.displayName = "Section";
