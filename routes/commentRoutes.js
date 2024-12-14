import express from 'express';
import { createComment, getCommentsByPostId, deleteComment } from '../controllers/commentController.js';
import auth from '../middlewares/auth.js'; // Assuming you have an authentication middleware

const router = express.Router();

// Get comments by postId
router.get('/:postId', auth, getCommentsByPostId);  // Middleware 'protect' ensures only authenticated users can access this route

// Route to create a new comment on a specific post (protected)
router.post('/:postId', auth, createComment);

// Route to delete a specific comment by commentId (protected)
router.delete('/:commentId', auth, deleteComment);

export default router;
