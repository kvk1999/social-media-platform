// routes/authRoutes.js
const express = require('express');
const { register, login } = require('../controllers/authController');  // Import controller functions

const router = express.Router();

// POST /api/auth/register - Register a new user
router.post('/register', register);

// POST /api/auth/login - Login a user
router.post('/login', login);

module.exports = router;
