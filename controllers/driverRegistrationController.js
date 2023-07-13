const Driver = require('../models/Driver');
//const User = require('../models/User');

const driverRegistrationController = {
  register: async (req, res) => {
    try {
      const newDriver = req.body;

      // Check if the driver already exists
      const existingDriver = await Driver.findOne({ userID });
      if (existingDriver) {
        return res.status(400).json({ message: 'Driver already registered' });
      }

      await newDriver.save();

      res.status(201).json({ message: 'Driver registered successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error registering Driver' });
    }
  },

  getApprovalList: async (req, res) => {
    try {

      const driverList = await Driver.find({ approvalStatus : {$eq : "waiting"} });

      res.status(200).json({ driverList: driverList });
    } catch (error) {
      res.status(500).json({ message: 'Error getting drivers list' });
    }
  },

  setApprovalStatus: async (req, res) => {
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