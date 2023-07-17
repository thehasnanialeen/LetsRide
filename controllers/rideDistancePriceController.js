const rideDistancePriceController = (req, res) => {
  try {
    let data = await axios.get('https://www.mapquestapi.com/directions/v2/route', {
      params: {
        key: "3YMqVrChiwCSOjmf8gy7eSqoCXdD1fjR",
        from: "2821 Parliament Ave, Regina, SK S4S2L1",
        to: "4208 Castle Rd, Regina, SK S4S4W1"
      }
    })

  res.status(201).json({ message: 'Route retrieved successfully', data });
  } catch (error) {
     res.status(500).json({ message: 'Error posting rating' });
  }
};

module.exports = rideDistancePriceController;