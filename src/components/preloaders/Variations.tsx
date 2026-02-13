"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

// Register GSAP plugins if needed
if (typeof window !== "undefined") {
  // gsap.registerPlugin(Flip, SplitText); // Core doesn't have premium plugins
}

interface PreloaderProps {
  onComplete: () => void;
}

/* =========================================
   VARIATION 1: MINIMAL KINETIC
   Big bold counter, sharp typography reveal
   ========================================= */
export function PreloaderMinimal({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        // Cleanup animation before unmounting
        gsap.to(containerRef.current, { display: "none" });
        onComplete();
      },
    });

    // Animate counter from 0 to 100
    // Using a proxy object for smooth number interpolation
    const proxy = { val: 0 };
    tl.to(proxy, {
      val: 100,
      duration: 2.5,
      ease: "power2.inOut",
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.innerText = Math.round(proxy.val).toString();
        }
      },
    });

    // Slide up curtain
    tl.to(containerRef.current, {
      yPercent: -100,
      duration: 1,
      ease: "expo.inOut",
    });
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-zinc-950 text-white"
    >
      <div className="relative">
        <h1
          ref={counterRef}
          className="font-display text-[15vw] md:text-[20vw] font-bold leading-none tracking-tighter"
        >
          0
        </h1>
        <div className="absolute top-0 right-[-20px] text-lg md:text-2xl font-mono text-primary animate-pulse">
          %
        </div>
      </div>
    </div>
  );
}


/* =========================================
   VARIATION 2: THE SHUTTER
   Vertical blinds stagger reveal
   ========================================= */
export function PreloaderShutter({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => {
         gsap.set(containerRef.current, { display: "none" });
         onComplete();
      }
    });

    // 1. Reveal logo text immediately (it's above the blinds)
    tl.from(textRef.current, {
      y: 40,
      opacity: 0,
      duration: 0.5,
      ease: "power3.out",
    });

    // 2. Hold the logo visible for the user
    tl.to({}, { duration: 1.5 });

    // 3. Fade text out
    tl.to(textRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.4,
        ease: "power2.in"
    });

    // 4. Open the blinds to reveal the site
    tl.to(".shutter-blind", {
      height: 0,
      duration: 0.8,
      stagger: 0.08,
      ease: "power4.inOut",
    });

  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] pointer-events-none"
    >
      {/* Foreground Blinds */}
      <div className="absolute inset-0 flex z-[9999]">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="shutter-blind flex-1 h-full bg-zinc-950 border-r border-zinc-900 last:border-r-0"
          />
        ))}
      </div>

      {/* Logo text ABOVE the blinds */}
      <div className="absolute inset-0 z-[10001] flex items-center justify-center">
           <div ref={textRef} className="text-4xl md:text-7xl font-display font-bold text-white tracking-widest uppercase">
               NextLevel
           </div>
      </div>
    </div>
  );
}


/* =========================================
   VARIATION 3: SCRAMBLE CODE
   Matrix/Terminal style scramble text
   ========================================= */
export function PreloaderScramble({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";

  useEffect(() => {
      let interval: NodeJS.Timeout;
      const targetText = "NEXTLEVEL";
      let iteration = 0;
      
      const scramble = () => {
          interval = setInterval(() => {
            if(!textRef.current) return;
            
            textRef.current.innerText = targetText.split("")
                .map((_char, index) => {
                    if(index < iteration) return targetText[index];
                    return chars[Math.floor(Math.random() * chars.length)];
                }).join("");
            
            if(iteration >= targetText.length) {
                clearInterval(interval);
            }
            iteration += 1/3; 
          }, 50);
      };

      // Start scramble after mount
      const timer = setTimeout(scramble, 500);

      return () => {
          clearInterval(interval);
          clearTimeout(timer);
      };
  }, []);

  useGSAP(() => {
     const tl = gsap.timeline({
         onComplete: () => {
             gsap.set(containerRef.current, { display: "none" });
             onComplete();
         }
     });
     
     // Fade in container
     tl.from(containerRef.current, { autoAlpha: 0, duration: 0.5 });
     
     // Wait for scramble (approx 1.5s)
     tl.to({}, { duration: 2.5 });
     
     // Glitch out
     tl.to(textRef.current, {
         skewX: 20,
         opacity: 0,
         duration: 0.2,
         ease: "power2.in"
     });
     
     // Collapse horizontal
     tl.to(containerRef.current, {
         scaleY: 0.001,
         duration: 0.4,
         ease: "expo.in"
     });
     tl.to(containerRef.current, {
         scaleX: 0,
         duration: 0.4,
         ease: "expo.out"
     });

  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black text-green-500 font-mono"
    >
        <div className="relative">
            <div ref={textRef} className="text-4xl md:text-8xl font-bold tracking-tighter mix-blend-screen">
                LOADING
            </div>
            <div className="absolute inset-0 bg-green-500/20 blur-xl opacity-50 animate-pulse" />
        </div>
        <div className="absolute bottom-10 text-xs text-green-700 animate-pulse">
            SYSTEM_INITIALIZING...
        </div>
    </div>
  );
}


/* =========================================
   VARIATION 4: FLUID CIRCLE
   Scaling dot overlay
   ========================================= */
export function PreloaderFluid({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
        onComplete: () => {
            gsap.set(containerRef.current, { display: "none" });
            onComplete();
        }
    });

    // Hide the dot initially
    tl.set(dotRef.current, { opacity: 0, scale: 0 });

    // 1. Fade in logo text
    tl.from(logoRef.current, { opacity: 0, scale: 0.8, duration: 0.6, ease: "back.out(1.7)" });

    // 2. Hold logo visible
    tl.to({}, { duration: 1.5 });

    // 3. Fade out logo
    tl.to(logoRef.current, { opacity: 0, scale: 0.5, duration: 0.4, ease: "power2.in" });

    // 4. Show dot and pulse
    tl.to(dotRef.current, { opacity: 1, scale: 1, duration: 0.2, ease: "power2.out" });
    tl.to(dotRef.current, { scale: 1.5, duration: 0.3, yoyo: true, repeat: 1, ease: "power2.inOut" });
    
    // 5. Scale dot up massively to cover screen
    const size = Math.max(window.innerWidth, window.innerHeight) * 1.5;
    tl.to(dotRef.current, {
        width: size * 2,
        height: size * 2,
        duration: 1.2,
        ease: "expo.inOut",
    });
    
    // 6. Fade out
    tl.to(containerRef.current, {
        opacity: 0,
        duration: 0.5,
        delay: -0.2
    });

  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
    >
      {/* Brand Logo/Name */}
      <div ref={logoRef} className="absolute z-20 text-center">
          <h2 className="font-display text-4xl md:text-6xl font-bold text-foreground tracking-tight">NextLevel</h2>
          <p className="text-sm md:text-base text-muted-foreground tracking-widest uppercase mt-2">Marketerz</p>
      </div>
      
      {/* Expanding dot — hidden via CSS until GSAP reveals it */}
      <div
        ref={dotRef}
        className="w-4 h-4 rounded-full bg-primary relative z-10 opacity-0 scale-0"
      />
    </div>
  );
}


/* =========================================
   VARIATION 5: CURTAIN STAGGER
   3D planes rotate reveal
   ========================================= */
export function PreloaderCurtain({ onComplete }: PreloaderProps) {
    const containerRef = useRef<HTMLDivElement>(null);
  
    useGSAP(() => {
      const tl = gsap.timeline({
          onComplete: () => {
              gsap.set(containerRef.current, { display: "none" });
              onComplete();
          }
      });
  
      // Init
      tl.set(".panel-strip", { transformOrigin: "top center" });
      
      // Wait
      tl.to({}, { duration: 1 });
  
      // Scale Y down
      tl.to(".panel-strip", {
        scaleY: 0,
        stagger: {
            amount: 0.5,
            from: "center" // Open from center
        },
        duration: 1.2,
        ease: "power4.inOut",
      });
  
    }, { scope: containerRef });
  
    return (
      <div
        ref={containerRef}
        className="fixed inset-0 z-[9999] flex flex-col md:flex-row pointer-events-none"
      >
          {[...Array(5)].map((_, i) => (
             <div 
                key={i} 
                className={cn(
                    "panel-strip flex-1 bg-zinc-950 border-r border-zinc-900/50 relative overflow-hidden",
                    i % 2 === 0 ? "bg-zinc-950" : "bg-zinc-900"
                )}
             >
                 <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/10 opacity-30" />
             </div>
          ))}
          
          <div className="absolute inset-0 flex items-center justify-center z-[-1] bg-transparent">
               {/* This text is hidden behind panels until they animate, but panels are solid bg-zinc-950 */}
               {/* Actually panels are fixed on top. We animate them away. */}
          </div>
          
          <div className="absolute bottom-10 right-10 z-[100] text-zinc-500 text-sm font-mono tracking-widest animate-pulse">
              INITIALIZING ENV //
          </div>
      </div>
    );
  }
