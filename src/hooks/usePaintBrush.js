import { useEffect, useRef } from 'react';

export default function usePaintBrush() {
  const canvasRef = useRef(null);
  const points = useRef([]);
  const mouse = useRef({ x: 0, y: 0 });
  const isHovering = useRef(false);
  const animFrame = useRef(null);

  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.style.cssText = `
      position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
      pointer-events: none; z-index: 9999;
    `;
    document.body.appendChild(canvas);
    canvasRef.current = canvas;

    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    resize();
    window.addEventListener('resize', resize);

    const handleMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      points.current.push({
        x: e.clientX,
        y: e.clientY,
        age: 0,
        maxAge: 40 + Math.random() * 20,
        size: 2 + Math.random() * 3,
        color: isHovering.current
          ? `rgba(58, 138, 138, ${0.3 + Math.random() * 0.3})`
          : `rgba(200, 195, 185, ${0.15 + Math.random() * 0.15})`,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
      });

      // Limit points
      if (points.current.length > 120) {
        points.current = points.current.slice(-120);
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = points.current.length - 1; i >= 0; i--) {
        const p = points.current[i];
        p.age++;
        p.x += p.vx;
        p.y += p.vy;

        if (p.age > p.maxAge) {
          points.current.splice(i, 1);
          continue;
        }

        const life = 1 - p.age / p.maxAge;
        const alpha = life * 0.6;

        ctx.save();
        ctx.globalAlpha = alpha;

        if (isHovering.current) {
          // Colored sketch effect on hover
          ctx.strokeStyle = `rgba(58, 138, 138, ${alpha})`;
          ctx.lineWidth = p.size * life;
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.moveTo(p.x + p.vx * 2, p.y + p.vy * 2);
          ctx.lineTo(p.x - p.vx * 2, p.y - p.vy * 2);
          ctx.stroke();

          // Small dot
          ctx.fillStyle = `rgba(58, 138, 138, ${alpha * 0.5})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * life * 0.5, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Muted sketch effect
          ctx.strokeStyle = `rgba(160, 155, 145, ${alpha * 0.4})`;
          ctx.lineWidth = p.size * life * 0.7;
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.moveTo(p.x + p.vx, p.y + p.vy);
          ctx.lineTo(p.x - p.vx, p.y - p.vy);
          ctx.stroke();
        }

        ctx.restore();
      }

      // Draw a subtle cursor glow
      const gradient = ctx.createRadialGradient(
        mouse.current.x, mouse.current.y, 0,
        mouse.current.x, mouse.current.y, isHovering.current ? 60 : 30
      );

      if (isHovering.current) {
        gradient.addColorStop(0, 'rgba(58, 138, 138, 0.08)');
        gradient.addColorStop(1, 'rgba(58, 138, 138, 0)');
      } else {
        gradient.addColorStop(0, 'rgba(200, 195, 185, 0.04)');
        gradient.addColorStop(1, 'rgba(200, 195, 185, 0)');
      }

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(mouse.current.x, mouse.current.y, isHovering.current ? 60 : 30, 0, Math.PI * 2);
      ctx.fill();

      animFrame.current = requestAnimationFrame(draw);
    };

    // Detect hover on interactive elements
    const handleOver = (e) => {
      if (e.target.closest('a, button, [role="button"], .interactive')) {
        isHovering.current = true;
      }
    };

    const handleOut = () => {
      isHovering.current = false;
    };

    document.addEventListener('mousemove', handleMove, { passive: true });
    document.addEventListener('mouseover', handleOver, { passive: true });
    document.addEventListener('mouseout', handleOut, { passive: true });

    animFrame.current = requestAnimationFrame(draw);

    return () => {
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseover', handleOver);
      document.removeEventListener('mouseout', handleOut);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animFrame.current);
      canvas.remove();
    };
  }, []);
}
