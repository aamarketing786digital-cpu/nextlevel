# Modern Preloader Variations (GSAP)

Five production-ready preloader patterns using GSAP + React. Each uses `useGSAP` hook and calls `onComplete` when finished.

## Dependencies
```
gsap @gsap/react lucide-react
```

## Interface
```tsx
interface PreloaderProps {
  onComplete: () => void;
}
```

---

## 1. Minimal Kinetic (Counter Reveal)
Big bold percentage counter (0→100%) that slides up on completion.

```tsx
export function PreloaderMinimal({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, { display: "none" });
        onComplete();
      },
    });

    const proxy = { val: 0 };
    tl.to(proxy, {
      val: 100,
      duration: 2.5,
      ease: "power2.inOut",
      onUpdate: () => {
        if (counterRef.current) counterRef.current.innerText = Math.round(proxy.val).toString();
      },
    });

    tl.to(containerRef.current, { yPercent: -100, duration: 1, ease: "expo.inOut" });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="fixed inset-0 z-[9999] flex items-center justify-center bg-zinc-950 text-white">
      <div className="relative">
        <h1 ref={counterRef} className="font-display text-[15vw] md:text-[20vw] font-bold leading-none tracking-tighter">0</h1>
        <div className="absolute top-0 right-[-20px] text-lg md:text-2xl font-mono text-primary animate-pulse">%</div>
      </div>
    </div>
  );
}
```

**Key techniques**: Proxy object for number interpolation, `yPercent: -100` curtain slide, viewport-scaled text (`text-[15vw]`).

---

## 2. The Shutter (Vertical Blinds)
Logo text displayed above blinds, holds visible, then blinds reveal content.

```tsx
export function PreloaderShutter({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => { gsap.set(containerRef.current, { display: "none" }); onComplete(); }
    });

    // 1. Reveal logo text (displayed ABOVE the blinds)
    tl.from(textRef.current, { y: 40, opacity: 0, duration: 0.5, ease: "power3.out" });
    // 2. Hold visible
    tl.to({}, { duration: 1.5 });
    // 3. Fade text out
    tl.to(textRef.current, { opacity: 0, y: -20, duration: 0.4, ease: "power2.in" });
    // 4. Open blinds
    tl.to(".shutter-blind", { height: 0, duration: 0.8, stagger: 0.08, ease: "power4.inOut" });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="fixed inset-0 z-[9999] pointer-events-none">
      {/* Blinds layer */}
      <div className="absolute inset-0 flex z-[9999]">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="shutter-blind flex-1 h-full bg-zinc-950 border-r border-zinc-900 last:border-r-0" />
        ))}
      </div>
      {/* Logo ABOVE blinds */}
      <div className="absolute inset-0 z-[10001] flex items-center justify-center">
        <div ref={textRef} className="text-4xl md:text-7xl font-display font-bold text-white tracking-widest uppercase">NextLevel</div>
      </div>
    </div>
  );
}
```

**Key techniques**: Logo at `z-[10001]` above blinds at `z-[9999]` — ensures text is visible immediately. Blinds animate away after logo fades.

---

## 3. Scramble Code (Terminal/Matrix)
Random character scramble resolving into target text, then glitch-out exit.

```tsx
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
        if (!textRef.current) return;
        textRef.current.innerText = targetText.split("").map((_, index) => {
          if (index < iteration) return targetText[index];
          return chars[Math.floor(Math.random() * chars.length)];
        }).join("");
        if (iteration >= targetText.length) clearInterval(interval);
        iteration += 1 / 3;
      }, 50);
    };

    const timer = setTimeout(scramble, 500);
    return () => { clearInterval(interval); clearTimeout(timer); };
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => { gsap.set(containerRef.current, { display: "none" }); onComplete(); }
    });

    tl.from(containerRef.current, { autoAlpha: 0, duration: 0.5 });
    tl.to({}, { duration: 2.5 });
    tl.to(textRef.current, { skewX: 20, opacity: 0, duration: 0.2, ease: "power2.in" });
    tl.to(containerRef.current, { scaleY: 0.001, duration: 0.4, ease: "expo.in" });
    tl.to(containerRef.current, { scaleX: 0, duration: 0.4, ease: "expo.out" });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="fixed inset-0 z-[9999] flex items-center justify-center bg-black text-green-500 font-mono">
      <div className="relative">
        <div ref={textRef} className="text-4xl md:text-8xl font-bold tracking-tighter mix-blend-screen">LOADING</div>
        <div className="absolute inset-0 bg-green-500/20 blur-xl opacity-50 animate-pulse" />
      </div>
      <div className="absolute bottom-10 text-xs text-green-700 animate-pulse">SYSTEM_INITIALIZING...</div>
    </div>
  );
}
```

**Key techniques**: `useEffect` + `setInterval` for character-by-character reveal, `skewX` glitch effect, `scaleY`/`scaleX` collapse.

---

## 4. Fluid Circle (Expanding Dot + Brand Logo)
Brand logo fades in, holds, then dot appears and expands to fill viewport.

```tsx
export function PreloaderFluid({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => { gsap.set(containerRef.current, { display: "none" }); onComplete(); }
    });

    // Hide dot initially
    tl.set(dotRef.current, { opacity: 0, scale: 0 });
    // 1. Logo in
    tl.from(logoRef.current, { opacity: 0, scale: 0.8, duration: 0.6, ease: "back.out(1.7)" });
    // 2. Hold
    tl.to({}, { duration: 1.5 });
    // 3. Logo out
    tl.to(logoRef.current, { opacity: 0, scale: 0.5, duration: 0.4, ease: "power2.in" });
    // 4. Show dot + pulse
    tl.to(dotRef.current, { opacity: 1, scale: 1, duration: 0.2, ease: "power2.out" });
    tl.to(dotRef.current, { scale: 1.5, duration: 0.3, yoyo: true, repeat: 1, ease: "power2.inOut" });
    // 5. Expand
    const size = Math.max(window.innerWidth, window.innerHeight) * 1.5;
    tl.to(dotRef.current, { width: size * 2, height: size * 2, duration: 1.2, ease: "expo.inOut" });
    // 6. Fade
    tl.to(containerRef.current, { opacity: 0, duration: 0.5, delay: -0.2 });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="fixed inset-0 z-[9999] flex items-center justify-center bg-zinc-950">
      {/* Brand */}
      <div ref={logoRef} className="absolute z-20 text-center">
        <h2 className="font-display text-4xl md:text-6xl font-bold text-white tracking-tight">NextLevel</h2>
        <p className="text-sm md:text-base text-zinc-400 tracking-widest uppercase mt-2">Marketerz</p>
      </div>
      {/* Dot (hidden initially) */}
      <div ref={dotRef} className="w-4 h-4 rounded-full bg-white relative z-10" />
    </div>
  );
}
```

**Key techniques**: `gsap.set` to hide dot initially, `back.out` for bouncy logo entrance, sequenced logo→dot→expand flow.

---

## 5. Curtain Stagger (Panel Reveal)
Vertical panels collapse from center outward with alternating tones.

```tsx
export function PreloaderCurtain({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => { gsap.set(containerRef.current, { display: "none" }); onComplete(); }
    });

    tl.set(".panel-strip", { transformOrigin: "top center" });
    tl.to({}, { duration: 1 });
    tl.to(".panel-strip", {
      scaleY: 0,
      stagger: { amount: 0.5, from: "center" },
      duration: 1.2,
      ease: "power4.inOut",
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="fixed inset-0 z-[9999] flex flex-col md:flex-row pointer-events-none">
      {[...Array(5)].map((_, i) => (
        <div key={i} className={cn("panel-strip flex-1 border-r border-zinc-900/50 relative overflow-hidden", i % 2 === 0 ? "bg-zinc-950" : "bg-zinc-900")}>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/10 opacity-30" />
        </div>
      ))}
      <div className="absolute bottom-10 right-10 z-[100] text-zinc-500 text-sm font-mono tracking-widest animate-pulse">
        INITIALIZING ENV //
      </div>
    </div>
  );
}
```

**Key techniques**: `stagger.from: "center"` for centrifugal animation, `transformOrigin`, alternating panel colors.

---

## Demo Controller Pattern
Use a fixed panel to cycle through preloaders during development:

```tsx
const handleSelect = (index: number) => {
  setCurrentPreloader(null);           // Force unmount
  setTimeout(() => {
    setCurrentPreloader(index);        // Remount with new variant
    setIsPlaying(true);
  }, 50);
};

const handleComplete = () => setIsPlaying(false);
```

**Tip**: Always unmount→remount when replaying to reset GSAP timelines cleanly.
