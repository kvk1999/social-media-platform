import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';
import commentRoutes from './routes/commentRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import storyRoutes from './routes/storyRoutes.js';
import friendRoutes from './routes/friendRoutes.js';
import newsfeedRoutes from './routes/newsfeedRoutes.js';
import jwt from 'jwt-simple';

dotenv.config();

const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// JWT authentication middleware
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Extract token from the header

  if (!token) {
    return res.status(403).send('Token required');
  }

  try {
    // Verify the token
    const decoded = jwt.decode(token, process.env.SECRET_KEY);
    req.user = decoded; // Attach the decoded user data to the request object
    next();
  } catch (err) {
    return res.status(401).send('Invalid or expired token');
  }
};

// Routes
app.use('/api/v1/auth', authRoutes); // Authentication routes
app.use('/api/v1/users', userRoutes); // User routes
app.use('/api/v1/posts', postRoutes); // Post routes
app.use('/api/v1/comments', commentRoutes); // Comment routes
app.use('/api/v1/notifications', notificationRoutes); // Notification routes
app.use('/api/v1/newsfeed', newsfeedRoutes); // Newsfeed routes
app.use('/api/v1/stories', storyRoutes); // Story routes
app.use('/api/v1/friends', friendRoutes); // Friend routes

// Authentication Verification Route
app.get('/api/v1/auth/verify', verifyToken, (req, res) => {
  // If the token is valid, return the user's username (or any other user-related data)
  res.status(200).json({ success: true, username: req.user.username });
});

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the backend API');
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
