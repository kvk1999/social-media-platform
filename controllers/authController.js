const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwtSecret, jwtExpiry } = require('../config/auth'); // JWT configuration

// Register a new user
exports.register = async (req, res) => {
    const { name, email, password } = req.body;

    // Validate inputs
    if (!name || !email || !password) {
        return res.status(400).json({ msg: 'All fields are required' });
    }

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({ name, email, password: hashedPassword });
        await user.save();

        const payload = { userId: user._id };
        const token = jwt.sign(payload, jwtSecret, { expiresIn: jwtExpiry });

        res.status(201).json({
            msg: 'Registration successful',
            token,
        });
    } catch (error) {
        console.error('Error in registration:', error.message);
        res.status(500).json({ msg: 'Server error', error: error.message });
    }
};



// Login a user
exports.login = async (req, res) => {
    const { email, password } = req.body;

    // Input validation
    if (!email || !password) {
        return res.status(400).json({ msg: 'Email and password are required' });
    }

    try {
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Compare password with the hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Generate a JWT token
        const payload = { userId: user._id };
        const token = jwt.sign(payload, jwtSecret, { expiresIn: jwtExpiry });

        // Respond with success
        res.json({
            msg: 'Login successful',
            token,
        });
    } catch (error) {
        console.error('Error in login:', error.message);
        res.status(500).json({ msg: 'Server error', error: error.message });
    }
};
