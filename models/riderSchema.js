const mongoose = require('mongoose');

const riderSchema = new mongoose.Schema({
  userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  pickupLocation: { type: String },
  dropLocation: { type: String },
  pickupTime: { type: Date },
  distance: { type: Number, required: true },
  numberOfPassengers: { type: Number },
  rideCost: { type: Number },
  rideStatus: { type: String, enum: ['booked', 'requetsed', 'completed'], default: 'requetsed' },
});

const Rider = mongoose.model('Rider', riderSchema);

module.exports = Rider;