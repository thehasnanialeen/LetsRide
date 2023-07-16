// DriverRegistration.js
import '../css/selectride.css'; // assuming you have a separate CSS file for styling
import Header from './header';
import Footer from './footer';
import React, { useState } from 'react';
import carImage from '../images/drivermoney.png';

const regdriver = () => {
  const [formData, setFormData] = useState({
    licensePhoto: '',
    licenseNumber: '',
    licenseExpiration: '',
    licensePlateNumber: '',
    carRegistrationPhoto: '',
    carRegistrationExpiration: '',
    homeAddress: '',
    carMake: '',
    carModel: '',
    carType: 'hatchback',
    additionalFields: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <body>

   <Header> </Header>
    <div className="page-container">
      <div className="left-side">
        <div className="form-container">
          <h2>Driver Registration</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-field">
              <label>License Photo Attachment:</label>
              <input type="file" name="licensePhoto" onChange={handleChange} />
            </div>
            <div className="form-field">
              <label>License Number:</label>
              <input type="text" name="licenseNumber" value={formData.licenseNumber} onChange={handleChange} />
            </div>
            <div className="form-field">
              <label>License Expiration Date:</label>
              <input type="date" name="licenseExpiration" value={formData.licenseExpiration} onChange={handleChange} />
            </div>
            {/* Add other form fields */}
            <div className="form-field">
              <label>Car Type:</label>
              <select name="carType" value={formData.carType} onChange={handleChange}>
                <option value="hatchback">Hatchback</option>
                <option value="sedan">Sedan</option>
                <option value="minisuv">Mini SUV</option>
                <option value="suv">SUV</option>
                <option value="minitruck">Mini Truck</option>
                <option value="others">Others</option>
              </select>
            </div>
            <div className="form-field">
              <label>Additional Fields:</label>
              <textarea name="additionalFields" value={formData.additionalFields} onChange={handleChange}></textarea>
            </div>
            <div className="form-submit">
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
      <div className="right-side">
        <img src={carImage} alt="Car" className="car-image" />
      </div>
    </div>
    <Footer> </Footer>
    </body>
  );
};

export default regdriver;
