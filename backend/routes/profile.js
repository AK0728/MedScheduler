const express = require('express');
const { getUserProfile, updateUserProfile } = require('../controllers/profileController');
const auth = require('../middleware/auth');
const router = express.Router();

// @route    GET api/profile
// @desc     Get user profile
// @access   Private
router.get('/', auth, getUserProfile);

// @route    PUT api/profile
// @desc     Update user profile
// @access   Private
router.put('/', auth, updateUserProfile);

module.exports = router;
