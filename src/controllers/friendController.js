import Friend from '../models/Friends.js';
import FriendRequest from '../models/FriendRequest.js';
import User from '../models/User.js';

// Send a friend request
export const sendFriendRequest = async (req, res) => {
  const { userId } = req.params;
  const { requestorId } = req.body;  // Assume the requestorId is sent in the request body

  try {
    const existingRequest = await FriendRequest.findOne({
      $or: [
        { sender: requestorId, receiver: userId },
        { sender: userId, receiver: requestorId }
      ]
    });

    if (existingRequest) {
      return res.status(400).json({ message: 'Friend request already sent or pending.' });
    }

    const newRequest = new FriendRequest({
      sender: requestorId,
      receiver: userId,
    });

    await newRequest.save();  // Save the friend request
    res.status(201).json({ message: 'Friend request sent.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Accept a friend request
export const acceptFriendRequest = async (req, res) => {
  const { requestId } = req.params;

  try {
    const friendRequest = await FriendRequest.findById(requestId);

    if (!friendRequest) {
      return res.status(404).json({ message: 'Friend request not found.' });
    }

    const newFriend = new Friend({
      user: friendRequest.sender,
      friend: friendRequest.receiver,
    });

    await newFriend.save();  // Save the new friend relationship

    // Optionally, you could also add the inverse friendship (the other user adding the current user as a friend)
    const reverseFriend = new Friend({
      user: friendRequest.receiver,
      friend: friendRequest.sender,
    });

    await reverseFriend.save();

    await FriendRequest.findByIdAndDelete(requestId);  // Delete the friend request after accepting

    res.status(200).json({ message: 'Friend request accepted.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Decline a friend request
export const declineFriendRequest = async (req, res) => {
  const { requestId } = req.params;

  try {
    const friendRequest = await FriendRequest.findById(requestId);

    if (!friendRequest) {
      return res.status(404).json({ message: 'Friend request not found.' });
    }

    await FriendRequest.findByIdAndDelete(requestId);  // Delete the friend request
    res.status(200).json({ message: 'Friend request declined.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all friends of a user
export const getFriends = async (req, res) => {
  const { userId } = req.params;

  try {
    const friends = await Friend.find({ user: userId }).populate('friend');  // Populate the friend data
    res.status(200).json(friends);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all friend requests for a user
export const getFriendRequests = async (req, res) => {
  const { userId } = req.params;

  try {
    const requests = await FriendRequest.find({ receiver: userId }).populate('sender');  // Populate sender data
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
