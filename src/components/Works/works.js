import React from "react";
import './works.css'
import portfolio1 from '../../assets/Screenshot 2024-10-18 162700.png';
import portfolio2 from '../../assets/Screenshot 2024-10-18 162739.png';
import portfolio3 from '../../assets/portfolio-3.png';
import portfolio4 from '../../assets/portfolio-4.png';
import portfolio5 from '../../assets/portfolio-5.png';
import portfolio6 from '../../assets/portfolio-6.png';
const works =()=>{
    return(
        <div class="container">
    <section id="works">
        <h2 className="workstittle">Certifications</h2>
        <span className="workDesc"> I am certified in Object-Oriented Programming (OOP) in Java and Data Structures and Algorithms (DSA) at an intermediate level from Great Learning Academy</span>
        <div className="worksImgs">
            <img src={portfolio1} alt className="worksImg"/>
            <img src={portfolio2} alt className="worksImg"/>
            {/*<img src={portfolio3} alt className="worksImg"/>*/}
            {/*<img src={portfolio4} alt className="worksImg"/>*/}
            {/*<img src={portfolio5} alt className="worksImg"/>*/}
            {/*<img src={portfolio6} alt className="worksImg"/>*/}
        </div>
         <button className="workBtn"> See More</button> 
    </section>
    </div>
    )
}
export default works