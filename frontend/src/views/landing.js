import React from 'react';
import '../App.css';

const Landing = () => {
  return (
    <div className="app">
      <header className="header">
        <div className="logo">Logo</div>
        <div className="center">Let's Ride</div>
        <button className="signup">Sign Up</button>
      </header>
      <div className="body">
        <div className="picture">Picture</div>
        <div className="text-column">Text Column</div>
      </div> 
    </div>
  );
}

export default Landing;