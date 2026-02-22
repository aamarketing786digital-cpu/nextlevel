"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
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
          <div className="hidden items-center space-x-8 lg:flex">
            {NAVIGATION_LINKS.map((link) => {
              // Special Mega Menu handling for Services
              if (link.label === "Services") {
                return (
                  <div key={link.href} className="group relative">
                    <Link
                      href={link.href}
                      className={cn(
                        "text-sm font-medium transition-colors flex items-center gap-1 py-4",
                        isScrolled 
                          ? (pathname === link.href || pathname.startsWith('/services') ? "text-primary" : "text-slate-600 hover:text-primary")
                          : (pathname === link.href || pathname.startsWith('/services') ? "text-white" : "text-white/80 hover:text-white")
                      )}
                    >
                      {link.label}
                      <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                    </Link>

                    {/* Mega Menu Dropdown */}
                    <div className="fixed top-[88px] left-1/2 -translate-x-1/2 w-[95vw] max-w-[1800px] pt-4 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 z-[100]">
                      {/* Invisible bridge to keep hover active */}
                      <div className="absolute top-0 left-0 w-full h-8 bg-transparent -translate-y-full" />
                      
                      <div className="bg-background border border-border/10 rounded-3xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] pb-16 pt-12 px-8 md:px-12 w-full max-h-[85vh] overflow-y-auto">
                        <div className="w-full mx-auto columns-2 md:columns-4 lg:columns-6 xl:columns-8 gap-x-8 gap-y-12 text-sm">
                           
                           {/* BLOCK: SEO / Core Marketing */}
                           <div className="flex flex-col space-y-3 break-inside-avoid mb-10">
                             <Link href="/contact" className="text-foreground font-semibold hover:text-primary transition-colors">SEO</Link>
                             <Link href="/contact" className="text-foreground font-semibold hover:text-primary transition-colors">Social Media</Link>
                             <Link href="/contact" className="text-foreground font-semibold hover:text-primary transition-colors">Influencer Marketing</Link>
                             <Link href="/contact" className="text-foreground font-semibold hover:text-primary transition-colors">PR & Outreach</Link>
                             <Link href="/contact" className="text-foreground font-semibold hover:text-primary transition-colors">Video Marketing</Link>
                             <Link href="/contact" className="text-foreground font-semibold hover:text-primary transition-colors">Branding</Link>
                             <Link href="/contact" className="text-foreground font-semibold hover:text-primary transition-colors">Web Development</Link>
                             <Link href="/contact" className="text-foreground font-semibold hover:text-primary transition-colors">Mobile App Development</Link>
                             <Link href="/contact" className="text-foreground font-semibold hover:text-primary transition-colors">Website Design Figma</Link>
                           </div>

                           {/* BLOCK: Mobile Design & Ecosystem */}
                           <div className="flex flex-col space-y-3 break-inside-avoid mb-10">
                             <h4 className="text-foreground font-semibold mb-1">Mobile App Design</h4>
                             <Link href="/contact" className="text-foreground font-semibold hover:text-primary transition-colors">Graphic Design</Link>
                             <Link href="/contact" className="text-foreground font-semibold hover:text-primary transition-colors">Website Hosting</Link>
                             <Link href="/contact" className="text-foreground font-semibold hover:text-primary transition-colors">WhatsApp Business API</Link>
                             <Link href="/contact" className="text-foreground font-semibold hover:text-primary transition-colors">ZOHO</Link>
                             <Link href="/contact" className="text-foreground font-semibold hover:text-primary transition-colors">Email Marketing</Link>
                             <Link href="/contact" className="text-foreground font-semibold hover:text-primary transition-colors">Amazon Marketing</Link>
                             <Link href="/contact" className="text-foreground font-semibold hover:text-primary transition-colors">E-Commerce Marketplace</Link>
                             <Link href="/contact" className="text-foreground font-semibold hover:text-primary transition-colors">SMS Marketing</Link>
                           </div>

                           {/* BLOCK: Paid Media Left */}
                           <div className="flex flex-col space-y-3 break-inside-avoid mb-10">
                             <h4 className="text-foreground font-semibold mb-1">Paid Media</h4>
                             <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Google Ads</Link>
                             <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Facebook Ads</Link>
                             <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Instagram Ads</Link>
                             <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Snapchat Ads</Link>
                             <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">X Ads</Link>
                           </div>

                           {/* BLOCK: Paid Media Right (Reddit/Pinterest/etc) */}
                           <div className="flex flex-col space-y-3 break-inside-avoid mb-10">
                             <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Reddit Ads</Link>
                             <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Pinterest Ads</Link>
                             <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Linkedin Ads</Link>
                             <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">TikTok Ads</Link>
                             <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Youtube Ads</Link>
                           </div>

                           {/* BLOCK: Lead Gen Left & Events */}
                           <div className="flex flex-col space-y-3 break-inside-avoid mb-10">
                             <h4 className="text-foreground font-semibold mb-1">Lead Generation</h4>
                             <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">LinkedIn</Link>
                             <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Hospital</Link>
                             <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Beauty And Wellness Center</Link>
                             <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Medical Clinics</Link>
                             <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Hotels</Link>
                             <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Restaurants And Bars</Link>
                             <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">B2B Companies</Link>

                             <h4 className="text-foreground font-semibold mt-4 mb-1">Events</h4>
                             <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Exhibition Stand</Link>
                           </div>

                           {/* BLOCK: Lead Gen Right (Real Estate/Fintech/etc) */}
                           <div className="flex flex-col space-y-3 break-inside-avoid mb-10">
                             <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Real Estate</Link>
                             <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">School And Colleges</Link>
                             <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Skills And Training Center</Link>
                             <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Insurance Industries</Link>
                             <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Fintech</Link>
                             <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">IT Industries</Link>
                             <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Security Industries</Link>
                           </div>

                           {/* BLOCK: Video Prod & Explainer Video */}
                           <div className="flex flex-col space-y-3 break-inside-avoid mb-10">
                             <h4 className="text-foreground font-semibold mb-1">Video Production</h4>
                             <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Corporate Video Production</Link>
                             <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">3D Video Production</Link>
                             <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">SaaS Explainer Video Production</Link>

                             <h4 className="text-foreground font-semibold mt-4 mb-1">Explainer Video Production</h4>
                             <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Corporate Explainer Videos</Link>
                             <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">B2B Explainer Videos</Link>
                             <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Tech Explainer Videos</Link>
                           </div>

                           {/* BLOCK: Rest of Video Prod & Animated Video */}
                           <div className="flex flex-col space-y-3 break-inside-avoid mb-10">
                             <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Financial Video Production</Link>
                             <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Social Video Production</Link>
                             <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Motion Graphic Videos</Link>

                             <h4 className="text-foreground font-semibold mt-4 mb-1">Animated Videos</h4>
                             <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">3D Animated CGI</Link>
                             <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Product Videos</Link>
                             <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">2D Animated Videos</Link>
                           </div>

                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
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
              );
            })}
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
