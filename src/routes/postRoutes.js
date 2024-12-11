import express from 'express';
import { createPost, getPosts, getPost, updatePost, deletePost } from '../controllers/postController.js';  // Correct import

const router = express.Router();

// Define your routes
router.post('/create', createPost);
router.get('/', getPosts);
router.get('/:postId', getPost);  // This will call the getPost function
router.put('/:postId', updatePost);
router.delete('/:postId', deletePost);

export default router;
