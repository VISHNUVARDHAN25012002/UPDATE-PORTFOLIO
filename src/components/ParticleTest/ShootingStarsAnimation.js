import React, { useEffect, useRef } from "react";

const ShootingStarsAnimation = () => {
    const canvasRef = useRef(null);
    const stars = [];

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const numberOfStars = 50;

        class Star {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.length = Math.random() * 80 + 20; // Length of the shooting star
                this.opacity = Math.random() * 0.5 + 0.5; // Random opacity
                this.speed = Math.random() * 2 + 1; // Speed of the shooting star
            }

            update() {
                this.x += this.speed; // Move star to the right
                if (this.x > canvas.width) {
                    this.x = -this.length; // Reset to the left
                    this.y = Math.random() * canvas.height; // Random vertical position
                }
            }

            draw() {
                ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity})`;
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(this.x - this.length, this.y);
                ctx.stroke();
            }
        }

        // Initialize stars
        for (let i = 0; i < numberOfStars; i++) {
            stars.push(new Star());
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            stars.forEach((star) => {
                star.update();
                star.draw();
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

export default ShootingStarsAnimation;
