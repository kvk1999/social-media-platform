const express = require('express');
const router = express.Router();
const friendRequestController = require('../controllers/friendRequestController');
const authMiddleware = require('../middleware/authMiddleware');

// Route to send a friend request
router.post('/send', authMiddleware, friendRequestController.sendFriendRequest);

// Route to accept a friend request
router.post('/accept/:id', authMiddleware, friendRequestController.acceptFriendRequest);

// Route to reject a friend request
router.post('/reject/:id', authMiddleware, friendRequestController.rejectFriendRequest);

// Route to get all friend requests for the logged-in user
router.get('/', authMiddleware, friendRequestController.getFriendRequests);

module.exports = router;
