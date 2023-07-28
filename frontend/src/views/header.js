import React from 'react';
import '../css/header.css';
import Photo from '../images/LR.png';

const Header = () => {
  return ( 
    <header className="header">
      <div className="logo-container"> 
      <a href='/'> 
        <img src={Photo} alt="Logo" className="headlogo"/>
      </a>
        
      </div>
        <div className="company-name">
          <a href='/'>
          Let's Ride
          </a>
        </div>
      <button className="signup-button" > <a href="/signup"> SignUp </a></button>
    </header> 
  );
};

export default Header;
