import React, { useRef } from "react";
import FacebookIcon from "../../assets/facebook-icon.png";
import InstagramIcon from "../../assets/instagram.png";
import LinkedinIcon from "../../assets/Link.png";
import githubIcon from "../../assets/github1.png";
import emailjs from '@emailjs/browser';
import './contact.css';
const Contact = () => {
    const form = useRef();
    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_yfeq9bi', 'template_2zrkvqf', form.current, 'mhu7rb3AjFb7VKG5E')
            .then((result) => {
                console.log(result.text);
                e.target.reset();
                alert('Email Sent!');
            }, (error) => {
                console.log(error.text);
            });
    };

    return (
        <div className="container">
            <section id="contactPage">
                <div id="Contact">
                    <h1 className="contact title">CONTACT ME</h1>
                    <span className="contactDesc">Please fill out the form below to discuss any work opportunities.</span>
                    <form className="contactform" ref={form} onSubmit={sendEmail}>
                        <input type="text" className="name" placeholder="Your Name" name="to_name" required />
                        <input type="email" className="email" placeholder="Your Email" name="from_email" required />
                        <textarea className="msg" name="message" rows="5" placeholder="Message" required></textarea><br />
                        <button type="submit" className="submitBtn">Submit</button>

                <div className="links">
                    <img src={FacebookIcon} alt="Facebook" className="link"/>
                    <a href="https://www.instagram.com/vishnu.25/profilecard/?igsh=MXcxNWVpM2V0OHhzaw==" target="_blank">
                    <img src={InstagramIcon} alt="Instagram" className="link"/>
                    </a>
                    <a href="https://www.linkedin.com/in/vishnu-vardhan-r-232026196/" target="_blank">
                    <img src={LinkedinIcon} alt="Linkedin" className="link"/>
                    </a>
                    <a href="https://github.com/VISHNUVARDHAN25012002" target="_blank">
                    <img src={ githubIcon } alt="Github"className="link"/>
                    </a>
                    </div>
                 </form>
        </div>
        </section>
        </div>
        

    );
}
export default Contact