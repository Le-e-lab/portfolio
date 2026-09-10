import { useEffect, useRef } from 'react';
import './HexPattern.css';

/* Interactive honeycomb hexagon background.
   Idle: faint tangerine hex outlines (readable, not overpowering).
   Active: hexagon edges near the cursor brighten with soft radial falloff,
   fading smoothly back to idle as the cursor moves away.
   Implemented on <canvas> (not a static CSS image) so per-edge glow is
   possible. The render loop stays cheap: the idle grid is pre-rendered to an
   offscreen canvas, and each frame only overlays segments within the glow
   radius. Mouse position is lerped inside requestAnimationFrame — never
   redrawn on raw mousemove events. */

const S = 16;              // hex side length
const X_STEP = Math.sqrt(3) * S;
const Y_STEP = 1.5 * S;
const OFFSET = X_STEP / 2;

function hexPoints(cx, cy, s) {
  return [
    [cx, cy - s],
    [cx + 0.866 * s, cy - 0.5 * s],
    [cx + 0.866 * s, cy + 0.5 * s],
    [cx, cy + s],
    [cx - 0.866 * s, cy + 0.5 * s],
    [cx - 0.866 * s, cy - 0.5 * s],
  ];
}

function smoothstep(t) {
  const c = Math.max(0, Math.min(1, t));
  return c * c * (3 - 2 * c);
}

function buildSegments(W, H) {
  const segs = [];
  const rows = Math.ceil(H / Y_STEP) + 2;
  const cols = Math.ceil(W / X_STEP) + 3;
  for (let r = 0; r < rows; r++) {
    const cy = r * Y_STEP;
    const shift = r % 2 === 1 ? OFFSET : 0;
    for (let c = 0; c < cols; c++) {
      const cx = c * X_STEP + shift;
      const pts = hexPoints(cx, cy, S);
      for (let i = 0; i < 6; i++) {
        const [x1, y1] = pts[i];
        const [x2, y2] = pts[(i + 1) % 6];
        segs.push({ x1, y1, x2, y2, mx: (x1 + x2) / 2, my: (y1 + y2) / 2 });
      }
    }
  }
  return segs;
}

export default function HexGlowPattern({
  stroke = '#E8650A',
  glowColor = '#e8703a',
  idleOpacity = 0.24,
  glowRadius = 230,
  className = '',
}) {
  const canvasRef = useRef(null);
  const cfgRef = useRef({ stroke, glowColor, idleOpacity, glowRadius });

  // Sync config in an effect — never touch refs during render (react-hooks/refs)
  useEffect(() => {
    cfgRef.current.stroke = stroke;
    cfgRef.current.glowColor = glowColor;
    cfgRef.current.idleOpacity = idleOpacity;
    cfgRef.current.glowRadius = glowRadius;
  }, [stroke, glowColor, idleOpacity, glowRadius]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    let W = 0, H = 0;
    let segments = [];
    let idleCanvas = null;
    let raf = 0;
    let targetX = -9999, targetY = -9999;
    let lerpX = -9999, lerpY = -9999;
    let interactive = true;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    function renderIdle() {
      const cfg = cfgRef.current;
      idleCanvas = document.createElement('canvas');
      idleCanvas.width = W * dpr;
      idleCanvas.height = H * dpr;
      const ictx = idleCanvas.getContext('2d');
      ictx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ictx.strokeStyle = cfg.stroke;
      ictx.lineWidth = 1.3;
      ictx.globalAlpha = cfg.idleOpacity;
      ictx.beginPath();
      for (const seg of segments) {
        ictx.moveTo(seg.x1, seg.y1);
        ictx.lineTo(seg.x2, seg.y2);
      }
      ictx.stroke();
    }

    function resize() {
      const rect = canvas.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      segments = buildSegments(W, H);
      renderIdle();
      if (!interactive) {
        ctx.clearRect(0, 0, W, H);
        ctx.drawImage(idleCanvas, 0, 0, W, H);
      }
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      // only glow while the cursor is over this canvas area (content overlays
      // don't block it — we listen on window so the whole hero is reactive)
      if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
        targetX = -9999;
        targetY = -9999;
        return;
      }
      targetX = x;
      targetY = y;
    };

    interactive = !reduced && !isMobile;
    if (interactive) {
      window.addEventListener('mousemove', onMove, { passive: true });
      window.addEventListener('mouseleave', onLeave);
    }

    function glowLoop() {
      raf = requestAnimationFrame(glowLoop);
      const cfg = cfgRef.current;
      // smooth-follow cursor (never recalculates on raw mousemove)
      lerpX += (targetX - lerpX) * 0.14;
      lerpY += (targetY - lerpY) * 0.14;
      ctx.clearRect(0, 0, W, H);
      ctx.drawImage(idleCanvas, 0, 0, W, H);

      // nothing to glow
      const dx = lerpX, dy = lerpY;
      if (dx < -500 || dy < -500) return;
      const r = cfg.glowRadius;
      const r2 = r * r;
      for (const seg of segments) {
        const ddx = seg.mx - dx;
        const ddy = seg.my - dy;
        const d2 = ddx * ddx + ddy * ddy;
        if (d2 > r2) continue;
        const alpha = cfg.idleOpacity + (0.95 - cfg.idleOpacity) * smoothstep(1 - Math.sqrt(d2) / r);
        ctx.strokeStyle = cfg.glowColor;
        ctx.lineWidth = 1.6;
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.moveTo(seg.x1, seg.y1);
        ctx.lineTo(seg.x2, seg.y2);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    }

    if (interactive) {
      raf = requestAnimationFrame(glowLoop);
    } else {
      ctx.clearRect(0, 0, W, H);
      ctx.drawImage(idleCanvas, 0, 0, W, H);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div className={`hex-pattern ${className}`} aria-hidden="true">
      <canvas ref={canvasRef} className="hex-pattern-canvas" />
    </div>
  );
}