"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float } from "@react-three/drei";
import * as THREE from "three";

function NetworkSphere({ count = 300, radius = 4 }: { count?: number; radius?: number }) {
  const pointsRef = useRef<THREE.Points>(null!);
  const linesRef = useRef<THREE.LineSegments>(null!);
  const groupRef = useRef<THREE.Group>(null!);
  
  // Mouse position for interaction
  const mouse = useRef(new THREE.Vector2());
  
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const { points, lines } = useMemo(() => {
    const p = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const linePositions = [];
    
    // Create particles in a more organic "cloud" rather than just a shell
    const color1 = new THREE.Color("#fbbf24"); // Amber-400
    const color2 = new THREE.Color("#22d3ee"); // Cyan-400
    const tempColor = new THREE.Color();

    const particles = [];

    for (let i = 0; i < count; i++) {
        // Randomized spherical distribution
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos((Math.random() * 2) - 1);
        const r = radius * (0.8 + Math.random() * 0.4); // 0.8 to 1.2 variation

        const x = r * Math.sin(phi) * Math.cos(theta);
        const y = r * Math.sin(phi) * Math.sin(theta);
        const z = r * Math.cos(phi);
        
        p[i * 3] = x;
        p[i * 3 + 1] = y;
        p[i * 3 + 2] = z;

        particles.push(new THREE.Vector3(x, y, z));

        // Color gradient based on position
        const yNorm = (y + radius) / (radius * 2);
        tempColor.lerpColors(color2, color1, yNorm);
        colors[i * 3] = tempColor.r;
        colors[i * 3 + 1] = tempColor.g;
        colors[i * 3 + 2] = tempColor.b;
    }

    // Connect nearby particles but fewer lines for cleaner look
    const connectionDist = radius * 0.4;
    
    for (let i = 0; i < count; i++) {
        // Limit connections per particle to avoid mess
        let connections = 0;
        for (let j = i + 1; j < count; j++) {
            const dist = particles[i].distanceTo(particles[j]);
            if (dist < connectionDist && connections < 3) {
                linePositions.push(
                    particles[i].x, particles[i].y, particles[i].z,
                    particles[j].x, particles[j].y, particles[j].z
                );
                connections++;
            }
        }
    }

    const lineGeo = new Float32Array(linePositions);
    
    return {
        points: { positions: p, colors: colors },
        lines: lineGeo
    };
  }, [count, radius]);

  useFrame((state) => {
    if (!groupRef.current) return;

    // Smooth rotation - INVERTED direction relative to cursor
    groupRef.current.rotation.y += 0.001;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -mouse.current.y * 0.1, 0.05);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, groupRef.current.rotation.y - mouse.current.x * 0.05, 0.05);
    
    // Breathing opacity
    if (linesRef.current && linesRef.current.material) {
        (linesRef.current.material as THREE.LineBasicMaterial).opacity = 0.15 + Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            itemSize={3}
            count={count}
            array={points.positions}
            args={[points.positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            itemSize={3}
            count={count}
            array={points.colors}
            args={[points.colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.15}
          vertexColors
          transparent
          opacity={0.9}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            itemSize={3}
            count={lines.length / 3}
            array={lines}
            args={[lines, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#fbbf24"
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} color="#00bfff" intensity={1} />
      
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <NetworkSphere count={300} radius={4.5} />
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

export function HeroScene() {
  
  return (
    <div className="h-full w-full absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
