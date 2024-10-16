import React from 'react';
import Navbar from "./components/NavBar/navbar";
import Intro from "./components/Intro/intro";
import Skills from "./components/Skills/skills";
import Works from "./components/Works/works";
import Contact from "./components/contact/contact";
import Footer from "./components/Footer/footer";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import './App.css'; // Correctly imported App.css for styles

function App() {
  const particlesInit = async (main) => {
    console.log(main); // For debugging
    await loadFull(main); // Load tsparticles engine
  };

  const particlesLoaded = (container) => {
    console.log(container); // For debugging to see if container is loaded
  };

  const particlesOptions = {
    background: {
      color: {
        value: "#181818",  // Background color matches the page background
      },
    },
    fpsLimit: 60,
    particles: {
      color: {
        value: "#ffffff",  // White particles
      },
      number: {
        value: 100,
      },
      size: {
        value: 3,
      },
      move: {
        enable: true,
        speed: 2,
      },
    },
    detectRetina: true,
  };

  return (
    <>
      {/* Render Particles as a background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={particlesOptions}
      />
      <Navbar />
      <Intro />
      <Skills />
      <Works />
      <Contact />
      <Footer />
    </>
  );
}

export default App;
