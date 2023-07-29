// DriverRegistrationRequests.js
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import '../css/approval.css'; 
import Header from './header';
import Footer from './footer';

const Approval = () => {
  const redirect = useHistory(); 

  const [message, setMessage] = useState({
      message: '',
      className: '',
      })
  const [user, setUser] = useState(null);
  const [drivers, setDrivers] = useState([]);
  const [notes, setNotes] = useState({});
  const [emailData, setEmailData] = useState(null);

  const fetchData = async () => {
    try{
      await axios.get('/api/userSession')
      .then((res) => {
        //console.log(res.data.user);
        if(!res.data.user)
          {
            redirect.push('/');
          }
          else{
            setUser(res.data.user);
          }
      })
    } catch(error) {
      setMessage([...message, 'Something went wrong. Try again!'])
    }
  }

  useEffect(() => {
    fetchData();
    fetchDriversList();
  }, []);

  const fetchDriversList = async () => {
      try{
        await axios.get('/api/driverRegistration/getApprovalList')
        .then((res) => {
          if(res.status == 200)
          {
            //console.log(res.data.rides);
            const driversList = res.data.driverList;

            if(driversList == 0)
            {
              setMessage({message: 'No drivers for approval', className: 'error'})
            }
            console.log(driversList);
            setDrivers(driversList);
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

  const handleNotesChange = (driverId, note) => {
    setNotes((prevNotes) => ({ ...prevNotes, [driverId]: note }));
  };

  const handleStatus = async (driverId, status, index) => {
    const note = notes[driverId];

    try{
      await axios.post('/api/driverRegistration/setApprovalStatus', {
        driverID: driverId,
        approvalStatus: status,
        adminFeedback: note,
      })
      .then((res) => {
        if(res.status == 200)
        {
          setMessage({message: res.data.message, className: 'success'})
          const data = {
            driver: drivers[index],
            status: status,
            adminFeedback: note,
          }
          setEmailData(data);
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

  useEffect( async() => {
    try{
      await axios.post('/api/sendEmail', {
        email: emailData.driver.userDetails.email,
        subject: 'Driver Registration Status Changed',
        text: `
        Dear ${ emailData.driver.userDetails.firstName} ${ emailData.driver.userDetails.lastName},
        
        We hope this email finds you well. This is to inform that your driver registration has been ${ emailData.status} by our team.
        
        Admin Feedback: ${emailData.adminFeedback}.
        
        If your registration was rejected and you would like to register again with new details then please reply back to this email.
        
        If you have any questions or need any assistance, feel free to reach out to our support team at letsride.help@outlook.com.
        
        Thank you for choosing our service. We hope you have a pleasant ride experience.
        
        Best regards,
        Let's Ride Team.
        `
      })
      .then((res) => {
        setTimeout(() => {
          setMessage({message: '', className: 'success'})
        }, 1000);
      })
    } catch(error) {
      console.log(error);
    }
  }, [emailData]);

  const handleGoBack = () => {
    // Navigate back to the home page
    window.history.back();
  };

  return ( 
<>
{user === null ? '' : <>
<Header> </Header>

    <div className="driver-registration-requests">
      <h2>Driver Registration Requests</h2>
      <p className={message.className}>{message.message}</p>
      {drivers.map((driver, index) => (
        <div key={driver._id} className="driver-row"> 
            <div className='table-head'>
              <span>{driver.userDetails.firstName}</span> <span>{driver.userDetails.lastName}</span>
              <span> {driver.user} </span>
            </div>
            {/* Additional details table */}
            <table className="additional-details">
              <tbody>
                <tr>
                  <td>License Photo:</td>
                  <td>{driver.license.photo}</td>
                </tr>
                <tr>
                  <td>License Number:</td>
                  <td>{driver.license.number}</td>
                </tr>
                <tr>
                  <td>License Expiration:</td>
                  <td>{driver.license.expiryDate}</td>
                </tr>
                <tr>
                  <td>License Plate Number:</td>
                  <td>{driver.licensePlateNumber}</td> 
                </tr>
                <tr>
                  <td>Car Registration Photo:</td>
                  <td>{driver.carRegistration.photo}</td>
                </tr>
                <tr>
                  <td>Car Registration Expiration:</td>
                  <td>{driver.carRegistration.expiryDate}</td>
                </tr>
                <tr>
                  <td>Home Address:</td>
                  <td>{driver.address.postalCode}</td>
                </tr>
                <tr>
                  <td>Car Make:</td>
                  <td>{driver.car.make}</td>
                </tr>
                <tr>
                  <td>Car Model:</td>
                  <td>{driver.car.model}</td>
                </tr>
                <tr>
                  <td>Car Type:</td>
                  <td>{driver.car.type}</td>
                </tr>
                <tr>
                  <td>Year:</td>
                  <td>{driver.car.year}</td>
                </tr>
                <tr>
                  <td>VIN:</td>
                  <td>{driver.car.VIN}</td>
                </tr>
                <tr>
                  <td>Additional Fields:</td>
                  <td>{driver.additionalFields}</td>
                </tr>
              </tbody>
            </table>
            {/* End of additional details table */}
            <div className='buttons-container'> 
              <button onClick={() => handleStatus(driver._id, 'approved', index)}>Approve</button>
              <button onClick={() => handleStatus(driver._id, 'rejected', index)}>Decline</button>
            </div>
          </div>
        ))}
        <button className="go-back-button" onClick={handleGoBack}>
          Go Back
        </button>
      </div>
      <Footer />
      </>}
    </>
  );
};

export default Approval;
