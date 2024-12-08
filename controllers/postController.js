const Post = require('../models/Post');

// Create a new post
exports.createPost = async (req, res) => {
    try {
        const { content, media } = req.body;
        const newPost = new Post({
            user: req.user.id,  // Assuming user is attached via middleware (JWT)
            content,
            media,
        });
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all posts (news feed)
exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 }); // Sort posts by latest
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get posts from a specific user
exports.getUserPosts = async (req, res) => {
    try {
        const posts = await Post.find({ user: req.params.userId }).sort({ createdAt: -1 });
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Edit a post
exports.editPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        if (post.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        post.content = req.body.content || post.content;
        post.media = req.body.media || post.media;
        await post.save();
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a post
exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        if (post.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        await post.remove();
        res.status(200).json({ message: 'Post deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
