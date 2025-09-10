import React, { useState } from "react";
import './works.css';
import portfolio1 from '../../assets/Screenshot 2024-10-18 162700.png'; // OOP Certificate
import portfolio2 from '../../assets/Screenshot 2024-10-18 162739.png'; // DSA Certificate
import portfolio3 from '../../assets/java.png'; // Basic in Java
import portfolio4 from '../../assets/restapi.png'; // REST API Intermediate
import portfolio5 from '../../assets/image.png'; // Edureka Certificate

const Works = () => {
    const [hoverDirection1, setHoverDirection1] = useState(null);
    const [hoverDirection2, setHoverDirection2] = useState(null);
    const [hoverDirection3, setHoverDirection3] = useState(null);
    const [hoverDirection4, setHoverDirection4] = useState(null);
    const [hoverDirection5, setHoverDirection5] = useState(null);

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

    // Function to detect mouse movement for card 5
    const handleMouseMoveCard5 = (e, card) => {
        const cardRect = card.getBoundingClientRect();
        const cardCenter = cardRect.left + cardRect.width / 2;

        if (e.clientX < cardCenter) {
            setHoverDirection5('left');
        } else {
            setHoverDirection5('right');
        }
    };

    const handleMouseLeave1 = () => setHoverDirection1(null);
    const handleMouseLeave2 = () => setHoverDirection2(null);
    const handleMouseLeave3 = () => setHoverDirection3(null);
    const handleMouseLeave4 = () => setHoverDirection4(null);
    const handleMouseLeave5 = () => setHoverDirection5(null);

    return (
        <div className="container">
            <section id="works">
                <h2 className="workstittle">Professional Certifications & Achievements</h2>
                <div className="workDesc">
                    <p>I am certified in Object-Oriented Programming (OOP) in <span className="highlight">Java</span>,
                    Data Structures and Algorithms (DSA) at an intermediate level from <span className="highlight">Great Learning</span> Academy,
                    as well as "Basic in <span className="highlight">Java</span>" and "<span className="highlight">REST API</span> Intermediate" from
                    <span className="highlight"> HackerRank</span>, and additional certifications from <span className="highlight">Edureka</span>. 
                    These certifications validate my expertise in Java development, data structures, and API design.</p>
                </div>
                <div className="marquee-container">
                    <div className="marquee">
                        {/* First set of certificates */}
                        <div className="marquee-item">
                            <img src={portfolio1} alt="OOP Certificate" className="worksImg" />
                        </div>
                        <div className="marquee-item">
                            <img src={portfolio2} alt="DSA Certificate" className="worksImg" />
                        </div>
                        <div className="marquee-item">
                            <img src={portfolio3} alt="Basic in Java" className="worksImg" />
                        </div>
                        <div className="marquee-item">
                            <img src={portfolio4} alt="REST API Intermediate" className="worksImg" />
                        </div>
                        <div className="marquee-item">
                            <img src={portfolio5} alt="Edureka Certificate" className="worksImg" />
                        </div>
                        
                        {/* Duplicate set for seamless loop */}
                        <div className="marquee-item">
                            <img src={portfolio1} alt="OOP Certificate" className="worksImg" />
                        </div>
                        <div className="marquee-item">
                            <img src={portfolio2} alt="DSA Certificate" className="worksImg" />
                        </div>
                        <div className="marquee-item">
                            <img src={portfolio3} alt="Basic in Java" className="worksImg" />
                        </div>
                        <div className="marquee-item">
                            <img src={portfolio4} alt="REST API Intermediate" className="worksImg" />
                        </div>
                        <div className="marquee-item">
                            <img src={portfolio5} alt="Edureka Certificate" className="worksImg" />
                        </div>
                    </div>
                </div>
                {/* <button className="workBtn">See More</button> */}
            </section>
        </div>
    );

};

export default Works;

