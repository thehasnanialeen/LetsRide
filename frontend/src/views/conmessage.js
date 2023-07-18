import React from 'react';
import carImage from '../images/tesla2.jpg'; // assuming you have a separate CSS file for styling
import Header from './header';
import Footer from './footer';
import '../css/regdrivercon.css';

const conmessage = () => {
  return (
    <body>
        <Header></Header>
    <div className="page-container">
      <div className="left-side">
        <div className="driver-registration">
          <h2>Wohoo! Ride Posted </h2>
          <p>
            Your Ride has been posted and should recieve attention as soon as users need a ride. We are hopeful you will Have a pleasent Ride! 
          </p>
        </div>
      </div>
      <div className="right-side">
        <img src={carImage} alt="Car" className="car-image" />
      </div>
    </div>
    <Footer></Footer>
    </body>
  );
};

export default conmessage;