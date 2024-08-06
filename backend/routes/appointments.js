const express = require('express');
const { createAppointment, getAppointments, updateAppointmentStatus, deleteAppointment } = require('../controllers/appointmentController');
const auth = require('../middleware/auth');
const router = express.Router();

// @route    POST api/appointments
// @desc     Create a new appointment
// @access   Private
router.post('/', auth, createAppointment);

// @route    GET api/appointments
// @desc     Get appointments by user or doctor
// @access   Private
router.get('/', auth, getAppointments);

// @route    PUT api/appointments/status
// @desc     Update appointment status
// @access   Private
router.put('/status', auth, updateAppointmentStatus);

// @route    DELETE api/appointments/:appointmentId
// @desc     Delete an appointment
// @access   Private
router.delete('/:appointmentId', auth, deleteAppointment);

module.exports = router;
