"use client";

import { cn } from "@/lib/utils";

// Bento Grid Root Component
interface BentoGridProps {
  className?: string;
  children?: React.ReactNode;
}

export function BentoGrid({ className, children }: BentoGridProps) {
  return (
    <div className={cn("grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4", className)}>
      {children}
    </div>
  );
}

// Bento Grid Item Component with glassmorphic styling
interface BentoGridItemProps {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  colSpan?: number;
  rowSpan?: number;
  children?: React.ReactNode;
}

export function BentoGridItem({
  className,
  title,
  description,
  header,
  icon,
  colSpan = 1,
  rowSpan = 1,
  children,
}: BentoGridItemProps) {
  return (
    <div
      className={cn(
        // Glassmorphic dark card styling
        "row-span-1 rounded-2xl group/bento relative overflow-hidden h-full",
        "backdrop-blur-md bg-surface-glass/60",
        "border border-border/40 hover:border-primary/40",
        "shadow-luxury hover:shadow-luxury-lg",
        "transition-all duration-500 ease-out",
        // Inner gradient for depth
        "before:absolute before:inset-0 before:bg-gradient-to-br before:from-primary/5 before:via-transparent before:to-cyan-glow/5 before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100",
        // Glow border effect
        "after:absolute after:inset-0 after:rounded-2xl after:bg-gradient-to-br after:from-primary/20 after:to-cyan-glow/20 after:opacity-0 after:blur-lg after:transition-opacity after:duration-500 hover:after:opacity-100 after:-z-10",
        "justify-between flex flex-col p-6",
        colSpan === 2 && "md:col-span-2",
        colSpan === 3 && "md:col-span-3",
        rowSpan === 2 && "md:row-span-2",
        className
      )}
    >
      {header}
      <div className="relative z-10 transition-all duration-300 group-hover/bento:translate-x-1">
        {icon && (
          <div className="mb-4 flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-cyan-glow/10 border border-primary/30 shadow-luxury">
            <div className="text-primary">{icon}</div>
          </div>
        )}
        <div className="mb-2 font-sans font-bold text-lg text-foreground group-hover/bento:text-primary transition-colors duration-300">
          {title}
        </div>
        <div className="font-sans text-sm text-muted-foreground group-hover/bento:text-foreground/80 transition-colors duration-300">
          {description}
        </div>
        {children}
      </div>
    </div>
  );
}
