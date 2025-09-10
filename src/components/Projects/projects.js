import React, { useState, useEffect } from "react";
import './projects.css';

const Projects = () => {
    const [activeProject, setActiveProject] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const projects = [
        {
            id: 0,
            name: "Muthalvar Padaippagam",
            description: "Co-working space and learning center booking portal for Greater Chennai Corporation. Built with Java Spring Boot and Thymeleaf, featuring desk space, meeting rooms, and learning center bookings with flexible pricing plans.",
            url: "https://gccservices.chennaicorporation.gov.in/muthalvarpadaippagam",
            technologies: ["Java", "Spring Boot", "Thymeleaf", "MySQL", "REST APIs", "Spring Security"],
            features: [
                "Real-time booking system with Thymeleaf templates",
                "Multiple pricing tiers and slot management",
                "Spring Security authentication & authorization",
                "Payment integration with secure transactions",
                "Admin dashboard with Spring Boot backend"
            ]
        },
        {
            id: 1,
            name: "Community Hall Booking",
            description: "Comprehensive community hall booking system for Greater Chennai Corporation. Built using Java Spring Boot and Thymeleaf, managing 49+ community centers across Chennai with dynamic pricing and availability tracking.",
            url: "https://gccservices.chennaicorporation.gov.in/communityhall",
            technologies: ["Java", "Spring Boot", "Thymeleaf", "MySQL", "Spring Data JPA", "Spring MVC"],
            features: [
                "Multi-location booking with Thymeleaf frontend",
                "Dynamic pricing calculation using Spring Boot",
                "Calendar integration and availability tracking",
                "User management system with Spring Security",
                "Payment gateway integration"
            ]
        },
        {
            id: 2,
            name: "Birds Forever",
            description: "A dedicated platform for bird enthusiasts and conservationists. Features bird identification, habitat tracking, and community engagement tools for wildlife preservation.",
            url: "https://birdsforever.in/",
            technologies: ["React", "Node.js", "MongoDB", "JavaScript", "CSS3"],
            features: [
                "Bird species database",
                "Photo identification",
                "Community forums",
                "Conservation tracking",
                "Mobile responsive design"
            ]
        },
        {
            id: 3,
            name: "Smart Buy and Sell",
            description: "E-commerce platform built with Java Spring Boot and Thymeleaf for buying and selling products. Features advanced search, user profiles, and secure transactions with a robust backend architecture.",
            url: "https://smartbuyandsell.com/user",
            technologies: ["Java", "Spring Boot", "Thymeleaf", "MySQL", "Spring Security", "Spring Data JPA"],
            features: [
                "Product catalog management with Thymeleaf templates",
                "Spring Security authentication & authorization",
                "Smart search & filters using Spring Boot",
                "Payment processing with secure transactions",
                "Review & rating system with Spring MVC"
            ]
        }
    ];

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, [activeProject]);

    const handleProjectChange = (projectId) => {
        setIsLoading(true);
        setActiveProject(projectId);
    };

    return (
        <div className="container">
            <section id="projects">
                <h2 className="projectsTitle">Featured Projects</h2>
                <div className="projectsDesc">
                    <p>Explore some of my recent projects that showcase my expertise in full-stack development, 
                    from government portals to e-commerce platforms and specialized applications.</p>
                </div>

                <div className="projectsContainer">
                    {/* Project Navigation */}
                    <div className="projectNav">
                        {projects.map((project, index) => (
                            <button
                                key={project.id}
                                className={`projectNavItem ${activeProject === index ? 'active' : ''}`}
                                onClick={() => handleProjectChange(index)}
                            >
                                <span className="projectNavName">{project.name}</span>
                                <span className="projectNavTech">{project.technologies.slice(0, 2).join(', ')}</span>
                            </button>
                        ))}
                    </div>

                    {/* Project Showcase */}
                    <div className="projectShowcase">
                        <div className="projectInfo">
                            <h3 className="projectName">{projects[activeProject].name}</h3>
                            <p className="projectDescription">{projects[activeProject].description}</p>
                            
                            <div className="projectTechnologies">
                                <h4>Technologies Used:</h4>
                                <div className="techTags">
                                    {projects[activeProject].technologies.map((tech, index) => (
                                        <span key={index} className="techTag">{tech}</span>
                                    ))}
                                </div>
                            </div>

                            <div className="projectFeatures">
                                <h4>Key Features:</h4>
                                <ul>
                                    {projects[activeProject].features.map((feature, index) => (
                                        <li key={index}>{feature}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="projectActions">
                                <a 
                                    href={projects[activeProject].url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="projectLink"
                                >
                                    Visit Live Site
                                </a>
                            </div>
                        </div>

                        <div className="projectPreview">
                            <div className="iframeContainer">
                                {isLoading && (
                                    <div className="loadingSpinner">
                                        <div className="spinner"></div>
                                        <p>Loading project preview...</p>
                                    </div>
                                )}
                                <iframe
                                    src={projects[activeProject].url}
                                    title={projects[activeProject].name}
                                    className={`projectIframe ${isLoading ? 'loading' : 'loaded'}`}
                                    onLoad={() => setIsLoading(false)}
                                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="projectsFooter">
                    <p>These projects demonstrate my ability to work with diverse technologies and create 
                    solutions for various industries, from government services to e-commerce and specialized applications.</p>
                </div>
            </section>
        </div>
    );

};

export default Projects;

