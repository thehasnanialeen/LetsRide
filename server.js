const path = require('path');
const express = require("express");
const dotenv  = require("dotenv").config();
const mongoose = require("mongoose");
const session = require('express-session');
const cors = require("cors");
const cookieParser = require("cookie-parser");

//App Routes
const authenticationRoutes = require('./routes/authenticationRoutes');
const driverRegistrationRoutes = require('./routes/driverRegistrationRoutes');
const ratingRoutes = require('./routes/ratingRoutes');
const rideDetailsRoutes = require('./routes/rideDetailsRoutes');
const rideDistancePriceRoutes = require('./routes/rideDistancePriceRoutes');
const sendEmailRoutes = require('./routes/sendEmailRoutes');
const uploadFileRoutes = require('./routes/uploadFileRoutes');

const port = process.env.PORT || 5001;

const app = express();

const publicPath = path.join(__dirname, 'frontend', 'build');

app.use(express.static(publicPath));
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

app.use(cors({
  origin: (origin, callback) => {
    if(origin === process.env.URL || !origin){
      callback(null, true)
    } else{
      callback(new Error('Not allowed by CORS'))
    }
  },
  methods: ['GET', 'POST'], 
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200 // Explicitly set the status code for preflight success
}));

app.use(
  session({
    secret: process.env.SESSION_SECRET, // Replace with your secret key for session encryption
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 } //oneDay max
  })
);

mongoose.connect(
    process.env.DB_URL + "retryWrites=true&w=majority", 
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
app.use('/api/sendEmail', sendEmailRoutes);
app.use('/api/uploadFile', uploadFileRoutes);

app.get('/api/userSession', (req, res) => {
  const user = req.session.user; // Retrieve the user's details from the session
  //console.log({message: 'session', user});
  res.json({message: 'session', user});
});

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
    console.log(`running on port ${port}`);
});