import FriendRequest from '../models/FriendRequest.js';
import Friend from '../models/Friends.js'; // For adding accepted friends to the friend list
import User from '../models/User.js'; // For checking if users exist

// Send a friend request
export const sendFriendRequest = async (req, res) => {
  const { senderId, receiverId } = req.body;

  try {
    // Check if the users exist
    const sender = await User.findById(senderId);
    const receiver = await User.findById(receiverId);

    if (!sender || !receiver) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if a request already exists
    const existingRequest = await FriendRequest.findOne({
      senderId,
      receiverId,
    });

    if (existingRequest) {
      return res.status(400).json({ message: 'Friend request already sent' });
    }

    const newRequest = new FriendRequest({ senderId, receiverId });
    await newRequest.save();
    res.status(201).json(newRequest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all friend requests for a user
export const getFriendRequests = async (req, res) => {
  try {
    const requests = await FriendRequest.find({ receiverId: req.params.userId });
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Accept a friend request
export const acceptFriendRequest = async (req, res) => {
  const { requestId } = req.params;

  try {
    // Find the friend request
    const request = await FriendRequest.findById(requestId);

    if (!request) {
      return res.status(404).json({ message: 'Friend request not found' });
    }

    // Add both users to each other's friend list
    const { senderId, receiverId } = request;
    
    // Add to friends list
    await new Friend({ userId: senderId, friendId: receiverId }).save();
    await new Friend({ userId: receiverId, friendId: senderId }).save();

    // Delete the friend request
    await FriendRequest.findByIdAndDelete(requestId);

    res.status(200).json({ message: 'Friend request accepted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Reject a friend request
export const rejectFriendRequest = async (req, res) => {
  const { requestId } = req.params;

  try {
    // Find the friend request
    const request = await FriendRequest.findById(requestId);

    if (!request) {
      return res.status(404).json({ message: 'Friend request not found' });
    }

    // Delete the friend request
    await FriendRequest.findByIdAndDelete(requestId);

    res.status(200).json({ message: 'Friend request rejected' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Cancel a sent friend request
export const cancelFriendRequest = async (req, res) => {
  const { senderId, receiverId } = req.params;

  try {
    // Find the friend request
    const request = await FriendRequest.findOne({ senderId, receiverId });

    if (!request) {
      return res.status(404).json({ message: 'Friend request not found' });
    }

    // Delete the friend request
    await FriendRequest.findByIdAndDelete(request._id);

    res.status(200).json({ message: 'Friend request canceled' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
