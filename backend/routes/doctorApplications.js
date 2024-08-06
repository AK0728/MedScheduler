const express = require('express');
const { applyDoctor, getApplicationStatus } = require('../controllers/doctorApplicationController');
const auth = require('../middleware/auth');
const router = express.Router();

// @route    POST api/doctor/apply
// @desc     Apply to become a doctor
// @access   Private
router.post('/apply', auth, applyDoctor);

// @route    GET api/doctor/status
// @desc     Get doctor application status
// @access   Private
router.get('/status', auth, getApplicationStatus);

module.exports = router;
