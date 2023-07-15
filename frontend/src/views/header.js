import React from 'react';
//import logo from './logo.png'; // need to add this 
import '../App.css'; // need to check for the access 

const Header = () => {
  return ( 
    <header className="header">
      <div className="logo-container"> 
        <img src="LR.png" alt="Logo" className="logo" />
      </div>
      <div className="company-name">Lets Ride</div>
      <button className="signup-button">Sign Up</button>
    </header> 
  );
};

export default Header;