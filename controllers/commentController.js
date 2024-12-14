// commentController.js

import Comment from '../models/Comment.js';

// Create a comment
export const createComment = async (req, res) => {
  try {
    const { postId, content } = req.body;

    const newComment = new Comment({
      postId,
      content,
      user: req.userId,  // Assuming the user is authenticated
      createdAt: Date.now(),
    });

    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get comments by postId
export const getCommentsByPostId = async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId })
      .populate('user', 'username')
      .sort({ createdAt: -1 });

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a comment
export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Only the user who created the comment or an admin can delete it
    if (comment.user.toString() !== req.userId && !req.isAdmin) {
      return res.status(403).json({ message: 'Not authorized to delete this comment' });
    }

    await comment.remove();
    res.status(200).json({ message: 'Comment deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
