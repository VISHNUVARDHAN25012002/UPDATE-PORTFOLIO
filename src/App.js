import React from 'react';
import Navbar from "./components/NavBar/navbar";
import Intro from "./components/Intro/intro";
import Skills from "./components/Skills/skills";
import SkillsShowcase from "./components/SkillsShowcase/skillsShowcase";
import Experience from "./components/Experience/experience";
import Projects from "./components/Projects/projects";
import Works from "./components/Works/works";
import Contact from "./components/contact/contact";
import Footer from "./components/Footer/footer";
import ParticleTest from "./components/ParticleTest/ParticleTest";
import "./components/ParticleTest/ParticleTest.css"; // Ensure correct path
import "./App.css"

function App() {
    return (
        <>

            {/* <FireAnimation/> */}
            {/*<FirefliesAnimation/>*/}
            {/*    <CanvasAnimation />*/}
            {/*    <div style={{ position: 'relative', zIndex: 1 }}>*/}
            {/*<WaveAnimation/>*/}
            {/* <StarfieldAnimation/> */}
            {/* <BubblesAnimation/> */}
            <ParticleTest />
            <div style={{ position: 'relative', zIndex: 1 }}>

                <Navbar />
                <Intro />
                <Skills />
                <SkillsShowcase />
                <Experience />
                <Projects />
                <Works />
                <Contact />
                <Footer />
            </div>
        </>
    );
}

export default App;
