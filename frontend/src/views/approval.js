// DriverRegistrationRequests.js
import React, { useState, useEffect } from 'react';
import '../css/approval.css'; 
import Header from './header';
import Footer from './footer';

const Approval = () => {
  const [drivers, setDrivers] = useState([]);
  const [notes, setNotes] = useState({});

  useEffect(() => {
    // Fetch the list of drivers' details from the backend
    // Replace 'your-backend-api-endpoint' with the actual API endpoint for fetching driver details
    fetch('your-backend-api-endpoint')
      .then((response) => response.json())
      .then((data) => setDrivers(data))
      .catch((error) => console.error('Error fetching drivers:', error));
  }, []);

  const handleNotesChange = (driverId, note) => {
    setNotes((prevNotes) => ({ ...prevNotes, [driverId]: note }));
  };

  const handleApprove = (driverId) => {
    const note = notes[driverId];

    // Perform the driver approval API call to the backend
    // Replace 'your-backend-approve-api-endpoint' with the actual API endpoint for approving drivers
    fetch(`your-backend-approve-api-endpoint/${driverId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: 'approved', note }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the backend, e.g., show a success message or update the drivers list
        console.log(data);
      })
      .catch((error) => console.error('Error approving driver:', error));
  };

  const handleDecline = (driverId) => {
    const note = notes[driverId];

    // Perform the driver decline API call to the backend
    // Replace 'your-backend-decline-api-endpoint' with the actual API endpoint for declining drivers
    fetch(`your-backend-decline-api-endpoint/${driverId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: 'declined', note }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the backend, e.g., show a success message or update the drivers list
        console.log(data);
      })
      .catch((error) => console.error('Error declining driver:', error));
  };

  const handleGoBack = () => {
    // Navigate back to the home page
    window.history.back();
  };

  return ( 
<body>
<Header> </Header>

    <div className="driver-registration-requests">
      <h2>Driver Registration Requests</h2>
      {drivers.map((driver) => (
        <div key={driver.id} className="driver-row">
          <div>
            <span>{driver.firstName}</span> <span>{driver.lastName}</span>
          </div>
          <input
            type="text"
            placeholder="Notes (if any)"
            value={notes[driver.id] || ''}
            onChange={(e) => handleNotesChange(driver.id, e.target.value)}
          />
          <button onClick={() => handleApprove(driver.id)}>Approve</button>
          <button onClick={() => handleDecline(driver.id)}>Decline</button>
        </div>
      ))}
      <button className="go-back-button" onClick={handleGoBack}>
        Go Back
      </button>
    </div>
    <Footer> </Footer>
</body> 
  );
};

export default Approval;
