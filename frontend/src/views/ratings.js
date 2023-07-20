// Reviews.js
//import carPhoto1 from '../images/tesla2.jpg'; // Replace with actual car photos
import carPicture from '../images/tesla.jpg'; // Replace with actual car photos
import '../css/ratings.css'; // Import the combined CSS file
import Header from './header';
import Footer from './footer';

import React, { useState } from 'react';

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
  const [rating, setRating] = useState(0);

  const handleRate = (value) => {
    setRating(value);
  };

  const driverName = 'John Doe'; // Replace with the driver's name
  //const carPicture = '../images/tesla.jpg'; // Replace with the path to the driver's car picture

  return (
    <body>
      <Header> </Header>
    <div className="rating-page">
      <div className="left-side"> 
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
    </body>
  );
};

export default Ratings;