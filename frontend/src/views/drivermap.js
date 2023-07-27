import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import Header from './header';
import Footer from './footer';
import Photo from '../images/elantra.jpg'; 
import '../css/drivermap.css';


const Drivermap = () => {
    const redirect = useHistory(); 

    const location = useLocation();
    const rideData = location.state.data;

    const [message, setMessage] = useState({
        message: '',
        className: '',
    })

    const [rideDetail, setRideDetail] =  useState(null);
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
        
        if(rideData)
        {
            try{
                await axios.post('/api/rideDistancePrice', {
                    pickupLocation: rideData.pickupLocation,
                    dropLocation: rideData.dropLocation,
                })
                .then((res) => {
                if(res.status == 201)
                {
                    const data = {
                        driverUserID: '',
                        pickupLocation: rideData.pickupLocation,
                        dropLocation: rideData.dropLocation,
                        startTime: rideData.startTime,
                        endTime: moment(rideData.startTime).add(res.data.durationInSecs, 'seconds'),
                        distance: res.data.distance,
                        duration: res.data.duration,
                        numberOfPassengers: rideData.numberOfPassengers,
                        cost: res.data.cost,
                        rideStatus: 'posted',
                    }
                    setRideDetail(data);
                }
                else{
                    setMessage({message: res.data.message, className: 'error'})
                }
                })
            } catch(error) {
                //console.log(error);
                setMessage({message: 'Something went wrong. Try again!', className: 'error'})
            }
        }
    };
    
    useEffect(() => {
        fetchData();
    }, []);

    const handleConfirmation = async (e) => {
        setRideDetail( {...rideDetail, driverUserID: user._id})
        try{
            await axios.post('/api/rideDetails/post', {rideDetail})
            .then((res) => {
                if(res.status == 201)
                {
                    setMessage({message: res.data.message, className: 'success'});
                    setTimeout(() => {
                        redirect.push('/selectride');
                    }, 1000);
                }
                else{
                    setMessage({message: res.data.message, className: 'error'});
                }
            })
        } catch(error) {
            //console.log(error);
            setMessage({message: 'Something went wrong. Try again!', className: 'error'});
        }
    }

  return (
    <>
    {user === null || rideDetail === null ? '' : <>
        <Header> </Header>      
        <div className='page-container'> 
            <p id='rideconfirmhead'>Ride Selection</p>
            <p className={message.className}>{message.message}</p>
            <div className='left-side'>
                <div className="ride-details-container" key={rideDetail._id}>
                    <div className="left-column">
                        <h2>Ride Details</h2>
                        <div className="car-image-container">
                            <img src={Photo} alt="Car" />
                        </div>
                            <p id='carname'> Hyundai Elantra </p>
                        <div className="info-item"> 
                            <p>Destination: {rideDetail.dropLocation} </p>
                        </div>
                        <div className="info-item"> 
                            <p>Pick Up Location:  {rideDetail.pickupLocation}  </p>
                        </div>
                    </div> 
                    <div className="right-column">  
                        <div className='userdetails'> 
                            <div className="info-item"> 
                                <p className=''>No of Passengers: <span className='answer'> {rideDetail.numberOfPassengers} </span>  </p>
                            </div> 
                            <div className="info-item"> 
                                <p>Distance: <span className='answer'> {rideDetail.distance} </span></p>
                            </div>
                            <div className="info-item">
                                <p>Duration: <span className='answer'> {rideDetail.duration} </span></p>
                            </div>
                            <div className="info-item">
                                <p>Pick Up Time:  <span className='answer'> {rideDetail.startTime} </span></p>
                            </div>
                            <div className="info-item">
                                <p>Drop Off Time:  <span className='answer'> {rideDetail.endTime} </span></p>
                            </div>
                            <div className="info-item">
                                <p>Price: ${(rideDetail.cost / 2) + 50}</p>
                            </div>
                        </div>    
                        <div className="confirm-button">
                            <button className='adbuttonlink' id={index} onClick={handleConfirmation}>  Confirm  </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="right-side">
                <img src={carImage} alt="Car" className="car-image" />
            </div> 
        </div>    
        <Footer></Footer>
    </>}
    </>  
  ); 
}; 

export default Drivermap;
