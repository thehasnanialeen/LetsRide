import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import Header from './header';
import Footer from './footer';
import Photo from '../images/driver1.jpg'; 
import '../css/landing.css';
import Pic from '../images/LR.png';


const Landing = () => {
  const redirect = useHistory(); 

  const [user, setUser] = useState(null);
  const [message, setMessage] = useState({
    message: '',
    className: '',
  })

  const fetchData = async () => {
    try{
      await axios.get('/api/userSession')
      .then((res) => {
        if(res.data.user)
        {
          setUser(res.data.user);
        }
      })
    } catch(error) {
      setMessage({message: 'Something went wrong. Try again!', className: 'error'})
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const redirectTo = (page) => {
    redirect.push(page);
  }

  return (
    <>
      <Header></Header>
    <div className="body">
    <p className={message.className}>{message.message}</p>
      <div className="first-section">
        <div className="left-side">
          <img src={Photo} alt="Testimonial" className="testimonial-image" />
        </div>
        <div className="right-side">
          <div className="quote">
          "I absolutely love using Let's Ride app! It's my go-to solution whenever I need to get around quickly and conveniently. The app's user-friendly interface makes booking a ride a breeze, and the drivers are always punctual and professional. With a wide range of vehicle options and transparent pricing, this app has truly transformed my commuting experience. Highly recommended!"
          </div>
          {user === null ? 
          <div className="buttons">
            <button className="login-button" onClick={() => redirectTo('/login')}> Login </button>
            <button className="signup-button"onClick={() => redirectTo('/signup')}> Signup </button> 
          </div>
          : user.role === 'rider' ?
          <div className="buttons">
            <button className="login-button" onClick={() => redirectTo('/listofrides')}> Select a Ride </button>
            <button className="signup-button" onClick={() => redirectTo('/recentRidesList')}> Rate a Ride </button> 
          </div>
          : user.role === 'driver' ?
          <div className="buttons">
            <button className="login-button" onClick={() => redirectTo('/selectride')}> Post a Ride </button>
            <button className="signup-button" onClick={() => redirectTo('/regdriver')}> Register as Driver </button> 
          </div>
          : user.role === 'admin' ?
          <div className="buttons">
            <button className="login-button" onClick={() => redirectTo('/approval')}> Approve Drivers </button>
            <button className="signup-button" onClick={() => redirectTo('/unregister')}> Ban Users </button> 
          </div> : ''}
        </div>
      </div>
      <div className="second-section">
        <img src={Pic} alt="Logo" className="landlogo" />
        <div className="container">
          <div className="vision-container">
            <h2>Vision</h2>
            <p>Transforming transportation through seamless rides and unparalleled convenience. Creating a connected world where transportation is effortless and accessible for all.</p>
          </div>
          <div className="mission-container">
            <h2>Mission</h2>
            <p>We strive to redefine the way people commute by offering a seamless, economically efficient, and eco-friendly ride sharing experience.</p>
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
    </>
  );
};

export default Landing;