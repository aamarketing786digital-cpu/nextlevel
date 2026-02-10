# Globe.GL Skill

## When to use
- Data visualization on a 3D globe (points, arcs, hex bins)
- Need rich data layers (not just decorative)
- Uses Three.js under the hood

## Quick start (ESM)
```html
<script type="module">
  import Globe from 'globe.gl';
  
  const myGlobe = new Globe(document.getElementById('globe'))
    .globeImageUrl('//unpkg.com/three-globe/example/img/earth-dark.jpg')
    .pointsData(myData);
</script>
```

## Tips
- Set container size with CSS
- Use `globe.onPointClick(fn)` for interaction
- Optimize point count on mobile
