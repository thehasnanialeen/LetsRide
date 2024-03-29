import React, { useState, useEffect } from 'react';
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
  const [rideDriver, setRideDriver] = useState(null);

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
            setRideDetail(rideDetail = res.data.rides);

            if(res.data.rides.length == 0)
            {
              setMessage({message: 'No rides available', className: 'error'})
            }
          }
          else{
            setMessage({message: res.data.message, className: 'error'})
          }
        })
      } catch(error) {
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
          setMessage({message: res.data.message + " You will be redirected to new page in a few seconds.", className: 'success'})
          //redirect.push('/riderconfirmation')
          console.log(res.data.compRides);
          setRideDriver(res.data.compRides);
        }
        else{
          setMessage({message: res.data.message, className: 'error'})
        }
      })
    } catch(error) {
      setMessage({message: 'Something went wrong. Try again!', className: 'error'})
    }
  }

  const sendEmail = async () => {
    console.log(rideDriver);
    console.log(user);
    try{
      await axios.post('/api/sendEmail', {
        email: rideDriver.driverDetails.email,
        subject: 'Ride Booking Confirmation',
        text: `<div><br/>Dear ${rideDriver.driverDetails.firstName} ${rideDriver.driverDetails.lastName},<br/><br/>We hope this email finds you well. We are excited to inform you that the ride you posted has been booked!<br/><br/>Ride Details:<br/>- Start Location: ${rideDriver.pickupLocation}<br/>
        - End Location: ${rideDriver.dropLocation}<br/>
        - Start Time: ${rideDriver.startTime}<br/>
        - Estimated Arrival Time: ${rideDriver.endTime}<br/><br/>

        Your Rider Details:<br/>
        - Name: ${user.firstName} ${user.lastName}<br/>
        - Email: ${user.email}<br/>
        - Phone: ${user.phoneNumber}<br/><br/>
        
        Please contact your rider in advance to the ride to schedule a pickup location.<br/><br/>
        
        If you have any questions or need any assistance, feel free to reach out to our support team at letsride.help@outlook.com.<br/><br/>
        
        Thank you for choosing our service. We hope you have a pleasant ride experience.<br/><br/>
        
        Best regards,<br/>
        Let's Ride Team.</div>
        `
      })
      .then((res) => {
        redirect.push('/riderconfirmation');
      })
    } catch(error) {
      console.log(error);
    }

    try{
      await axios.post('/api/sendEmail', {
        email: user.email,
        subject: 'Ride Booking Confirmation',
        text: `<div>Dear ${user.firstName} ${user.lastName},<br/> <br/>We hope this email finds you well. We are excited to inform your ride has been booked!<br/> <br/>Ride Details:<br/>- Start Location: ${rideDriver.pickupLocation}<br/>- End Location: ${rideDriver.dropLocation}<br/>- Start Time: ${rideDriver.startTime}<br/>- Estimated Arrival Time: ${rideDriver.endTime}<br/><br/>Your Driver Details:<br/>- Name: ${rideDriver.driverDetails.firstName} ${rideDriver.driverDetails.lastName}<br/>- Email: ${rideDriver.driverDetails.email}<br/>- Phone: ${rideDriver.driverDetails.phoneNumber}<br/><br/>Please contact your driver in advance to the ride to schedule a pickup location.<br/><br/>If you have any questions or need any assistance, feel free to reach out to our support team at letsride.help@outlook.com.<br/><br/>Thank you for choosing our service. We hope you have a pleasant ride experience.<br/><br/>Best regards,<br/>Let's Ride Team.`
      })
      .then((res) => {
        redirect.push('/riderconfirmation');
      })
    } catch(error) {
      console.log(error);
    }
  }

  useEffect(() => {
    console.log(rideDriver);
    console.log(user);
    if(rideDriver != null && user != null){
      console.log()
      sendEmail();
    }
  }, [rideDriver]);

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
                            <p>Price: ${((rideDetail.cost / 2) + 50).toFixed(2)}</p>
                        </div>
                    </div>    
                    <div className="confirm-button">
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
