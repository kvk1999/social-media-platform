import Notification from '../models/Notification.js'; // Import your Notification model

// Create a new notification
export const createNotification = async (req, res) => {
  const { userId, message, type } = req.body;  // Get data from the request body

  try {
    const newNotification = new Notification({
      userId,
      message,
      type,
    });

    const savedNotification = await newNotification.save();  // Save notification to the database
    res.status(201).json(savedNotification);  // Send the created notification as the response
  } catch (error) {
    res.status(500).json({ message: error.message });  // Handle any errors
  }
};

// Get all notifications for a specific user
export const getNotifications = async (req, res) => {
  const { userId } = req.params;  // Get userId from the request parameters

  try {
    const notifications = await Notification.find({ userId });  // Find notifications by userId
    res.status(200).json(notifications);  // Send the notifications as the response
  } catch (error) {
    res.status(500).json({ message: error.message });  // Handle any errors
  }
};

// Get a single notification by ID
export const getNotification = async (req, res) => {
  const { notificationId } = req.params;  // Get notificationId from the request parameters

  try {
    const notification = await Notification.findById(notificationId);  // Find notification by ID
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });  // Handle notification not found
    }
    res.status(200).json(notification);  // Send the notification as the response
  } catch (error) {
    res.status(500).json({ message: error.message });  // Handle any errors
  }
};

// Update a notification
export const updateNotification = async (req, res) => {
  const { notificationId } = req.params;  // Get notificationId from the request parameters
  const { message, type } = req.body;  // Get updated data from the request body

  try {
    const updatedNotification = await Notification.findByIdAndUpdate(
      notificationId,
      { message, type },
      { new: true }  // Return the updated notification
    );
    if (!updatedNotification) {
      return res.status(404).json({ message: 'Notification not found' });  // Handle notification not found
    }
    res.status(200).json(updatedNotification);  // Send the updated notification as the response
  } catch (error) {
    res.status(500).json({ message: error.message });  // Handle any errors
  }
};

// Delete a notification
export const deleteNotification = async (req, res) => {
  const { notificationId } = req.params;  // Get notificationId from the request parameters

  try {
    const deletedNotification = await Notification.findByIdAndDelete(notificationId);  // Delete the notification by ID
    if (!deletedNotification) {
      return res.status(404).json({ message: 'Notification not found' });  // Handle notification not found
    }
    res.status(200).json({ message: 'Notification deleted successfully' });  // Return success message
  } catch (error) {
    res.status(500).json({ message: error.message });  // Handle any errors
  }
};
