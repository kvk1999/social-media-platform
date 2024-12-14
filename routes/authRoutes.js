// authRoutes.js
import express from 'express';
import auth from '../middlewares/auth.js';
import { register, login, logout, getUserProfile } from '../controllers/authController.js';

const router = express.Router();

// Register a new user
router.post('/register', register);

// Login an existing user
router.post('/login', login);

// Logout a user
router.get('/logout', logout);

// Get user profile (protected route, uncomment if needed later)
router.get('/profile', auth, getUserProfile);

export default router;
