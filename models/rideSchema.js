const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
  driverUserID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  riderUserID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  pickupLocation: { type: String, required: true },
  dropLocation: { type: String, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date },
  distance: { type: Number },
  duration: { type: String },
  numberOfPassengers: { type: Number, max: 5 },
  cost: { type: Number },
  rideStatus: { type: String, enum: ['booked', 'posted', 'cancelled', 'completed'], default: 'posted' },
  postTime: { type: Date, default: Date.now, immutable: true }
});

const Ride = mongoose.model('Ride', rideSchema);

module.exports = Ride;