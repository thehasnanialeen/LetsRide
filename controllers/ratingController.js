const Rating = require('../models/Rating');
//const User = require('../models/User');

const ratingController = {
  post: async (req, res) => {
    try {

      const newRating = req.body;
      await newRating.save();

      res.status(201).json({ message: 'Rating posted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error posting rating' });
    }
  },

  getAvgRating: async (req, res) => {
    try {

      const driverList = await Driver.find({ approvalStatus : {$eq : "waiting"} });

      res.status(200).json({ driverList: driverList });
    } catch (error) {
      res.status(500).json({ message: 'Error getting drivers list' });
    }
  },

  getRatingList: async (req, res) => {
    try {

        const driver = await Driver.findOne({ userID });

        if (!driver) {
            return res.status(400).json({ message: 'Could not find Driver' });
        }
        
        user.approvalStatus = req.body.approvalStatus;
        driver.save();

      res.status(200).json({ dmessage: 'Changed driver status' });
    } catch (error) {
      res.status(500).json({ message: 'Error changing driver status' });
    }
  },
};

module.exports = driverRegistrationController;