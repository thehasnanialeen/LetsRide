const axios = require('axios');

const rideDistancePriceController = async (req, res) => {
    await axios.post('https://www.mapquestapi.com/directions/v2/route?key=3YMqVrChiwCSOjmf8gy7eSqoCXdD1fjR', {
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
      //console.log(response);
      response = response.data.route;
      console.log(response);

      const durationArray = response.formattedTime.split(":");

      const data = {
        distance: (response.distance * 1.6).toFixed(2),
        cost: (response.distance*1.6*2/9).toFixed(2),
        duration: {
          hrs: durationArray[0],
          mins: durationArray[1],
          secs: durationArray[2]
        },
      }
      res.status(201).json({ message: 'Route details retrieved successfully', data });
    }, (error) => {
      res.status(500).json({ message: 'Error getting price and distance', error });
  })
};

module.exports = rideDistancePriceController;