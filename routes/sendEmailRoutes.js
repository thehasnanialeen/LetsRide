const express = require('express');
const sendEmailController = require('../controllers/sendEmailController');

const router = express.Router();

router.post('/', sendEmailController);

module.exports = router;