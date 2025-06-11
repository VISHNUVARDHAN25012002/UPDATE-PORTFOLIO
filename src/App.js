import React from 'react';
import Navbar from "./components/NavBar/navbar";
import Intro from "./components/Intro/intro";
import Skills from "./components/Skills/skills";
import Works from "./components/Works/works";
import Contact from "./components/contact/contact";
import Footer from "./components/Footer/footer";
import ParticleTest from "./components/ParticleTest/ParticleTest";
import "./components/ParticleTest/ParticleTest.css"; // Ensure correct path
import "./App.css"

import WaveAnimation from "./components/ParticleTest/WaveAnimation"
import StarfieldAnimation from "./components/ParticleTest/StarfieldAnimation"
import CanvasAnimation from "./components/ParticleTest/CanvasAnimation"
import BubblesAnimation from "./components/ParticleTest/BubblesAnimation";
import ConfettiAnimation from "./components/ParticleTest/ConfettiAnimation";
import FirefliesAnimation from "./components/ParticleTest/FirefliesAnimation"
import ShootingStarsAnimation from "./components/ParticleTest/ShootingStarsAnimation";
import FireAnimation from "./components/ParticleTest/FireAnimation"
import DragonFollower from "./components/DragonFollower/DragonFollower";
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
            <DragonFollower />
            <div style={{ position: 'relative', zIndex: 1 }}>

                <Navbar />
                <Intro />
                <Skills />
                <Works />
                <Contact />
                <Footer />
            </div>
        </>
    );
}

export default App;
