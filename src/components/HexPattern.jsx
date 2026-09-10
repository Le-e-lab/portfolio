import './HexPattern.css';

/* Honeycomb (hexagon outline) background pattern.
   Renders a repeating SVG pattern of interlocking hexagon outlines that
   reads as subtle "hex graph paper". Used behind the hero instead of the
   dot grid. Decorative only — aria-hidden. */

export default function HexPattern({
  stroke = '#E8650A',
  opacity = 0.14,
  className = '',
}) {
  return (
    <div className={`hex-pattern ${className}`} aria-hidden="true">
      <svg className="hex-pattern-svg">
        <defs>
          <pattern
            id="hex-pattern-tile"
            width="56"
            height="96"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M28.66 0 L57.32 16.5 L57.32 49.5 L28.66 66 L0 49.5 L0 16.5 Z"
              fill="none"
              stroke={stroke}
              strokeWidth="1"
              opacity={opacity}
            />
            <path
              d="M28.66 96 L57.32 79.5 L57.32 46.5 L28.66 30 L0 46.5 L0 79.5 Z"
              fill="none"
              stroke={stroke}
              strokeWidth="1"
              opacity={opacity}
            />
            <path
              d="M28.66 32 L57.32 48.5 L57.32 81.5 L28.66 98 L0 81.5 L0 48.5 Z"
              fill="none"
              stroke={stroke}
              strokeWidth="1"
              opacity={opacity}
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hex-pattern-tile)" />
      </svg>
    </div>
  );
}