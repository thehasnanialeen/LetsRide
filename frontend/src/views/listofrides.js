// RideDetails.js

import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
//import backgroundImage from './background-image.jpg'; // Replace with the path to your background image
import Header from './header';
import Footer from './footer';
import Photo from '../images/elantra.jpg'; 
import '../css/listofrides.css';


const Listofrides = () => {
  const redirect = useHistory(); 

    const [messagedd, setMessage] = useState({
      message: '',
      className: '',
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
          
          setUser(res.data);

          //console.log(user);
        })
      } catch(error) {
        setMessage({message: 'Something went wrong. Try again!', className: 'error'})
      }

    try{
        await axios.get('/api/rideDetails/getRidesList')
        .then((res) => {
          if(res.status == 200)
          {
            //console.log(res.data.rides);
            setRideDetail(res.data.rides);

            if(rideDetail.length == 0)
            {
              setMessage({message: 'No rides available', className: 'error'})
            }
            //<Redirect to="/conmessage" />
          }
          else{
            //console.log(res.message);
            setMessage({message: res.data.message, className: 'error'})
          }
        })
      } catch(error) {
        //console.log(error);
        setMessage({message: 'Something went wrong. Try again!', className: 'error'})
      }
  };

  const handleConfirmation = async (e) => {
    // const ride = {
    //     //riderIds: user._id,
    //     rideStatus: 'booked',
    //     //numberOfPassengers: rideDetail[e.target.index].numOfPassengers + 1,
    // }
    //console.log(rideDetail[e.target.id]);

    try{
      await axios.post('/api/rideDetails/updateRider', {
        _id: rideDetail[e.target.id]._id,
        riderIds: '5412sghh451',
        rideStatus: 'booked',
        numberOfPassengers: rideDetail[e.target.id].numberOfPassengers + 1,
      })
      .then((res) => {
        if(res.status == 200)
        {
          //console.log(res.data.rides);
          //setRideDetail(res.data.rides);
          //<Redirect to="/conmessage" />
          redirect.push('/conmessage')
        }
        else{
          //console.log(res.message);
          setMessage({message: res.data.message, className: 'error'})
        }
      })
    } catch(error) {
      //console.log(error);
      setMessage({message: 'Something went wrong. Try again!', className: 'error'})
    }
  }

  return (
<>
        <Header> </Header>      
        <div> 
            <p id='rideconfirmhead'>
                Ride Selection
            </p>
            <p className={messagedd.className}>{messagedd.message}</p>  
           {rideDetail.map((rideDetails, index) => ( 
            <div className="ride-details-container" key={rideDetails._id}>
                <div className="left-column">
                    <h2>Ride Details</h2>
                    <div className="car-image-container">
                        <img src={Photo} alt="Car" />
                    </div>
                        <p id='carname'> Hyundai Elantra </p>
                    <div className="info-item"> 
                        <p>Destination: {rideDetails.dropLocation} </p>
                    </div>
                    <div className="info-item"> 
                        <p>Pick Up Location:  {rideDetails.pickupLocation}  </p>
                    </div>
                </div>
                <div className="right-column">  
                    <div className='userdetails'> 
                        <div className="info-item"> 
                            <p className=''>No of Passengers: <span className='answer'> {rideDetails.numberOfPassengers} </span>  </p>
                        </div> 
                        <div className="info-item"> 
                            <p>Distance: <span className='answer'> {rideDetails.distance} </span></p>
                        </div>
                        <div className="info-item">
                            <p>Duration: <span className='answer'> {rideDetails.duration} </span></p>
                        </div>
                        <div className="info-item">
                            <p>Pick Up Time:  <span className='answer'> {rideDetails.startTime} </span></p>
                        </div>
                        <div className="info-item">
                            <p>Drop Off Time:  <span className='answer'> {rideDetails.endTime} </span></p>
                        </div>
                        <div className="info-item">
                            <p>Price: {rideDetails.cost}</p>
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
</>   // body close 
  ); // return function 
}; // rideconfirm function 
export default Listofrides;
