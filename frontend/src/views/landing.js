import React from 'react';
//import './Body.css'; // assuming you have a separate CSS file for styling
//import logo from './logo.png';
//import testimonialImage from './testimonial.png';
import Header from './header';
import Footer from './footer';
import Photo from '../images/driver1.jpg'; 
import '../css/landing.css';
import Pic from '../images/LR.png';


const Land = () => {
  return (
    <>
      <Header></Header>
    <div className="body">
      <div className="first-section">
        <div className="left-side">
          <img src={Photo} alt="Testimonial" className="testimonial-image" />
        </div>
        <div className="right-side">
          <div className="quote">
          "I absolutely love using Let's Ride app! It's my go-to solution whenever I need to get around quickly and conveniently. The app's user-friendly interface makes booking a ride a breeze, and the drivers are always punctual and professional. With a wide range of vehicle options and transparent pricing, this app has truly transformed my commuting experience. Highly recommended!"
          </div>
          <div className="buttons">
            <button className="login-button">Login</button>
            <button className="signup-button">Sign Up</button> 
          </div>
        </div>
      </div>
      <div className="second-section">
        <img src={Pic} alt="Logo" className="landlogo" />
        <div className="container">
          <div className="vision-container">
            <h2>Vision</h2>
            <p>Transforming transportation through seamless rides and unparalleled convenience. Creating a connected world where transportation is effortless and accessible for all.</p>
          </div>
          <div className="mission-container">
            <h2>Mission</h2>
            <p>We strive to redefine the way people commute by offering a seamless, economically efficient, and eco-friendly ride sharing experience.</p>
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
    </>
  );
};

export default Land;