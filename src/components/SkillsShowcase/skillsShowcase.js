import React from 'react';
import './skillsShowcase.css';

const SkillsShowcase = () => {
    const skills = [
        {
            id: 1,
            name: "Java",
            icon: "☕",
            level: "Advanced",
            description: "Core Java, OOP, Collections, Multithreading"
        },
        {
            id: 2,
            name: "Spring Boot",
            icon: "🍃",
            level: "Advanced", 
            description: "REST APIs, Microservices, Spring Security"
        },
        {
            id: 3,
            name: "MySQL",
            icon: "🗄️",
            level: "Advanced",
            description: "Database Design, Query Optimization, Stored Procedures"
        },
        {
            id: 4,
            name: "React",
            icon: "⚛️",
            level: "Advanced",
            description: "Hooks, State Management, Component Architecture"
        },
        {
            id: 5,
            name: "Cybersecurity",
            icon: "🔒",
            level: "Basic",
            description: "Security Fundamentals, OWASP, Secure Coding"
        },
        {
            id: 6,
            name: "AWS",
            icon: "☁️",
            level: "Basic",
            description: "EC2, S3, RDS, Cloud Security Basics"
        }
    ];

    return (
        <div className="skillsShowcase" id="skillsShowcase">
            <div className="skillsContainer">
                <div className="skillsHeader">
                    <h2 className="skillsTitle">Technical Expertise</h2>
                    <p className="skillsSubtitle">Core technologies I work with</p>
                </div>
                
                <div className="skillsGrid">
                    {skills.map((skill) => (
                        <div key={skill.id} className="skillCard">
                            <div className="skillIcon">
                                <span className="iconEmoji">{skill.icon}</span>
                            </div>
                            <div className="skillContent">
                                <h3 className="skillName">{skill.name}</h3>
                                <div className="skillLevel">
                                    <span className={`levelBadge ${skill.level.toLowerCase()}`}>
                                        {skill.level}
                                    </span>
                                </div>
                                <p className="skillDescription">{skill.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

};

export default SkillsShowcase;

