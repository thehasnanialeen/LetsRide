// import React from 'react';
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import '../css/login.css'; // assuming you have a separate CSS file for styling
import Header from './header';
import Footer from './footer';
import { useHistory } from 'react-router-dom';

//import Photo from '../images/driver1.jpg'; 

const Login = () => {
  const [message, setMessage] = useState({
    message = '',
    className = '',
  })
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
    try{
      await axios.post('/api/authentication/login', formData)
      .then((res) => {
        if(res.status == 200)
        {
          setMessage({message: res.message, className: 'success'})
          setTimeout(() => {
            <Redirect to="/selectride" />
            //redirect.push('/selectride');
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
        <button type="submit"> <a href='/selectride' id='selectridelink'> Submit </a></button>
      </form>
      <div className="signup-option">
        Don't have an account? <a href="/signup" id='signuplink'>Sign Up</a>
      </div>
      <div className="signup-option">
        Are you someone looking for a ride? <a href="/listofrides" id='signuplink'> Login Here </a>
      </div>
    </div>
    <footer> <Footer> </Footer></footer>
    </body>
  );
};

export default Login;
