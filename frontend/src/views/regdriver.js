// DriverRegistration.js
import '../css/selectride.css'; // assuming you have a separate CSS file for styling
import Header from './header';
import Footer from './footer';
import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import carImage from '../images/drivermoney.png';

const Regdriver = () => {
  const redirect = useHistory(); 

  const [message, setMessage] = useState([]);

  const [user, setUser] = useState({
      // _id: "64b3340512477934819cf6d0",
      // firstName: 'Aleen',
      //  lastName: 'Hasnani',
      //  DOB: "2001-08-09T00:00:00.000Z",
      //  email: 'ahj126@uregina.ca',
      //  password: '$2b$10$BDsDFCloN.fMI/QAjaWSquQ58OIe0AmFHLbqj.1c6DCW2DbLp4MfW',
      //  profilePhoto: 'path',
      //  phoneNumber: 3069998989,
      //  role: 'admin'
      });
  const [photo, setPhoto] = useState({
    licensePhoto: null,
    carRegistrationPhoto: null,
  })
  const [formData, setFormData] = useState({
    licensePhoto: null,
    licenseNumber: '',
    licenseExpiration: '',
    licensePlateNumber: '',
    carRegistrationPhoto: null,
    carRegistrationExpiration: '',
    homeAddress: '',
    carMake: '',
    carModel: '',
    carType: 'hatchback',
    year: '',
    VIN: '',
    additionalFields: '',
  });

  const fetchData = async () => {
    try{
      await axios.get('/api/userSession')
      .then((res) => {
        //console.log(res.data.user);
        setUser(res.data.user);
      })
    } catch(error) {
      setMessage({message: 'Something went wrong. Try again!', className: 'error'})
    }
  }

  useEffect(() => {
    //fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setPhoto({ ...photo, [e.target.name]: e.target.files[0] });
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

  const uploadFormData = async () => {
    try{
      await axios.post('/api/driverRegistration/register', {
        userID: user._id,
        license: {
          number: formData.licenseNumber,
          expiryDate: formData.licenseExpiration,
          photo: formData.licensePhoto,
        },
        carRegistration:{
          expiryDate : formData.carRegistrationExpiration,
          photo: formData.carRegistrationPhoto,
        },
        car: {
          make: formData.carMake,
          model: formData.carModel,
          year: formData.year,
          type: formData.carType,
          VIN: formData.VIN,
          licensePlate: formData.licensePlateNumber,
        },
        address: {
          streetName:  formData.homeAddress,
        },
      })
      .then((res) => {
        if(res.status == 201)
        {
          redirect.push('/regdrivercon');
        }
        else{
          setMessage(message.push(res.data.message));
        }
      })
    } catch(error) {
      setMessage(message.push('Something went wrong. Try again!'));
    }
  };

  const uploadPhotos = async () => {
    try{

      const formData = new FormData();
      formData.append('files', photo.licensePhoto, user._id+"-License."+photo.licensePhoto.name.substring(photo.licensePhoto.name.lastIndexOf('.') + 1));
      formData.append('files', photo.carRegistrationPhoto, user._id+"-CarRegistration."+photo.carRegistrationPhoto.name.substring(photo.carRegistrationPhoto.name.lastIndexOf('.') + 1));

      await axios.post('http://localhost:5000/api/uploadFile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        if(res.status == 200){
          //setFormData({ ...formData, ["licensePhoto"]: res.data.filePath });
          //uploadFormData();
          console.log(res.data.filePaths);

          setMessage(message.push('File uploaded successfully!'));
        }
        else{
          setMessage(message.push(res.data.message));
        }
      })
    } catch(error) {
        //console.log(error);
        setMessage(message.push('Something went wrong while uploading License Photo. Try again!'));
      }
  };

  const handleSubmit = async () => {
    e.preventDefault();

    setMessage([]);
    const valid = true;
    const today = new Date();

    if (
      formData.licenseNumber.trim() === '' ||
      formData.licenseExpiration.trim() === '' ||
      formData.licensePlateNumber.trim() === '' ||
      formData.carRegistrationExpiration.trim() === '' ||
      formData.homeAddress.trim() === '' ||
      formData.carMake.trim() === '' ||
      formData.carModel.trim() === '' ||
      formData.carType.trim() === '' ||
      formData.year.trim() === '' ||
      formData.VIN.trim() === ''
    ) {
      valid = false;
      setMessage(message.push('All fields are required'));
    }
    else{
      if(formData.licensePhoto == null)
      {
        valid = false;
        setMessage(message.push('License Photo not uploaded'));
      }
      if(formData.carRegistrationPhoto == null)
      {
        valid = false;
        setMessage(message.push('Car Registration Photo not uploaded'));
      }
      if(formData.licenseExpiration <= today)
      {
        valid = false;
        setMessage(message.push('Expired License is not accepted'));
      }
      if(formData.carRegistrationExpiration <= today)
      {
        valid = false;
        setMessage(message.push('Expired Car Registration is not accepted'));
      }
      if(formData.year > today.getFullYear())
      {
        valid = false;
        setMessage(message.push('Invalid Car Year'));
      }
    }

    if(valid == true)
    {
      uploadPhotos();
    }

    return;
  };

  return (
    <>
   <Header> </Header>
    <div className="page-container">
      <div className="left-side">
        <div className="form-container">
          <h2>Driver Registration</h2>
          {message.map((error, index) => (
            <p className="error">{error}</p>
          ))}
          <form onSubmit={handleSubmit}>
            <div className="form-field">
              <label>License Photo Attachment:</label>
              <input type="file" name="licensePhoto" onChange={handleFileChange} accept="image/*"/>
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
              <label>Car Registration Photo Attachment:</label>
              <input type="file" name="carRegistrationPhoto" onChange={handleFileChange} accept="image/*"/>
            </div>
            <div className="form-field">
              <label>Car Registration Expiration Date:</label>
              <input type="date" name="carRegistrationExpiration" value={formData.carRegistrationExpiration} onChange={handleChange} />
            </div>
            <div className="form-field">
              <label>Home Address: </label>
              <input type="text" name="homeAddress" value={formData.homeAddress} onChange={handleChange}  placeholder='Street, City, Province, Postal'/>
            </div>
            <div className="form-field">
              <label>Car Make:</label>
              <input type="text" name="carMake" value={formData.carMake} onChange={handleChange}/>
            </div>
            <div className="form-field">
              <label>Year:</label>
              <input type="text" name="year" value={formData.year} onChange={handleChange}/>
            </div>
            <div className="form-field">
              <label>VIN:</label>
              <input type="text" name="VIN" value={formData.VIN} onChange={handleChange}/>
            </div>
            <div className="form-field">
              <label>Car Model:</label>
              <input type="text" name="carModel" value={formData.carModel} onChange={handleChange}/>
            </div>
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
            {/* <div className="form-field">
              <label>Additional Fields:</label>
              <textarea name="additionalFields" value={formData.additionalFields} onChange={handleChange}></textarea>
            </div> */}
            <div className="form-submit">
              {/* <button type="submit"> <a href='/regdrivercon' id='regdriverconlink'>Submit</a></button> */}
              <button type="submit" id='regdriverconlink'>Submit</button>
            </div>
          </form>
        </div>
      </div>
      <div className="right-side">
        <img src={carImage} alt="Car" className="car-image" />
      </div>
    </div>
    <Footer> </Footer>
    </>
  );
};

export default Regdriver;
