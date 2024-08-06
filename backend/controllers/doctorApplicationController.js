const User = require('../models/User');

// Apply to become a doctor
exports.applyDoctor = async (req, res) => {
    const { qualifications, experience } = req.body;

    try {
        let user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        user.qualifications = qualifications;
        user.experience = experience;
        user.applicationStatus = 'pending';

        await user.save();
        res.json({ msg: 'Application submitted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Get application status
exports.getApplicationStatus = async (req, res) => {
    try {
        let user = await User.findById(req.user.id).select('applicationStatus');
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        res.json({ applicationStatus: user.applicationStatus });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
