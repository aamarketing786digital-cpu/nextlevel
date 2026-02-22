"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, invalidate } from "@react-three/fiber";
import { OrbitControls, Float } from "@react-three/drei";
import * as THREE from "three";
import { useMobileDetection } from "@/hooks/useMobileDetection";

function NetworkSphere({ count = 300, radius = 5 }: { count?: number; radius?: number }) {
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

function Scene({ count = 300, scale = 1 }: { count?: number; scale?: number }) {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} color="#fbbf24" intensity={2} decay={2} distance={30} />
      <pointLight position={[-10, -10, -10]} color="#ffffff" intensity={1} decay={2} distance={30} />
      
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.2}>
        <group scale={scale}>
            <NetworkSphere count={count} radius={4.5} />
        </group>
      </Float>

      <OrbitControls 
        enableZoom={false} 
        enablePan={false} 
        autoRotate={false}
        maxPolarAngle={Math.PI / 1.5}
        minPolarAngle={Math.PI / 3}
      />
    </>
  );
}

export function HeroScene({ count = 400, scale = 1 }: { count?: number; scale?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, { threshold: 0 });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="h-full w-full absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
        frameloop={isVisible ? "always" : "demand"}
      >
        <Scene count={count} scale={scale} />
      </Canvas>
    </div>
  );
}
