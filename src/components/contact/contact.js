// import React, { useRef } from "react";
// import FacebookIcon from "../../assets/facebook-icon.png";
// import InstagramIcon from "../../assets/instagram.png";
// import LinkedinIcon from "../../assets/Link.png";
// import githubIcon from "../../assets/github1.png";
// import emailjs from "@emailjs/browser";
// import "./contact.css";
//
// const Contact = () => {
//     const form = useRef();
//
//     const sendEmail = (e) => {
//         e.preventDefault();
//
//         emailjs
//             .sendForm(
//                 "service_yfeq9bi",
//                 "template_2zrkvqf",
//                 form.current,
//                 "mhu7rb3AjFb7VKG5E"
//             )
//             .then(
//                 (result) => {
//                     console.log(result.text);
//                     e.target.reset();
//                     alert("Email Sent!");
//                 },
//                 (error) => {
//                     console.log(error.text);
//                 }
//             );
//     };
//
//     return (
//         <div className="container">
//             <section id="contactPage">
//                 <div id="Contact">
//                     <h1 className="contactTitle">CONTACT ME</h1>
//                     <span className="contactDesc">
//             Please fill out the form below to discuss any work opportunities.
//           </span>
//                     <form className="contactform" ref={form} onSubmit={sendEmail}>
//                         <input
//                             type="text"
//                             className="name"
//                             placeholder="Your Name"
//                             name="to_name"
//                             required
//                         />
//                         <input
//                             type="email"
//                             className="email"
//                             placeholder="Your Email"
//                             name="from_email"
//                             required
//                         />
//                         <textarea
//                             className="msg"
//                             name="message"
//                             rows="5"
//                             placeholder="Message"
//                             required
//                         ></textarea>
//                         <br />
//                         <button type="submit" className="submitBtn">
//                             Submit
//                         </button>
//
//                         <div className="links">
//                             <a
//                                 href="https://www.facebook.com/yourfacebookprofile"
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                             >
//                                 <img src={FacebookIcon} alt="Facebook" className="link" />
//                             </a>
//                             <a
//                                 href="https://www.instagram.com/vishnu.25/profilecard/?igsh=MXcxNWVpM2V0OHhzaw=="
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                             >
//                                 <img src={InstagramIcon} alt="Instagram" className="link" />
//                             </a>
//                             <a
//                                 href="https://www.linkedin.com/in/vishnu-vardhan-r-232026196/"
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                             >
//                                 <img src={LinkedinIcon} alt="Linkedin" className="link" />
//                             </a>
//                             <a
//                                 href="https://github.com/VISHNUVARDHAN25012002"
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                             >
//                                 <img src={githubIcon} alt="Github" className="link" />
//                             </a>
//                         </div>
//                     </form>
//                 </div>
//             </section>
//         </div>
//     );
// };
//
// export default Contact;
import React, { useRef, useState, useEffect } from "react";
import FacebookIcon from "../../assets/facebook-icon.png";
import InstagramIcon from "../../assets/instagram.png";
import LinkedinIcon from "../../assets/Link.png";
import githubIcon from "../../assets/github1.png";
import emailjs from "@emailjs/browser";
import "./contact.css";
import axios from "axios";

const Contact = () => {
    const form = useRef();
    const [userIP, setUserIP] = useState(""); // State to store IP address

    // Fetch IP using ipify API with your API key
    const fetchIP = async () => {
        try {
            const response = await axios.get(`https://api.ipify.org?format=json&apiKey=at_oDB2FgB5hwRbjkzTgXO5f9nZThZcb`);
            console.log("IP Address:", response.data.ip);  // Log the fetched IP
            setUserIP(response.data.ip); // Store the fetched IP
        } catch (error) {
            console.error("Error fetching IP address:", error);
        }
    };

    // Call the fetchIP function when the component loads
    useEffect(() => {
        fetchIP();
    }, []);

    const sendEmail = (e) => {
        e.preventDefault();

        // Manually set the value of the hidden input field for the IP address
        const ipInput = form.current.querySelector("input[name='ip_address']");
        if (ipInput) {
            ipInput.value = userIP;  // Set the IP value directly before submitting
        }

        // Send form via EmailJS
        emailjs
            .sendForm(
                "service_yfeq9bi",  // Your EmailJS service ID
                "template_2zrkvqf", // Your EmailJS template ID
                form.current,
                "mhu7rb3AjFb7VKG5E" // Your EmailJS public key
            )
            .then(
                (result) => {
                    console.log("Mail Status:", result.text); // Log the email status
                    alert("Email Sent!");  // Show confirmation alert
                    e.target.reset();  // Reset form after sending
                },
                (error) => {
                    console.log("Mail Error:", error.text);  // Log any errors
                }
            );
    };

    return (
        <div className="container">
            <section id="contactPage">
                <div id="Contact">
                    <h1 className="contactTitle">CONTACT ME</h1>
                    <span className="contactDesc">
                        Please fill out the form below to discuss any work opportunities.
                    </span>
                    <form className="contactform" ref={form} onSubmit={sendEmail}>
                        <input
                            type="text"
                            className="name"
                            placeholder="Your Name"
                            name="to_name"
                            required
                        />
                        <input
                            type="email"
                            className="email"
                            placeholder="Your Email"
                            name="from_email"
                            required
                        />
                        <textarea
                            className="msg"
                            name="message"
                            rows="5"
                            placeholder="Message"
                            required
                        ></textarea>

                        {/* Hidden field to store the IP address */}
                        <input
                            type="hidden"
                            name="ip_address"
                        />

                        <br />
                        <button type="submit" className="submitBtn">
                            Submit
                        </button>

                        <div className="links">
                            <a
                                href="https://www.facebook.com/yourfacebookprofile"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img src={FacebookIcon} alt="Facebook" className="link" />
                            </a>
                            <a
                                href="https://www.instagram.com/vishnu.25/profilecard/?igsh=MXcxNWVpM2V0OHhzaw=="
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img src={InstagramIcon} alt="Instagram" className="link" />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/vishnu-vardhan-r-232026196/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img src={LinkedinIcon} alt="Linkedin" className="link" />
                            </a>
                            <a
                                href="https://github.com/VISHNUVARDHAN25012002"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img src={githubIcon} alt="Github" className="link" />
                            </a>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default Contact;

