# Three.js & React Three Fiber — WebGL 3D Scenes Skill

## When to use
- Real 3D: product spins, interactive hero scenes, shaders/material effects
- You need full control beyond "background effects"
- Data visualization with globes, particle systems

## Official Documentation
- **Three.js**: https://threejs.org/docs
- **React Three Fiber**: https://r3f.docs.pmnd.rs
- **@react-three/drei**: https://github.com/pmndrs/drei (helpers)

## Core mental model
- **Three.js**: `Scene`, `Camera`, `Renderer`, `Mesh` (Geometry + Material), Lights
- **React Three Fiber**: Declarative JSX components that map to Three.js objects

## React Three Fiber Setup (Recommended for React/Next.js)

### Installation
```bash
npm install three @types/three @react-three/fiber @react-three/drei
```

**Version Compatibility** (2025):
- `@react-three/fiber@8` → React 18
- `@react-three/fiber@9` → React 19

### Basic R3F Component
```tsx
"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

function SpinningCube() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}

export default function Scene() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <SpinningCube />
      <OrbitControls />
    </Canvas>
  );
}
```

## React Three Fiber Best Practices (2025)

### 1. Mutate in useFrame, NOT setState
The #1 R3F rule: Three.js mutations happen in useFrame, never React state:

```tsx
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

function AnimatedBox() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      // ✅ GOOD: Direct mutation in useFrame
      meshRef.current.rotation.x += delta;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry />
      <meshStandardMaterial />
    </mesh>
  );
}
```

### 2. Use frameloop="demand" for static scenes
For scenes that only update on interaction:

```tsx
<Canvas frameloop="demand">
  {/* Scene only updates when invalidate() is called */}
</Canvas>
```

### 3. Never create objects inside useFrame
Object creation in the render loop causes massive memory leaks:

```tsx
// ❌ BAD: Creates new object every frame
useFrame(() => {
  const vector = new THREE.Vector3(1, 2, 3); // Memory leak!
});

// ✅ GOOD: Reuse objects
const vector = useRef(new THREE.Vector3());
useFrame(() => {
  vector.current.set(1, 2, 3);
});
```

### 4. Use delta for frame-rate independence
Always multiply animations by delta:

```tsx
useFrame((state, delta) => {
  meshRef.current.rotation.x += 1 * delta; // Consistent speed at any FPS
});
```

### 5. Proper cleanup on unmount
Dispose geometries, materials, and textures:

```tsx
useEffect(() => {
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshBasicMaterial();

  return () => {
    geometry.dispose();
    material.dispose();
  };
}, []);
```

## Performance Optimization (2025)

### Texture Compression
Use KTX2/Basis Universal for GPU-optimized textures:

```tsx
import { useTexture } from "@react-three/drei";

// Preload textures
useTexture.preload("/texture.ktx2");

function TexturedMesh() {
  const map = useTexture("/texture.ktx2");
  return <mesh><meshStandardMaterial map={map} /></mesh>;
}
```

### Shadow Optimization
Disable shadow auto-update for static scenes:

```tsx
<Canvas
  shadows
  gl={{
    shadowMap: { autoUpdate: false } // Static scenes
  }}
>
```

### Fake Shadows for Simple Cases
Use gradient texture instead of real shadows:

```tsx
<mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
  <circleGeometry args={[2, 32]} />
  <meshBasicMaterial color="#000" transparent opacity={0.3} />
</mesh>
```

### Limit Active Lights
Max 3-4 lights for performance:

```tsx
<>
  <ambientLight intensity={0.5} />
  <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
  {/* Avoid adding more lights */}
</>
```

### Use Drei's Helpers
Drei provides optimized components:

```tsx
import {
  PerspectiveCamera,
  Environment,
  ContactShadows,
  AccumulativeShadows
} from "@react-three/drei";

// Optimized shadows
<AccumulativeShadows
  temporal
  frames={100}
  color="black"
  colorBlend={2}
  alphaTest={0.75}
/>
```

## Lazy Loading Patterns

### Load 3D content on viewport entry
```tsx
import { Suspense, useState, useRef } from "react";
import { useIntersection } from "@react-three/drei";

function LazyScene() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useIntersection(ref, ({ visible }) => {
    if (visible) setVisible(true);
  }, { once: true });

  return (
    <div ref={ref} style={{ height: "500px" }}>
      {visible && (
        <Canvas>
          <Suspense fallback={null}>
            <Heavy3DContent />
          </Suspense>
        </Canvas>
      )}
    </div>
  );
}
```

### Preload models with useGLTF
```tsx
import { useGLTF } from "@react-three/drei";

// Preload for instant display
useGLTF.preload("/model.glb");

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}
```

## Quick recipes

### 1) Minimal spinning cube (plain Three.js)
```js
import * as THREE from "three";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();
```

### 2) Particle sphere (R3F)
```tsx
import { Points, PointMaterial } from "@react-three/diber";
import { useMemo } from "react";

function ParticleSphere({ count = 5000 }) {
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Fibonacci sphere distribution
      const phi = Math.acos(1 - 2 * (i + 0.5) / count);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;

      positions[i * 3] = Math.cos(theta) * Math.sin(phi);
      positions[i * 3 + 1] = Math.sin(theta) * Math.sin(phi);
      positions[i * 3 + 2] = Math.cos(phi);

      colors[i * 3] = Math.random();
      colors[i * 3 + 1] = Math.random();
      colors[i * 3 + 2] = Math.random();
    }

    return [positions, colors];
  }, [count]);

  return (
    <Points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <PointMaterial
        vertexColors
        size={0.05}
        sizeAttenuation
        transparent
        opacity={0.8}
      />
    </Points>
  );
}
```

### 3) Glassmorphic material
```tsx
<meshPhysicalMaterial
  transmission={0.9}
  thickness={0.5}
  roughness={0.1}
  metalness={0}
  ior={1.5}
  clearcoat={1}
/>
```

## Common Pitfalls

| Pitfall | Solution |
|---------|----------|
| Memory leaks | Dispose geometries/materials on unmount |
| Low FPS on mobile | Reduce particle count, simplify materials |
| Texture loading slow | Use compressed textures (KTX2), lazy load |
| React state in useFrame | Use refs instead of useState |
| Creating objects in loop | Create once, mutate in useFrame |

## Accessibility

```tsx
// Add proper ARIA labels
<Canvas
  aria-label="Interactive 3D product showcase"
  role="img"
>
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Black screen | Check camera position, scene bounds |
| Performance drops | Use Stats.js to monitor FPS, reduce polygon count |
| Textures not loading | Check path, use public folder, enable CORS |
| Mobile overheating | Enable pixel ratio cap: `dpr={[1, 2]}` on Canvas |
