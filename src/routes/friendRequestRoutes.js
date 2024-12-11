import express from 'express';
import {
  sendFriendRequest,
  getFriendRequests,
  acceptFriendRequest,
  rejectFriendRequest,
  cancelFriendRequest,
} from '../controllers/friendRequestController.js'; // Importing friendRequest controller

const router = express.Router();

// Send a friend request
router.post('/send', sendFriendRequest);

// Get all friend requests for a user
router.get('/:userId', getFriendRequests);

// Accept a friend request
router.post('/accept/:requestId', acceptFriendRequest);

// Reject a friend request
router.post('/reject/:requestId', rejectFriendRequest);

// Cancel a sent friend request
router.post('/cancel/:senderId/:receiverId', cancelFriendRequest);

export default router;
