"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import Image from "next/image";
import { NAVIGATION_LINKS, getServiceUrl } from "@/lib/constants";
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
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
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
            <div className="relative h-10 w-48 md:h-12 md:w-56 transition-all duration-300 flex items-center">
                 <Image 
                    src={isScrolled ? "/Nextlevel-Logo-nav.png" : "/Nextlevel-Logo.png"} 
                    alt="NextLevel Marketerz Logo" 
                    fill 
                    className="object-contain object-left transition-all duration-300"
                    priority
                 />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-8 lg:flex">
            {NAVIGATION_LINKS.map((link) => {
              // Special Mega Menu handling for Services
              if (link.label === "Services") {
                return (
                  <div 
                    key={link.href} 
                    className="group relative"
                    onMouseEnter={() => setIsMegaMenuOpen(true)}
                  >
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
                    <div 
                      className={cn(
                        "fixed top-[88px] left-1/2 -translate-x-1/2 w-[95vw] max-w-[1800px] pt-4 transition-all duration-300 z-[100]",
                        isMegaMenuOpen 
                          ? "opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto" 
                          : "opacity-0 pointer-events-none"
                      )}
                    >
                      {/* Invisible bridge to keep hover active */}
                      <div className="absolute top-0 left-0 w-full h-8 bg-transparent -translate-y-full" />
                      
                      <div className="bg-background border border-border/10 rounded-3xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] pb-16 pt-12 px-8 md:px-12 w-full max-h-[85vh] overflow-y-auto">
                        <div className="w-full mx-auto columns-2 md:columns-4 lg:columns-6 xl:columns-8 gap-x-8 gap-y-12 text-sm" onClick={() => setIsMegaMenuOpen(false)}>
                           
                           {/* BLOCK: SEO / Core Marketing */}
                           <div className="flex flex-col space-y-3 break-inside-avoid mb-10">
                             <Link href={getServiceUrl("Search Engine Optimization (SEO)")} className="text-foreground font-semibold hover:text-primary transition-colors">SEO</Link>
                             <Link href={getServiceUrl("Social Media Marketing")} className="text-foreground font-semibold hover:text-primary transition-colors">Social Media</Link>
                             <Link href={getServiceUrl("Influencer Marketing")} className="text-foreground font-semibold hover:text-primary transition-colors">Influencer Marketing</Link>
                             <Link href={getServiceUrl("PR & Outreach")} className="text-foreground font-semibold hover:text-primary transition-colors">PR & Outreach</Link>
                             <Link href={getServiceUrl("Video Production")} className="text-foreground font-semibold hover:text-primary transition-colors">Video Marketing</Link>
                             <Link href={getServiceUrl("Branding")} className="text-foreground font-semibold hover:text-primary transition-colors">Branding</Link>
                             <Link href={getServiceUrl("Web Development")} className="text-foreground font-semibold hover:text-primary transition-colors">Web Development</Link>
                             <Link href={getServiceUrl("Mobile App Development")} className="text-foreground font-semibold hover:text-primary transition-colors">Mobile App Development</Link>
                             <Link href={getServiceUrl("Website Design Figma")} className="text-foreground font-semibold hover:text-primary transition-colors">Website Design Figma</Link>
                           </div>

                           {/* BLOCK: Mobile Design & Ecosystem */}
                           <div className="flex flex-col space-y-3 break-inside-avoid mb-10">
                             <h4 className="text-foreground font-semibold mb-1">Mobile App Design</h4>
                             <Link href={getServiceUrl("Graphic Design")} className="text-foreground font-semibold hover:text-primary transition-colors">Graphic Design</Link>
                             <Link href={getServiceUrl("Website Hosting")} className="text-foreground font-semibold hover:text-primary transition-colors">Website Hosting</Link>
                             <Link href={getServiceUrl("WhatsApp Business API")} className="text-foreground font-semibold hover:text-primary transition-colors">WhatsApp Business API</Link>
                             <Link href={getServiceUrl("ZOHO")} className="text-foreground font-semibold hover:text-primary transition-colors">ZOHO</Link>
                             <Link href={getServiceUrl("Email Marketing")} className="text-foreground font-semibold hover:text-primary transition-colors">Email Marketing</Link>
                             <Link href={getServiceUrl("Amazon Marketing")} className="text-foreground font-semibold hover:text-primary transition-colors">Amazon Marketing</Link>
                             <Link href={getServiceUrl("E-Commerce Marketplace")} className="text-foreground font-semibold hover:text-primary transition-colors">E-Commerce Marketplace</Link>
                             <Link href={getServiceUrl("SMS Marketing")} className="text-foreground font-semibold hover:text-primary transition-colors">SMS Marketing</Link>
                           </div>

                           {/* BLOCK: Paid Media Left */}
                           <div className="flex flex-col space-y-3 break-inside-avoid mb-10">
                             <h4 className="text-foreground font-semibold mb-1">Paid Media</h4>
                             <Link href={getServiceUrl("Google Ads")} className="text-muted-foreground hover:text-primary transition-colors">Google Ads</Link>
                             <Link href={getServiceUrl("Facebook Ads")} className="text-muted-foreground hover:text-primary transition-colors">Facebook Ads</Link>
                             <Link href={getServiceUrl("Instagram Ads")} className="text-muted-foreground hover:text-primary transition-colors">Instagram Ads</Link>
                             <Link href={getServiceUrl("Snapchat Ads")} className="text-muted-foreground hover:text-primary transition-colors">Snapchat Ads</Link>
                             <Link href={getServiceUrl("X Ads")} className="text-muted-foreground hover:text-primary transition-colors">X Ads</Link>
                           </div>

                           {/* BLOCK: Paid Media Right (Reddit/Pinterest/etc) */}
                           <div className="flex flex-col space-y-3 break-inside-avoid mb-10">
                             <Link href={getServiceUrl("Reddit Ads")} className="text-muted-foreground hover:text-primary transition-colors">Reddit Ads</Link>
                             <Link href={getServiceUrl("Pinterest Ads")} className="text-muted-foreground hover:text-primary transition-colors">Pinterest Ads</Link>
                             <Link href={getServiceUrl("Linkedin Ads")} className="text-muted-foreground hover:text-primary transition-colors">Linkedin Ads</Link>
                             <Link href={getServiceUrl("TikTok Ads")} className="text-muted-foreground hover:text-primary transition-colors">TikTok Ads</Link>
                             <Link href={getServiceUrl("Youtube Ads")} className="text-muted-foreground hover:text-primary transition-colors">Youtube Ads</Link>
                           </div>

                           {/* BLOCK: Lead Gen Left & Events */}
                           <div className="flex flex-col space-y-3 break-inside-avoid mb-10">
                             <h4 className="text-foreground font-semibold mb-1">Lead Generation</h4>
                             <Link href={getServiceUrl("LinkedIn")} className="text-muted-foreground hover:text-primary transition-colors">LinkedIn</Link>
                             <Link href={getServiceUrl("Hospital")} className="text-muted-foreground hover:text-primary transition-colors">Hospital</Link>
                             <Link href={getServiceUrl("Beauty And Wellness Center")} className="text-muted-foreground hover:text-primary transition-colors">Beauty And Wellness Center</Link>
                             <Link href={getServiceUrl("Medical Clinics")} className="text-muted-foreground hover:text-primary transition-colors">Medical Clinics</Link>
                             <Link href={getServiceUrl("Hotels")} className="text-muted-foreground hover:text-primary transition-colors">Hotels</Link>
                             <Link href={getServiceUrl("Restaurants And Bars")} className="text-muted-foreground hover:text-primary transition-colors">Restaurants And Bars</Link>
                             <Link href={getServiceUrl("B2B Companies")} className="text-muted-foreground hover:text-primary transition-colors">B2B Companies</Link>

                             <h4 className="text-foreground font-semibold mt-4 mb-1">Events</h4>
                             <Link href={getServiceUrl("Exhibition Stand")} className="text-muted-foreground hover:text-primary transition-colors">Exhibition Stand</Link>
                           </div>

                           {/* BLOCK: Lead Gen Right (Real Estate/Fintech/etc) */}
                           <div className="flex flex-col space-y-3 break-inside-avoid mb-10">
                             <Link href={getServiceUrl("Real Estate")} className="text-muted-foreground hover:text-primary transition-colors">Real Estate</Link>
                             <Link href={getServiceUrl("School And Colleges")} className="text-muted-foreground hover:text-primary transition-colors">School And Colleges</Link>
                             <Link href={getServiceUrl("Skills And Training Center")} className="text-muted-foreground hover:text-primary transition-colors">Skills And Training Center</Link>
                             <Link href={getServiceUrl("Insurance Industries")} className="text-muted-foreground hover:text-primary transition-colors">Insurance Industries</Link>
                             <Link href={getServiceUrl("Fintech")} className="text-muted-foreground hover:text-primary transition-colors">Fintech</Link>
                             <Link href={getServiceUrl("IT Industries")} className="text-muted-foreground hover:text-primary transition-colors">IT Industries</Link>
                             <Link href={getServiceUrl("Security Industries")} className="text-muted-foreground hover:text-primary transition-colors">Security Industries</Link>
                           </div>

                           {/* BLOCK: Video Prod & Explainer Video */}
                           <div className="flex flex-col space-y-3 break-inside-avoid mb-10">
                             <h4 className="text-foreground font-semibold mb-1">Video Production</h4>
                             <Link href={getServiceUrl("Corporate Video Production")} className="text-muted-foreground hover:text-primary transition-colors">Corporate Video Production</Link>
                             <Link href={getServiceUrl("3D Video Production")} className="text-muted-foreground hover:text-primary transition-colors">3D Video Production</Link>
                             <Link href={getServiceUrl("SaaS Explainer Video Production")} className="text-muted-foreground hover:text-primary transition-colors">SaaS Explainer Video Production</Link>

                             <h4 className="text-foreground font-semibold mt-4 mb-1">Explainer Video Production</h4>
                             <Link href={getServiceUrl("Corporate Explainer Videos")} className="text-muted-foreground hover:text-primary transition-colors">Corporate Explainer Videos</Link>
                             <Link href={getServiceUrl("B2B Explainer Videos")} className="text-muted-foreground hover:text-primary transition-colors">B2B Explainer Videos</Link>
                             <Link href={getServiceUrl("Tech Explainer Videos")} className="text-muted-foreground hover:text-primary transition-colors">Tech Explainer Videos</Link>
                           </div>

                           {/* BLOCK: Rest of Video Prod & Animated Video */}
                           <div className="flex flex-col space-y-3 break-inside-avoid mb-10">
                             <Link href={getServiceUrl("Financial Video Production")} className="text-muted-foreground hover:text-primary transition-colors">Financial Video Production</Link>
                             <Link href={getServiceUrl("Social Video Production")} className="text-muted-foreground hover:text-primary transition-colors">Social Video Production</Link>
                             <Link href={getServiceUrl("Motion Graphic Videos")} className="text-muted-foreground hover:text-primary transition-colors">Motion Graphic Videos</Link>

                             <h4 className="text-foreground font-semibold mt-4 mb-1">Animated Videos</h4>
                             <Link href={getServiceUrl("3D Animated CGI")} className="text-muted-foreground hover:text-primary transition-colors">3D Animated CGI</Link>
                             <Link href={getServiceUrl("Product Videos")} className="text-muted-foreground hover:text-primary transition-colors">Product Videos</Link>
                             <Link href={getServiceUrl("2D Animated Videos")} className="text-muted-foreground hover:text-primary transition-colors">2D Animated Videos</Link>
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
                  "relative inline-flex h-11 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-background transition-all duration-300 active:scale-95 group",
                  isScrolled 
                    ? "hover:shadow-[0_0_25px_-5px_rgba(249,150,28,0.5)] scale-105" 
                    : "hover:shadow-[0_0_25px_-5px_rgba(249,150,28,0.3)] hover:scale-105"
              )}
            >
              <span className={cn(
                "absolute inset-[-1000%] animate-[spin_2s_linear_infinite]",
                isScrolled
                  ? "bg-[conic-gradient(from_90deg_at_50%_50%,#F9961C_0%,#ffffff_50%,#F9961C_100%)]"
                  : "bg-[conic-gradient(from_90deg_at_50%_50%,#F9961C_0%,#ffffff_50%,#F9961C_100%)] opacity-80"
              )} />
              <span className={cn(
                "inline-flex h-full w-full items-center justify-center rounded-full px-8 py-1 text-sm font-bold backdrop-blur-3xl transition-all duration-300",
                isScrolled
                  ? "bg-orange-500 text-white group-hover:bg-orange-600"
                  : "bg-black/40 text-white group-hover:bg-orange-500/20 border border-white/5"
              )}>
                Get Started
              </span>
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
            <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-teal-950 border-white/10 p-0 border-l">
                <div className="flex flex-col h-full relative"> 
                    <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
                    <div className="flex items-center justify-between p-6 border-b border-white/10">
                        <div className="relative h-10 w-48">
                              <Image 
                                  src="/Nextlevel-Logo.png" 
                                  alt="NextLevel Logo" 
                                  fill 
                                  className="object-contain object-left"
                              />
                        </div>
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
                            className="mt-6 relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 transition-transform active:scale-95 hover:scale-105 w-full shadow-lg shadow-primary/20"
                        >
                            <span className="absolute inset-[-1000%] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)] opacity-50" />
                            <span className="inline-flex h-full w-full items-center justify-center rounded-full bg-primary px-8 py-3 text-base font-bold text-white backdrop-blur-3xl transition-colors hover:bg-primary/90">
                              Get Started
                            </span>
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
