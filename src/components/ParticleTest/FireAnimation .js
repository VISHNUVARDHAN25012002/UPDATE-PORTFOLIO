import React, { useEffect, useRef } from "react";

const FireAnimation = () => {
    const canvasRef = useRef(null);
    const particles = [];

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const numberOfParticles = 300;

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = canvas.height; // Start from bottom
                this.size = Math.random() * 5 + 2; // Size of the fire particle
                this.speedY = Math.random() * -3 - 1; // Random upwards speed
                this.color = "rgba(255, 165, 0, 1)"; // Fire color
            }

            update() {
                this.y += this.speedY;
                this.size *= 0.95; // Decrease size to simulate fading
                this.color = this.color.replace(/[\d.]+(?=\))/, (num) => Math.max(num - 0.02, 0)); // Fade out color

                if (this.size < 0.1) {
                    this.reset();
                }
            }

            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = canvas.height;
                this.size = Math.random() * 5 + 2; // Reset size
                this.speedY = Math.random() * -3 - 1; // Reset speed
                this.color = "rgba(255, 165, 0, 1)"; // Reset color
            }
        }

        // Initialize particles
        for (let i = 0; i < numberOfParticles; i++) {
            particles.push(new Particle());
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((particle) => {
                particle.update();
                particle.draw();
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

export default FireAnimation;
