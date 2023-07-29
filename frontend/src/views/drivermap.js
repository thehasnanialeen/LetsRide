import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import Header from './header';
import Footer from './footer';
import Photo from '../images/elantra.jpg'; 
import '../css/drivermap.css';
//import MapQuest from 'mapquest-api';
//import L from 'mapquest';
//import 'mapquest/dist/mapquest.css';
// import { MapQuest } from 'mapquest-js';
// import { MapQuestMap, RouteLayer } from 'mapquest-react-components';
// require("dotenv").config();

const Drivermap = () => {
    const redirect = useHistory(); 
    //console.log("Hello!!!")
    const currentDate = new Date();
    const [momentStart, setMomentStart] = useState('');
    const [momentEnd, setMomentEnd] = useState('');
    //const location = useLocation();
    const {pickupLocation, dropLocation, startTime, numberOfPassengers} = useParams();
    //console.log(pickupLocation + dropLocation + startTime + numberOfPassengers);
    const rideData = {
        pickupLocation: pickupLocation,
        dropLocation: dropLocation, 
        startTime: startTime, 
        numberOfPassengers: numberOfPassengers,
    }
    //rideData = JSON.parse(rideData);
    //console.log(rideData);
    //rideData.startTime = rideData.startTime.toDate();

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
                
                console.log(res.data.user);
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
                    console.log(res.data.data.durationInSecs);
                    let dateNow = moment(rideData.startTime).toDate();
                    dateNow.setSeconds(dateNow.getSeconds() + res.data.data.durationInSecs);
                    //const endDate = moment(dateNow);
                    const endDate = dateNow;

                    const mmomentStart = moment(rideData.startTime);
                    const mmomentEnd = moment(endDate);

                    setMomentStart(mmomentStart);
                    setMomentEnd(mmomentEnd);

                    console.log(mmomentEnd.diff(mmomentStart, 'milliseconds'))

                    console.log()
                    console.log(momentStart);
                    console.log(momentEnd);
                    
                    console.log(endDate);
                    console.log(rideData.startTime);
                    const data = {
                        driverUserID: '',
                        pickupLocation: rideData.pickupLocation,
                        dropLocation: rideData.dropLocation,
                        startTime: rideData.startTime,
                        endTime: endDate,
                        distance: res.data.data.distance,
                        duration: res.data.data.duration,
                        numberOfPassengers: rideData.numberOfPassengers,
                        cost: res.data.data.cost,
                        rideStatus: 'posted',
                    }
                    console.log(data);
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

            // const map = new MapQuest({ key: process.env.MAPQUEST_API_Key });

            // // Get the directions
            // map.directions().route({
            //   locations: [startLocation, endLocation],
            //   options: {
            //     unit: 'k',
            //     routeType: 'fastest',
            //   },
            //   onSuccess: (data) => {
            //     // Process the directions data, e.g., set it to state
            //     console.log(data);
            //   },
            //   onError: (error) => {
            //     console.error(error);
            //   },
            // });
        //     console.log(L.mapquest);
        //     L.mapquest.key = '3YMqVrChiwCSOjmf8gy7eSqoCXdD1fjR';
            
        // var map = L.mapquest.map('map', {
        //   center: [40.7128, -74.0059],
        //   layers: L.mapquest.tileLayer('map'),
        //   zoom: 13
        // });

        // L.mapquest.directions().route({
        //   start: '350 5th Ave, New York, NY 10118',
        //   end: 'One Liberty Plaza, New York, NY 10006'
        // });

    //     var map,
    //     dir;
      
    //   map = L.map('map', {
    //     layers: MQ.mapLayer(),
    //     center: [ 38.895345, -77.030101 ],
    //     zoom: 15
    //   });
      
    //   dir = MQ.routing.directions();
      
    //   dir.route({
    //     locations: [
    //       '1600 pennsylvania ave, washington dc',
    //       '935 pennsylvania ave, washington dc'
    //     ]
    //   });
      
    //   map.addLayer(MQ.routing.routeLayer({
    //     directions: dir,
    //     fitBounds: true
    //   }));
//     const mapQuest = new MapQuest({
//         key: '3YMqVrChiwCSOjmf8gy7eSqoCXdD1fjR',
//       });
  
//       const map = mapQuest.map('map', {
//         center: [40.7128, -74.0060],
//         layers: mapQuest.tileLayer('map'),
//         zoom: 12,
//       });
  
//       mapQuest.directions().route({
//         start: 'New York, NY',
//         end: 'Boston, MA',
//       });
        }
    };
    
    useEffect(() => {
        fetchData();
    }, []);

    const handleConfirmation = async (e) => {
        setRideDetail( {...rideDetail, driverUserID: user._id})
        // console.log(momentStart);
        // console.log(momentEnd);
        // console.log(momentEnd.diff(momentStart, 'milliseconds'));
        try{
            await axios.post('/api/rideDetails/post', {rideDetail, timeLeft: (momentEnd.diff(momentStart, 'milliseconds')) })
            .then((res) => {
                if(res.status == 201)
                {
                    setMessage({message: res.data.message, className: 'success'});
                    setTimeout(() => {
                        redirect.push('/conmessage');
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
    {/* {user === null ||*/ rideDetail === null ? '' : <> 
        <Header> </Header>      
        <div className='page-container'> 
            <p id='rideconfirmhead'>Ride Details</p>
            <p className={message.className}>{message.message}</p>
            <div className='left-side'>
                <div className="ride-details-container" key={rideDetail._id}>
                    <div className="left-column">
                        {/* <h2>Ride Details</h2> */}
                        {/* <div className="car-image-container">
                            <img src={Photo} alt="Car" />
                        </div> */} 
                            {/* <p id='carname'> Hyundai Elantra </p> */}
                        <div className="info-item"> 
                            <p>Destination: {rideDetail.dropLocation} </p>
                        </div>
                        <div className="info-item"> 
                            <p>Pick Up Location:  {rideDetail.pickupLocation}  </p>
                        </div>
                        <div className="info-item"> 
                            <p className=''>No of Passengers: <span className='answer'> {rideDetail.numberOfPassengers} </span>  </p>
                        </div> 
                        <div className="info-item"> 
                            <p>Distance: <span className='answer'> {rideDetail.distance} Km</span></p>
                        </div>
                    </div> 
                    <div className="right-column">  
                        <div className='userdetails'> 
                            
                            <div className="info-item">
                                <p>Duration: <span className='answer'> {rideDetail.duration} </span></p>
                            </div>
                            <div className="info-item">
                                <p>Pick Up Time:  <span className='answer'> {moment(rideDetail.startTime).format('YYYY-MM-DD')} {moment(rideDetail.startTime).format('h:mm a')} </span></p>
                            </div>
                            <div className="info-item">
                                <p>Drop Off Time:  <span className='answer'> {moment(rideDetail.endTime).format('YYYY-MM-DD')} {moment(rideDetail.endTime).format('h:mm a')} </span></p>
                            </div>
                            <div className="info-item">
                                <p>You will get: ${((rideDetail.cost / 2) + 50).toFixed(2)}</p>
                            </div>
                        </div>    
                        <div className="confirm-button">
                            <button className='adbuttonlink' onClick={handleConfirmation}>  Confirm  </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="right-side">
            <MapQuestMap center={[37.7749, -122.4194]} zoom={12}>
                <RouteLayer />
            </MapQuestMap>
            <div id="map" style="width: 100%; height: 530px;"></div>
            </div>  */}
        </div>    
        <Footer></Footer>
    </>}
    </>  
  ); 
}; 

export default Drivermap;
