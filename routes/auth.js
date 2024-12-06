const express = require('express');
const bcrypt = require('bcrypt'); // For hashing passwords
const jwt = require('jsonwebtoken'); // For authentication tokens
const { body, validationResult } = require('express-validator'); // For input validation

const router = express.Router();

// Mock user database (replace with actual database in production)
const users = [];

// Secret key for JWT
const SECRET_KEY = 'your_secret_key';

// Middleware for authenticating users
function authenticateToken(req, res, next) {
    const token = req.header('Authorization');
    if (!token) return res.status(401).send('Access Denied');

    try {
        const verified = jwt.verify(token, SECRET_KEY);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send('Invalid Token');
    }
}

// Registration Route
router.post(
    '/register',
    [
        body('email').isEmail().withMessage('Invalid email address'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        // Check if user already exists
        const userExists = users.find((user) => user.email === email);
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save user
        users.push({ email, password: hashedPassword });
        res.status(201).json({ message: 'User registered successfully' });
    }
);

// Login Route
router.post(
    '/login',
    async (req, res) => {
        const { email, password } = req.body;

        // Check if user exists
        const user = users.find((user) => user.email === email);
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Verify password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT
        const token = jwt.sign({ email: user.email }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ message: 'Login successful', token });
    }
);

// Notifications Route
router.get('/notifications', authenticateToken, (req, res) => {
    const notifications = [
        { id: 1, message: 'Welcome to our platform!' },
        { id: 2, message: 'Your profile is 80% complete.' },
        { id: 3, message: 'Check out the new features we added!' },
    ];

    res.json({ notifications });
});

module.exports = router;
