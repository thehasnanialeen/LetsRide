const express = require('express');
const rideDistancePriceController = require('../controllers/rideDistancePriceController');

const router = express.Router();

router.post('/', rideDistancePriceController);

module.exports = router;