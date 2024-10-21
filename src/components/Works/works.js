import React, { useState } from "react";
import './works.css';
import portfolio1 from '../../assets/Screenshot 2024-10-18 162700.png'; // OOP Certificate
import portfolio2 from '../../assets/Screenshot 2024-10-18 162739.png'; // DSA Certificate
import portfolio3 from '../../assets/java.png'; // Basic in Java
import portfolio4 from '../../assets/restapi.png'; // REST API Intermediate

const Works = () => {
    const [hoverDirection1, setHoverDirection1] = useState(null);
    const [hoverDirection2, setHoverDirection2] = useState(null);
    const [hoverDirection3, setHoverDirection3] = useState(null);
    const [hoverDirection4, setHoverDirection4] = useState(null);

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

    // Function to detect mouse movement for card 3
    const handleMouseMoveCard3 = (e, card) => {
        const cardRect = card.getBoundingClientRect();
        const cardCenter = cardRect.left + cardRect.width / 2;

        if (e.clientX < cardCenter) {
            setHoverDirection3('left');
        } else {
            setHoverDirection3('right');
        }
    };

    // Function to detect mouse movement for card 4
    const handleMouseMoveCard4 = (e, card) => {
        const cardRect = card.getBoundingClientRect();
        const cardCenter = cardRect.left + cardRect.width / 2;

        if (e.clientX < cardCenter) {
            setHoverDirection4('left');
        } else {
            setHoverDirection4('right');
        }
    };

    const handleMouseLeave1 = () => setHoverDirection1(null);
    const handleMouseLeave2 = () => setHoverDirection2(null);
    const handleMouseLeave3 = () => setHoverDirection3(null);
    const handleMouseLeave4 = () => setHoverDirection4(null);

    return (
        <div className="container">
            <section id="works">
                <h2 className="workstittle">Certifications</h2>
                <span className="workDesc">
                    I am certified in Object-Oriented Programming (OOP) in <span className="highlight">Java</span>,
                    Data Structures and Algorithms (DSA) at an intermediate level from <span className="highlight">Great Learning</span> Academy,
                    as well as "Basic in <span className="highlight">Java</span>" and "<span className="highlight">REST API</span> Intermediate" from
                    <span className="highlight"> HackerRank</span>.
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

                    {/* Card 3 */}
                    <div
                        className={`card ${hoverDirection3 === 'left' ? 'tilt-left' : hoverDirection3 === 'right' ? 'tilt-right' : ''}`}
                        onMouseMove={(e) => handleMouseMoveCard3(e, e.currentTarget)}
                        onMouseLeave={handleMouseLeave3}
                    >
                        <img src={portfolio3} alt="Basic in Java" className="worksImg" />
                    </div>

                    {/* Card 4 */}
                    <div
                        className={`card ${hoverDirection4 === 'left' ? 'tilt-left' : hoverDirection4 === 'right' ? 'tilt-right' : ''}`}
                        onMouseMove={(e) => handleMouseMoveCard4(e, e.currentTarget)}
                        onMouseLeave={handleMouseLeave4}
                    >
                        <img src={portfolio4} alt="REST API Intermediate" className="worksImg" />
                    </div>
                </div>
                <button className="workBtn">See More</button>
            </section>
        </div>
    );
};

export default Works;
