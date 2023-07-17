const express = require('express');
const uberApiController = require('../controllers/uberApiController');

const router = express.Router();

router.get('/price-estimates', uberApiController.priceEstimates);

module.exports = router;