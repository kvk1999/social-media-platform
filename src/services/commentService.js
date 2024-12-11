// services/commentService.js
const Comment = require('../models/Comment');
const Post = require('../models/Post');

// Create a new comment on a post
const createComment = async (postId, userId, content) => {
    const comment = new Comment({
        post: postId,
        user: userId,
        content
    });

    await comment.save();

    // Optionally, you can also update the post's comment count here if necessary
    const post = await Post.findById(postId);
    post.comments.push(comment._id);
    await post.save();

    return comment;
};

// Get comments for a specific post
const getCommentsByPostId = async (postId) => {
    return await Comment.find({ post: postId }).populate('user', 'username avatar');
};

// Delete a comment
const deleteComment = async (commentId) => {
    return await Comment.findByIdAndDelete(commentId);
};

module.exports = { createComment, getCommentsByPostId, deleteComment };
