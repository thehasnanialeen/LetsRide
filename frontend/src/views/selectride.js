
import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import carImage from '../images/tesla.jpg';
import Header from './header';
import Footer from './footer';
import '../css/selectride.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Selectride = () => {
  const redirect = useHistory();

  const [loadForm, setLoadForm] = useState(false);

  const [user, setUser] = useState(null);
  const [message, setMessage] = useState({
    message: '',
    className: '',
  })
  const [formData, setFormData] = useState({
    startLocation: '',
    destination: '',
    passengerCount: '1',
    pickupTime: '',
    pickupDate: '',
  })

  const [formErrors, setFormErrors] = useState({
    startLocation: '',
    destination: '',
    passengerCount: '',
    pickupTime: '',
    pickupDate: '',
  });

  

  const [dataToSend, setDataToSend] = useState(null);

  const fetchDriverData = async (id) => {
    try{
      await axios.get(`/api/driverRegistration/getDriverDetails?userId=${id}`)
      .then((res) => {
        if(res.status == 201)
        {
          const driver = res.data.driver;
          if(driver.approvalStatus === 'waiting')
          {
            redirect.push('/regdrivercon');
          }
          else if(driver.approvalStatus === 'rejected')
          {
            redirect.push('/driverRegistrationRejected');
          }
          else{
            console.log(loadForm);
            setLoadForm(true);
          }
        }
        else if(res.status == 200)
        {
          redirect.push('/regdriver');
        }
        else
        {
          setMessage({message: res.data.message, className: 'error'});
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
        if(!res.data.user)
          {
            redirect.push('/');
          }
          else{
            setUser(res.data.user);
            if(res.data.user.role === 'rider')
            {
              redirect.push('/');
            }
            fetchDriverData(res.data.user._id);
          }
      })
    } catch(error) {
      console.log(error);
      setMessage({message: 'Something went wrong. Try again!', className: 'error'})
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // const handleBlur = (e) => {
  //   const { name, value } = e.target;
  //     console.log(value.trim()+" " + !value.trim())
  //   if (!value.trim()) {
  //     setFormErrors({ ...formErrors, [name]: 'This field is required' });
  //   } 
    
  // };

  // const isFormValidd = () => {
  //   return Object.values(formErrors).every((error) => error === '');
  // };

  const handleSubmit =  (e) => {
    e.preventDefault();
    //const today = new Date()
    // // let isFormValid = true;
    // if (!isFormValidd()) {
    //   setMessage({ message: 'Please fill in all the fields.', className: 'error' });
    //   // isFormValid = false;
    // }
    // else if (formData.pickupDate <= today.toLocaleDateString('en-CA'))
    // {
    //   setMessage({ message: 'Travel date not accepted', className: 'error' });
    //   // isFormValid = false;
    //   setFormErrors({ ...formErrors, [name]: 'This field is required' });
    // }

    let arr = [];
    let valid = true;
    const today = new Date();

    if (
      formData.startLocation.trim() === '' ||
      formData.destination.trim() === '' ||
      formData.passengerCount.trim() === '' ||
      formData.pickupTime.trim() === '' ||
      formData.pickupDate.trim() === ''
    ) {
      valid = false;
      arr.push('Please fill in all the fields.');
    }
    else{
      if(formData.pickupDate <= today.toLocaleDateString('en-CA'))
      {
        valid = false;
        arr.push('Travel date not accepted');
      }
    }

    if(arr.length != 0)
    {
      setMessage({ message: arr[0], className: 'error' });
    }

    if(valid === true)
    {
    // if (isFormValid === true){

    // const date = moment(formData.pickupDate, 'YYYY-MM-DD');
    // //date = moment(date, 'YYYY-MM-DD h:mm a');
    // const time = moment(formData.pickupTime, 'h:mm a');
    // const date_time = moment(`${date} ${time}`, 'YYYY-MM-DD h:mm a')
    //form validation
    console.log(formData.pickupDate);
    console.log(formData.pickupTime);
    
    //if form passes validation
    const data = {
      pickupLocation: formData.startLocation,
      dropLocation: formData.destination,
      startTime: formData.pickupDate + 'T' + formData.pickupTime,
      numberOfPassengers: formData.passengerCount,
    }
    setDataToSend(data);
   }
  };

  useEffect(() => {
    if (dataToSend !== null) {
      //document.getElementById('goToMapPage').click();
      //redirect.push(`/drivermap?pickupLocation=${dataToSend.pickupLocation}&dropLocation=${dataToSend.dropLocation}&startTime=${dataToSend.startTime}&numberOfPassengers=${dataToSend.numberOfPassengers}`)
      redirect.push(`/drivermap/${dataToSend.pickupLocation}/${dataToSend.dropLocation}/${dataToSend.startTime}/${dataToSend.numberOfPassengers}`)
    
    }
  }, [dataToSend]); // Add dataToSend as a dependency to the useEffect hook


  return (
    <>
    {user === null || !loadForm ? '' : <>
    <Header> </Header>
    <div className="ride-form-container">
      <div className="left-side">
        <img src={carImage} alt="Car" className="car-image" />
      </div>
      <div className="right-side">
        <div className="form-container">
          <h2>Looking for a person to share ride with? - Fill in below</h2>
          <h3>Your Ride Information</h3>
          <p className={message.className}>{message.message}</p>
          <form>
            <div className="form-field">
              <label>Start location:</label>
              <input type="text" name="startLocation" placeholder='Street, City, Province, Postal code ' value={formData.startLocation} onChange={handleChange} />
              {formErrors.startLocation && <span className="error-message">{formErrors.startLocation}</span>}
            </div>
            <div className="form-field">
              <label>Destination:</label>
              <input type="text" name="destination"  placeholder='Street, City, Province, Postal code ' value={formData.destination} onChange={handleChange} />
              {formErrors.destination && <span className="error-message">{formErrors.destination}</span>}
            </div>
            <div className="form-field">
              <label>Number of Passengers:</label>
              <select name="passengerCount" value={formData.passengerCount} onChange={handleChange} >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              {formErrors.passengerCount && <span className="error-message">{formErrors.passengerCount}</span>}
            </div>
            <div className="form-field">
              <label>Start time:</label>
              <input type="time" name="pickupTime" value={formData.pickupTime} onChange={handleChange} />
              {formErrors.pickupTime && <span className="error-message">{formErrors.pickupTime}</span>}
            </div>
            <div className="form-field">
              <label>Start date:</label>
              <input type="date" name="pickupDate" value={formData.pickupDate} onChange={handleChange} />
              {formErrors.pickupDate && <span className="error-message">{formErrors.pickupDate}</span>}
            </div>
            <div className="form-submit">
              {/* <button type="submit"> <a href='/conmessage' id='rideconfirmlink'> Submit </a></button> */}
              <button type="submit" id='rideconfirmlink' onClick={handleSubmit}>  Submit </button>
            </div>
          </form>
          {/* <button className="d-none" >
            <Link id="goToMapPage" to={{
              pathname: '/drivermap',
              search: `?pickupLocation=${dataToSend.pickupLocation}&dropLocation=${dataToSend.dropLocation}&startTime=${dataToSend.startTime}&numberOfPassengers=${dataToSend.numberOfPassengers}` }}>Go to Map Page</Link>
          </button> */}
          {/* <div className="register-driver">
            <button> <a href='/regdriver' id='regasdriverlink'>Register as a Driver </a></button>
          </div> */}
        </div>
      </div>
    </div>
    
    <footer>
        <Footer> </Footer>
    </footer>
    </>}
    </>
  );
};

export default Selectride;
