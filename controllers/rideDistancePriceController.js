const axios = require('axios');
require("dotenv").config();

const rideDistancePriceController = async (req, res) => {
    await axios.post(`https://www.mapquestapi.com/directions/v2/route?key=${process.env.MAPQUEST_API_Key}`, {
      "locations": [
        req.body.pickupLocation,
        req.body.dropLocation,
    ],
      // params: {
      //   key: '3YMqVrChiwCSOjmf8gy7eSqoCXdD1fjR',
      //   from: "2821 Parliament Ave, Regina, SK S4S2L1",
      //   to: "4208 Castle Rd, Regina, SK S4S4W1",
      //   outFormat: json,
      //   ambiguities: ignore,
      //   routeType: fastest,
      //   doReverseGeocode: false,
      //   enhancedNarrative: false,
      //   avoidTimedConditions: false
      // }
    })
    .then((response) => {
      response = response.data.route;
      const durationArray = response.formattedTime.split(":");

      const data = {
        distance: (response.distance * 1.6).toFixed(2),
        cost: (response.distance*1.6*2/9).toFixed(2),
        duration: durationArray[0] + " hrs " + durationArray[1] + " mins " + durationArray[2] + " secs ",
        durationInSecs: response.time,
      }
      
      res.status(201).json({ message: 'Route details retrieved successfully', data });
    }, (error) => {
      res.status(500).json({ message: 'Error getting price and distance', error });
  })
};

module.exports = rideDistancePriceController;