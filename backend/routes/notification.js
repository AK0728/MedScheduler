const express = require('express');
const { createNotification, getUserNotifications } = require('../controllers/notificationController');
const auth = require('../middleware/auth');
const router = express.Router();

// @route    POST api/notifications
// @desc     Create a notification
// @access   Private
router.post('/', auth, async (req, res) => {
    const { message, type } = req.body;
    try {
        const notification = await createNotification(req.user.id, message, type);
        res.json(notification);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route    GET api/notifications
// @desc     Get notifications for the logged-in user
// @access   Private
router.get('/', auth, getUserNotifications);

module.exports = router;
