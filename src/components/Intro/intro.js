import React from "react";
import './intro.css';
import bg from '../../assets/IMG_5616.JPG';
import btnImg from '../../assets/resumeimg2.png';
import resume from '../../assets/updated onepage.pdf'; // Updated resume path

const Intro = () => {
  // Function to handle the resume download
  const handleResumeDownload = () => {
    const link = document.createElement('a');
    link.href = resume;
    link.download = 'VISHNU VARDHAN R.pdf'; // You can change this to the desired file name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
      <div className="container">
        <section id="intro">
          <div className="introTextContent">
            <div className="introContent">
              <h1 className="hello">Hello,</h1>
              <h2 className="introText">
              I'm <span className="introname">Vishnu Vardhan R</span><br /> FullStack Java Developer & React Portfolio Designer
            </h2>
              <p className="intropara">
               I specialize in React Portfolio Design and build dynamic, scalable web applications using Java Spring Boot, React, MySQL, and RESTful APIs. Creating modern portfolio designs with interactive animations and responsive layouts. Passionate about innovative React portfolio solutions and cutting-edge web technologies.
              </p>
              <button className="btn" onClick={handleResumeDownload}>
                <img src={btnImg} alt="Download Resume" className="btnImg" />Download Resume
              </button>
            </div>
          </div>
          <div className="introImageContent">
            <img src={bg} alt="Vishnu Vardhan R - FullStack Java Developer Profile Picture" className="bg" />
          </div>
        </section>
      </div>
    );

};

export default Intro;

