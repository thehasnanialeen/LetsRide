// RideDetails.js

import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Header from './header';
import Footer from './footer';
import Photo from '../images/elantra.jpg'; 
import '../css/listofrides.css';


const Listofrides = () => {
  const redirect = useHistory(); 

    const [message, setMessage] = useState({
      message: '',
      className: '',
      })

  let [rideDetail, setRideDetail] =  useState([]);
  
  const [user, setUser] = useState(null);
  const fetchData = async () => {
    try{
        await axios.get('/api/userSession')
        .then((res) => {
          
          console.log(res.data);
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

    try{
        await axios.get('/api/rideDetails/getRidesList')
        .then((res) => {
          if(res.status == 200)
          {
            //console.log(res.data.rides);
            setRideDetail(rideDetail = res.data.rides);

            if(res.data.rides.length == 0)
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

  useEffect(() => {
    fetchData();
  }, []);

  const handleConfirmation = async (e) => {

    try{
      await axios.post('/api/rideDetails/updateRider', {
        _id: rideDetail[e.target.id]._id,
        riderIds: user._id,
        rideStatus: 'booked',
        numberOfPassengers: rideDetail[e.target.id].numberOfPassengers + 1,
      })
      .then((res) => {
        if(res.status == 200)
        {
          redirect.push('/riderconfirmation')
        }
        else{
          //console.log(res.message);
          setMessage({message: res.data.message, className: 'error'})
        }
      })
    } catch(error) {
      console.log(error);
      setMessage({message: 'Something went wrong. Try again!', className: 'error'})
    }
  }

  const removeRide = (e) => {
    rideDetail.splice(e.target.id, 1);
  }

  return (
<>
{user === null ? '' : <>
        <Header> </Header>      
        <div> 
            <p id='rideconfirmhead'>
                Ride Selection
            </p>
            <p className={message.className}>{message.message}</p>  
           {rideDetail.length > 0 ? rideDetail.map((rideDetails, index) => ( 
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
                            <p>Price: ${(rideDetails.cost / 2) + 50}</p>
                        </div>
                    </div>    
                    <div className="confirm-button">
                        {/* <button > <a href='/conmessage' className='adbuttonlink'> Confirm </a> </button> */}
                        <button className='adbuttonlink' id={index} onClick={handleConfirmation}>  Confirm  </button>
                        <button className='adbuttonlink' id={index} onClick={removeRide}> Ignore  </button> 
                    </div>
                </div>
            </div>
            ) // close on line 33 ride => ( 
            ) : <></>
           }
        </div>    

    <Footer></Footer>
    </>}
</>   // body close 
  ); // return function 
}; // rideconfirm function 
export default Listofrides;
