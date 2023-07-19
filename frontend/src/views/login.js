// import React from 'react';
import React, { useState } from 'react';
import '../css/login.css'; // assuming you have a separate CSS file for styling
import Header from './header';
import Footer from './footer';
import { useHistory } from 'react-router-dom';

//import Photo from '../images/driver1.jpg'; 

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const redirect = useHistory(); // function to redirect on submit 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
// function to redirect to the selectride file 
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData); 
    redirect.push('/selectride');
  };

  return (
    <body>
   <Header> </Header>
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="form-field">
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
        </div>
        <div className="form-field">
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
        </div>
        <button type="submit"> <a href='/selectride' id='selectridelink'> Submit </a></button>
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
    </body>
  );
};

export default Login;
