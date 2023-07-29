const Ride = require('../models/rideSchema');

const rideDetailsController = {
  post: async (req, res) => {
    try {
      const newRide = req.body.rideDetail;

      const ride = await Ride.create(newRide);
      console.log(req.body);
      setTimeout(async () => {
        ride.rideStatus = 'completed';
        console.log(ride);
      }, req.body.timeLeft);

      res.status(201).json({ message: 'Ride posted successfully' });
    } catch (error) {
      console.log(error);
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
        const compRides = await Ride.aggregate([
          {
            $match: { rideStatus: "completed" }
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

        let rides;
        for(let i=0; i<compRides.length; i++)
        {
          if(compRides[i].riderUserID = req.query.id)
          {
            rides = compRides[i];
            break;
          }
        }
        
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

        await ride.save();

        // const rides = await Ride.aggregate([
        //   {
        //     $match: { _id: req.body._id }
        //   },
        //   {
        //     $lookup: {
        //       from: 'users',
        //       localField: 'driverUserID',
        //       foreignField: '_id',
        //       as: 'driverDetails'
        //     }
        //   },
        //   {
        //     $unwind: '$driverDetails'
        //   }
        // ]);

        // console.log(rides);
      res.status(200).json({ message: 'Updated Ride Details Successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error updating ride details' });
    }
  },

  updateRider: async (req, res) => {
    try {
        //console.log("reached");
        const ride = await Ride.findById(req.body._id);
        //console.log(ride);

        if (!ride) {
            return res.status(400).json({ message: 'Could not find ride' });
        }

        ride.rideStatus = req.body.rideStatus;
        ride.numberOfPassengers = req.body.numberOfPassengers;

        await ride.save();

        const rides = await Ride.aggregate([
          // {
          //   $match: { _id: req.body._id }
          // },
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

        let compRides;
        for(let i=0; i<rides.length; i++)
        {
          if(rides[i]._id == req.body._id)
          {
            compRides = rides[i];
            break;
          }
        }

        console.log(compRides);

      res.status(200).json({ message: 'Updated Ride Details Successfully', compRides });
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

        ride = req.body;

        ride.save();

      res.status(200).json({ message: 'Updated Ride Successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error updating ride' });
    }
  },

  updateRideBooked: async (req) => {
    setTimeout(async () => {
      try {
          //console.log("reached");
          const ride = await Ride.findById(req.body._id);
          //console.log(ride);

          if (!ride) {
              console.log('Could not find ride with id - ' + req.body._id + " to mark as booked");
          }

          ride.rideStatus = req.body.rideStatus;

          await ride.save();
      } catch (error) {
          console.log(error);
      }
    }, req.body.timeLeft);
  },
};

module.exports = rideDetailsController;