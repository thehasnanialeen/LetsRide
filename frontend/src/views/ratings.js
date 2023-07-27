// Reviews.js
//import carPhoto1 from '../images/tesla2.jpg'; // Replace with actual car photos
import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import carPicture from '../images/tesla.jpg'; // Replace with actual car photos
import '../css/ratings.css'; // Import the combined CSS file
import Header from './header';
import Footer from './footer';

//import React, { useState } from 'react';

const DriverCard = ({ driverName, carPicture }) => {
  return (
    <div className="driver-card">
      <img src={carPicture} alt="Car" />
      <h2>{driverName}</h2>
    </div>
  );
};

const StarRating = ({ rating, onRate }) => {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="star-rating">
      {stars.map((star) => (
        <span
          key={star}
          className={star <= rating ? 'star-selected' : 'star-unselected'}
          onClick={() => onRate(star)}
        >
          ★
        </span>
      ))}
    </div>
  );
};

const Ratings = () => {
  const redirect = useHistory(); 

  const driverName = "Aleen Hasnani";
  const { ride_id, driver_id } = useParams();
  const [user, setUser] = useState(null);
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState({
    message: '',
    className: '',
  })

  const handleRate = async (value) => {
    setRating(value);

    try{
      await axios.post('/api/rating/post', {
        rideId: ride_id,
        reviewById: user._id,
        reviewForId: driver_id,
        ratingValue: value,
        reviewByRole: 'rider',
        reviewForRole: 'driver',
        reviewText: '',
      })
      .then((res) => {
        //console.log(res.data.user);
        if(res.status == 201)
        {
          setMessage({message: 'You have rated this ride successfully!', className: 'success'})

          setTimeout(() => {
            redirect.push('/recentRidesList');
          }, 1000);
        }
          else{
            setMessage({message: res.data.message, className: 'error'})
          }
      })
    } catch(error) {
      setMessage({message: 'Something went wrong. Try again!', className: 'error'})
    }
  };

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
      setMessage({message: 'Something went wrong. Try again!', className: 'error'})
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
    {user === null ? '' : <>
      <Header> </Header>
    <div className="rating-page">
      <div className="left-side"> 
      <p className={message.className}>{message.message}</p>
        <DriverCard driverName={driverName} carPicture={carPicture} />
        <div className='leftrating-side'>
       <StarRating rating={rating} onRate={handleRate} /> 
        {rating > 0 && <p>You rated {driverName} {rating} stars!</p>} 
        <button id='submitratinglink'> <a href='/listofrides' id='tolist'>Submit</a> </button>
        </div>
      </div>
      <div className="right-side">
        <img src={carPicture} alt="Car" />
      </div>
    </div> 
    <Footer></Footer>
    </>}
    </>
  );
};

export default Ratings;
