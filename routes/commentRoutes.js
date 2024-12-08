const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');
const Post = require('../models/Post');
const User = require('../models/User');

// Create a new comment
router.post('/:postId/create', async (req, res) => {
    try {
        const { userId, text } = req.body;

        // Create a new comment for a post
        const newComment = new Comment({
            post: req.params.postId,
            user: userId,
            text,
            createdAt: new Date()
        });

        await newComment.save();

        // Add the comment to the post's comments list
        const post = await Post.findById(req.params.postId);
        post.comments.push(newComment._id);
        await post.save();

        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all comments for a post
router.get('/:postId/comments', async (req, res) => {
    try {
        const comments = await Comment.find({ post: req.params.postId })
            .populate('user', 'name profilePicture')
            .sort({ createdAt: -1 });

        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Edit a comment
router.put('/:postId/comment/:commentId', async (req, res) => {
    try {
        const { text } = req.body;

        // Find and update the comment
        const comment = await Comment.findByIdAndUpdate(
            req.params.commentId,
            { text },
            { new: true }
        );

        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        res.json(comment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete a comment
router.delete('/:postId/comment/:commentId', async (req, res) => {
    try {
        const comment = await Comment.findByIdAndDelete(req.params.commentId);

        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        // Remove the comment from the post's comments list
        const post = await Post.findById(req.params.postId);
        post.comments.pull(comment._id);
        await post.save();

        res.json({ message: "Comment deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
