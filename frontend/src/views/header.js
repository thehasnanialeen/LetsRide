import React from 'react';
//import logo from './logo.png'; // need to add this  
import '../css/header.css';
import Photo from '../images/LR.png';

const Header = () => {
  return ( 
    <header className="header">
      <div className="logo-container"> 
        <img src="LR.png" alt="Logo" className="logo" />
      </div>
      <div className="company-name">Let's Ride</div>
      <button className="signup-button" href >Sign Up</button>
    </header> 
  );
};

export default Header;
