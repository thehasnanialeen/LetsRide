import '../css/adminhome.css'; 
import Header from './header';
import Footer from './footer';
// AdminHome.js
import React from 'react';
import { useHistory } from 'react-router-dom'; // Import useHistory for navigation

const Adminhome = () => {
  const history = useHistory();

  const handleApprovalsClick = () => {
    // Redirect to the Driver registration approvals page (replace '/approvals' with the actual path)
    history.push('/approval');
  };

  const handleUnregisterClick = () => {
    // Redirect to the Unregister drivers page (replace '/unregister' with the actual path)
    history.push('/unregister');
  };

  return (
    <body>
    <Header> </Header>
        <div className="admin-home">
            <div className='system-admin'> 
                <p> System Admin Home </p>
            </div>
          
            <div className="buttons-container">
            
                <button className="green-button" onClick={handleApprovalsClick}>
                Driver Registration Approvals
                </button>
                <button className="green-button" onClick={handleUnregisterClick}>
                Unregister Drivers
                </button>
            </div>
        </div>
    <Footer> </Footer>
    </body>
  );
};

export default Adminhome;


