import React from 'react';
//import './Body.css'; // assuming you have a separate CSS file for styling
//import logo from './logo.png';
//import testimonialImage from './testimonial.png';
import Header from './header';
import Footer from './footer';
import '../App.css';

const Land = () => {
  return (
    <div>
      <Header></Header>
    <div className="body">
      <div className="first-section">
        <div className="left-side">
          <img src="LR.png" alt="Testimonial" className="testimonial-image" />
        </div>
        <div className="right-side">
          <div className="quote">
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          </div>
          <div className="buttons">
            <button className="login-button">Login</button>
            <button className="signup-button">Sign Up</button>
          </div>
        </div>
      </div>
      <div className="second-section">
        <img src="LR.png" alt="Logo" className="logo" />
        <div className="container">
          <div className="vision-container">
            <h2>Vision</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div className="mission-container">
            <h2>Mission</h2>
            <p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
    </div>
  );
};

export default Land;