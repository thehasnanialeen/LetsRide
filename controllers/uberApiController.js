const axios = require('axios');

const uberApiController = {
    priceEstimates: async (req, res) => {
        try {
            const { accessToken } = req.user;
            console.log(accessToken);
            const response = await axios.get('https://api.uber.com/v1.2/estimates/price', {
              headers: {
                Authorization: `Bearer ${accessToken}`
              },
              params: {
                start_latitude: req.query.startLatitude,
                start_longitude: req.query.startLongitude,
                end_latitude: req.query.endLatitude,
                end_longitude: req.query.endLongitude
              }
            });
            res.json(response.data.prices);
          } catch (error) {
            res.status(500).json({ message: 'Error fetching Uber price estimates', error });
          }
    },
};

module.exports = uberApiController;