import express from 'express';
import {
  getNotifications,
  createNotification,
  deleteNotification,
} from '../controllers/notificationController.js'; // Importing notification controller

const router = express.Router();

// Get all notifications for a user
router.get('/notifications/:userId', getNotifications);

// Create a new notification
router.post('/create', createNotification);

// Delete a notification
router.delete('/:notificationId', deleteNotification);

export default router;
