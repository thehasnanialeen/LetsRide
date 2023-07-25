const express = require('express');
const driverRegistrationController = require('../controllers/driverRegistrationController');

const router = express.Router();

router.post('/register', driverRegistrationController.register);
router.get('/getDriverDetails', driverRegistrationController.getDriverDetails);
router.get('/getApprovalList', driverRegistrationController.getApprovalList);
router.post('/setApprovalStatus', driverRegistrationController.setApprovalStatus);

module.exports = router;