import React from "react";
import './intro.css';
import bg from '../../assets/IMG_5616.JPG';
import btnImg from '../../assets/hireme.png';
import resume from '../../assets/VISHNU VARDHAN R.pdf'; // Update with the correct path to your resume

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
              <span className="hello">Hello,</span><br />
              <span className="introText">
              I'm <span className="introname">Vishnu</span><br /> FullStack Developer
            </span>
              <p className="intropara">
               I build things using Java Springboot,React and gaining knowledge in Recent Technology
              </p>
              <button className="btn" onClick={handleResumeDownload}>
                <img src={btnImg} alt="Hire Me" className="btnImg" />Resume
              </button>
            </div>
          </div>
          <div className="introImageContent">
            <img src={bg} alt="profile" className="bg" />
          </div>
        </section>
      </div>
  );
};

export default Intro;
