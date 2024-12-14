import Like from '../models/Like.js';
import Post from '../models/Post.js';
import Comment from '../models/Comment.js';

/**
 * Like a Post
 * @route POST /api/v1/likes/post/:postId
 */
export const likePost = async (req, res, next) => {
    const { postId } = req.params;

    try {
        // Check if post exists
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ success: false, message: 'Post not found' });
        }

        // Check if the user has already liked the post
        const existingLike = await Like.findOne({ user: req.user.id, post: postId });
        if (existingLike) {
            return res.status(400).json({ success: false, message: 'You have already liked this post' });
        }

        // Create a new like
        const like = new Like({ user: req.user.id, post: postId });
        await like.save();

        res.status(201).json({ success: true, message: 'Post liked successfully', like });
    } catch (error) {
        next(error);
    }
};

/**
 * Unlike a Post
 * @route DELETE /api/v1/likes/post/:postId
 */
export const unlikePost = async (req, res, next) => {
    const { postId } = req.params;

    try {
        // Find the like record
        const like = await Like.findOneAndDelete({ user: req.user.id, post: postId });
        if (!like) {
            return res.status(404).json({ success: false, message: 'You have not liked this post' });
        }

        res.status(200).json({ success: true, message: 'Post unliked successfully' });
    } catch (error) {
        next(error);
    }
};

/**
 * Like a Comment
 * @route POST /api/v1/likes/comment/:commentId
 */
export const likeComment = async (req, res, next) => {
    const { commentId } = req.params;

    try {
        // Check if comment exists
        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({ success: false, message: 'Comment not found' });
        }

        // Check if the user has already liked the comment
        const existingLike = await Like.findOne({ user: req.user.id, comment: commentId });
        if (existingLike) {
            return res.status(400).json({ success: false, message: 'You have already liked this comment' });
        }

        // Create a new like
        const like = new Like({ user: req.user.id, comment: commentId });
        await like.save();

        res.status(201).json({ success: true, message: 'Comment liked successfully', like });
    } catch (error) {
        next(error);
    }
};

/**
 * Unlike a Comment
 * @route DELETE /api/v1/likes/comment/:commentId
 */
export const unlikeComment = async (req, res, next) => {
    const { commentId } = req.params;

    try {
        // Find the like record
        const like = await Like.findOneAndDelete({ user: req.user.id, comment: commentId });
        if (!like) {
            return res.status(404).json({ success: false, message: 'You have not liked this comment' });
        }

        res.status(200).json({ success: true, message: 'Comment unliked successfully' });
    } catch (error) {
        next(error);
    }
};
