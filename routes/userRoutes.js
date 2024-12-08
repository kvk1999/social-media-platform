const express = require('express');
const router = express.Router();
const User = require('../models/User');
const FriendRequest = require('../models/FriendRequest');

// Get user profile
router.get('/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        res.json(user);
    } catch (error) {
        res.status(404).json({ message: "User not found" });
    }
});

// Edit user profile
router.put('/:userId', async (req, res) => {
    try {
        const { bio, location, website, profilePicture, coverPhoto } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            req.params.userId,
            { bio, location, website, profilePicture, coverPhoto },
            { new: true }
        );
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get user friends
router.get('/:userId/friends', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).populate('friends', 'name');
        res.json(user.friends);
    } catch (error) {
        res.status(404).json({ message: "User not found" });
    }
});

// Send friend request
router.post('/:userId/friend-request', async (req, res) => {
    try {
        const { receiverId } = req.body;
        const newRequest = new FriendRequest({
            sender: req.params.userId,
            receiver: receiverId,
        });

        await newRequest.save();
        res.status(201).json(newRequest);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Accept friend request
router.put('/:userId/friend-request/accept', async (req, res) => {
    try {
        const { senderId } = req.body;
        const request = await FriendRequest.findOneAndUpdate(
            { sender: senderId, receiver: req.params.userId },
            { status: 'accepted' },
            { new: true }
        );

        const user = await User.findById(req.params.userId);
        user.friends.push(senderId);
        await user.save();

        res.json(request);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Decline friend request
router.put('/:userId/friend-request/decline', async (req, res) => {
    try {
        const { senderId } = req.body;
        await FriendRequest.findOneAndUpdate(
            { sender: senderId, receiver: req.params.userId },
            { status: 'declined' },
            { new: true }
        );
        res.status(200).json({ message: 'Friend request declined' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
