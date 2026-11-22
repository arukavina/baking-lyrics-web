import React from 'react'

// A repeating feTurbulence swatch gives the flat ink background the faint
// tooth of printed paper. Fixed over everything, never intercepts clicks.
const GRAIN_SVG =
  "<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'>" +
  "<filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter>" +
  "<rect width='100%' height='100%' filter='url(%23n)'/></svg>"

const style = {
  position: 'fixed',
  inset: 0,
  zIndex: 'var(--z-grain)',
  pointerEvents: 'none',
  opacity: 0.035,
  mixBlendMode: 'overlay',
  backgroundImage: `url("data:image/svg+xml,${GRAIN_SVG}")`,
}

const Grain = () => <div aria-hidden="true" className="grain" style={style} />

export default Grain
