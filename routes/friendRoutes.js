const express = require('express');
const router = express.Router();
const User = require('../models/User');
const FriendRequest = require('../models/FriendRequest');

// Send a friend request
router.post('/:senderId/send-request', async (req, res) => {
    try {
        const { receiverId } = req.body;
        
        // Check if the sender and receiver are different users
        if (senderId === receiverId) {
            return res.status(400).json({ message: "You cannot send a friend request to yourself" });
        }

        // Check if a friend request already exists
        const existingRequest = await FriendRequest.findOne({
            sender: senderId,
            receiver: receiverId
        });

        if (existingRequest) {
            return res.status(400).json({ message: "Friend request already sent" });
        }

        // Create a new friend request
        const newRequest = new FriendRequest({
            sender: senderId,
            receiver: receiverId,
            status: 'pending'
        });

        await newRequest.save();

        res.status(201).json(newRequest);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all friend requests for a user
router.get('/:userId/requests', async (req, res) => {
    try {
        const requests = await FriendRequest.find({
            receiver: req.params.userId,
            status: 'pending'
        }).populate('sender', 'name');

        res.json(requests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Accept a friend request
router.put('/:userId/requests/accept', async (req, res) => {
    try {
        const { senderId } = req.body;

        // Update the friend request status to accepted
        const request = await FriendRequest.findOneAndUpdate(
            { sender: senderId, receiver: req.params.userId, status: 'pending' },
            { status: 'accepted' },
            { new: true }
        );

        // Add the sender to the receiver's friend list
        const receiver = await User.findById(req.params.userId);
        receiver.friends.push(senderId);
        await receiver.save();

        // Add the receiver to the sender's friend list
        const sender = await User.findById(senderId);
        sender.friends.push(req.params.userId);
        await sender.save();

        res.json(request);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Decline a friend request
router.put('/:userId/requests/decline', async (req, res) => {
    try {
        const { senderId } = req.body;

        // Update the friend request status to declined
        const request = await FriendRequest.findOneAndUpdate(
            { sender: senderId, receiver: req.params.userId, status: 'pending' },
            { status: 'declined' },
            { new: true }
        );

        res.json(request);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Remove a friend
router.delete('/:userId/friends/:friendId', async (req, res) => {
    try {
        // Remove the friend from both user's friend lists
        const user = await User.findById(req.params.userId);
        const friend = await User.findById(req.params.friendId);

        user.friends.pull(friend._id);
        friend.friends.pull(user._id);

        await user.save();
        await friend.save();

        res.json({ message: "Friend removed" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get the list of friends of a user
router.get('/:userId/friends', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).populate('friends', 'name profilePicture');
        res.json(user.friends);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
