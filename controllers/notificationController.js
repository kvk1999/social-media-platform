const Notification = require('../models/Notification');

// Create a new notification
exports.createNotification = async (req, res) => {
    try {
        const { userId, type, message } = req.body;
        const newNotification = new Notification({
            user: userId,
            type,
            message,
        });
        await newNotification.save();
        res.status(201).json(newNotification);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get notifications for a user
exports.getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ user: req.user.id });
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
