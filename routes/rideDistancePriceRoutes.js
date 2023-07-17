const express = require('express');
const rideDistancePriceController = require('../controllers/rideDistancePriceController');

const router = express.Router();

router.get('/', rideDistancePriceController);

module.exports = router;