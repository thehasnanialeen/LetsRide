import React from 'react';
import carImage from '../images/drivermoney.png'; // assuming you have a separate CSS file for styling
import Header from './header';
import Footer from './footer';
import '../css/regdrivercon.css';

const regdrivercon = () => {
  return (
    <body>
        <Header></Header>
    <div className="page-container">
      <div className="left-side">
        <div className="driver-registration">
          <h2>Driver Registration</h2>
          <p>
            Your request is in progress and will be verified by the Admin. You will be updated via email within 5-6 business days.
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

export default regdrivercon;
