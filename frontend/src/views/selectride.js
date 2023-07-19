
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import carImage from '../images/tesla.jpg';
import Header from './header';
import Footer from './footer';
import '../css/selectride.css';

const Selectride = () => {
  const [message, setMessage] = useState({
    message: '',
    className: '',
  })
  const [formData, setFormData] = useState({
    startLocation: '',
    destination: '',
    passengerCount: '',
    pickupTime: '',
    pickupDate: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    try{
      await axios.post('/api/rideDetails/post', formData)
      .then((res) => {
        if(res.status == 201)
        {
          setMessage({message: res.message, className: 'success'})
          setTimeout(() => {
            <Redirect to="/selectride" />
            //redirect.push('/login');
          }, 2000);
        }
        else{
          setMessage({message: res.message, className: 'error'})
        }
      })
    } catch(error) {
      setMessage({message: error, className: 'error'})
    }
    //console.log(formData);
  };

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
          <p className={message.className}>{message.message}</p>
          <form>
            <div className="form-field">
              <label>Start location:</label>
              <input type="text" name="startLocation" placeholder='Street, City, Province, Postal code ' value={formData.startLocation} onChange={handleChange}/>
            </div>
            <div className="form-field">
              <label>Destination:</label>
              <input type="text" name="destination"  placeholder='Street, City, Province, Postal code ' value={formData.destination} onChange={handleChange}/>
            </div>
            <div className="form-field">
              <label>Number of Passengers:</label>
              <select name="passengerCount" value={formData.passengerCount} onChange={handleChange}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <div className="form-field">
              <label>Start time:</label>
              <input type="time" name="pickupTime" value={formData.pickupTime} onChange={handleChange}/>
            </div>
            <div className="form-field">
              <label>Start date:</label>
              <input type="date" name="pickupDate" value={formData.pickupDate} onChange={handleChange}/>
            </div>
            <div className="form-submit">
              {/* <button type="submit"> <a href='/conmessage' id='rideconfirmlink'> Submit </a></button> */}
              <button type="submit" id='rideconfirmlink' onClick={handleSubmit}>  Submit </button>
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

export default Selectride;
