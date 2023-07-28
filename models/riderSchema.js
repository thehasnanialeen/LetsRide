const mongoose = require('mongoose');

const riderSchema = new mongoose.Schema({
  userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  pickupLocation: { type: String },
  dropLocation: { type: String },
  pickupTime: { type: Date },
  distance: { type: Number, required: true },
  numberOfPassengers: { type: Number, max: 5 },
  rideCost: { type: Number },
  rideStatus: { type: String, enum: ['booked', 'requested', 'completed'], default: 'requested' },  //do we need this?
});

const Rider = mongoose.model('Rider', riderSchema);

module.exports = Rider;