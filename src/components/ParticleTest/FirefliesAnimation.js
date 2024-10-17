import React, { useEffect, useRef } from "react";

const FirefliesAnimation = () => {
    const canvasRef = useRef(null);
    const fireflies = [];

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const numberOfFireflies = 30;

        class Firefly {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 5 + 2;
                this.alpha = Math.random();
                this.direction = Math.random() > 0.5 ? 1 : -1; // Random direction for flickering
            }

            update() {
                this.alpha += this.direction * 0.02;
                if (this.alpha <= 0 || this.alpha >= 1) {
                    this.direction *= -1; // Change flickering direction
                }
            }

            draw() {
                ctx.fillStyle = `rgba(255, 255, 0, ${this.alpha}`; // Yellow with flicker effect
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // Initialize fireflies
        for (let i = 0; i < numberOfFireflies; i++) {
            fireflies.push(new Firefly());
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            fireflies.forEach((firefly) => {
                firefly.update();
                firefly.draw();
            });
            requestAnimationFrame(animate);
        };

        // Handle window resize
        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        animate();

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return <canvas ref={canvasRef} style={{ position: "fixed", top: 0, left: 0, zIndex: -1 }} />;
};

export default FirefliesAnimation;
