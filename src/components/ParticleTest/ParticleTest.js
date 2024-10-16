import React from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import "./ParticleTest.css"; // Make sure this path is correct

const ParticleTest = () => {
    const particlesInit = async (main) => {
        await loadFull(main);
    };

    const particlesOptions = {
        background: {
            color: {
                value: "#0d0d0d", // Dark background for better visibility
            },
        },
        fpsLimit: 60,
        particles: {
            color: {
                value: "#ffffff", // Particle color
            },
            number: {
                value: 100,
                density: {
                    enable: true,
                    value_area: 800,
                },
            },
            size: {
                value: 6, // Increased base size
                random: true, // Randomize particle sizes for a dynamic look
                anim: {
                    enable: true, // Enable size animation
                    speed: 5,
                    size_min: 0.1,
                    sync: false,
                },
            },
            move: {
                enable: true,
                speed: 3,
                direction: "none",
                random: false,
                straight: false,
                out_mode: "out",
                bounce: false,
                attract: {
                    enable: false,
                },
            },
            links: {
                enable: true,
                distance: 150,
                color: "#ffffff",
                opacity: 0.4,
                width: 1,
            },
            opacity: {
                value: 0.5,
                random: true,
                anim: {
                    enable: true, // Enable opacity animation for a dynamic look
                    speed: 2,
                    opacity_min: 0.1,
                    sync: false,
                },
            },
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onHover: {
                    enable: true,
                    mode: ["repulse", "bubble"], // Enable bubble and repulse effects
                },
                onClick: {
                    enable: true,
                    mode: "push", // Add more particles on click
                },
                resize: true,
            },
            modes: {
                bubble: {
                    distance: 400,
                    size: 40,
                    duration: 2,
                    opacity: 8,
                    speed: 3,
                },
                repulse: {
                    distance: 100, // Increased distance for the repel effect
                    duration: 0.4,
                },
                push: {
                    particles_nb: 4,
                },
                remove: {
                    particles_nb: 2,
                },
            },
        },
        detectRetina: true,
    };

    return (
        <Particles
            id="tsparticles"
            init={particlesInit}
            options={particlesOptions}
        />
    );
};

export default ParticleTest;
