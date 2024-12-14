import User from '../models/user.js';

// userController.js

// Get a user by ID
export const getUserById = async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  // Get all users
  export const getAllUsers = async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  // Update a user
    export const updateUser = async (req, res) => {
        try {
        const updatedUser = await
        User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(updatedUser);
        }
        catch (error) {
            res.status(500).json({ message: 'Server error' });
        }
    };

    // Delete a user
    export const deleteUser = async (req, res) => {
        try {
        const
        user
        = await User.findByIdAndDelete(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
        }
        catch (error) {
            res.status(500).json({ message: 'Server error' });
        }
    };