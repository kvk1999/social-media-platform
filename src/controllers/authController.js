import bcrypt from 'bcrypt';
import jwt from 'jwt-simple';
import User from '../models/User.js'; // Assuming you have a User model
import dotenv from 'dotenv';

dotenv.config();

// Register function
export const register = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).send('User already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).send('User registered successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

// Login function
export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).send('Invalid username or password');
    }

    // Compare password with hashed password stored in DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send('Invalid username or password');
    }

    // Generate JWT token
    const token = jwt.encode({ username: user.username, id: user._id }, process.env.SECRET_KEY);
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

// Logout function
export const logout = (req, res) => {
  // Usually, logout is handled on the client-side by deleting the token (e.g., from localStorage)
  // So we send a response indicating successful logout
  res.json({ message: 'Logged out successfully' });
};
