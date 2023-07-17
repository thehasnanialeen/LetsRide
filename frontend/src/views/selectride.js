
import React from 'react';
import carImage from '../images/tesla.jpg';
import Header from './header';
import Footer from './footer';
import '../css/selectride.css';

const selectride = () => {
  return (
    <body>
    <Header> </Header>
    <div className="ride-form-container">
      <div className="left-side">
        <img src={carImage} alt="Car" className="car-image" />
      </div>
      <div className="right-side">
        <div className="form-container">
          <h2>Looking for a person to share ride with? - Fill in below</h2>
          <h3>Your Ride Information</h3>
          <form>
            <div className="form-field">
              <label>Start location:</label>
              <input type="text" name="startLocation" placeholder='Street, City, Province, Postal code ' />
            </div>
            <div className="form-field">
              <label>Destination:</label>
              <input type="text" name="destination"  placeholder='Street, City, Province, Postal code '/>
            </div>
            <div className="form-field">
              <label>Number of Passengers:</label>
              <select name="passengerCount">
              <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </select>
            </div>
            <div className="form-field">
              <label>Start time:</label>
              <input type="time" name="pickupTime" />
            </div>
            <div className="form-field">
              <label>Start date:</label>
              <input type="date" name="pickupDate" />
            </div>
            <div className="form-submit">
              <button type="submit"> <a href='/conmessage' id='rideconfirmlink'> Submit </a></button>
            </div>
          </form>
          <div className="register-driver">
            <button> <a href='/regdriver' id='regasdriverlink'>Register as a Driver </a></button>
          </div>
        </div>
      </div>
    </div>
    
    <footer>
        <Footer> </Footer>
    </footer>
    </body>
  );
};

export default selectride;
