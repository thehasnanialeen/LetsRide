
import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import carImage from '../images/tesla.jpg';
import Header from './header';
import Footer from './footer';
import '../css/selectride.css';

const Selectride = () => {
  const redirect = useHistory();

  const [user, setUser] = useState(null);
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

  const fetchDriverData = async () => {
    try{
      await axios.get(`/api/driverRegistration/getDriverDetails?userId=${user._id}`)
      .then((res) => {
        //console.log(res.data.user);
        if(res.status == 201)
        {
          const driver = res.data.driver;
          if(driver.approvalStatus === 'waiting')
          {
            redirect.push('/regdrivercon');
          }
          else if(driver.approvalStatus === 'rejected')
          {
            redirect.push('/driverRegistrationRejected');
          }
        }
        else if(res.status == 200)
        {
          redirect.push('/regdriver');
        }
        else
        {
          setMessage({message: res.data.message, className: 'error'});
        }
      })
    } catch(error) {
      setMessage({message: 'Something went wrong. Try again!', className: 'error'})
    }
  }

  const fetchData = async () => {
    try{
      await axios.get('/api/userSession')
      .then((res) => {
        //console.log(res.data.user);
        if(!res.data.user)
          {
            redirect.push('/');
          }
          else{
            setUser(res.data.user);
            if(user.role === 'rider')
            {
              redirect.push('/login');
            }
            fetchDriverData();
          }
      })
    } catch(error) {
      setMessage({message: 'Something went wrong. Try again!', className: 'error'})
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const date = new Date(formData.pickupDate + " " + formData.pickupTime)
    //console.log(date);
    //Handle form submission logic here
    try{
      await axios.post('/api/rideDetails/post', {
        driverUserID: user._id,
        pickupLocation: formData.startLocation,
        dropLocation: formData.destination,
        startTime: date,
        numberOfPassengers: formData.passengerCount,
      })
      .then((res) => {
        if(res.status == 201)
        {
          setMessage({message: res.data.message, className: 'success'});
          setTimeout(() => {
            window.location.reload();
            //redirect.push('/selectride');
          }, 1000);
        }
        else{
          setMessage({message: res.data.message, className: 'error'});
        }
      })
    } catch(error) {
      //console.log(error);
      setMessage({message: 'Something went wrong. Try again!', className: 'error'});
    }
    //console.log(formData);
  };

  return (
    <>
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
    </>
  );
};

export default Selectride;
