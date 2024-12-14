// likeRoutes.js
import express from 'express';
import auth from '../middlewares/auth.js';
import { likePost, unlikePost, likeComment, unlikeComment } from '../controllers/likecontroller.js';

const router = express.Router();

// Like a post
router.post('/:postId', auth, likePost);

// Unlike a post
router.delete('/:postId', auth, unlikePost);

// POST /api/v1/likes/comment/:commentId - Like a comment
router.post('/comment/:commentId', auth, likeComment);

// DELETE /api/v1/likes/comment/:commentId - Unlike a comment
router.delete('/comment/:commentId', auth, unlikeComment);

export default router;
