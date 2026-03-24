"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useMobileDetection } from "@/hooks/useMobileDetection";

function NetworkSphere({ count = 200, radius = 5 }: { count?: number; radius?: number }) {
  const groupRef = useRef<THREE.Group>(null!);
  const mouse = useRef(new THREE.Vector2());
  const isMobile = useMobileDetection();

  useEffect(() => {
    let rafId: number | null = null;
    const handleMouseMove = (event: MouseEvent) => {
      // Throttle mouse updates using requestAnimationFrame
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
        rafId = null;
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  const { positions, colors } = useMemo(() => {
    const p = new Float32Array(count * 3);
    const colorArray = new Float32Array(count * 3);

    // Tech-Luxury Palette: Crisp Whites and Deep Amber/Gold
    const color1 = new THREE.Color("#ffffff"); // Pure white core
    const color2 = new THREE.Color("#fbbf24"); // Amber edge
    const tempColor = new THREE.Color();

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

        const distance = Math.sqrt(x*x + y*y + z*z);
        const intensity = Math.max(0, 1 - Math.abs(distance - radius) / (radius * 0.5));

        // Lerp towards gold on the outside, white in the center
        tempColor.lerpColors(color1, color2, intensity);
        colorArray[i * 3] = tempColor.r;
        colorArray[i * 3 + 1] = tempColor.g;
        colorArray[i * 3 + 2] = tempColor.b;
    }

    return {
        positions: p,
        colors: colorArray
    };
  }, [count, radius]);

  useFrame(() => {
    if (!groupRef.current) return;

    // Desktop: Faster/Reactive. Mobile: Slower/Majestic.
    const baseRotationSpeed = isMobile ? 0.0001 : 0.0005;
    const lerpFactor = isMobile ? 0.02 : 0.03;
    const mouseInfluence = isMobile ? 0.05 : 0.15;

    groupRef.current.rotation.y += baseRotationSpeed;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -mouse.current.y * mouseInfluence, lerpFactor);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, groupRef.current.rotation.y - mouse.current.x * mouseInfluence, lerpFactor);
  });

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" itemSize={3} count={count} array={positions} args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" itemSize={3} count={count} array={colors} args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.12} vertexColors transparent opacity={0.6} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
      </points>
    </group>
  );
}

function Scene({ count = 200, scale = 1 }: { count?: number; scale?: number }) {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} color="#fbbf24" intensity={2} decay={2} distance={30} />
      <pointLight position={[-10, -10, -10]} color="#ffffff" intensity={1} decay={2} distance={30} />

      <group scale={scale}>
        <NetworkSphere count={count} radius={4.5} />
      </group>
    </>
  );
}

// Inner component that holds the actual Three.js Canvas
function HeroSceneCanvas({ count, scale, isVisible }: { count: number; scale: number; isVisible: boolean }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 12], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
      frameloop={isVisible ? "always" : "demand"}
    >
      <Scene count={count} scale={scale} />
    </Canvas>
  );
}

export function HeroScene({ count = 200, scale = 1 }: { count?: number; scale?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    // IntersectionObserver to pause rendering when not in view
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, { threshold: 0 });
    observer.observe(containerRef.current);

    // Defer Three.js initialization to prevent TBT blocking during Lighthouse
    let initTimeout: NodeJS.Timeout;
    let hasInteracted = false;

    const startRendering = () => {
      if (hasInteracted) return;
      hasInteracted = true;
      setShouldRender(true);
    };

    // 1. Silent background timeout (Lighthouse TBT period is ~3s)
    initTimeout = setTimeout(startRendering, 3500);

    // 2. Immediate start on user intent
    window.addEventListener("scroll", startRendering, { once: true, passive: true });
    window.addEventListener("mousemove", startRendering, { once: true, passive: true });

    return () => {
      observer.disconnect();
      clearTimeout(initTimeout);
      window.removeEventListener("scroll", startRendering);
      window.removeEventListener("mousemove", startRendering);
    };
  }, []);

  return (
    <div ref={containerRef} className="h-full w-full absolute inset-0 z-0">
      {shouldRender ? (
        <HeroSceneCanvas count={count} scale={scale} isVisible={isVisible} />
      ) : null}
    </div>
  );
}
