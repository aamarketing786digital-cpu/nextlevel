"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
    PreloaderMinimal, 
    PreloaderShutter, 
    PreloaderScramble, 
    PreloaderFluid, 
    PreloaderCurtain 
} from "@/components/preloaders/Variations";
import { RefreshCw, Layout, Code, Circle, VenetianMask, Type, X } from "lucide-react";

export function PreloaderDemo() {
  const [currentPreloader, setCurrentPreloader] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // Reset or handle route changes if needed, but for now purely manual trigger
  
  const handleSelect = (index: number) => {
    setCurrentPreloader(null); // Force unmount
    setTimeout(() => {
        setCurrentPreloader(index);
        setIsPlaying(true);
    }, 50); // Short delay to allow React to unmount
  };

  const handleComplete = () => {
    setIsPlaying(false);
    // currentPreloader stays set, but component hides itself internally via GSAP display:none
  };

  if(!isVisible) return null;

  return (
    <>
      {/* Active Preloader Render */}
      {isPlaying && currentPreloader === 1 && (
        <PreloaderMinimal onComplete={handleComplete} />
      )}
      {isPlaying && currentPreloader === 2 && (
        <PreloaderShutter onComplete={handleComplete} />
      )}
      {isPlaying && currentPreloader === 3 && (
        <PreloaderScramble onComplete={handleComplete} />
      )}
      {isPlaying && currentPreloader === 4 && (
        <PreloaderFluid onComplete={handleComplete} />
      )}
      {isPlaying && currentPreloader === 5 && (
        <PreloaderCurtain onComplete={handleComplete} />
      )}

      {/* Control Panel */}
      <div className="fixed bottom-6 right-6 z-[10000] p-4 bg-zinc-950/90 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl flex flex-col gap-4 w-72 transition-all hover:bg-zinc-950">
         <div className="flex justify-between items-center border-b border-white/5 pb-2">
             <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <Layout size={14} className="text-primary" />
                Preloader Studio
             </h3>
             <button onClick={() => setIsVisible(false)} className="text-zinc-500 hover:text-white">
                 <X size={14} />
             </button>
         </div>

         <div className="grid grid-cols-5 gap-2">
            {[
                { id: 1, icon: Type, label: "Minimal" },
                { id: 2, icon: VenetianMask, label: "Shutter" },
                { id: 3, icon: Code, label: "Code" },
                { id: 4, icon: Circle, label: "Fluid" },
                { id: 5, icon: Layout, label: "Curtain" },
            ].map((item) => (
                <button
                    key={item.id}
                    onClick={() => handleSelect(item.id)}
                    className={cn(
                        "flex flex-col items-center justify-center gap-1 p-2 rounded-lg transition-all",
                        currentPreloader === item.id 
                            ? "bg-primary text-black font-bold" 
                            : "bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white"
                    )}
                    title={item.label}
                >
                    <item.icon size={16} />
                    <span className="text-[10px]">{item.id}</span>
                </button>
            ))}
         </div>

         <Button 
            className="w-full h-8 text-xs bg-white/10 hover:bg-white/20 text-white"
            onClick={() => currentPreloader && handleSelect(currentPreloader)}
            disabled={!currentPreloader}
         >
             <RefreshCw className={cn("mr-2 h-3 w-3", isPlaying && "animate-spin")} />
             Replay Current
         </Button>
         
         <div className="text-[10px] text-zinc-500 text-center">
             Select a style to preview animation
         </div>
      </div>
    </>
  );

  function cn(...classes: (string | undefined | null | false)[]) {
    return classes.filter(Boolean).join(" ");
  }
}
