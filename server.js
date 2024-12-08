// server.js
require('dotenv').config();  // Load environment variables from .env file
const express = require('express');
const connectDB = require('./config/db');  // Import the database connection
const { serverPort, environment } = require('./config/general');  // Import general settings
const authConfig = require('./config/auth');  // Import authentication settings
const morgan = require('morgan');  // Request logger
const cors = require('cors');  // For handling CORS
const helmet = require('helmet');  // Security middleware
const rateLimit = require('express-rate-limit');  // Rate-limiting to prevent abuse

// Import routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const friendRoutes = require('./routes/friendRoutes');
const commentRoutes = require('./routes/commentRoutes');
const storyRoutes = require('./routes/storyRoutes');

// Initialize express app
const app = express();

// Middlewares

// Security middleware
app.use(helmet()); // Adds security-related HTTP headers

// Cross-Origin Resource Sharing (CORS)
app.use(cors());  // Allow cross-origin requests

// Request logging middleware (for development)
if (environment === 'development') {
    app.use(morgan('dev')); // Logs all HTTP requests in 'dev' format
}

// JSON parsing middleware
app.use(express.json());  // Parse JSON bodies

// Rate limiting middleware to prevent brute-force attacks
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per window
});
app.use(limiter);

// API Routes
app.use('/api/auth', authRoutes);  // Authentication routes (login, register, etc.)
app.use('/api/users', userRoutes);  // User routes (profile management, friend list, etc.)
app.use('/api/posts', postRoutes);  // Post routes (creating, editing, deleting posts)
app.use('/api/friends', friendRoutes);  // Friend-related routes (sending friend requests, managing friends)
app.use('/api/comments', commentRoutes);  // Comment routes (adding/editing/deleting comments)
app.use('/api/stories', storyRoutes);  // Story routes (creating, viewing, and deleting stories)

// Starting the server
connectDB().then(() => {
    app.listen(serverPort, () => {
        console.log(`Server running in ${environment} mode on port localhost:${serverPort}`);
    });
});
