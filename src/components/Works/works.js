import React, { useState } from "react";
import './works.css';
import portfolio1 from '../../assets/Screenshot 2024-10-18 162700.png';
import portfolio2 from '../../assets/Screenshot 2024-10-18 162739.png';

const Works = () => {
    const [hoverDirection1, setHoverDirection1] = useState(null);
    const [hoverDirection2, setHoverDirection2] = useState(null);

    // Function to detect mouse movement for card 1
    const handleMouseMoveCard1 = (e, card) => {
        const cardRect = card.getBoundingClientRect();
        const cardCenter = cardRect.left + cardRect.width / 2;

        if (e.clientX < cardCenter) {
            setHoverDirection1('left');
        } else {
            setHoverDirection1('right');
        }
    };

    // Function to detect mouse movement for card 2
    const handleMouseMoveCard2 = (e, card) => {
        const cardRect = card.getBoundingClientRect();
        const cardCenter = cardRect.left + cardRect.width / 2;

        if (e.clientX < cardCenter) {
            setHoverDirection2('left');
        } else {
            setHoverDirection2('right');
        }
    };

    const handleMouseLeave1 = () => setHoverDirection1(null);
    const handleMouseLeave2 = () => setHoverDirection2(null);

    return (
        <div className="container">
            <section id="works">
                <h2 className="workstittle">Certifications</h2>
                <span className="workDesc">
          I am certified in Object-Oriented Programming (OOP) in Java and Data Structures and Algorithms (DSA) at an intermediate level from Great Learning Academy
        </span>
                <div className="worksImgs">
                    {/* Card 1 */}
                    <div
                        className={`card ${hoverDirection1 === 'left' ? 'tilt-left' : hoverDirection1 === 'right' ? 'tilt-right' : ''}`}
                        onMouseMove={(e) => handleMouseMoveCard1(e, e.currentTarget)}
                        onMouseLeave={handleMouseLeave1}
                    >
                        <img src={portfolio1} alt="OOP Certificate" className="worksImg" />
                    </div>

                    {/* Card 2 */}
                    <div
                        className={`card ${hoverDirection2 === 'left' ? 'tilt-left' : hoverDirection2 === 'right' ? 'tilt-right' : ''}`}
                        onMouseMove={(e) => handleMouseMoveCard2(e, e.currentTarget)}
                        onMouseLeave={handleMouseLeave2}
                    >
                        <img src={portfolio2} alt="DSA Certificate" className="worksImg" />
                    </div>
                </div>
                <button className="workBtn">See More</button>
            </section>
        </div>
    );
};

export default Works;
