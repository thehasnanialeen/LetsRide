const Ride = require('../models/rideSchema');
const mongoose = require('mongoose');

const rideDetailsController = {
  post: async (req, res) => {
    try {
      const newRide = req.body;

      await Ride.create(newRide);

      res.status(201).json({ message: 'Ride posted successfully' });
    } catch (error) {
      //console.log(error);
      res.status(500).json({ message: 'Error posting Ride', error });
    }
  },

  getRidesList: async (req, res) => {
    try {
        const rides = await Ride.find({rideStatus: "posted"});
        //console.log(rides);
        res.status(200).json({ rides });
    } catch (error) {
      res.status(500).json({ message: 'Error getting rides' });
    }
  },

  getRidesListByUser: async (req, res) => {
    try {
        const rides = await Ride.aggregate([
          {
            $match: { rideStatus: "completed", riderUserID: req.query.id }
          },
          {
            $lookup: {
              from: 'users',
              localField: 'driverUserID',
              foreignField: '_id',
              as: 'driverDetails'
            }
          },
          {
            $unwind: '$driverDetails'
          }
        ]);
        
        res.status(200).json({ rides });
    } catch (error) {
      res.status(500).json({ message: 'Error getting rides' });
    }
  },

  getRideDetails: async (req, res) => {
    try {
        const ride = await Ride.findById(req.query._id);
        console.log(ride);

        if (!ride) {
            return res.status(400).json({ message: 'Could not find ride' });
        }

      res.status(200).json({ ride });
    } catch (error) {
      res.status(500).json({ message: 'Error getting ride details' });
    }
  },

  updateRideDetails: async (req, res) => {
    try {
        const ride = await Ride.findById(req.body._id);

        if (!ride) {
            return res.status(400).json({ message: 'Could not find ride' });
        }

        ride.endTime = req.body.endTime;
        ride.distance = req.body.distance;
        ride.duration = req.body.duration;
        ride.cost = req.body.cost;

        ride.save();

      res.status(200).json({ message: 'Updated Ride Details Successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error updating ride details' });
    }
  },

  updateRider: async (req, res) => {
    try {
        console.log("reached");
        const ride = await Ride.findById(req.body._id);
        console.log(ride);

        if (!ride) {
            return res.status(400).json({ message: 'Could not find ride' });
        }

        //ride.riderIDs.push(mongoose.Types.ObjectId(req.body.riderIds));
        ride.rideStatus = req.body.rideStatus;
        ride.numberOfPassengers = req.body.numberOfPassengers;

        ride.save();

      res.status(200).json({ message: 'Updated Ride Details Successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error updating ride details', error });
    }
  },

  updateRide: async (req, res) => {
    try {
        const ride = await Ride.findById(req.body._id);

        if (!ride) {
            return res.status(400).json({ message: 'Could not find ride' });
        }

        rided = req.body;

        ride.save();

      res.status(200).json({ message: 'Updated Ride Successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error updating ride' });
    }
  },
};

module.exports = rideDetailsController;