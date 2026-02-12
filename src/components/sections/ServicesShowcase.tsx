"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button"; 
import { ArrowUpRight, CheckCircle, Code, Cpu, Palette, Zap, Search } from "lucide-react"; 

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const services = [
  {
    id: "ai",
    title: "AI Solutions",
    description: "Custom AI chatbots and automation workflows that streamline your operations and enhance customer engagement 24/7.",
    icon: <Cpu className="w-8 h-8 md:w-12 md:h-12 text-primary" />,
    features: ["80% faster response", "24/7 availability", "Automated scaling"],
    theme: "dark",
    gradient: "from-blue-600/20 to-cyan-500/20",
  },
  {
    id: "dev",
    title: "Web Development",
    description: "High-performance, scalable web applications built with modern technologies like Next.js, React, and TypeScript.",
    icon: <Code className="w-8 h-8 md:w-12 md:h-12 text-blue-500" />,
    features: ["99.9% uptime", "<1s load time", "SEO optimized"],
    theme: "light",
    gradient: "from-indigo-600/20 to-purple-500/20",
  },
  {
    id: "design",
    title: "Premium Design",
    description: "Award-winning UI/UX design that focuses on conversion, brand identity, and creating memorable digital experiences.",
    icon: <Palette className="w-8 h-8 md:w-12 md:h-12 text-purple-500" />,
    features: ["User-centric", "Brand consistency", "Mobile-first"],
    theme: "dark",
    gradient: "from-pink-600/20 to-rose-500/20",
  },
  {
    id: "marketing",
    title: "Digital Marketing",
    description: "Data-driven marketing campaigns that target the right audience with precision, maximizing your ROI and growth.",
    icon: <Zap className="w-8 h-8 md:w-12 md:h-12 text-yellow-500" />,
    features: ["300% ROI avg", "Precision targeting", "Real-time analytics"],
    theme: "light",
    gradient: "from-orange-600/20 to-yellow-500/20",
  },
  {
    id: "seo",
    title: "Advanced SEO",
    description: "Dominate search rankings with white-hat strategies including technical audits, content optimization, and authority building.",
    icon: <Search className="w-8 h-8 md:w-12 md:h-12 text-green-500" />,
    features: ["#1 rankings", "Organic growth", "Long-term value"],
    theme: "dark",
    gradient: "from-green-600/20 to-emerald-500/20",
  },
];

export function ServicesShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const activeIndexRef = useRef(0);

  useGSAP(() => {
    if (!triggerRef.current || !containerRef.current) return;

    const panels = gsap.utils.toArray<HTMLElement>(".service-panel");
    const totalPanels = panels.length;
    
    // Initial nav state handled by React classes
    
    // Horizontal scroll animation
     const nav = document.getElementById("main-navbar");
     
     // Store TL in ref for external access
     const tl = gsap.timeline({
       scrollTrigger: {
         id: "services-scroll", // ID for easier access if needed
         trigger: triggerRef.current,
         pin: true,
         scrub: 1,
         // Snap to panels
         snap: {
             snapTo: 1 / (totalPanels - 1),
             duration: { min: 0.2, max: 0.5 },
             delay: 0.1,
             ease: "power1.inOut"
         },
         end: () => "+=" + (containerRef.current!.offsetWidth - window.innerWidth), // Correct scroll length
         onUpdate: (self) => {
            // Calculate active index based on scrub progress
            const newIndex = Math.round(self.progress * (totalPanels - 1));
            
            if (newIndex !== activeIndexRef.current) {
                const oldBtn = document.querySelector(`.nav-btn-${activeIndexRef.current}`);
                const newBtn = document.querySelector(`.nav-btn-${newIndex}`);
 
                 if (oldBtn) {
                     oldBtn.classList.remove("bg-slate-900", "text-white", "shadow-sm", "font-bold");
                     oldBtn.classList.add("text-slate-500", "hover:text-slate-900", "hover:bg-slate-100");
                 }
                 
                 if (newBtn) {
                     newBtn.classList.remove("text-slate-500", "hover:text-slate-900", "hover:bg-slate-100");
                     newBtn.classList.add("bg-slate-900", "text-white", "shadow-sm", "font-bold");
                 }
                 
                 // Update ref
                 activeIndexRef.current = newIndex;
                
                // Retrieve current index display element and update text directly
                const indexDisplay = document.getElementById("service-index-display");
                if(indexDisplay) {
                    indexDisplay.innerText = `0${newIndex + 1} / 0${totalPanels}`;
                }
            }
         },
         onEnter: () => { if(nav) gsap.to(nav, { y: -100, autoAlpha: 0, duration: 0.3, overwrite: true }) },
         onLeave: () => { if(nav) gsap.to(nav, { y: 0, autoAlpha: 1, duration: 0.3, overwrite: true }) },
         onEnterBack: () => { if(nav) gsap.to(nav, { y: -100, autoAlpha: 0, duration: 0.3, overwrite: true }) },
         onLeaveBack: () => { if(nav) gsap.to(nav, { y: 0, autoAlpha: 1, duration: 0.3, overwrite: true }) }
       }
     });
 
     tl.to(panels, {
       xPercent: -100 * (totalPanels - 1),
       ease: "none",
     });
 
   }, { scope: triggerRef }); // Scope essential for selector ease
 
   return (
     <section className="bg-background"> {/* Outer wrapper to protect React from GSAP DOM manipulation */}
       <div ref={triggerRef} className="relative overflow-hidden bg-background">
        <div className="absolute top-0 left-0 right-0 z-50 p-6 md:p-8 flex justify-center items-center pointer-events-none text-slate-800">
           {/* Centered Navigation Tabs */}
           <div className="flex flex-nowrap md:flex-wrap overflow-x-auto md:overflow-visible justify-start md:justify-center items-center gap-3 p-2 rounded-full bg-white/80 backdrop-blur-md border border-slate-200/50 pointer-events-auto transition-all shadow-sm max-w-[95vw] md:max-w-none no-scrollbar">
              {services.map((service, idx) => (
                 <button 
                   key={service.id}
                   className={cn(
                     `nav-btn-${idx} px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 whitespace-nowrap flex-shrink-0 cursor-pointer`,
                     idx === 0 
                         ? "bg-slate-900 text-white shadow-sm font-bold" 
                         : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                   )}
                   onClick={() => {
                        const st = ScrollTrigger.getById("services-scroll");
                        if (st) {
                            const progress = idx / (services.length - 1);
                            const scrollPos = st.start + (st.end - st.start) * progress;
                            window.scrollTo({
                                top: scrollPos + 1, // small buffer
                                behavior: "smooth"
                            });
                        }
                   }}
                 >
                   {service.title}
                 </button>
             ))}
          </div>

          {/* Index Display (Separate) */}
          <div id="service-index-display" className="absolute right-6 md:right-12 top-10 text-xl font-mono text-slate-500 font-bold hidden md:block">
             01 / 0{services.length}
          </div>
       </div>

      <div ref={containerRef} className="flex h-screen w-[500%] will-change-transform">
        {services.map((service, index) => (
          <div key={service.id} className={cn("service-panel panel-${index} relative w-screen h-full flex items-center justify-center px-6 pb-6 pt-24 md:pt-32 md:px-24 md:pb-24 overflow-hidden bg-slate-50")}>
              
              {/* Background Elements */}
              <div className="absolute inset-0 z-0">
                   <div className={cn(
                       "absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br rounded-full blur-[120px] opacity-30",
                       index % 2 === 0 ? "from-blue-200 to-transparent" : "from-purple-200 to-transparent"
                   )} />
                   <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-emerald-200 to-transparent rounded-full blur-[120px] opacity-20" />
                   
                   {/* Grid Pattern */}
                   <div className="absolute inset-0 bg-grid-black/[0.02]" />
              </div>

            <Container className="relative z-10 w-full max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 gap-8 lg:gap-24 items-center h-full">
                    {/* Left: Content */}
                    <div className="space-y-4 md:space-y-8 flex flex-col justify-center h-full">
                        <div>
                            <div className="inline-block px-3 py-1 md:px-4 md:py-2 rounded-full border border-slate-200 bg-white/50 backdrop-blur-sm text-xs md:text-sm font-semibold text-slate-600 shadow-sm mb-4">
                                SERVICE 0{index + 1}
                            </div>
                            
                            <h2 className="text-4xl md:text-7xl font-display font-bold text-slate-900 leading-tight">
                                {service.title}
                            </h2>
                        </div>
                        
                        <p className="text-lg md:text-2xl text-slate-600 leading-relaxed max-w-xl">
                            {service.description}
                        </p>

                        <ul className="space-y-2 md:space-y-4 pt-2 md:pt-4">
                            {service.features.map((feature, i) => (
                                <li key={i} className="flex items-center gap-3 text-slate-700 text-sm md:text-base">
                                    <div className="flex-shrink-0 w-5 h-5 md:w-6 md:h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                                        <CheckCircle size={14} />
                                    </div>
                                    <span className="font-medium">{feature}</span>
                                </li>
                            ))}
                        </ul>

                         <div className="pt-4 md:pt-8 mt-auto md:mt-0">
                             <Button className="rounded-full px-6 py-4 md:px-8 md:py-6 text-base md:text-lg group shadow-lg shadow-primary/20 hover:shadow-primary/30 w-full md:w-auto">
                                 Explore Service <ArrowUpRight className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                             </Button>
                         </div>
                    </div>

                    {/* Right: Visual */}
                    <div className="relative">
                        <div className="glass-card p-2 rounded-2xl relative overflow-hidden aspect-square flex items-center justify-center bg-white shadow-2xl shadow-slate-200/50 border-slate-100">
                             {/* Abstract UI Mockup */}
                            <div className="relative w-full h-full bg-slate-50 rounded-xl overflow-hidden border border-slate-100 flex flex-col">
                                <div className="h-12 border-b border-slate-200 bg-white flex items-center px-4 gap-2">
                                    <div className="flex gap-1.5">
                                        <div className="w-3 h-3 rounded-full bg-red-400/80" />
                                        <div className="w-3 h-3 rounded-full bg-amber-400/80" />
                                        <div className="w-3 h-3 rounded-full bg-green-400/80" />
                                    </div>
                                    <div className="flex-1 mx-4 h-6 bg-slate-100 rounded-md" />
                                </div>
                                <div className="flex-1 p-6 relative">
                                     {/* Mock Content */}
                                    <div className="space-y-4">
                                        <div className="h-32 w-full bg-slate-100/50 rounded-xl border border-white/50" />
                                    </div>
                                    <div className="space-y-4 mt-4">
                                         <div className="flex gap-4">
                                            <div className="h-12 w-12 rounded-full bg-slate-200" />
                                            <div className="h-12 w-12 rounded-full bg-slate-200" />
                                         </div>
                                         <div className="h-40 w-full bg-gradient-to-tr from-slate-100 to-transparent rounded-xl border border-white/50" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Floating blur behind */}
                        <div className={cn(
                            "absolute -z-10 w-[600px] h-[600px] rounded-full blur-[100px] opacity-20 animate-pulse-slow subpixel-antialiased",
                             index % 2 === 0 ? "bg-blue-400" : "bg-purple-400"
                        )} />
                    </div>
                </div>
            </Container>
          </div>
        ))}
      </div>
     </div>
    </section>
  );
}
