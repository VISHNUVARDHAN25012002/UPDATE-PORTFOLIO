import React, { useEffect, useRef } from "react";

const BubblesAnimation = () => {
    const canvasRef = useRef(null);
    const bubbles = [];

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const numberOfBubbles = 50;

        class Bubble {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = canvas.height + Math.random() * 50; // Start below the canvas
                this.size = Math.random() * 30 + 10; // Bubble size
                this.speed = Math.random() * 2 + 1; // Speed of rising
            }

            update() {
                this.y -= this.speed; // Move bubble upwards
                if (this.y < -this.size) {
                    this.y = canvas.height + this.size; // Reset bubble to bottom
                }
            }

            draw() {
                ctx.fillStyle = "rgba(173, 216, 230, 0.8)"; // Light blue color
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // Initialize bubbles
        for (let i = 0; i < numberOfBubbles; i++) {
            bubbles.push(new Bubble());
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            bubbles.forEach((bubble) => {
                bubble.update();
                bubble.draw();
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

export default BubblesAnimation;
