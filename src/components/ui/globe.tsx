"use client";

import createGlobe from "cobe";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export const Globe = ({ className }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let phi = 0;

    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 600 * 2,
      height: 600 * 2,
      phi: 0,
      theta: 0,
      dark: 0, // Light mode
      diffuse: 1.2,
      mapSamples: 16000, 
      mapBrightness: 8,
      baseColor: [1, 1, 1], // Clean White base
      markerColor: [1, 0.84, 0], // Gold markers
      glowColor: [1, 1, 1], // White/Invisible glow to remove grey halo
      opacity: 0.8,
      markers: [
        // Dubai (approx)
        { location: [25.2048, 55.2708], size: 0.1 },
        // New York
        { location: [40.7128, -74.006], size: 0.05 },
        // London
        { location: [51.5074, -0.1278], size: 0.05 },
        // Tokyo
        { location: [35.6762, 139.6503], size: 0.05 },
        // Singapore
        { location: [1.3521, 103.8198], size: 0.05 },
      ],
      onRender: (state) => {
        // Called on every animation frame.
        state.phi = phi;
        phi += 0.003;
      },
    });

    return () => {
      globe.destroy();
    };
  }, []);

  return (
    <div className={cn("relative flex items-center justify-center w-full h-full perspective-1000", className)}>
      <canvas
        ref={canvasRef}
        width={1000}
        height={1000}
        style={{ width: "100%", height: "100%", maxWidth: "100%", aspectRatio: 1, objectFit: "contain" }}
        className="opacity-90 transition-opacity duration-500 hover:opacity-100"
      />
    </div>
  );
};
