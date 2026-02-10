# Animation On Scroll Skill

## When to use
- Simple scroll-triggered animations (fade up, slide in)
- Lightweight alternative to GSAP for simple entry effects

## IntersectionObserver Workflow
1. Add CSS class for initial state (opacity: 0, transform).
2. Use JS to observe elements.
3. Add 'animate' class when in view.

### JS Snippet
```js
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
      observer.unobserve(entry.target); // Run once
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
```

### CSS
```css
.animate-on-scroll {
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s ease-out;
}
.animate-on-scroll.animate {
  opacity: 1;
  transform: translateY(0);
}
```
