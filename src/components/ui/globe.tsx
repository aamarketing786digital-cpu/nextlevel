"use client";

import createGlobe from "cobe";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export const Globe = ({ className }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let phi = 0;

    if (!canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;

    // Responsive sizing based on container
    const containerW = container.clientWidth;
    const containerH = container.clientHeight || containerW; // fallback if height is 0
    const size = Math.min(containerW, containerH, 600);
    const isMobile = window.innerWidth < 768;
    const dpr = isMobile ? Math.min(window.devicePixelRatio, 1.5) : Math.min(window.devicePixelRatio, 2);
    
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;

    const globe = createGlobe(canvas, {
      devicePixelRatio: dpr,
      width: size * dpr,
      height: size * dpr,
      phi: 0,
      theta: 0,
      dark: 0,
      diffuse: 1.2,
      mapSamples: isMobile ? 8000 : 16000,
      mapBrightness: 8,
      baseColor: [1, 1, 1],
      markerColor: [1, 0.84, 0],
      glowColor: [1, 1, 1],
      opacity: 0.8,
      markers: [
        { location: [25.2048, 55.2708], size: 0.1 },
        { location: [40.7128, -74.006], size: 0.05 },
        { location: [51.5074, -0.1278], size: 0.05 },
        { location: [35.6762, 139.6503], size: 0.05 },
        { location: [1.3521, 103.8198], size: 0.05 },
      ],
      onRender: (state) => {
        state.phi = phi;
        phi += isMobile ? 0.002 : 0.003;
      },
    });

    return () => {
      globe.destroy();
    };
  }, []);

  return (
    <div ref={containerRef} className={cn("relative flex items-center justify-center w-full h-full perspective-1000", className)}>
      <canvas
        ref={canvasRef}
        className="opacity-90 transition-opacity duration-500 hover:opacity-100"
      />
    </div>
  );
};
