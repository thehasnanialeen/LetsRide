import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import carImage from '../images/drivermoney.png'; // assuming you have a separate CSS file for styling
import Header from './header';
import Footer from './footer';
import '../css/regdrivercon.css';

const DriverRegistrationRejected = () => {
  const redirect = useHistory(); 
  const [user, setUser] = useState(null);
  let [message, setMessage] = useState([]);

  const fetchData = async () => {
    try{
      await axios.get('/api/userSession')
      .then((res) => {
        if(!res.data.user)
          {
            redirect.push('/');
          }
          else{
            setUser(res.data.user);
          }
      })
    } catch(error) {
      setMessage([...message, 'Something went wrong. Try again!'])
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
    {user === null ? '' : <>
    <Header></Header>
    <div className="page-container">
      <div className="left-side">
        <div className="driver-registration">
          <h2>Driver Registration</h2>
          <p>
            Thank you for signing up as a driver. Unfortunetly, your request to become a driver was rejected. We've sent you an email at {user.email} with additional feedback. Please check your inbox and spam folder to see what you can do next.
          </p>
          <p>
            If you haven't received the email then contact us at <a href="mailto:letsride.help@outlook.com">letsride.help@outlook.com.</a>, and we'll be glad to assist you further.
          </p>
        </div>
      </div>
      <div className="right-side">
        <img src={carImage} alt="Car" className="car-image" />
      </div>
    </div>
    <Footer></Footer>
    </>}
    </>
  );
};

export default DriverRegistrationRejected;
