# Unicorn Studio — No-code WebGL Scenes

## When to use
- Embed high-quality WebGL scenes created in Unicorn Studio editor
- Need fluid, interactive effects without coding shaders

## Embed pattern
```html
<!-- Load SDK -->
<script src="https://cdn.jsdelivr.net/npm/unicorn-studio-embed/dist/index.umd.js"></script>

<!-- Container -->
<div
  data-us-project="YOUR_PROJECT_ID"
  style="width: 100%; height: 600px"
></div>

<script>
  UnicornStudio.init();
</script>
```

## Performance
- Use `data-us-lazyload="true"`
- Use `data-us-scale="0.5"` for high-DPI screens if performance lags
