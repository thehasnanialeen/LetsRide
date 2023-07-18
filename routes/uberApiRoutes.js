const express = require('express');
const uberApiController = require('../controllers/uberApiController');

const router = express.Router();

router.get('/priceEstimates', uberApiController.priceEstimates);

module.exports = router;