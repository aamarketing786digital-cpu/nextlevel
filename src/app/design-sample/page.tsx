"use client";

import { Suspense, useRef, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown, Sparkles } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import * as THREE from "three";
import { Canvas, useFrame, invalidate } from "@react-three/fiber";
import { OrbitControls, Float } from "@react-three/drei";

import { useMobileDetection } from "@/hooks/useMobileDetection";

// --- 3D EXPERIMENTAL SCENE ---
function NetworkSphereExperimental({ count = 400, radius = 5 }: { count?: number; radius?: number }) {
  const pointsRef = useRef<THREE.Points>(null!);
  const linesRef = useRef<THREE.LineSegments>(null!);
  const groupRef = useRef<THREE.Group>(null!);
  const mouse = useRef(new THREE.Vector2());
  const isMobile = useMobileDetection();
  
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
      invalidate();
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const { points, lines } = useMemo(() => {
    const p = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const linePositions = [];
    
    // Tech-Luxury Palette: Crisp Whites and Deep Amber/Gold
    const color1 = new THREE.Color("#ffffff"); // Pure white core
    const color2 = new THREE.Color("#fbbf24"); // Amber edge
    const tempColor = new THREE.Color();

    const particles = [];

    for (let i = 0; i < count; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos((Math.random() * 2) - 1);
        const r = radius * (0.8 + Math.random() * 0.5); 

        const x = r * Math.sin(phi) * Math.cos(theta);
        const y = r * Math.sin(phi) * Math.sin(theta);
        const z = r * Math.cos(phi);
        
        p[i * 3] = x;
        p[i * 3 + 1] = y;
        p[i * 3 + 2] = z;

        particles.push(new THREE.Vector3(x, y, z));

        const distance = Math.sqrt(x*x + y*y + z*z);
        const intensity = Math.max(0, 1 - Math.abs(distance - radius) / (radius * 0.5));
        
        // Lerp towards gold on the outside, white in the center
        tempColor.lerpColors(color1, color2, intensity);
        colors[i * 3] = tempColor.r;
        colors[i * 3 + 1] = tempColor.g;
        colors[i * 3 + 2] = tempColor.b;
    }

    const connectionDist = radius * 0.45;
    for (let i = 0; i < count; i++) {
        let connections = 0;
        for (let j = i + 1; j < count; j++) {
            const dist = particles[i].distanceTo(particles[j]);
            if (dist < connectionDist && connections < 4) {
                linePositions.push(
                    particles[i].x, particles[i].y, particles[i].z,
                    particles[j].x, particles[j].y, particles[j].z
                );
                connections++;
            }
        }
    }

    return {
        points: { positions: p, colors },
        lines: new Float32Array(linePositions)
    };
  }, [count, radius]);

  useFrame((state) => {
    if (!groupRef.current) return;
    
    // Desktop: Faster/Reactive. Mobile: Slower/Majestic.
    const baseRotationSpeed = isMobile ? 0.0001 : 0.0005;
    const lerpFactor = isMobile ? 0.02 : 0.03;
    const mouseInfluence = isMobile ? 0.05 : 0.15;

    groupRef.current.rotation.y += baseRotationSpeed; 
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -mouse.current.y * mouseInfluence, lerpFactor);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, groupRef.current.rotation.y - mouse.current.x * mouseInfluence, lerpFactor);
    
    if (linesRef.current && linesRef.current.material) {
        (linesRef.current.material as THREE.LineBasicMaterial).opacity = 0.05 + Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
    }
    invalidate();
  });

  return (
    <group ref={groupRef}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" itemSize={3} count={count} array={points.positions} args={[points.positions, 3]} />
          <bufferAttribute attach="attributes-color" itemSize={3} count={count} array={points.colors} args={[points.colors, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.12} vertexColors transparent opacity={0.6} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
      </points>

      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" itemSize={3} count={lines.length / 3} array={lines} args={[lines, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#ffffff" transparent opacity={0.1} blending={THREE.AdditiveBlending} depthWrite={false} />
      </lineSegments>
    </group>
  );
}

function SceneExperimental({ count = 400, scale = 1 }) {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} color="#fbbf24" intensity={2} decay={2} distance={30} />
      <pointLight position={[-10, -10, -10]} color="#ffffff" intensity={1} decay={2} distance={30} />
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.2}>
        <group scale={scale}>
            <NetworkSphereExperimental count={count} radius={4.5} />
        </group>
      </Float>
      <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} maxPolarAngle={Math.PI / 1.5} minPolarAngle={Math.PI / 3} />
    </>
  );
}

// --- HERO COMPONENT ---
export default function DesignSamplePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    if (!containerRef.current) return;
    
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    
    tl.from(".hero-badge-exp", { y: 20, opacity: 0, duration: 1.2, ease: "power3.out" })
      .to(".hero-char-exp", {
        y: 0,
        opacity: 1,
        stagger: 0.02,
        duration: 1.5,
        filter: "blur(0px)",
      }, "-=0.8")
      .from(".hero-sub-exp", { y: 30, opacity: 0, duration: 1.2 }, "-=1.0")
      .from(".hero-cta-exp", { y: 20, opacity: 0, duration: 1.2 }, "-=1.0");
      
  }, { scope: containerRef });

  return (
    <div className="min-h-screen bg-[#06080e] text-slate-50 relative overflow-hidden font-sans">
      
      {/* Cinematic Deep Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          {/* Noise Texture */}
          <div 
             className="absolute inset-0 opacity-[0.05] mix-blend-overlay" 
             style={{ 
                 backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.7'/%3E%3C/svg%3E")`,
             }} 
          />
          
          {/* Elegant Amber Glows */}
          <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-amber-600/10 rounded-full blur-[150px] mix-blend-screen" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[800px] h-[800px] bg-slate-400/10 rounded-full blur-[150px] mix-blend-screen" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-900/15 rounded-full blur-[150px] mix-blend-screen" />
      </div>

      {/* Experimental 3D Scene */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="w-full h-full opacity-60 mix-blend-screen">
          <Canvas camera={{ position: [0, 0, 12], fov: 45 }} gl={{ antialias: true, alpha: true }} dpr={[1, 2]}>
            <Suspense fallback={null}>
              <SceneExperimental />
            </Suspense>
          </Canvas>
        </div>
      </div>

      {/* Content wrapper */}
      <div ref={containerRef} className="relative z-10 container mx-auto px-4 min-h-screen flex flex-col items-center justify-center text-center">
        
        <div className="hero-badge-exp inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span className="text-sm font-medium tracking-wide text-amber-50 uppercase">The Tech-Luxury Standard</span>
        </div>

        <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold leading-[1.1] tracking-[-0.02em] max-w-5xl mb-6">
          {"Next Level".split("").map((char, i) => (
            <span 
              key={i} 
              className="hero-char-exp inline-block whitespace-pre opacity-0 translate-y-[60px]"
              style={{ filter: "blur(10px)", willChange: "transform, opacity, filter" }}
            >
              {char}
            </span>
          ))}
          <br />
          {"Digital Growth".split("").map((char, i) => (
            <span 
              key={`g-${i}`} 
              className="hero-char-exp inline-block whitespace-pre opacity-0 translate-y-[60px] text-amber-400/90"
              style={{ filter: "blur(10px)", willChange: "transform, opacity, filter" }}
            >
              {char}
            </span>
          ))}
        </h1>

        <p className="hero-sub-exp text-lg md:text-2xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed mb-10">
          Transform your digital presence with sophisticated strategies and unparalleled visual excellence.
        </p>

        {/* Premium Glassmorphic CTA */}
        <div className="hero-cta-exp flex flex-col sm:flex-row gap-4 items-center justify-center">
          <Button
            size="lg"
            className="rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 hover:shadow-[0_0_30px_rgba(251,191,36,0.3)] transition-all duration-300 text-lg px-8 h-14 font-medium"
          >
            Start Your Journey
            <ArrowDown className="ml-2 h-5 w-5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="rounded-full border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-md text-white transition-all text-lg px-8 h-14 font-medium"
          >
            View Our Work
          </Button>
        </div>
      </div>
    </div>
  );
}
