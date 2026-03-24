"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FOOTER_LINKS, SOCIAL_LINKS } from "@/lib/constants";
import { Container } from "./Container";

export function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);
  const [footerHeight, setFooterHeight] = useState(0);

  useEffect(() => {
    if (!footerRef.current) return;
    
    // Check height initially
    setFooterHeight(footerRef.current.offsetHeight);

    const observer = new ResizeObserver((entries) => {
      setFooterHeight(entries[0].borderBoxSize[0]?.blockSize || entries[0].contentRect.height);
    });
    
    observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
        {/* Placeholder - Reserves space in the document flow without duplicating DOM */}
        <div style={{ height: footerHeight }} className="w-full pointer-events-none" />

        {/* Fixed Footer - The actual visible footer */}
        <div ref={footerRef} className="fixed bottom-0 left-0 w-full h-auto z-0" style={{ zIndex: 1 }}>
            <FooterContent />
        </div>
    </>
  );
}

function FooterContent() {
  return (
    <footer className="border-t border-white/10 bg-slate-950 pt-48 md:pt-24 pb-2 md:pb-12 relative overflow-hidden h-full">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <Container className="relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 md:gap-12 mb-12 md:mb-24">
            {/* Brand Column */}
            <div className="col-span-2 lg:col-span-2">
                 <Link href="/" className="flex items-center space-x-2 mb-6">
                    <span className="font-display text-3xl font-bold text-white">Next Level Marketerz</span>
                 </Link>
                 <p className="text-slate-400 text-lg leading-relaxed max-w-sm mb-6">
                    Ascension to digital excellence. We craft experiences that define the future of interaction.
                 </p>
                 <div className="flex items-center gap-4">
                    {SOCIAL_LINKS.map((link) => (
                        <a 
                          key={link.platform} 
                          href={link.url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all text-sm font-bold uppercase"
                          aria-label={`Follow us on ${link.platform}`}
                          title={link.platform}
                        >
                           {link.platform.charAt(0)}
                        </a>
                    ))}
                 </div>
            </div>

            {/* Links Columns */}
            <div className="col-span-1">
                <h2 className="font-bold text-white mb-6 text-base">Company</h2>
                <ul className="space-y-4">
                    {FOOTER_LINKS.company.map((link) => (
                        <li key={link.href}>
                            <Link href={link.href} className="text-slate-400 hover:text-primary transition-colors">{link.label}</Link>
                        </li>
                    ))}
                </ul>
            </div>
            
             <div className="col-span-1">
                <h2 className="font-bold text-white mb-6 text-base">Services</h2>
                 <ul className="space-y-4">
                    {FOOTER_LINKS.services.map((link) => (
                        <li key={link.href}>
                             <Link href={link.href} className="text-slate-400 hover:text-primary transition-colors">{link.label}</Link>
                        </li>
                    ))}
                </ul>
            </div>


             <div className="col-span-1">
                <h2 className="font-bold text-white mb-6 text-base">Industries</h2>
                 <ul className="space-y-4">
                    {FOOTER_LINKS.industries.map((link) => (
                        <li key={link.href}>
                             <Link href={link.href} className="text-slate-400 hover:text-primary transition-colors">{link.label}</Link>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="col-span-1">
                <h2 className="font-bold text-white mb-6 text-base">Legal</h2>
                 <ul className="space-y-4">
                    {FOOTER_LINKS.legal.map((link) => (
                        <li key={link.href}>
                             <Link href={link.href} className="text-slate-400 hover:text-primary transition-colors">{link.label}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>

        {/* Massive Text at Bottom */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-end">
            <div className="text-slate-500 text-sm mb-4 md:mb-0">
                &copy; {new Date().getFullYear()} Next Level Marketerz. Dubai, UAE.
            </div>
             {/* Big Text */}
            <div className="font-display font-bold text-[10vw] leading-none text-white/5 select-none pointer-events-none">
                AGENCY
            </div>
        </div>
      </Container>
    </footer>
  );
}
