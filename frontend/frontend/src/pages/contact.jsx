import React from "react";
import "./contact.css";
import Navbar from "../assets/components/navbar";

function Contact() {
  return (
    <>
      
        <Navbar />
      
      <div className="contact-container">
        <h1 className="contact-header">Contact Us</h1>
        <p className="contact-description">
          If you have any queries, suggestions, or need assistance regarding lost or found items in Bhavan's Vivekananda College, feel free to reach out to us!
        </p>
        <div className="contact-info">
          <div className="contact-item">
            <h2>Email Us:</h2>
            <p>
              <a href="sabnekarvineel862@gmail.com">sabnekarvineel862@gmail.com</a>
            </p>
          </div>
          <div className="contact-item">
            <h2>Call Us:</h2>
            <p>+91 9381970098</p>
            <p>++91 9100499608</p>
          </div>
          <div className="contact-item">
            <h2>Visit Us:</h2>
            <p>Bhavan's Vivekananda College, Sainikpuri, Hyderabad</p>
          </div>
        </div>
        <form className="contact-form">
          <h2>Send Us a Message</h2>
          <div className="form-group">
            <label htmlFor="name">Your Name</label>
            <input type="text" id="name" placeholder="Enter your name" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Your Email</label>
            <input type="email" id="email" placeholder="Enter your email" required />
          </div>
          <div className="form-group">
            <label htmlFor="message">Your Message</label>
            <textarea id="message" placeholder="Enter your message" rows="5" required></textarea>
          </div>
          <button type="submit" className="submit-buttonn">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default Contact;
