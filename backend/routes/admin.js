const express = require('express');
const { getAllUsers, getAllDoctors, getAllAppointments, removeUser, removeDoctor, getDoctorApplications, approveDoctorApplication } = require('../controllers/adminController');
const adminAuth = require('../middleware/adminAuth');
const router = express.Router();

// @route    GET api/admin/users
// @desc     Get all users
// @access   Private (Admin only)
router.get('/users', adminAuth, getAllUsers);

// @route    GET api/admin/doctors
// @desc     Get all doctors
// @access   Private (Admin only)
router.get('/doctors', adminAuth, getAllDoctors);

// @route    GET api/admin/appointments
// @desc     Get all appointments
// @access   Private (Admin only)
router.get('/appointments', adminAuth, getAllAppointments);

// @route    DELETE api/admin/user/:id
// @desc     Remove a user
// @access   Private (Admin only)
router.delete('/user/:id', adminAuth, removeUser);

// @route    DELETE api/admin/doctor/:id
// @desc     Remove a doctor
// @access   Private (Admin only)
router.delete('/doctor/:id', adminAuth, removeDoctor);

// @route    GET api/admin/doctor-applications
// @desc     Get all doctor applications
// @access   Private (Admin only)
router.get('/doctor-applications', adminAuth, getDoctorApplications);

// @route    PUT api/admin/approve-doctor-application/:userId
// @desc     Approve or reject a doctor application
// @access   Private (Admin only)
router.put('/approve-doctor-application/:userId', adminAuth, approveDoctorApplication);

module.exports = router;
