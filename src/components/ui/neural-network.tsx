"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export const NeuralNetwork = ({ className }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let animationFrameId: number;

    const mouseDistance = 150;

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;

      constructor(width: number) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        // Faster speed
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        
        // Mobile: Smaller particles
        const isMobile = width < 768;
        this.size = isMobile ? Math.random() * 1.5 + 0.5 : Math.random() * 3 + 1.5; 
      }

      update(mouse: { x: number; y: number }) {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off walls
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Mouse interaction (simulated)

        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouseDistance) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (mouseDistance - distance) / mouseDistance;
            const directionX = forceDirectionX * force * 0.1; // Reduced force (was 0.5)
            const directionY = forceDirectionY * force * 0.1;

            this.vx -= directionX;
            this.vy -= directionY;
        }

        // Simulating friction/max speed cap
        const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        const maxSpeed = 1; // Subtle movement cap
        if (speed > maxSpeed) {
            this.vx = (this.vx / speed) * maxSpeed;
            this.vy = (this.vy / speed) * maxSpeed;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = "#B8860B"; // Dark Goldenrod (More visible on white)
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      const particleCount = width < 768 ? 40 : 110; // Less volume on mobile
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(width));
      }
    };

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      
      for (let i = 0; i < particles.length; i++) {
        particles[i].update(mouse);
        particles[i].draw();

        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          const connectionDistance = width < 768 ? 100 : 140;

          if (distance < connectionDistance) {
            ctx.beginPath();
            // Darker Slate lines for better visibility
            ctx.strokeStyle = `rgba(100, 116, 139, ${0.4 * (1 - distance / connectionDistance)})`; 
            ctx.lineWidth = 1;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    const mouse = { x: 0, y: 0 };
    const handleMouseMove = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    };

    // Use ResizeObserver for accurate sizing
    const resizeObserver = new ResizeObserver(() => {
        // Set canvas internal size to match CSS size
        width = canvas.width = canvas.clientWidth;
        height = canvas.height = canvas.clientHeight;
        init();
    });

    resizeObserver.observe(canvas);
    canvas.addEventListener("mousemove", handleMouseMove);
    animate();

    return () => {
      resizeObserver.disconnect();
      canvas.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={cn("w-full h-full block opacity-60 pointer-events-auto", className)}
    />
  );
};
