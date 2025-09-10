import React, { useEffect } from "react";
import './skills.css';
import UIDesign from '../../assets/ui-design.png';
import SDesign from '../../assets/SDevop.png';
import SQL from '../../assets/sql.png';

const Skills = () => {
    useEffect(() => {
        const fadeInElements = document.querySelectorAll('.fade-in');

        const fadeInOnScroll = () => {
            fadeInElements.forEach((element, index) => {
                const rect = element.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom >= 0) {
                    setTimeout(() => {
                        element.classList.add('fade-in-visible');
                    }, index * 150); // Add delay between each element (150ms)
                }
            });
        };

        window.addEventListener('scroll', fadeInOnScroll);
        fadeInOnScroll();

        return () => {
            window.removeEventListener('scroll', fadeInOnScroll);
        };
    }, []);

    return (
        <div className="container">
            <section id="skills">
                <h2 className="skillTitle fade-in">What I Do - FullStack Java Development Services</h2>
                <div className="skillDesc fade-in">
                    <ul>
                        <li>
                            I am passionate about creating <span className="highlight">dynamic</span> and <span
                            className="highlight">scalable applications</span>.
                        </li>
                        <li>
                            As a <strong>Fullstack Java Developer</strong>, I focus on building <span
                            className="highlight">responsive web solutions</span> using <span
                            className="highlight">Java</span>, <span className="highlight">Spring Boot</span>, and modern frontend technologies.
                        </li>
                        <li>
                            My expertise lies in developing robust backend services and creating intuitive <span
                            className="highlight">RESTful APIs</span>.
                        </li>
                        <li>
                            I specialize in integrating seamless data interactions with relational databases like <span
                            className="highlight">MySQL</span> and <span className="highlight">Hibernate</span>.
                        </li>
                        <li>
                            I <span className="highlight">optimize application performance</span> and ensuring every line of code contributes to a
                            high-quality, efficient product.
                        </li>
                    </ul>
                         <div className="special-text">
                        Let’s build something <span className="highlight1">innovative together</span>!
                    </div>

                </div>

                <div className="skillBars">
                    <div className="skillBar fade-in">
                        <img src={UIDesign} className="skillBarImg" alt="Frontend Web Development with React and JavaScript"/>
                        <div className="skillBarText">
                            <h3>Frontend Web Development</h3>
                            <p>Creating responsive and interactive websites using HTML5, CSS3, React, and JavaScript. Building modern user interfaces with excellent user experience.</p>
                        </div>
                    </div>

                    <div className="skillBar fade-in">
                        <img src={SDesign} className="skillBarImg" alt="Backend Development with Java Spring Boot"/>
                        <div className="skillBarText">
                            <h3>Backend Development with Java Spring Boot</h3>
                            <p>Developing robust and scalable backend services using Java and Spring Boot framework. Creating RESTful APIs and microservices architecture.</p>
                        </div>
                    </div>

                    <div className="skillBar fade-in">
                        <img src={SQL} className="skillBarImg" alt="Database Management with MySQL"/>
                        <div className="skillBarText">
                            <h3>Database Management with MySQL</h3>
                            <p>Designing and optimizing MySQL databases, writing efficient queries, and managing data relationships. Ensuring data integrity and performance optimization.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );

};

export default Skills;

