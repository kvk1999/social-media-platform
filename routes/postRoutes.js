// postRoutes.js
import express from 'express';
import auth from '../middlewares/auth.js';
import { createPost, getAllPosts, getPostById, deletePost } from '../controllers/postController.js';

const router = express.Router();

// Create a new post
router.post('/', auth, createPost);

// Get all posts
router.get('/', getAllPosts);

// Get a single post by postId
router.get('/:postId', getPostById);

// Delete a post
router.delete('/:postId', auth, deletePost);

export default router;
