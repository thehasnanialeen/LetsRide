const path = require('path');
const express = require("express");
const dotenv  = require("dotenv").config();
const mongoose = require("mongoose");
const session = require('express-session');
const cors = require("cors");

//App Routes
const authenticationRoutes = require('./routes/authenticationRoutes');
const driverRegistrationRoutes = require('./routes/driverRegistrationRoutes');
const ratingRoutes = require('./routes/ratingRoutes');
const rideDetailsRoutes = require('./routes/rideDetailsRoutes');
const rideDistancePriceRoutes = require('./routes/rideDistancePriceRoutes');

const port = process.env.PORT || 5001;

const app = express();

app.use(cors({
  origin: 'http://localhost:3000'
}))
//app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use(express.json());
app.use(
  session({
    secret: 'WeAreRegisteredInCs476', // Replace with your secret key for session encryption
    resave: false,
    saveUninitialized: true,
  })
);

mongoose.connect(
    "mongodb+srv://aleenhasnani:DUqqgA7LoCgp1Jgp@letsride.dt7jgdg.mongodb.net/LetsRideDatabase?retryWrites=true&w=majority", 
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Database connection error: "));
db.once("open", function () {
  console.log("Connected successfully to the database");
});

//API Routes
app.use('/api/authentication', authenticationRoutes);
app.use('/api/driverRegistration', driverRegistrationRoutes);
app.use('/api/rating', ratingRoutes);
app.use('/api/rideDetails', rideDetailsRoutes);
app.use('/api/rideDistancePrice', rideDistancePriceRoutes);

app.get('/api/userSession', (req, res) => {
  const user = req.session.user; // Retrieve the user's details from the session
  res.json(user);
});

app.listen(port, () => {
    console.log(`running on port ${port}`);
});