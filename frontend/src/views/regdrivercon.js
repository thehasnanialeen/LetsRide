import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import carImage from '../images/drivermoney.png'; // assuming you have a separate CSS file for styling
import Header from './header';
import Footer from './footer';
import '../css/regdrivercon.css';

const regdrivercon = () => {
  const redirect = useHistory(); 
  const [user, setUser] = useState(null);

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
        <Header></Header>
    <div className="page-container">
      <div className="left-side">
        <div className="driver-registration">
          <h2>Driver Registration</h2>
          <p>
            Your request is in progress and will be verified by the Admin. You will be updated via email within 5-6 business days.
          </p>
        </div>
      </div>
      <div className="right-side">
        <img src={carImage} alt="Car" className="car-image" />
      </div>
    </div>
    <Footer></Footer>
    </>
  );
};

export default regdrivercon;
