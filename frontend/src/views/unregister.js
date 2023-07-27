import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import '../css/unregister.css'; 
import Header from './header';
import Footer from './footer'; 

const Unregister = () => {
  const redirect = useHistory(); 

  const [message, setMessage] = useState({
    message: '',
    className: '',
    })
  const [drivers, setDrivers] = useState([]);
  const [unregisterReasons, setUnregisterReasons] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState(null);

  const getDrivers = async () => {
    try{
      await axios.get(`/api/driverRegistration/getDriversList`)
      .then((res) => {
        if(res.status == 200)
        {
          //console.log(res.data.rides);
          setDrivers(res.data.driverList);

          if(res.data.driverList.length == 0)
          {
            setMessage({message: 'No drivers', className: 'error'})
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
        //console.log(user);
        if(!res.data.user)
          {
            redirect.push('/');
          }
          else{
            setUser(res.data.user);
            //console.log(user);
            if(res.data.user.role === 'rider' || res.data.user.role === 'driver')
            {
              redirect.push('/');
            }
            else
            {
              getDrivers();
            }
          }
      })
    } catch(error) {
      //console.log(error);
      setMessage({message: 'Something went wrong. Try again!', className: 'error'})
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleReasonChange = (driverId, reason) => {
    setUnregisterReasons((prevReasons) => ({ ...prevReasons, [driverId]: reason }));
  };

  const handleUnregister = (driverId) => {
    const reason = unregisterReasons[driverId];

    // Perform the unregistration API call to the backend
    // Replace 'your-backend-unregister-api-endpoint' with the actual API endpoint for unregistering drivers
    fetch(`your-backend-unregister-api-endpoint/${driverId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ reason }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the backend, e.g., show a success message or update the drivers list
        console.log(data);
      })
      .catch((error) => console.error('Error unregistering driver:', error));
  };

  const handleGoBack = () => {
    // Navigate back to the home page
    window.history.back();
  }; 

  // Filter the drivers based on the search query
  const filteredDrivers = drivers.filter((driver) =>
    `${driver.firstName} ${driver.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
    {user === null ? '' : <>
        <Header> </Header>
    <div className="unregister-drivers">
      <h2>Unregister Drivers</h2>
      <div className='search-bar'>
      <input
        type="text"
        placeholder="Search Driver Name"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      </div>
      
      <p className={message.className}>{message.message}</p>
      {filteredDrivers.map((driver) => (
        <div key={driver.id} className="driver-row">
          <div>
            <span>{driver.firstName}</span> <span>{driver.lastName}</span>
          </div>
          <input
            type="text"
            placeholder="Reason for Unregistering"
            value={unregisterReasons[driver.id] || ''}
            onChange={(e) => handleReasonChange(driver.id, e.target.value)}
          />
          <button onClick={() => handleUnregister(driver.id)}>Unregister</button>
        </div>
      ))}
      <button className="go-back-button" onClick={handleGoBack}>
        Go Back
      </button>
    </div>
      <Footer> </Footer>
        </>}
    </>
  );
};
export default Unregister;
