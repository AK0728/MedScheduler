const Appointment = require('../models/Appointment');
const User = require('../models/User');
const Doctor = require('../models/Doctor');
const { createNotification } = require('./notificationController');

// Create a new appointment
exports.createAppointment = async (req, res) => {
    const { userId, doctorId, date, time, notes } = req.body;

    try {
        // Check if user and doctor exist
        const user = await User.findById(userId);
        const doctor = await Doctor.findById(doctorId);
        if (!user || !doctor) {
            return res.status(404).json({ msg: 'User or Doctor not found' });
        }

        // Create appointment
        const appointment = new Appointment({
            user: userId,
            doctor: doctorId,
            date,
            time,
            notes,
            status: 'Pending'
        });

        await appointment.save();

        // Create a notification for the user
        const userMessage = `Your appointment with Dr. ${doctor.name} has been booked for ${date} at ${time}.`;
        await createNotification(userId, userMessage, 'appointment');

        // Create a notification for the doctor
        const doctorMessage = `You have a new appointment with ${user.name} on ${date} at ${time}.`;
        await createNotification(doctorId, doctorMessage, 'appointment');

        res.json(appointment);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Fetch appointments by user or doctor
exports.getAppointments = async (req, res) => {
    const { userId, doctorId } = req.query;

    try {
        let appointments;
        if (userId) {
            appointments = await Appointment.find({ user: userId }).populate('doctor', 'name');
        } else if (doctorId) {
            appointments = await Appointment.find({ doctor: doctorId }).populate('user', 'name');
        } else {
            appointments = await Appointment.find().populate('user', 'name').populate('doctor', 'name');
        }

        res.json(appointments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Update appointment status
exports.updateAppointmentStatus = async (req, res) => {
    const { appointmentId, status } = req.body;

    try {
        let appointment = await Appointment.findById(appointmentId);
        if (!appointment) {
            return res.status(404).json({ msg: 'Appointment not found' });
        }

        appointment.status = status;
        await appointment.save();

        // Create a notification for the user
        const userMessage = `Your appointment status has been updated to ${status}.`;
        await createNotification(appointment.user, userMessage, 'appointment');

        res.json(appointment);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Delete an appointment
exports.deleteAppointment = async (req, res) => {
    const { appointmentId } = req.params;

    try {
        const appointment = await Appointment.findById(appointmentId);
        if (!appointment) {
            return res.status(404).json({ msg: 'Appointment not found' });
        }

        await appointment.remove();
        res.json({ msg: 'Appointment removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
