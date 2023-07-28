const express = require('express');
const rideDetailsController = require('../controllers/rideDetailsController');

const router = express.Router();

router.post('/post', rideDetailsController.post);
router.get('/getRidesList', rideDetailsController.getRidesList);
router.get('/getRidesListByUser', rideDetailsController.getRidesListByUser);
router.get('/getRideDetails', rideDetailsController.getRideDetails);
router.post('/updateRideDetails', rideDetailsController.updateRideDetails);
router.post('/updateRider', rideDetailsController.updateRider);
router.post('/updateRide', rideDetailsController.updateRide);

module.exports = router;