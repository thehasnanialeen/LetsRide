// UnregisterDrivers.js
import React, { useState, useEffect } from 'react';
import '../css/unregister.css'; 
import Header from './header';
import Footer from './footer'; 

const Unregister = () => {
  const [drivers, setDrivers] = useState([]);
  const [unregisterReasons, setUnregisterReasons] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch the list of registered drivers from the backend
    // Replace 'your-backend-api-endpoint' with the actual API endpoint for fetching drivers
    fetch('your-backend-api-endpoint')
      .then((response) => response.json())
      .then((data) => setDrivers(data))
      .catch((error) => console.error('Error fetching drivers:', error));
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
