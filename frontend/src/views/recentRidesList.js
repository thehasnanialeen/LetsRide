import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import Header from './header';
import Footer from './footer';
import '../css/recentRidesList.css';

const RecentRidesList = () => {
    const redirect = useHistory(); 

    const [message, setMessage] = useState({
      message: '',
      className: '',
    })
    const [user, setUser] = useState(null);
    let [rideDetail, setRideDetail] =  useState([]);

    const getRides = async (id) => {
      try{
        await axios.get(`/api/rideDetails/getRidesListByUser?id=${id}`)
        .then((res) => {
          if(res.status == 200)
          {
            console.log(res.data.rides);
            setRideDetail(rideDetail = res.data.rides);

            if(res.data.rides.length == 0)
            {
              setMessage({message: 'No rides to rate', className: 'error'})
            }
            //<Redirect to="/conmessage" />
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

    const fetchData = async () => {
        try{
            await axios.get('/api/userSession')
            .then((res) => {
              
              //console.log(res.data);
              if(!res.data.user)
              {
                redirect.push('/');
              }
              else{
                setUser(res.data.user);
                getRides(res.data.user._id);
              }
            })
          } catch(error) {
            setMessage({message: 'Something went wrong. Try again!', className: 'error'})
          }
      };
    
      useEffect(() => {
        fetchData();
      }, []);

  const handleRateButtonClick = (id) => {
    console.log(`Rating ride with ID: ${id}`);
  };

  return (
    <>
        {user === null ? '' : <>
            <Header> </Header>  
            <div className="ride-list">
            <h2>List of Rides</h2>
            <p className={message.className}>{message.message}</p>
            <ul>
                {rideDetail.length > 0 ? rideDetail.map((ride) => (
                <li key={ride._id}>
                    <div>
                    <p>Driver: {ride.driverDetails.firstName} {ride.driverDetails.lastName}</p>
                    <p>From: {ride.pickupLocation}</p>
                    <p>To: {ride.dropLocation}</p>
                    <p>Date: {moment(ride.startTime).format('YYYY-MM-DD')}</p>
                    <p>Time: {moment(ride.startTime).format('h:mm a')}</p>
                    </div>
                    <button>
                        <Link 
                            to={{
                                pathname: '/ratings',
                                search: `?ride_id=${ride._id}&driver_id=${ride.driverUserID}`,
                              }}
                        >Rate</Link>
                    </button>
                </li>
                )) : ''}
            </ul>
            </div>
            <Footer></Footer>
        </>}
    </>
  );
};

export default RecentRidesList;