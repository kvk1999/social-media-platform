import express from 'express';
import jwt from 'jwt-simple';
import bcrypt from 'bcrypt';
import User from '../models/User.js'; // Assuming you have a User model
import dotenv from 'dotenv';
import { login, register, logout } from '../controllers/authController.js'; // Add logout here

const router = express.Router();

// Register route
router.post('/register', register);

// Login route
router.post('/login', login);

// Logout route
router.post('/logout', logout);  // Use the logout function here

export default router;
