import React from "react";
import './intro.css';
import bg from '../../assets/IMG_5616.JPG';
import btnImg from '../../assets/hireme.png';
import { Link } from "react-scroll";

const Intro = () => {
  return (
    <div className="container">
      <section id="intro">
        <div className="introTextContent">
          <div className="introContent">
            <span className="hello">Hello,</span><br>
            </br>
            <span className="introText">I'm<span className="introname"> Vishnu</span><br/> FullStack Developer</span>
            <p className="intropara">I am a FullStack Developer, I build things using Java and gaining knowledge in Recent Technology</p>
            <Link to="contact">
              <button className="btn">
                <img src={btnImg} alt="Hire Me" className="btnImg" />Hire Me
              </button>
            </Link>
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
