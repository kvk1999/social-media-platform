const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const User = require('../models/User');
const Comment = require('../models/Comment');

// Create a new post
router.post('/', async (req, res) => {
    try {
        const { userId, content, media } = req.body;
        const newPost = new Post({
            user: userId,
            content,
            media,
        });

        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all posts (for news feed)
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().populate('user', 'name').sort({ createdAt: -1 });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a specific post by ID
router.get('/:postId', async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId).populate('user', 'name');
        res.json(post);
    } catch (error) {
        res.status(404).json({ message: "Post not found" });
    }
});

// Edit a post
router.put('/:postId', async (req, res) => {
    try {
        const { content, media } = req.body;
        const post = await Post.findByIdAndUpdate(
            req.params.postId,
            { content, media },
            { new: true }
        );
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete a post
router.delete('/:postId', async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.postId);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Like a post
router.post('/:postId/like', async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        if (!post.likes.includes(req.body.userId)) {
            post.likes.push(req.body.userId);
            await post.save();
            res.json(post);
        } else {
            res.status(400).json({ message: "Already liked" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Comment on a post
router.post('/:postId/comment', async (req, res) => {
    try {
        const { userId, content } = req.body;
        const post = await Post.findById(req.params.postId);
        const newComment = new Comment({
            user: userId,
            post: req.params.postId,
            content,
        });

        await newComment.save();
        post.comments.push(newComment);
        await post.save();

        res.json(newComment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
