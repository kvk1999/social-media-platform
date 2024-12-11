// services/storyService.js
const Story = require('../models/Story');
const User = require('../models/User');

// Create a new story
const createStory = async (userId, content) => {
    const newStory = new Story({
        user: userId,
        content
    });

    return await newStory.save();
};

// Get all stories for a user
const getStoriesByUserId = async (userId) => {
    return await Story.find({ user: userId }).sort({ createdAt: -1 });
};

// Delete a story
const deleteStory = async (storyId) => {
    return await Story.findByIdAndDelete(storyId);
};

module.exports = { createStory, getStoriesByUserId, deleteStory };
