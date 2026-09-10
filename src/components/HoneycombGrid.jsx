import './HoneycombGrid.css';

/* Interlocking hexagon ("honeycomb") gallery.
   Pattern: pointy-top clip-path hexes in flex rows; alternate rows pull up by
   30% of hex width and shift half a hex sideways so peaks nest into the row
   above. A radial tangerine glow fades in behind the hovered hex — the
   "light on" effect. Clicking a hex calls onOpen(project). */

function chunk(projects, cols) {
  const rows = [];
  for (let i = 0; i < projects.length; i += cols) {
    rows.push(projects.slice(i, i + cols));
  }
  return rows;
}

export default function HoneycombGrid({
  projects = [],
  cols = 3,
  variant = 'featured',
  className = '',
  onOpen = () => {},
}) {
  if (!projects.length) return null;
  const rows = chunk(projects, cols);

  return (
    <div className={`hexcomb hexcomb--${variant} ${className}`} role="list" aria-label="Featured work">
      {rows.map((row, ri) => (
        <div
          key={ri}
          className={`hexcomb-row ${ri % 2 === 1 ? 'hexcomb-row--offset' : ''}`}
          role="listitem"
        >
          {row.map((project) => (
            <div key={project.title} className="hex-shell">
              <span className="hex-glow" aria-hidden="true" />
              <button
                type="button"
                className="hex-btn"
                onClick={() => onOpen(project)}
                aria-label={`View ${project.title}`}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="hex-img"
                  loading="lazy"
                  width={600}
                  height={600}
                />
                <span className="hex-label">
                  <span className="hex-cat">{project.category}</span>
                  <span className="hex-title">{project.title}</span>
                </span>
              </button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}