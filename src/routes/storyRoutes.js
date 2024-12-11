import express from 'express';
import {
  createStory,
  getStories,
  getStory,
  updateStory,
  deleteStory,
} from '../controllers/storyController.js'; // Importing story controller

const router = express.Router();

// Create a new story
router.post('/create', createStory);

// Get all stories for a user
router.get('/:userId', getStories);

// Get a specific story
router.get('/story/:storyId', getStory);

// Update a story
router.put('/:storyId', updateStory);

// Delete a story
router.delete('/:storyId', deleteStory);

export default router;
