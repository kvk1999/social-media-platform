import express from 'express';
import { getUserById, getAllUsers, updateUser, deleteUser } from '../controllers/userController.js';

const router = express.Router();

// Use the appropriate controller functions as route handlers
router.get('/:userId', getUserById);
router.get('/', getAllUsers);
router.put('/:userId', updateUser);
router.delete('/:userId', deleteUser);

export default router;
