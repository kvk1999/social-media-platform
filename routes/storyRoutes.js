const express = require('express');
const router = express.Router();
const Story = require('../models/Story');
const User = require('../models/User');

// Create a story
router.post('/:userId/create', async (req, res) => {
    try {
        const { content, mediaUrl } = req.body;

        // Create a new story
        const newStory = new Story({
            user: req.params.userId,
            content,
            mediaUrl,
            createdAt: new Date(),
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // Story expires after 24 hours
        });

        await newStory.save();

        res.status(201).json(newStory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all stories for a user
router.get('/:userId/stories', async (req, res) => {
    try {
        const stories = await Story.find({ user: req.params.userId, expiresAt: { $gt: new Date() } }).populate('user', 'name profilePicture');
        res.json(stories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete a story
router.delete('/:userId/story/:storyId', async (req, res) => {
    try {
        const story = await Story.findOneAndDelete({
            _id: req.params.storyId,
            user: req.params.userId
        });

        if (!story) {
            return res.status(404).json({ message: "Story not found" });
        }

        res.json({ message: "Story deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
