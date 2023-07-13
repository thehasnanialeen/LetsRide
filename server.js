const path = require('path');
const express = require("express");
const dotenv  = require("dotenv").config();
const mongoose = require("mongoose");
const authRoutes = require('./app/routes/authenticationRoutes');

const port = process.env.PORT || 5001;

const app = express();

//app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use(express.json());

mongoose.connect(
    "mongodb+srv://aleenhasnani:DUqqgA7LoCgp1Jgp@letsride.dt7jgdg.mongodb.net/LetsRideDatabase?retryWrites=true&w=majority", 
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  );

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

//API Routes
app.use('/api/authentication', authRoutes);

//app.get("/signup", require("./routes/signup"));
//console.log("server");
//app.use("/api/addUser", require("./routes/addUser"));

app.listen(port, () => {
    console.log(`running on port ${port}`);
});