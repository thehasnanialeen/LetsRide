import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import '../css/signup.css';
import Header from './header';
import Footer from './footer';
import Photo from '../images/driver1.jpg'; 

const Signup = () => {
  const [message, setMessage] = useState({
    message = '',
    className = '',
  })
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
    phoneNumber: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    try{
      await axios.post('/api/authentication/signup', formData)
      .then((res) => {
        if(res.status == 201)
        {
          setMessage({message: res.message, className: 'success'})
          setTimeout(() => {
            <Redirect to="/login" />
            //redirect.push('/login');
          }, 2000);
        }
        else{
          setMessage({message: res.message, className: 'error'})
        }
      })
    } catch(error) {
      setMessage({message: error, className: 'error'})
    }
    //console.log(formData);
  };

  return (
    <body>
  
    <Header> </Header>
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <p className={message.className}>{message.message}</p>
        <div className="form-field">
          <label>First Name:</label>
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
        </div> 
        <div className="form-field">
          <label>Last Name:</label>
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
        </div>
        <div className="form-field">
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div className="form-field">
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </div>
        <div className="form-field">
          <label>Confirm Password:</label>
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
        </div>
        <div className="form-field">
          <label>Date of Birth:</label>
          <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />
        </div>
        <div className="form-field">
          <label>Phone No:</label>
          <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
        </div>
        <button type="submit">Submit</button>
      </form>
      <div className="login-option">
        Already have an account? <a href="/login" id='loginlink'>Login</a>
      </div>
    </div>
    
    <footer> 
      <Footer> </Footer>
    </footer>
    </body>
  );
};

export default Signup; 