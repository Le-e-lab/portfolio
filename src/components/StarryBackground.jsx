import React, { useEffect, useRef } from 'react';
import './StarryBackground.css';

const StarryBackground = () => {
    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const starsRef = useRef([]);
    const shootingStarsRef = useRef([]);
    const nebulasRef = useRef([]);
    const mouseRef = useRef({ x: 0, y: 0 });
    const animationFrameRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        contextRef.current = ctx;

        // Configuration
        const config = {
            starCount: 300,
            shootingStarFrequency: 0.005, // Lower meant less frequent
            connectionDistance: 100,
            mouseRadius: 150,
        };

        // Resize handler
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initStars();
            initNebulas();
        };

        // Initialize Nebulas (Cloudy patches)
        const initNebulas = () => {
            nebulasRef.current = [];
            const nebulaCount = 5;
            const colors = [
                'rgba(102, 126, 234, 0.05)', // Blue-ish
                'rgba(118, 75, 162, 0.05)',  // Purple-ish
                'rgba(67, 233, 123, 0.03)',  // Green-ish
            ];

            for (let i = 0; i < nebulaCount; i++) {
                nebulasRef.current.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: Math.random() * 300 + 200,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    vx: (Math.random() - 0.5) * 0.2, // Very slow drift
                    vy: (Math.random() - 0.5) * 0.2
                });
            }
        };

        // Initialize Stars
        const initStars = () => {
            starsRef.current = [];
            for (let i = 0; i < config.starCount; i++) {
                const depth = Math.random(); // 0 to 1, 1 is closer
                starsRef.current.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    baseX: Math.random() * canvas.width, // For parallax reset
                    baseY: Math.random() * canvas.height,
                    radius: Math.random() * 1.5 * depth + 0.5,
                    opacity: Math.random(),
                    twinkleSpeed: Math.random() * 0.02 + 0.005,
                    twinkleDirection: Math.random() > 0.5 ? 1 : -1,
                    depth: depth, // Used for parallax speed
                    color: `rgba(${200 + Math.random() * 55}, ${200 + Math.random() * 55}, 255,`
                });
            }
        };

        const createShootingStar = () => {
            // Start from random edge
            const startX = Math.random() * canvas.width;
            const startY = Math.random() * canvas.height * 0.5; // Top half mostly

            shootingStarsRef.current.push({
                x: startX,
                y: startY,
                length: Math.random() * 100 + 50,
                speed: Math.random() * 10 + 5,
                angle: Math.PI / 4 + (Math.random() * 0.2 - 0.1), // ~45 deg
                opacity: 1,
                color: '#fff'
            });
        };

        // Mouse move handler for parallax
        const handleMouseMove = (e) => {
            mouseRef.current = {
                x: e.clientX,
                y: e.clientY
            };
        };

        // Animation Loop
        const animate = () => {
            // Clear but leave a tiny trail for 'motion blur' feel? No, standard clear for crispness.
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw Background Nebulas
            nebulasRef.current.forEach(nebula => {
                nebula.x += nebula.vx;
                nebula.y += nebula.vy;

                // Wrap around screen
                if (nebula.x < -nebula.radius) nebula.x = canvas.width + nebula.radius;
                if (nebula.x > canvas.width + nebula.radius) nebula.x = -nebula.radius;
                if (nebula.y < -nebula.radius) nebula.y = canvas.height + nebula.radius;
                if (nebula.y > canvas.height + nebula.radius) nebula.y = -nebula.radius;

                const gradient = ctx.createRadialGradient(nebula.x, nebula.y, 0, nebula.x, nebula.y, nebula.radius);
                gradient.addColorStop(0, nebula.color);
                gradient.addColorStop(1, 'rgba(0,0,0,0)');

                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(nebula.x, nebula.y, nebula.radius, 0, Math.PI * 2);
                ctx.fill();
            });

            // Calculate parallax offset based on mouse from center
            const parallaxX = (mouseRef.current.x - canvas.width / 2) * 0.05;
            const parallaxY = (mouseRef.current.y - canvas.height / 2) * 0.05;

            // Draw Stars
            starsRef.current.forEach(star => {
                // Twinkle
                star.opacity += star.twinkleSpeed * star.twinkleDirection;
                if (star.opacity >= 1 || star.opacity <= 0.2) {
                    star.twinkleDirection *= -1;
                }

                // Parallax Movement
                // Closer stars (higher depth) move more opposite to mouse
                const moveX = -parallaxX * star.depth;
                const moveY = -parallaxY * star.depth;

                const drawX = star.x + moveX;
                const drawY = star.y + moveY;

                // Interaction: Mouse repulsion/attraction
                const dx = mouseRef.current.x - drawX;
                const dy = mouseRef.current.y - drawY;
                const dist = Math.sqrt(dx * dx + dy * dy);

                let finalX = drawX;
                let finalY = drawY;

                if (dist < config.mouseRadius) {
                    const force = (config.mouseRadius - dist) / config.mouseRadius;
                    const angle = Math.atan2(dy, dx);
                    // Push away slightly
                    finalX -= Math.cos(angle) * force * 20;
                    finalY -= Math.sin(angle) * force * 20;
                }

                ctx.beginPath();
                ctx.arc(finalX, finalY, star.radius, 0, Math.PI * 2);
                ctx.fillStyle = `${star.color} ${star.opacity})`;
                ctx.fill();

                // Connect nearby stars with very faint lines if close to mouse
                if (dist < 150) {
                    // Check neighbors - computationally expensive so limit?
                    // Let's just draw line to mouse if very close
                    if (dist < 100) {
                        ctx.beginPath();
                        ctx.moveTo(finalX, finalY);
                        ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
                        ctx.strokeStyle = `rgba(147, 197, 253, ${0.1 * (1 - dist / 100)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            });

            // Draw Shooting Stars
            shootingStarsRef.current.forEach((star, index) => {
                star.x += Math.cos(star.angle) * star.speed;
                star.y += Math.sin(star.angle) * star.speed;
                star.opacity -= 0.015;

                if (star.opacity <= 0) {
                    shootingStarsRef.current.splice(index, 1);
                } else {
                    const gradient = ctx.createLinearGradient(
                        star.x, star.y,
                        star.x - Math.cos(star.angle) * star.length,
                        star.y - Math.sin(star.angle) * star.length
                    );
                    gradient.addColorStop(0, `rgba(255, 255, 255, ${star.opacity})`);
                    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

                    ctx.beginPath();
                    ctx.strokeStyle = gradient;
                    ctx.lineWidth = 2;
                    ctx.lineCap = 'round';
                    ctx.moveTo(star.x, star.y);
                    ctx.lineTo(
                        star.x - Math.cos(star.angle) * star.length,
                        star.y - Math.sin(star.angle) * star.length
                    );
                    ctx.stroke();
                }
            });

            // Randomly spawn shooting star
            if (Math.random() < config.shootingStarFrequency) {
                createShootingStar();
            }

            animationFrameRef.current = requestAnimationFrame(animate);
        };

        // Listeners
        window.addEventListener('resize', resizeCanvas);
        window.addEventListener('mousemove', handleMouseMove);

        resizeCanvas(); // Init
        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameRef.current);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="starry-background"
        />
    );
};

export default StarryBackground;
