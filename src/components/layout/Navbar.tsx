"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { NAVIGATION_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
} from "@/components/ui/sheet";

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      id="main-navbar"
      className={cn(
        "fixed z-50 transition-all duration-500 ease-in-out left-1/2 -translate-x-1/2 border-transparent",
        isScrolled
          ? "top-4 w-[90%] md:w-[80%] max-w-5xl rounded-full bg-white/80 backdrop-blur-lg border border-white/20 shadow-xl py-3"
          : "top-0 w-full rounded-none bg-transparent py-6",
      )}
    >
      <div className={cn(
          "px-4 md:px-8 transition-all duration-500",
          isScrolled ? "max-w-full" : "mx-auto max-w-7xl"
      )}>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-display text-2xl font-bold text-gradient-gold">
              NL
            </span>
            <span className={cn(
               "hidden font-display text-xl font-bold sm:inline-block transition-colors duration-300",
               isScrolled ? "text-slate-900" : "text-white"
            )}>
              NextLevel Marketerz
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-8 md:flex">
            {NAVIGATION_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors",
                  isScrolled 
                    ? (pathname === link.href ? "text-primary" : "text-slate-600 hover:text-primary")
                    : (pathname === link.href ? "text-white" : "text-white/80 hover:text-white")
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className={cn(
                  "rounded-full px-6 py-2.5 text-sm font-medium transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary/20",
                  isScrolled
                    ? "bg-primary text-white hover:bg-primary/90"
                    : "bg-white/10 text-white backdrop-blur-sm border border-white/20 hover:bg-white/20"
              )}
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu (Shadcn Sheet) */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <button
                className={cn(
                  "md:hidden transition-colors",
                  isScrolled ? "text-slate-900" : "text-white hover:text-primary"
                )}
                aria-label="Toggle menu"
              >
                <Menu size={24} />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-slate-950 border-white/10 p-0 border-l">
                <div className="flex flex-col h-full relative"> 
                    <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
                    <div className="flex items-center justify-between p-6 border-b border-white/10">
                        <span className="font-display text-xl font-bold text-white">Menu</span>
                        <SheetClose className="text-white hover:text-primary transition-colors focus:outline-none">
                             <X size={24} />
                             <span className="sr-only">Close</span>
                        </SheetClose>
                    </div>

                    <div className="flex flex-col items-center justify-start pt-10 flex-1 space-y-6">
                        {NAVIGATION_LINKS.map((link) => (
                            <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className={cn(
                                "text-2xl font-display font-medium transition-all hover:text-primary hover:tracking-wide",
                                pathname === link.href
                                ? "text-primary"
                                : "text-white/90",
                            )}
                            >
                            {link.label}
                            </Link>
                        ))}
                        <Link
                            href="/contact"
                            onClick={() => setIsOpen(false)}
                            className="mt-4 rounded-full bg-primary px-8 py-3 text-center text-base font-bold text-white transition-all hover:bg-primary/90 hover:scale-105 shadow-lg shadow-primary/25"
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
