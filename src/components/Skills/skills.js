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
                <span className="skillTitle fade-in">What I do</span>
                <span className="skillDesc fade-in">
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

                </span>

                <div className="skillBars">
                    <div className="skillBar fade-in">
                        <img src={UIDesign} className="skillBarImg" alt="UI Design"/>
                        <div className="skillBarText">
                            <h2>Website Design</h2>
                            <p>Designing websites using HTML, CSS, React, and JavaScript.</p>
                        </div>
                    </div>

                    <div className="skillBar fade-in">
                        <img src={SDesign} className="skillBarImg" alt="Backend Development"/>
                        <div className="skillBarText">
                            <h2>Back-end Development</h2>
                            <p>Java and Spring Boot for back-end development.</p>
                        </div>
                    </div>

                    <div className="skillBar fade-in">
                        <img src={SQL} className="skillBarImg" alt="MySQL"/>
                        <div className="skillBarText">
                            <h2>MySQL</h2>
                            <p>I perform with MySQL to handle database interactions and optimize queries.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Skills;
