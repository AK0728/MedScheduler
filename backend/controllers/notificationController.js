const Notification = require('../models/Notification');

// Create a notification
const createNotification = async (userId, message, type) => {
    try {
        const newNotification = new Notification({
            user: userId,
            message,
            type
        });

        await newNotification.save();
        return newNotification;
    } catch (err) {
        console.error('Error creating notification:', err.message);
        throw new Error('Failed to create notification');
    }
};

// Get notifications for a user
const getUserNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json(notifications);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

module.exports = {
    createNotification,
    getUserNotifications
};
