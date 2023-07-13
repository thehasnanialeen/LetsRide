const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
  driverID: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver', required: true },
  riderIDs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
  totalNoOfPassengers: {type: Number},
  startTime: { type: Date },
  endTime: { type: Date },
  totalFare: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now }
});

const Ride = mongoose.model('Ride', rideSchema);

module.exports = Ride;