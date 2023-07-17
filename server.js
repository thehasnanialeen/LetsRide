const path = require('path');
const express = require("express");
const dotenv  = require("dotenv").config();
const mongoose = require("mongoose");
const session = require('express-session');

//Uber Routes
const passport = require('./controllers/passportConfiguration');
const authRoutes = require('./routes/uberAuthRoutes');
const uberApiRoutes = require('./routes/uberApiRoutes');

//App Routes
const authenticationRoutes = require('./routes/authenticationRoutes');
const driverRegistrationRoutes = require('./routes/driverRegistrationRoutes');
const ratingRoutes = require('./routes/ratingRoutes');
const rideDetailsRoutes = require('./routes/rideDetailsRoutes');

const port = process.env.PORT || 5001;

const app = express();

//app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use(express.json());

//Uber API middlewares
app.use(session({ secret: 'your_session_secret', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

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
app.use('/auth', authRoutes); //Uber API Authentication
app.use('/api/authentication', authenticationRoutes);
app.use('/api/driverRegistration', driverRegistrationRoutes);
app.use('/api/rating', ratingRoutes);
app.use('/api/rideDetails', rideDetailsRoutes);
app.use('/api/uber', uberApiRoutes);

app.listen(port, () => {
    console.log(`running on port ${port}`);
});