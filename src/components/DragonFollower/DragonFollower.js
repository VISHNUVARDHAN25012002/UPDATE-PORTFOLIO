import React, { useEffect, useState } from "react";
import "./DragonFollower.css";

const DragonFollower = () => {
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const [home, setHome] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const intro = document.getElementById("intro");
        if (intro) {
            const rect = intro.getBoundingClientRect();
            const start = {
                x: rect.left + rect.width / 2,
                y: rect.top + rect.height / 2,
            };
            setHome(start);
            setPos(start);
        }

        const handleMove = (e) => setPos({ x: e.clientX, y: e.clientY });
        window.addEventListener("mousemove", handleMove);
        return () => window.removeEventListener("mousemove", handleMove);
    }, []);

    useEffect(() => {
        let timeoutId;
        const returnHome = () => {
            timeoutId = setTimeout(() => setPos(home), 1000);
        };
        const cancelReturn = () => clearTimeout(timeoutId);
        window.addEventListener("mouseleave", returnHome);
        window.addEventListener("mousemove", cancelReturn);
        return () => {
            window.removeEventListener("mouseleave", returnHome);
            window.removeEventListener("mousemove", cancelReturn);
        };
    }, [home]);

    return (
        <div
            className="dragon-follower"
            style={{ left: `${pos.x}px`, top: `${pos.y}px` }}
        >
            🐉
        </div>
    );
};

export default DragonFollower;
