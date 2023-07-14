const express = require('express');
const ratingController = require('../controllers/ratingController');

const router = express.Router();

router.post('/post', ratingController.post);
router.get('/getAvgRating', ratingController.getAvgRating);

module.exports = router;