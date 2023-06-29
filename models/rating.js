const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  ride: { type: mongoose.Schema.Types.ObjectId, ref: 'Ride', required: true },
  reviewByID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  reviewForID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  ratingValue: { type: Number, required: true },
  reviewByRole: { type: String },
  reviewForRole: { type: String },
  reviewText: { type: String },
  timestamp: { type: Date, default: Date.now }
});

const Rating = mongoose.model('Rating', ratingSchema);

module.exports = Rating;