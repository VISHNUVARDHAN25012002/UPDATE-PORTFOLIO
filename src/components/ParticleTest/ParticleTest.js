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
                value: "transparent",
            },
        },
        fpsLimit: 30, // Reduced from 60 for better performance
        particles: {
            color: {
                value: "#ffffff", // Single color for better performance
            },
            number: {
                value: 25, // Reduced from 50 for better performance
                density: {
                    enable: true,
                    value_area: 1000,
                },
            },
            shape: {
                type: "circle",
            },
            size: {
                value: 2, // Fixed size for better performance
                random: false, // Disabled random for better performance
                anim: {
                    enable: false, // Disabled animation for better performance
                },
            },
            move: {
                enable: true,
                speed: 0.5, // Slower speed for better performance
                direction: "none",
                random: false, // Disabled random movement for better performance
                straight: false,
                out_mode: "out",
                bounce: false, // Disabled bounce for better performance
                attract: {
                    enable: false, // Disabled attraction for better performance
                },
            },
            links: {
                enable: true,
                distance: 150,
                color: "#ffffff",
                opacity: 0.3,
                width: 0.5,
            },
            opacity: {
                value: 0.4, // Fixed opacity for better performance
                random: false, // Disabled random opacity for better performance
                anim: {
                    enable: false, // Disabled opacity animation for better performance
                },
            },
            shadow: {
                enable: false, // Disabled shadow for better performance
            },
        },
        interactivity: {
            detectsOn: "window",
            events: {
                onHover: {
                    enable: false, // Disabled hover effects for better performance
                },
                onClick: {
                    enable: false, // Disabled click effects for better performance
                },
                resize: true,
            },
        },
        detectRetina: false, // Disabled retina detection for better performance
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
