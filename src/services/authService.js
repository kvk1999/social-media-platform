// services/authService.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { JWT_SECRET, JWT_EXPIRATION_TIME } = require('../utils/constants');

// Hash the password
const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

// Compare provided password with stored hashed password
const comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};

// Generate JWT token for authenticated users
const generateAuthToken = (user) => {
    const payload = { userId: user._id, username: user.username };
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION_TIME });
};

// Register new user
const registerUser = async (userData) => {
    const { username, password, email } = userData;
    const hashedPassword = await hashPassword(password);

    const newUser = new User({
        username,
        email,
        password: hashedPassword
    });

    return await newUser.save();
};

// Login user
const loginUser = async (username, password) => {
    const user = await User.findOne({ username });
    if (!user) {
        throw new Error('User not found');
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid credentials');
    }

    const token = generateAuthToken(user);
    return { user, token };
};

module.exports = { registerUser, loginUser };
