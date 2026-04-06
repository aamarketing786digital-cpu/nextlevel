"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FOOTER_LINKS, SOCIAL_LINKS } from "@/lib/constants";
import { Container } from "./Container";

import { Twitter, Linkedin, Github, Dribbble } from "lucide-react";

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
        {/* Placeholder - Reserves space with CSS defaults to prevent 0.488 CLS on load */}
        <div 
          style={{ height: footerHeight || undefined }} 
          className={`w-full pointer-events-none ${!footerHeight ? 'h-[1100px] sm:h-[900px] md:h-[500px] xl:h-[450px]' : ''}`}
        />

        {/* Fixed Footer - The actual visible footer */}
        <div ref={footerRef} className="fixed bottom-0 left-0 w-full h-auto z-0" style={{ zIndex: 1 }}>
            <FooterContent />
        </div>
    </>
  );
}

const getSocialIcon = (platform: string) => {
  switch (platform.toLowerCase()) {
    case "twitter": return <Twitter size={18} />;
    case "linkedin": return <Linkedin size={18} />;
    case "github": return <Github size={18} />;
    case "dribbble": return <Dribbble size={18} />;
    default: return <span>{platform.charAt(0)}</span>;
  }
};

function FooterContent() {
  return (
    <footer className="border-t border-white/10 bg-teal-950 pt-48 md:pt-24 pb-2 md:pb-12 relative overflow-hidden h-full">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <Container className="relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 md:gap-12 mb-12 md:mb-24">
            {/* Brand Column */}
            <div className="col-span-2 lg:col-span-2">
                 <Link href="/" className="flex items-center space-x-2 mb-6">
                    <div className="relative h-12 w-48 md:h-16 md:w-64 transition-all duration-300">
                        <Image 
                            src="/Nextlevel-Logo.png" 
                            alt="NextLevel Logo" 
                            fill 
                            className="object-contain object-left"
                        />
                    </div>
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
                          className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all"
                          aria-label={`Follow us on ${link.platform}`}
                          title={link.platform}
                        >
                           {getSocialIcon(link.platform)}
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
            <div className="font-display font-bold text-[8vw] leading-none text-white/5 select-none pointer-events-none">
                AGENCY
            </div>
        </div>
      </Container>
    </footer>
  );
}
