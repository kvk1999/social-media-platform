// services/postService.js
const Post = require('../models/Post');
const { HTTP_STATUS } = require('../utils/constants');

// Create a new post
const createPost = async (postData) => {
    const newPost = new Post(postData);
    return await newPost.save();
};

// Get all posts by a user
const getUserPosts = async (userId) => {
    return await Post.find({ user: userId }).sort({ createdAt: -1 });
};

// Get a single post by its ID
const getPostById = async (postId) => {
    return await Post.findById(postId);
};

// Delete a post
const deletePost = async (postId) => {
    return await Post.findByIdAndDelete(postId);
};

// Update a post
const updatePost = async (postId, updatedData) => {
    return await Post.findByIdAndUpdate(postId, updatedData, { new: true });
};

module.exports = { createPost, getUserPosts, getPostById, deletePost, updatePost };
