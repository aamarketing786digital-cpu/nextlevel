# CSS Border Gradient Skill

## Workflow
1. Use a pseudo-element (`::before`) to create the border.
2. Apply a linear gradient to the mask to reveal only the border area.

## Snippet
```css
.border-gradient {
  position: relative;
}
.border-gradient::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 10px; /* Match parent */
  padding: 1px; /* Border width */
  background: linear-gradient(45deg, #ff0000, #0000ff);
  -webkit-mask: 
     linear-gradient(#fff 0 0) content-box, 
     linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}
```

## Tailwind version
```html
<div class="relative rounded-xl before:absolute before:inset-0 before:p-[1px] before:rounded-xl before:bg-gradient-to-r before:from-indigo-500 before:to-purple-500 before:mask-composite-exclude before:pointer-events-none">
  Content
</div>
```
*(Note: requires custom mask-composite utility or arbitrary values)*
