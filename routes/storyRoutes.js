// storyRoutes.js
import express from 'express';
import auth from '../middlewares/auth.js';
import { createStory, getAllStories, getStoryById, deleteStory } from '../controllers/storyController.js';

const router = express.Router();

// Create a new story
router.post('/', auth, createStory);

// Get all stories
router.get('/', auth, getAllStories);

// Get a specific story by storyId
router.get('/:storyId', auth, getStoryById);

// Delete a story
router.delete('/:storyId', auth, deleteStory);

export default router;
