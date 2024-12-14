// friendRoutes.js
import express from 'express';
import auth from '../middlewares/auth.js';
import { sendFriendRequest, acceptFriendRequest, declineFriendRequest, removeFriend, getFriendRequests, getFriends } from '../controllers/friendController.js';

const router = express.Router();

// Send a friend request
router.post('/:userId', auth, sendFriendRequest);

// Accept a friend request
router.put('/:userId', auth, acceptFriendRequest);

// Decline a friend request
router.put('/:userId/decline', auth, declineFriendRequest);

// Remove a friend
router.delete('/:userId', auth, removeFriend);

// GET /api/v1/friends/requests - Get all incoming friend requests
router.get('/requests', auth, getFriendRequests);

// GET /api/v1/friends - Get all friends of the authenticated user
router.get('/', auth, getFriends);

export default router;
