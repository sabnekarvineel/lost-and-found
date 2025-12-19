import React from "react";
import "./About.css";
import Navbar from "../assets/components/navbar";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <>  
   
    <Navbar/>
    <div className="about-body">
      {/* Navbar Placeholder */}
     

      <div className="about-page-container">
        {/* Header Section */}
        <h1 className="about-header-title">About Us</h1>
        <p className="about-header-description">
          Welcome to the Lost and Found Portal of Bhavan's Vivekananda College! 
          Our goal is to connect the college community by helping students and staff 
          recover their lost items quickly and efficiently.
        </p>

        {/* Content Section */}
        <div className="about-content-section">
          <div className="about-content-item">
            <h2 className="about-content-title">Our Mission</h2>
            <p className="about-content-text">
              To create a seamless platform where lost items can be reported and 
              found items can be reclaimed with ease. We aim to foster a 
              sense of community and trust within the campus.
            </p>
          </div>
          <div className="about-content-item">
            <h2 className="about-content-title">Our Vision</h2>
            <p className="about-content-text">
              To become the most reliable and efficient lost-and-found 
              management system in educational institutions, promoting 
              honesty and accountability among students and staff.
            </p>
          </div>
        </div>

        {/* Image Section */}
     

        {/* Call to Action */}
        <div className="about-cta-container">
          <button className="about-cta-button"><Link to='/contact'>Contact Us</Link></button>
        </div>
      </div>
    </div>
    </>
  );
};

export default About;
