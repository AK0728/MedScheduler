const ContactMessage = require('../models/ContactMessage');

// Handle incoming contact messages
const submitMessage = async (req, res) => {
    const { name, email, message } = req.body;

    try {
        const newMessage = new ContactMessage({
            name,
            email,
            message
        });

        await newMessage.save();
        res.json(newMessage);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

module.exports = {
    submitMessage
};
