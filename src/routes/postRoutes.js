import express from 'express';
import { createPost, getPosts, getPost, updatePost, deletePost, likePost, unlikePost } from '../controllers/postController.js';  // Correct import

const router = express.Router();

// Define your routes
router.post('/create', createPost);
router.get('/', getPosts);
router.get('/:postId', getPost);  // This will call the getPost function
router.put('/:postId', updatePost);
router.delete('/:postId', deletePost);
router.patch('/:postId/like', likePost);  // Like a post
router.patch('/:postId/unlike', unlikePost);  // Unlike a post

export default router;
