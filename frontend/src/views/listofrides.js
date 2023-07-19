// RideDetails.js

import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
//import backgroundImage from './background-image.jpg'; // Replace with the path to your background image
import Header from './header';
import Footer from './footer';
import Photo from '../images/elantra.jpg'; 
import '../css/listofrides.css';


const listofrides = () => {
    const [message, setMessage] = useState({
        message = '',
        className = '',
      })
  // Replace with linking the data
  const [user, setUser] = useState(null);
  const [rideDetail, setRideDetail] =  useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try{
        await axios.get('/api/userSession')
        .then((res) => {
          setUser(res.user);
        })
      } catch(error) {
        setMessage({message: error, className: 'error'})
      }

    try{
        await axios.get('/api/rideDetails/getRidesList')
        .then((res) => {
          if(res.status == 200)
          {
            setRideDetail(res.rides);
            <Redirect to="/conmessage" />
          }
          else{
            setMessage({message: res.message, className: 'error'})
          }
        })
      } catch(error) {
        setMessage({message: error, className: 'error'})
      }
  };

  const handleConfirmation = (e) => {
    const ride = {
        riderIds: user._id,
        rideStatus: 'booked',
        numberOfPassengers: rideDetail[e.target.index].numOfPassengers + 1,
    }
  }

  return (
<body>
        <Header> </Header>      
        <div> 
            <p id='rideconfirmhead'>
                Ride Selection
            </p>
            <p className={message.className}>{message.message}</p>  
           {rideDetail.map((rideDetails, index) => ( 
            <div className="ride-details-container" key={rideDetails._id}>
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
                        {/* <button > <a href='/conmessage' className='adbuttonlink'> Confirm </a> </button> */}
                        <button className='adbuttonlink' id={index} onClick={handleConfirmation}>  Confirm  </button>
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
