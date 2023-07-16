const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
  userID: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  license: {
    number: {type: String},
    expiryDate: {type: Date},
    photo: {type: String},
  },
  carRegistration:{
    expiryDate : {type: Date},
    photo: {type: String},
  },
  car: {
    make: {type: String},
    model: {type: String},
    year: {type: String},
    type: {type: String},
    VIN: {type: String},
    licensePlate: {type: String},
  },
  address: {
    unit: {type: String},
    streetNo: {type: String},
    streetName: {type: String},
    city: {type: String},
    province: {type: String},
    country: {type: String},
    postalCode: {type: String},
  },
  approvalStatus: {type: String, enum: ['approved', 'waiting', 'rejected'], default: 'waiting' },
  adminFeedback: [{type: String}],
});

const Driver = mongoose.model('Driver', driverSchema);

module.exports = Driver;