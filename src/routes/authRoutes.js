import express from 'express';
import { login, register, logout } from '../controllers/authController.js'; // Import controller functions
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Register route
router.post('/register', register);

// Login route
router.post('/login', login);

// Logout route
router.post('/logout', logout); // Logout functionality

export default router;
