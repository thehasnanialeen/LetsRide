import '../css/adminhome.css'; 
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Header from './header';
import Footer from './footer';

const Adminhome = () => {
  const redirect = useHistory(); 
  let [message, setMessage] = useState([]);

  const [user, setUser] = useState(null);

  const handleApprovalsClick = () => {
    // Redirect to the Driver registration approvals page (replace '/approvals' with the actual path)
    redirect.push('/approval');
  };

  const handleUnregisterClick = () => {
    // Redirect to the Unregister drivers page (replace '/unregister' with the actual path)
    redirect.push('/unregister');
  };

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
  }, []);

  return (
    <>
    {user === null ? '' : <>
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
    </>}
    </>
  );
};

export default Adminhome;


