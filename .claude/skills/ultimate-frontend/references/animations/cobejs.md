# cobe.js — Lightweight WebGL Globe Skill

## When to use
- Decorative, lightweight spinning globe
- Less data-heavy than globe.gl
- Great for hero sections or "global reach" visuals

## Quick recipe
```js
import createGlobe from "cobe";

const canvas = document.getElementById("cobe");
const globe = createGlobe(canvas, {
  devicePixelRatio: 2,
  width: 1000,
  height: 1000,
  phi: 0,
  theta: 0,
  dark: 1,
  diffuse: 1.2,
  mapSamples: 16000,
  mapBrightness: 6,
  baseColor: [0.3, 0.3, 0.3],
  markerColor: [1, 0.5, 0.5],
  glowColor: [1, 1, 1],
  markers: [
    { location: [37.7595, -122.4367], size: 0.03 },
    { location: [40.7128, -74.0060], size: 0.1 }
  ],
  onRender: (state) => {
    state.phi += 0.01;
  }
});
```
