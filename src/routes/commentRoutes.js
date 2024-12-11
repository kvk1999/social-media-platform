import express from 'express';
import { createComment, getComments, getComment, updateComment, deleteComment } from '../controllers/commentController.js'; // Import the functions

const router = express.Router();

// Create a new comment
router.post('/', createComment);

// Get all comments for a specific post
router.get('/:postId', getComments);

// Get a single comment by ID
router.get('/comment/:commentId', getComment);

// Update a comment by ID
router.put('/comment/:commentId', updateComment);

// Delete a comment by ID
router.delete('/comment/:commentId', deleteComment);

export default router;
