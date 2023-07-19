const Driver = require('../models/driverSchema');
//const User = require('../models/User');

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

  getApprovalList: async (req, res) => {
    try {

      const driverList = await Driver.find({ approvalStatus : {$eq : "waiting"} });

      res.status(200).json({ driverList });
    } catch (error) {
      res.status(500).json({ message: 'Error getting drivers list' });
    }
  },

  setApprovalStatus: async (req, res) => {
    try {

        const driver = await Driver.findById(req.body.driverID);

        if (!driver) {
            return res.status(400).json({ message: 'Could not find Driver' });
        }
        
        driver.approvalStatus = req.body.approvalStatus; 
        driver.adminFeedback.push(req.body.adminFeedback);

        driver.save();

      res.status(200).json({ message: 'Changed driver status' });
    } catch (error) {
      res.status(500).json({ message: 'Error changing driver status' });
    }
  },
};

module.exports = driverRegistrationController;