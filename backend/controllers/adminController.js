const User = require('../models/User');
const Doctor = require('../models/Doctor');
const Appointment = require('../models/Appointment');
const { createNotification } = require('./notificationController'); // Import createNotification

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Get all doctors
exports.getAllDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find();
        res.json(doctors);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Get all appointments
exports.getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find();
        res.json(appointments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Remove a user
exports.removeUser = async (req, res) => {
    try {
        await User.findByIdAndRemove(req.params.id);
        res.json({ msg: 'User removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Remove a doctor
exports.removeDoctor = async (req, res) => {
    try {
        await Doctor.findByIdAndRemove(req.params.id);
        res.json({ msg: 'Doctor removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Get all doctor applications
exports.getDoctorApplications = async (req, res) => {
    try {
        const applications = await User.find({ isDoctor: true, 'doctorApplication.status': 'pending' });
        res.json(applications);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Approve or reject a doctor application
exports.approveDoctorApplication = async (req, res) => {
    const { userId } = req.params;
    const { status, message } = req.body;

    try {
        let user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        if (!user.isDoctor || user.doctorApplication.status !== 'pending') {
            return res.status(400).json({ msg: 'This user has not applied to become a doctor' });
        }

        user.doctorApplication.status = status;
        user.doctorApplication.message = message;

        await user.save();

        // Create a notification for the applicant
        const notificationMessage = `Your doctor application has been ${status}.`;
        const notificationType = 'application';
        await createNotification(userId, notificationMessage, notificationType);

        res.json({ msg: 'Doctor application updated successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
