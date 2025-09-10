import React from 'react';
import './experience.css';

const Experience = () => {
    return (
        <div className="experience" id="experience">
            <div className="experienceContainer">
                <div className="experienceHeader">
                    <h2 className="experienceTitle">Professional Experience</h2>
                    <p className="experienceSubtitle">My journey in software development</p>
                </div>
                
                <div className="timeline">
                    <div className="timelineItem">
                        <div className="timelineMarker"></div>
                        <div className="timelineContent">
                            <div className="timelineDate">2024 - Present</div>
                            <h3 className="timelineTitle">FullStack Java Developer</h3>
                            <h4 className="timelineCompany">Vivid Trans Tech Solutions</h4>
                            <div className="timelineDescription">
                                <p>Developing robust web applications using Java Spring Boot and modern frontend technologies. Working on various projects including:</p>
                                <ul>
                                    <li>Government portal development for Greater Chennai Corporation</li>
                                    <li>E-commerce platform development and maintenance</li>
                                    <li>RESTful API design and implementation</li>
                                    <li>Database optimization and performance tuning</li>
                                    <li>Frontend development using React and Thymeleaf</li>
                                </ul>
                            </div>
                            <div className="timelineTech">
                                <span className="techTag">Java</span>
                                <span className="techTag">Spring Boot</span>
                                <span className="techTag">Thymeleaf</span>
                                <span className="techTag">MySQL</span>
                                <span className="techTag">React</span>
                                <span className="techTag">REST APIs</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Experience;
