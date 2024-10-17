import React, { useEffect, useRef } from "react";

const StarfieldAnimation = () => {
    const canvasRef = useRef(null);
    const stars = [];

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const numberOfStars = 100;

        // Create stars
        for (let i = 0; i < numberOfStars; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 2 + 1,
                speed: Math.random() * 0.5 + 0.2,
            });
        }

        const animate = () => {
            ctx.fillStyle = "rgba(0, 0, 0, 0.1)"; // Fade effect
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            stars.forEach((star, index) => {
                star.y += star.speed; // Move star down
                if (star.y > canvas.height) {
                    star.y = 0; // Reset star position
                    star.x = Math.random() * canvas.width; // New horizontal position
                }

                ctx.fillStyle = "white";
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                ctx.fill();
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

export default StarfieldAnimation;
