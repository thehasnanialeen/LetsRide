const mongoose = require('mongoose');
//const ObjectId = mongoose.Types.ObjectId;
const Rating = require('../models/ratingSchema');
//const User = require('../models/userSchema');

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

      //console.log(req.body.userId);

      //const avgRating = await Rating.find({ reviewForId: mongoose.Types.ObjectId('64b3340512477934819cf6d0') });

      const avgRating = await Rating.aggregate([
        // { $match: { reviewForId: mongoose.Types.ObjectId('64b3340512477934819cf6d0') }},
        { $group: { 
          _id: '$reviewForId',
          avgUserRating : {$avg: '$ratingValue'}}}
      ]);

      let avgUserRating = 'User does not have any ratings';

      avgRating.forEach(rating => {
        if(rating._id == req.body.userId)
        {
          avgUserRating = rating.avgUserRating;
        }
      });

      res.status(200).json({ message: 'Average Rating retrived successfully', avgUserRating });
    } catch (error) {
      res.status(500).json({ message: 'Error getting average rating', error });
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

module.exports = ratingController;