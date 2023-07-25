const Driver = require('../models/driverSchema');
const User = require('../models/userSchema');

const driverRegistrationController = {
  register: async (req, res) => {
    try {
      const newDriver = req.body;

      // Check if the driver already exists
      const existingDriver = await Driver.findOne({ userID: newDriver.userID });

      if (existingDriver) {
        return res.status(200).json({ message: 'Driver already registered' });
      }

      await Driver.create(newDriver);

      res.status(201).json({ message: 'Driver registered successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error registering Driver' });
    }
  },

  getDriverDetails: async (req, res) => {
    try {
      // Check if the driver already exists
      const driver = await Driver.findOne({ userID: req.query.userId });

      if (!driver) {
        return res.status(200).json({ message: 'Driver does not exist' });
      }

      res.status(201).json({ message: 'Got Driver detials successfully!', driver });
    } catch (error) {
      res.status(500).json({ message: 'Error Getting Driver Details. Logout and Sign in again.' });
    }
  },

  getApprovalList: async (req, res) => {
    try {

      //const driverList = await Driver.find({ approvalStatus : {$eq : "waiting"} });

      const driverList = await Driver.aggregate([
        {
          $match: { approvalStatus: 'waiting' }
        },
        {
          $lookup: {
            from: 'users',
            localField: 'userID',
            foreignField: '_id',
            as: 'userDetails'
          }
        },
        {
          $unwind: '$userDetails'
        }
      ]);

      res.status(200).json({ message: 'Successfully retrieved driver list', driverList });
    } catch (error) {
      res.status(500).json({ message: 'Error getting drivers list' });
    }
  },

  setApprovalStatus: async (req, res) => {
    try {

        const driver = await Driver.findById(req.body.driverID);

        if (!driver) {
            return res.status(201).json({ message: 'Could not find Driver' });
        }
        
        driver.approvalStatus = req.body.approvalStatus; 
        driver.adminFeedback.push(req.body.adminFeedback);

        driver.save();

      res.status(200).json({ message: 'Driver status changed successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error changing driver status' });
    }
  },
};

module.exports = driverRegistrationController;