// RideDetails.js

import React from 'react';
//import backgroundImage from './background-image.jpg'; // Replace with the path to your background image
import Header from './header';
import Footer from './footer';
import Photo from '../images/elantra.jpg'; 
import '../css/listofrides.css';


const listofrides = () => {
  // Replace with linking the data
  const rideDetail =  [{
    id: 1,
    pickUpLocation: 'Saskatoon',
    destination: 'Regina',
    numOfPassengers: 3,
    distance: '10 km',
    duration: '30 minutes',
    pickUpTime: '10:00 AM',
    dropOffTime: '10:30 AM',
    price: 'CAD 40',
  },
  {
    id: 2,
    pickUpLocation: 'Saskatoon',
    destination: 'Regina',
    numOfPassengers: 3,
    distance: '10 km',
    duration: '30 minutes',
    pickUpTime: '10:00 AM',
    dropOffTime: '10:30 AM',
    price: 'CAD 40',
  }];

  return (
<body>
        <Header> </Header>      
        <div> 
            <p id='rideconfirmhead'>
                Ride Selection
            </p>  
           {rideDetail.map((rideDetails, index) => ( 
            <div className="ride-details-container" key={rideDetails.id}>
                <div className="left-column">
                    <h2>Ride Details</h2>
                    <div className="car-image-container">
                        <img src={Photo} alt="Car" />
                    </div>
                        <p id='carname'> Hyundai Elantra </p>
                    <div className="info-item"> 
                        <p>Destination: {rideDetails.destination} </p>
                    </div>
                    <div className="info-item"> 
                        <p>Pick Up Location:  {rideDetails.pickUpLocation}  </p>
                    </div>
                </div>
                <div className="right-column">  
                    <div className='userdetails'> 
                        <div className="info-item"> 
                            <p className=''>No of Passengers: <span className='answer'> {rideDetails.numOfPassengers} </span>  </p>
                        </div> 
                        <div className="info-item"> 
                            <p>Distance: <span className='answer'> {rideDetails.distance} </span></p>
                        </div>
                        <div className="info-item">
                            <p>Duration: <span className='answer'> {rideDetails.duration} </span></p>
                        </div>
                        <div className="info-item">
                            <p>Pick Up Time:  <span className='answer'> {rideDetails.pickUpTime} </span></p>
                        </div>
                        <div className="info-item">
                            <p>Drop Off Time:  <span className='answer'> {rideDetails.dropOffTime} </span></p>
                        </div>
                        <div className="info-item">
                            <p>Price: {rideDetails.price}</p>
                        </div>
                    </div>    
                    <div className="confirm-button">
                        <button> <a href='/conmessage' className='adbuttonlink'> Confirm </a> </button>
                        <button> <a href='#' className='adbuttonlink'> Ignore </a>  </button> 
                    </div>
                </div>
            </div>
            ) // close on line 33 ride => ( 
            ) // RideDetails.map(    below one is for start of line 33. 
           }
        </div>    

    <Footer></Footer> // footer 
</body>   // body close 
  ); // return function 
}; // rideconfirm function 
export default listofrides;
