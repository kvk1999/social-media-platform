// services/friendService.js
const FriendRequest = require('../models/FriendRequest');
const User = require('../models/User');

// Send a friend request
const sendFriendRequest = async (senderId, receiverId) => {
    const friendRequest = new FriendRequest({
        sender: senderId,
        receiver: receiverId,
        status: 'pending'
    });

    return await friendRequest.save();
};

// Accept a friend request
const acceptFriendRequest = async (requestId) => {
    const request = await FriendRequest.findById(requestId);
    if (request.status === 'accepted') {
        throw new Error('Friend request already accepted');
    }

    request.status = 'accepted';
    await request.save();

    // Optionally, you can add the users to each other's friend list here
    return request;
};

// Reject a friend request
const rejectFriendRequest = async (requestId) => {
    const request = await FriendRequest.findById(requestId);
    if (request.status === 'rejected') {
        throw new Error('Friend request already rejected');
    }

    request.status = 'rejected';
    await request.save();

    return request;
};

module.exports = { sendFriendRequest, acceptFriendRequest, rejectFriendRequest };
