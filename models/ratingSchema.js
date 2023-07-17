const mongoose = require('mongoose');
const User = require('../models/userSchema');

const ratingSchema = new mongoose.Schema({
  rideId: { type: mongoose.Schema.Types.ObjectId, ref: 'Ride', required: true },
  reviewById: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  reviewForId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  ratingValue: { type: Number, required: true },
  reviewByRole: { type: String },
  reviewForRole: { type: String },
  reviewText: { type: String },
  timestamp: { type: Date, default: Date.now }
});

const Rating = mongoose.model('Rating', ratingSchema);

module.exports = Rating;