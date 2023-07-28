const mongoose = require('mongoose');
const Rating = require('../models/ratingSchema');

const ratingController = {
  post: async (req, res) => {
    try {
      await Rating.create(req.body);
      const newRating = req.body;

      const existingRating = await Rating.findOne({ rideId: newRating.rideId });
      if (existingRating) {
        return res.status(200).json({ message: `You have already rated this ride ${existingRating.ratingValue} stars` });
      }

      await Rating.create(newRating);

      res.status(201).json({ message: 'Rating posted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error posting rating' });
    }
  },

  getAvgRating: async (req, res) => {
    try {
      const avgRating = await Rating.aggregate([
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
  }
};

module.exports = ratingController;