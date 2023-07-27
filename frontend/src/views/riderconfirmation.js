import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import carImage from '../images/drivermoney.png'; // assuming you have a separate CSS file for styling
import Header from './header';
import Footer from './footer';
import '../css/riderconfirmation.css';

const Riderconfirmation = () => {
  const redirect = useHistory(); 
  const [user, setUser] = useState(null);
  let [message, setMessage] = useState([]);

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
            Your ride has been confirmed. You will receive a confirmation email before your ride.
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

export default Riderconfirmation;
