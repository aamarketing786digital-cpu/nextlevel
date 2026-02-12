# Tabs Navigation — Interactive Section Switchers

## When to Use
- Service/feature showcases with multiple items
- Content switchers (FAQ categories, portfolio filters)
- Any UI where users choose between parallel content views
- Floating navigation within pinned scroll sections

## Patterns

### 1. Pill Tab Bar (Floating)
Rounded pill-style tabs with active highlight. Best for pinned/horizontal scroll sections.

```tsx
const [activeIndex, setActiveIndex] = useState(0);

<div className="flex gap-2 p-2 rounded-full bg-white/80 backdrop-blur-md 
                border border-slate-200/50 shadow-sm">
  {items.map((item, idx) => (
    <button
      key={item.id}
      onClick={() => setActiveIndex(idx)}
      className={cn(
        "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap",
        idx === activeIndex
          ? "bg-slate-900 text-white shadow-sm"
          : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
      )}
    >
      {item.title}
    </button>
  ))}
</div>
```

### 2. Underline Tabs
Classic underline indicator. Best for content sections.

```tsx
<div className="flex border-b border-slate-200">
  {items.map((item, idx) => (
    <button
      key={item.id}
      onClick={() => setActiveIndex(idx)}
      className={cn(
        "px-6 py-3 text-sm font-medium transition-all relative",
        idx === activeIndex
          ? "text-primary"
          : "text-slate-500 hover:text-slate-700"
      )}
    >
      {item.title}
      {idx === activeIndex && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
      )}
    </button>
  ))}
</div>
```

### Animated Underline (GSAP)
For a sliding indicator that smoothly moves between tabs:

```tsx
const indicatorRef = useRef<HTMLDivElement>(null);
const tabsRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  if (!tabsRef.current || !indicatorRef.current) return;
  const activeTab = tabsRef.current.children[activeIndex] as HTMLElement;
  
  gsap.to(indicatorRef.current, {
    x: activeTab.offsetLeft,
    width: activeTab.offsetWidth,
    duration: 0.3,
    ease: "power2.out",
  });
}, [activeIndex]);

// JSX
<div ref={tabsRef} className="relative flex border-b border-slate-200">
  {items.map((item, idx) => (
    <button key={idx} onClick={() => setActiveIndex(idx)}
      className={cn("px-6 py-3 text-sm font-medium relative z-10",
        idx === activeIndex ? "text-primary" : "text-slate-500"
      )}>
      {item.title}
    </button>
  ))}
  <div ref={indicatorRef}
    className="absolute bottom-0 h-0.5 bg-primary rounded-full transition-none" />
</div>
```

### 3. Segmented Control
iOS-style segmented toggle with background slider.

```tsx
<div className="relative inline-flex p-1 bg-slate-100 rounded-lg">
  {/* Sliding background */}
  <div
    className="absolute top-1 bottom-1 bg-white rounded-md shadow-sm transition-all duration-300"
    style={{
      left: `calc(${activeIndex * (100 / items.length)}% + 4px)`,
      width: `calc(${100 / items.length}% - 8px)`,
    }}
  />
  
  {items.map((item, idx) => (
    <button
      key={idx}
      onClick={() => setActiveIndex(idx)}
      className={cn(
        "relative z-10 px-4 py-2 text-sm font-medium rounded-md transition-colors",
        idx === activeIndex ? "text-slate-900" : "text-slate-500"
      )}
    >
      {item.title}
    </button>
  ))}
</div>
```

### 4. Vertical Sidebar Tabs
For larger content areas with side navigation.

```tsx
<div className="grid md:grid-cols-[250px_1fr] gap-8">
  {/* Sidebar */}
  <div className="space-y-1">
    {items.map((item, idx) => (
      <button
        key={idx}
        onClick={() => setActiveIndex(idx)}
        className={cn(
          "w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all",
          idx === activeIndex
            ? "bg-primary/10 text-primary border-l-2 border-primary"
            : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
        )}
      >
        {item.title}
      </button>
    ))}
  </div>

  {/* Content */}
  <div className="min-h-[400px]">
    {items[activeIndex].content}
  </div>
</div>
```

## Content Transition Animation

### Fade Swap
```tsx
const contentRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  if (!contentRef.current) return;
  
  gsap.fromTo(contentRef.current,
    { opacity: 0, y: 10 },
    { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
  );
}, [activeIndex]);

<div ref={contentRef} key={activeIndex}>
  {items[activeIndex].content}
</div>
```

### Slide Direction
```tsx
useEffect(() => {
  const direction = activeIndex > prevIndex ? 1 : -1;
  
  gsap.fromTo(contentRef.current,
    { opacity: 0, x: 30 * direction },
    { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" }
  );
  
  setPrevIndex(activeIndex);
}, [activeIndex]);
```

## Mobile: Scrollable Tabs
On mobile, tabs often don't fit in one row. Make them horizontally scrollable:

```tsx
<div className="flex overflow-x-auto no-scrollbar gap-2 p-2 -mx-4 px-4">
  {items.map((item, idx) => (
    <button
      key={idx}
      className="flex-shrink-0 whitespace-nowrap px-4 py-2 rounded-full text-sm ..."
    >
      {item.title}
    </button>
  ))}
</div>
```

Hide the scrollbar globally:
```css
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
```

## Tabs + ScrollTrigger (Pinned Section)
For tabs that control a GSAP horizontal scroll, use DOM manipulation instead of React state to avoid re-renders during scroll:

```tsx
// Use direct DOM updates in ScrollTrigger onUpdate
onUpdate: (self) => {
  const newIndex = Math.round(self.progress * (totalPanels - 1));
  
  document.querySelectorAll(".nav-btn").forEach((btn, i) => {
    btn.classList.toggle("bg-slate-900", i === newIndex);
    btn.classList.toggle("text-white", i === newIndex);
    btn.classList.toggle("text-slate-500", i !== newIndex);
  });
}
```

**Why DOM over React state?** ScrollTrigger `onUpdate` fires on every scroll frame. Calling `setState` would trigger React re-renders at 60fps — causing lag. Direct DOM manipulation is safe here since these are purely visual class changes.

## ⚠️ Pitfalls

### Tab Content Height Jumps
If tab content varies in height, the section will jump. Fix with `min-h`:
```tsx
<div className="min-h-[400px]">{content}</div>
```

### Mobile Tab Overflow
Don't wrap tabs — they look broken. Use `overflow-x-auto` + `flex-nowrap` + `no-scrollbar`.

### Active Tab Not Visible on Mobile
When switching to a mobile-scrolled tab, it may be off-screen. Auto-scroll to active:
```tsx
useEffect(() => {
  const activeBtn = document.querySelector(`.tab-${activeIndex}`);
  activeBtn?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
}, [activeIndex]);
```

## Related
- `animations/horizontal-scroll.md` — Tabs controlling pinned scroll
- `animations/gsap.md` — Content transition timing
- `design/bento-grid.md` — Tab content layouts
