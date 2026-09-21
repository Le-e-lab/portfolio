import './HexPattern.css';

/* Pointy-top hexagon tessellation rendered as a single SVG pattern tile
   (cost: one tiny tile, GPU-composited fill — no JS, no listeners).
   Mockup motif: discreet electric-blue hex linework drifting behind content.

   Tile math (pointy-top):
     width  W = sqrt(3) * R
     height H = 3 * R
     center A at (W/2, R), center B at (W/2, 2.5R)
   Two hexagon centers per tile give a seamless brick of cells. */

const R = 44;                 // hexagon radius (px) — desktop density
const W = Math.sqrt(3) * R;   // ≈ 76.2
const H = 3 * R;              // 132

const APEX = R * 0.866;       // half-width of a pointy-top hex
const V = R * 0.5;

function hexPath(cx, cy) {
  return [
    `M ${cx} ${cy - R}`,
    `L ${cx + APEX} ${cy - V}`,
    `L ${cx + APEX} ${cy + V}`,
    `L ${cx} ${cy + R}`,
    `L ${cx - APEX} ${cy + V}`,
    `L ${cx - APEX} ${cy - V}`,
    'Z',
  ].join(' ');
}

const TILE = [
  hexPath(W / 2, R),
  hexPath(W / 2, 2.5 * R),
].join(' ');

export default function HexPattern({
  stroke = 'var(--accent-light)',
  opacity = 0.16,
  className = '',
}) {
  return (
    <div
      className={`hex-pattern ${className}`}
      aria-hidden="true"
      style={{
        '--hex-opacity': opacity,
        '--hex-stroke': stroke,
      }}
    >
      <svg
        className="hex-pattern__svg"
        xmlns="http://www.w3.org/2000/svg"
        width={W}
        height={H}
      >
        <defs>
          <pattern id="hex-grid" width={W} height={H} patternUnits="userSpaceOnUse">
            <path
              d={TILE}
              fill="none"
              stroke="var(--hex-stroke)"
              strokeWidth="1.75"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hex-grid)" />
      </svg>
    </div>
  );
}