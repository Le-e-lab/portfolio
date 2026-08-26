import { useEffect, useRef } from 'react';

export default function usePaintBrush() {
  const canvasRef = useRef(null);
  const points = useRef([]);
  const mouse = useRef({ x: 0, y: 0 });
  const smoothMouse = useRef({ x: 0, y: 0 });
  const isHovering = useRef(false);
  const magnetTarget = useRef({ x: 0, y: 0, active: false });
  const animFrame = useRef(null);

  useEffect(() => {
    // Skip on touch devices
    if (window.matchMedia('(hover: none)').matches) return;

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

      // Add trail point
      points.current.push({
        x: e.clientX,
        y: e.clientY,
        age: 0,
        maxAge: 35 + Math.random() * 15,
        size: 1 + Math.random() * 1.5,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        isSpark: false,
      });

      // Add a drift spark occasionally
      if (Math.random() < 0.2) {
        points.current.push({
          x: e.clientX,
          y: e.clientY,
          age: 0,
          maxAge: 25 + Math.random() * 20,
          size: 0.8 + Math.random() * 1.2,
          vx: (Math.random() - 0.5) * 1.2,
          vy: (Math.random() - 0.5) * 1.0 - 0.6, // Drift upwards slightly
          isSpark: true,
        });
      }

      if (points.current.length > 150) {
        points.current = points.current.slice(-150);
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth follow with lerp
      const lerp = 0.12;
      smoothMouse.current.x += (mouse.current.x - smoothMouse.current.x) * lerp;
      smoothMouse.current.y += (mouse.current.y - smoothMouse.current.y) * lerp;

      // Magnetic pull toward interactive element
      let cursorX = smoothMouse.current.x;
      let cursorY = smoothMouse.current.y;
      if (magnetTarget.current.active) {
        const pull = 0.18;
        cursorX += (magnetTarget.current.x - smoothMouse.current.x) * pull;
        cursorY += (magnetTarget.current.y - smoothMouse.current.y) * pull;
      }

      const isLight = document.documentElement.getAttribute('data-theme') === 'light';

      // Update ages and draw sparks first
      for (let i = points.current.length - 1; i >= 0; i--) {
        const p = points.current[i];
        p.age++;
        p.x += p.vx;
        p.y += p.vy;

        if (p.age > p.maxAge) {
          points.current.splice(i, 1);
          continue;
        }

        if (p.isSpark) {
          const life = 1 - p.age / p.maxAge;
          const alpha = life * 0.4;
          ctx.save();
          ctx.globalAlpha = alpha;
          ctx.fillStyle = isHovering.current
            ? `rgba(232, 101, 10, ${alpha * 0.8})`
            : isLight
              ? `rgba(26, 26, 26, ${alpha * 0.5})`
              : `rgba(232, 228, 222, ${alpha * 0.5})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * life, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      // Draw continuous vector trail segments
      const trailPoints = points.current.filter(p => !p.isSpark);
      for (let i = 1; i < trailPoints.length; i++) {
        const p1 = trailPoints[i - 1];
        const p2 = trailPoints[i];

        const life = 1 - p2.age / p2.maxAge;
        if (life <= 0) continue;

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);

        const alpha = life * (isHovering.current ? 0.45 : 0.25);
        ctx.strokeStyle = isHovering.current
          ? `rgba(232, 101, 10, ${alpha})`
          : isLight
            ? `rgba(26, 26, 26, ${alpha * 0.4})`
            : `rgba(232, 228, 222, ${alpha * 0.4})`;

        ctx.lineWidth = (isHovering.current ? 1.5 : 0.8) * life;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();
      }

      // Cursor glow (subtle, high-end organic glow)
      const glowSize = isHovering.current ? 45 : 22;
      const gradient = ctx.createRadialGradient(
        cursorX, cursorY, 0,
        cursorX, cursorY, glowSize
      );

      if (isHovering.current) {
        gradient.addColorStop(0, 'rgba(232, 101, 10, 0.08)');
        gradient.addColorStop(1, 'rgba(232, 101, 10, 0)');
      } else {
        if (isLight) {
          gradient.addColorStop(0, 'rgba(26, 26, 26, 0.03)');
          gradient.addColorStop(1, 'rgba(26, 26, 26, 0)');
        } else {
          gradient.addColorStop(0, 'rgba(232, 228, 222, 0.03)');
          gradient.addColorStop(1, 'rgba(232, 228, 222, 0)');
        }
      }

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(cursorX, cursorY, glowSize, 0, Math.PI * 2);
      ctx.fill();

      // Dot cursor
      ctx.fillStyle = isHovering.current
        ? 'rgba(232, 101, 10, 0.8)'
        : isLight
          ? 'rgba(26, 26, 26, 0.7)'
          : 'rgba(232, 228, 222, 0.7)';
      ctx.beginPath();
      ctx.arc(cursorX, cursorY, isHovering.current ? 3.5 : 2, 0, Math.PI * 2);
      ctx.fill();

      animFrame.current = requestAnimationFrame(draw);
    };

    const handleOver = (e) => {
      const interactive = e.target.closest('a, button, [role="button"], .interactive');
      if (interactive) {
        isHovering.current = true;
        const rect = interactive.getBoundingClientRect();
        magnetTarget.current = {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
          active: true,
        };
      }
    };

    const handleOut = (e) => {
      const interactive = e.target.closest('a, button, [role="button"], .interactive');
      if (interactive) {
        isHovering.current = false;
        magnetTarget.current.active = false;
      }
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

