const express = require('express');
const { getAllDoctors, getDoctorById } = require('../controllers/doctorController');
const router = express.Router();

// @route    GET api/doctors
// @desc     Get all doctors
// @access   Public
router.get('/', getAllDoctors);

// @route    GET api/doctors/:id
// @desc     Get doctor by ID
// @access   Public
router.get('/:id', getDoctorById);

module.exports = router;
