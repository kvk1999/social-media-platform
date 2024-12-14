import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';

// Import routers
import authRouter from './routes/authRoutes.js'; // Handles authentication (login, register, logout)
import userRouter from './routes/userRoutes.js'; // Handles user profiles and related endpoints
import postRouter from './routes/postRoutes.js'; // Handles posts (create, update, delete, fetch posts)
import commentRouter from './routes/commentRoutes.js'; // Handles comments on posts
import likeRouter from './routes/likeRoutes.js'; // Handles likes on posts and comments
import storyRouter from './routes/storyRoutes.js'; // Handles user stories
import friendRouter from './routes/friendRoutes.js'; // Handles friend requests and friend list
import { unknownEndpoint, errorHandler } from './middlewares/errorHandler.js'; // Error handling middleware
import logger from './utils/logger.js'; // Custom logger middleware
import cors from 'cors'; // Enable Cross-Origin Resource Sharing

// Dynamic __dirname resolution for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize the app
const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:5173', credentials: true })); // Enable CORS for the frontend
app.use(express.json()); // Parse JSON bodies
app.use(cookieParser()); // Parse cookies
app.use(logger); // Log requests for debugging

// Serve frontend (client)
app.use(express.static(path.join(__dirname, 'client/dist'))); // Serve the client build

// SPA Routing (fallback to index.html for unmatched routes)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/dist/index.html'));
});

// API Routes
app.use('/api/v1/auth', authRouter); // Authentication routes (login, register, logout)
app.use('/api/v1/users', userRouter); // User profile management
app.use('/api/v1/posts', postRouter); // Posts CRUD
app.use('/api/v1/comments', commentRouter); // Comments on posts
app.use('/api/v1/likes', likeRouter); // Likes on posts and comments
app.use('/api/v1/stories', storyRouter); // Stories CRUD
app.use('/api/v1/friends', friendRouter); // Friend requests and friend management

// Handle unknown endpoints
app.use(unknownEndpoint);

// Global error handler (for catching all unhandled errors)
app.use(errorHandler);

export default app;
