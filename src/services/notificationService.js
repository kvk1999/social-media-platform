// services/notificationService.js
const Notification = require('../models/Notification');
const User = require('../models/User');

// Create a new notification
const createNotification = async (userId, message, type) => {
    const notification = new Notification({
        user: userId,
        message,
        type
    });

    await notification.save();
    return notification;
};

// Get notifications for a user
const getNotifications = async (userId) => {
    return await Notification.find({ user: userId }).sort({ createdAt: -1 });
};

// Mark notification as read
const markNotificationAsRead = async (notificationId) => {
    const notification = await Notification.findByIdAndUpdate(notificationId, { isRead: true }, { new: true });
    return notification;
};

module.exports = { createNotification, getNotifications, markNotificationAsRead };
