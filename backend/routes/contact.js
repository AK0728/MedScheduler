// routes/contact.js
const express = require('express');
const { submitMessage } = require('../controllers/contactController');
const router = express.Router();

// @route    POST api/contact
// @desc     Submit a contact message
// @access   Public
router.post('/', submitMessage);

module.exports = router;
