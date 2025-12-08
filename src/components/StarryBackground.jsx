import React, { useEffect, useRef } from 'react';
import './StarryBackground.css';

const StarryBackground = () => {
    const canvasRef = useRef(null);
    const starsRef = useRef([]);
    const shootingStarsRef = useRef([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initStars();
        };

        // Initialize stars
        const initStars = () => {
            starsRef.current = [];
            const starCount = 200;

            for (let i = 0; i < starCount; i++) {
                starsRef.current.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: Math.random() * 1.5,
                    opacity: Math.random(),
                    twinkleSpeed: Math.random() * 0.02,
                    twinkleDirection: Math.random() > 0.5 ? 1 : -1
                });
            }
        };

        // Create shooting star
        const createShootingStar = (x, y) => {
            shootingStarsRef.current.push({
                x: x,
                y: y,
                length: Math.random() * 80 + 40,
                speed: Math.random() * 8 + 6,
                angle: Math.PI / 4, // 45 degrees
                opacity: 1,
                tail: []
            });
        };

        // Animation loop
        const animate = () => {
            ctx.fillStyle = 'rgba(5, 5, 16, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw and update stars
            starsRef.current.forEach(star => {
                star.opacity += star.twinkleSpeed * star.twinkleDirection;

                if (star.opacity >= 1 || star.opacity <= 0.3) {
                    star.twinkleDirection *= -1;
                }

                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
                ctx.fill();
            });

            // Draw and update shooting stars
            shootingStarsRef.current = shootingStarsRef.current.filter(star => {
                star.x += Math.cos(star.angle) * star.speed;
                star.y += Math.sin(star.angle) * star.speed;
                star.opacity -= 0.01;

                if (star.opacity > 0) {
                    // Draw shooting star trail
                    const gradient = ctx.createLinearGradient(
                        star.x,
                        star.y,
                        star.x - Math.cos(star.angle) * star.length,
                        star.y - Math.sin(star.angle) * star.length
                    );

                    gradient.addColorStop(0, `rgba(255, 255, 255, ${star.opacity})`);
                    gradient.addColorStop(0.5, `rgba(147, 197, 253, ${star.opacity * 0.5})`);
                    gradient.addColorStop(1, 'rgba(147, 197, 253, 0)');

                    ctx.beginPath();
                    ctx.strokeStyle = gradient;
                    ctx.lineWidth = 2;
                    ctx.moveTo(star.x, star.y);
                    ctx.lineTo(
                        star.x - Math.cos(star.angle) * star.length,
                        star.y - Math.sin(star.angle) * star.length
                    );
                    ctx.stroke();

                    return true;
                }
                return false;
            });

            requestAnimationFrame(animate);
        };

        // Handle click to create shooting star
        const handleClick = (e) => {
            createShootingStar(e.clientX, e.clientY);
        };

        // Random shooting stars
        const randomShootingStar = () => {
            if (Math.random() < 0.3) {
                createShootingStar(
                    Math.random() * canvas.width,
                    Math.random() * canvas.height / 2
                );
            }
            setTimeout(randomShootingStar, Math.random() * 5000 + 3000);
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        canvas.addEventListener('click', handleClick);
        animate();
        randomShootingStar();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            canvas.removeEventListener('click', handleClick);
        };
    }, []);

    return <canvas ref={canvasRef} className="starry-background" />;
};

export default StarryBackground;
