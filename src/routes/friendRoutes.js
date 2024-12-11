import express from 'express';
import { 
  sendFriendRequest,
  acceptFriendRequest,
  declineFriendRequest,
  getFriends,
  getFriendRequests
} from '../controllers/friendController.js';  // Import the friend controller functions

const router = express.Router();

// Send a friend request
router.post('/send/:userId', sendFriendRequest);

// Accept a friend request
router.post('/accept/:requestId', acceptFriendRequest);

// Decline a friend request
router.post('/decline/:requestId', declineFriendRequest);

// Get all friends of a user
router.get('/friends/:userId', getFriends);

// Get all friend requests for a user
router.get('/requests/:userId', getFriendRequests);

export default router;
