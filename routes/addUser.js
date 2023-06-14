const express = require('express');
const addUser = require('../controllers/addUser');

const router = express.Router();
console.log("routes");

router.post('/', addUser);

module.exports = router;