import React, { useState, useEffect } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import '../css/header.css';
import Photo from '../images/LR.png';


const Header = () => {
  const redirect = useHistory(); 

  const [user, setUser] = useState(null);

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
      console.log(error);
      // setMessage({message: 'Something went wrong. Try again!', className: 'error'})
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const redirectTo = (page) => {
    redirect.push(page);
  }

  return ( 
    <header className="header">
      <div className="logo-container"> 
      <img src={Photo} alt="Logo" className="headlogo" onClick={() => redirectTo('/')}/>
        
      </div>
        <div className="company-name">
          <a href='/'>
          Let's Ride
          </a>
        </div>
        {user === null ? '' : user.role === 'rider' ? <>
          <button className="signup-button" onClick={() => redirectTo('/rating')} > Rate a Ride </button>
        </> : ''}
    </header> 
  );
};

export default Header;
