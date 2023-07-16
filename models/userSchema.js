// Require Mongoose
const mongoose = require("mongoose");

// Define a schema
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  DOB: { type: Date, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  profilePhoto: { type: String, required: true },
  phoneNumber: { type: Number, required: true },
  role: { type: String, enum: ['rider', 'driver', 'admin'], default: 'rider' },
});

const User = mongoose.model('User', userSchema);

module.exports = User;