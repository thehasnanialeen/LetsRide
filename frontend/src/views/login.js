// import React from 'react';
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import '../css/login.css'; // assuming you have a separate CSS file for styling
import Header from './header';
import Footer from './footer';
import { useHistory } from 'react-router-dom';
import axios from 'axios';



const Login = () => {
  const [message, setMessage] = useState({
    message: '',
    className: '',
  })

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const redirect = useHistory(); // function to redirect on submit 

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'email') {
      if (!isValidEmail(value)) {
        setMessage({ message: 'Please enter a valid email address.', className: 'error' });
      } else {
        setMessage({ message: '', className: '' });
      }
    }

    // Validate password
    if (name === 'password') {
      if (!isValidPassword(value)) {
        setMessage({
          message: 'Password must be at least 10 characters long and contain at least 1 number.',
          className: 'error',
        });
      } else {
        setMessage({ message: '', className: '' });
      }
    }
    setFormData({ ...formData, [name]: value });
  };

  const isValidEmail = (email) => {
    // Simple email validation using regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPassword = (password) => {
    // Password validation: at least 10 characters long and contains at least 1 number
    const passwordRegex = /^(?=.*\d).{10,}$/;
    return passwordRegex.test(password);
  };

// function to redirect to the selectride file 
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Handle form submission logic here
    try{
      await axios.post('/api/authentication/login', {
        email: formData.email,
        password: formData.password
      })
      .then((res) => {
        if(res.status == 200)
        {
          setMessage({message: res.data.message, className: 'success'})
          setTimeout(() => {
            const user = res.data.user;
            if(user.role === 'rider')
            {
              redirect.push('/listofrides');
            }
            else if(user.role === 'driver')
            {
              redirect.push('/selectride');
            }
            else if(user.role === 'admin')
            {
              redirect.push('/adminhome');
            }
            else{
              setMessage({message: 'No user role. Create a new account', className: 'error'});
            }
          }, 1000);
        }
        else{
          console.log(res.data);
          setMessage({message: res.data.message, className: 'error'})
        }
      })
    } catch(error) {
      setMessage({message: 'Something went wrong. Try again!', className: 'error'})
    }
    
  };

  return (
    <>
   <Header> </Header>
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <p className={message.className}>{message.message}</p>
        <div className="form-field">
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
        </div>
        <div className="form-field">
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
        </div>
        {/* <button type="submit"> <a href='/selectride' id='selectridelink'> Submit </a></button> */}
        <button type="submit"> Submit </button>
      </form>
      <div className="signup-option">
        Don't have an account? <a href="/signup" id='signuplink'>Sign Up</a>
      </div>
      <div className="signup-option">
        Are you someone looking for a ride? <a href="/listofrides" id='signuplink'> Login Here </a>
      </div>
      <div className="signup-option">
        Are you the big shot admin? <a href="/adminhome" id='signuplink'> Login Here </a>
      </div>
    </div>
    <footer> <Footer> </Footer></footer>
    </>
  );
};

export default Login;
