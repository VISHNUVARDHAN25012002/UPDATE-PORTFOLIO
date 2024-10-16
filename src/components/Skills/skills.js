import React from "react";
import './skills.css';
import UIDesign from '../../assets/ui-design.png';
import SDesign from '../../assets/SDevop.png';
import SQL from '../../assets/sql.png';

const Skills =()=>{
    return(
        <div class="container">
        <section id='skills'>
           <span className="skillTitle">What I do</span>
           <span className="skillDesc">To secure a position as a Fullstack Java Developer where i can utilize my
                                        knowledge and skills to gain experience and demonstrate my interest in
                                        learning the latest technology and contribute my success to the organization</span>
                                        <div className="skillBars">
                                            <div className="skillBar">
                                                <img src={UIDesign} className="skillBarImg" />
                                                <div className="skillBarText1">
                                                    <h2>Website design</h2>
                                                    <p>I used to design website with HTML,CSS React and JavaScript</p>
                                                </div>
                                            </div>
                                            <div className="skillBar">
                                                <img src={SDesign} className="skillBarImg" />
                                                <div className="skillBarText">
                                                    <h2>Back-end Development</h2>
                                                    <p>I use Java in backend to develop the software </p>
                                                </div>
                                            </div>
                                            <div className="skillBar">
                                                <img src={SQL} className="skillBarImg" />
                                                <div className="skillBarText">
                                                    <h2>MySQL</h2>
                                                    <p>For databse i use MySQL for storing data.and gaining knowldge in it</p>
                                                </div>
                                            </div>
                                        </div>
         </section>
         </div>
    )
}
export default Skills;