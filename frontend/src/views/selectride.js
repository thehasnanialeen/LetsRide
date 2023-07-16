
import React from 'react';
import './RideForm.css'; // assuming you have a separate CSS file for styling
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
          <h2>Looking for a Ride? - Fill in below</h2>
          <h3>Your Ride Information</h3>
          <form>
            <div className="form-field">
              <label>Pick up location:</label>
              <input type="text" name="pickupLocation" />
            </div>
            <div className="form-field">
              <label>Destination:</label>
              <input type="text" name="destination" />
            </div>
            <div className="form-field">
              <label>Number of Passengers:</label>
              <select name="passengerCount">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </select>
            </div>
            <div className="form-field">
              <label>Car Type:</label>
              <select name="carType">
                <option value="hatchback">Hatchback</option>
                <option value="mini-suv">Mini SUV</option>
                <option value="suv">SUV</option>
                <option value="mini-truck">Mini Truck</option>
                <option value="others">Others</option>
              </select>
            </div>
            <div className="form-field">
              <label>Pick up time:</label>
              <input type="time" name="pickupTime" />
            </div>
            <div className="form-field">
              <label>Pick up date:</label>
              <input type="date" name="pickupDate" />
            </div>
            <div className="form-submit">
              <button type="submit">Submit</button>
            </div>
          </form>
          <div className="register-driver">
            <button> <a href='/regdriver'></a>Register as a Driver</button>
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
