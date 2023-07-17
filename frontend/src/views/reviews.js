// Reviews.js

import React from 'react';
import carPhoto1 from '../images/tesla2.jpg'; // Replace with actual car photos
import carPhoto2 from '../images/tesla.jpg'; // Replace with actual car photos
import '../css/reviews.css'; // Import the combined CSS file
import Header from './header';
import Footer from './footer';

const reviews = () => {
  // Replace this data with actual reviews from the database
  const reviews = [
    {
      id: 1,
      rating: 5,
      driverName: 'John Doe',
      carPhoto: carPhoto1,
    },
    {
      id: 2,
      rating: 4,
      driverName: 'Jane Smith',
      carPhoto: carPhoto2,
    },
    // Add more reviews as needed
  ];

  return (
    <body>

    <Header></Header>
    <div className="reviews-container">
      <h2>Reviews</h2>
      {reviews.map((review) => (
        <div className="review-container" key={review.id}>
          <div className="rating">{review.rating} Stars</div>
          <div className="driver-info">
            <img src={review.carPhoto} alt="Car" />
            <p>{review.driverName}</p>
          </div>
        </div>
      ))}
    </div>
    <Footer></Footer>
    </body>
  );
};

export default reviews;
