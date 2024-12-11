import express from 'express';
import {
  getUser,
  updateUser,
  deleteUser,
  getAllUsers,
} from '../controllers/userController.js'; // Importing user controller

const router = express.Router();

// Get user details by ID
router.get('/:userId', getUser);

// Get all users (could be used for an admin or user search feature)
router.get('/:userId', getAllUsers);

// Update user profile by ID
router.put('/:userId', updateUser);

// Delete user by ID
router.delete('/:userId', deleteUser);

export default router;
