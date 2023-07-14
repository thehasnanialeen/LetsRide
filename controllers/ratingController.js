const Rating = require('../models/Rating');
//const User = require('../models/User');

const ratingController = {
  post: async (req, res) => {
    try {

      //const newRating = req.body;
      await Rating.create(req.body);

      res.status(201).json({ message: 'Rating posted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error posting rating' });
    }
  },

  getAvgRating: async (req, res) => {
    try {

      const avgRating = await Rating.aggregate([
        { $match : { reviewForID: req.body.userID }},
        { $group : { avgRating : {$avg: 'ratingValue'} }}
      ]);

      res.status(200).json({ message: 'Average Rating retrived successfully', avgRating });
    } catch (error) {
      res.status(500).json({ message: 'Error getting average rating' });
    }
  },

//   getRatingList: async (req, res) => {
//     try {

//         const driver = await Driver.findOne({ userID });

//         if (!driver) {
//             return res.status(400).json({ message: 'Could not find Driver' });
//         }
        
//         user.approvalStatus = req.body.approvalStatus;
//         driver.save();

//       res.status(200).json({ dmessage: 'Changed driver status' });
//     } catch (error) {
//       res.status(500).json({ message: 'Error changing driver status' });
//     }
//   },
};

module.exports = driverRegistrationController;