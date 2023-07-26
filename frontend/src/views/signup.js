import React, { useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/signup.css';
import Header from './header';
import Footer from './footer';
//import Photo from '../images/driver1.jpg'; 

const Signup = () => {
  const redirect = useHistory(); 

  const [message, setMessage] = useState({
    message: '',
    className: '',
  })
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
    phoneNumber: '',
    role: 'rider',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      formData.firstName.trim() === '' ||
      formData.lastName.trim() === '' ||
      formData.email.trim() === '' ||
      formData.password.trim() === '' ||
      formData.confirmPassword.trim() === '' ||
      formData.dateOfBirth.trim() === '' ||
      formData.phoneNumber.trim() === ''
    ) {
      setMessage({ message: 'All fields are required.', className: 'error' });
      return;
    }

    if (!isValidEmail(formData.email)) {
      setMessage({ message: 'Invalid email format.', className: 'error' });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setMessage({ message: 'Passwords do not match.', className: 'error' });
      return;
    }
     if (!isValidPassword(formData.password)) {
      setMessage({ message: 'Password must be at least 10 characters long and contain at least one number.', className: 'error' });
      return;
    }
    if (!isValidDateOfBirth(formData.dateOfBirth)) {
      setMessage({ message: 'You must be at least 16 years old to sign up.', className: 'error' });
      return;
    }
    if (!isValidPhoneNumber(formData.phoneNumber)) {
      setMessage({ message: 'Invalid phone number. Please enter a 10-digit number.', className: 'error' });
      return;
    }

    // Handle form submission logic here
    try{
      await axios.post('/api/authentication/signup', {
        firstName: formData.firstName,
        lastName: formData.lastName,
        DOB: formData.dateOfBirth,
        email: formData.email,
        password: formData.password,
        profilePhoto: 'path',
        phoneNumber: formData.phoneNumber,
        role: formData.role,
      })
      .then((res) => {
        if(res.status == 201)
        { 
          setMessage({message: res.data.message, className: 'success'})
          setTimeout(() => {
            if(formData.role === 'driver')
            {
              redirect.push('/regdriver');
            }
            else{
              redirect.push('/login');
            }
          }, 2000);
        }
        else{
          setMessage({message: res.data.message, className: 'error'})
        }
      })
    } catch(error) {
        setMessage({message: 'Something went wrong. Try again!', className: 'error'})
    }
    //console.log(formData);
  };
  const isValidEmail = (email) => {
    // Regular expression for email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const isValidPassword = (password) => {
    // Regular expression for password validation: at least 10 characters and at least one number
    const passwordPattern = /^(?=.*\d).{10,}$/;
    return passwordPattern.test(password);
  };

  const isValidDateOfBirth = (dateOfBirth) => {
    const sixteenYearsAgo = new Date();
    sixteenYearsAgo.setFullYear(sixteenYearsAgo.getFullYear() - 16);
    return new Date(dateOfBirth) <= sixteenYearsAgo;
  };

  const isValidPhoneNumber = (phoneNumber) => {
    // Regular expression for phone number validation: 10 digits
    const phoneNumberPattern = /^\d{10}$/;
    return phoneNumberPattern.test(phoneNumber);
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
        <div className="form-field">
            <label className='role-label'>Role:</label>
            <div className="radio-options">
              <label>
                <input
                  type="radio"
                  name="role"
                  value="rider"
                  checked={formData.role === 'rider'}
                  onChange={handleChange}
                />
                Rider
              </label>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="driver"
                  checked={formData.role === 'driver'}
                  onChange={handleChange}
                />
                Driver
              </label>
            </div>
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