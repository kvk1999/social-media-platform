const FriendRequest = require('../models/FriendRequest');
const User = require('../models/User');

// Controller to send a friend request
exports.sendFriendRequest = async (req, res) => {
  try {
    const { receiverId } = req.body;

    // Check if the receiver exists
    const receiver = await User.findById(receiverId);
    if (!receiver) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create a new friend request
    const friendRequest = new FriendRequest({
      sender: req.user._id,  // from the logged-in user
      receiver: receiverId,
      status: 'pending',
    });

    await friendRequest.save();
    res.status(201).json({ message: 'Friend request sent' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error sending friend request' });
  }
};

// Controller to accept a friend request
exports.acceptFriendRequest = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the friend request
    const friendRequest = await FriendRequest.findById(id);
    if (!friendRequest) {
      return res.status(404).json({ message: 'Friend request not found' });
    }

    // Ensure the logged-in user is the receiver
    if (friendRequest.receiver.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You cannot accept this request' });
    }

    // Update the status to accepted
    friendRequest.status = 'accepted';
    await friendRequest.save();
    res.status(200).json({ message: 'Friend request accepted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error accepting friend request' });
  }
};

// Controller to reject a friend request
exports.rejectFriendRequest = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the friend request
    const friendRequest = await FriendRequest.findById(id);
    if (!friendRequest) {
      return res.status(404).json({ message: 'Friend request not found' });
    }

    // Ensure the logged-in user is the receiver
    if (friendRequest.receiver.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You cannot reject this request' });
    }

    // Update the status to rejected
    friendRequest.status = 'rejected';
    await friendRequest.save();
    res.status(200).json({ message: 'Friend request rejected' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error rejecting friend request' });
  }
};

// Controller to get all friend requests for the logged-in user
exports.getFriendRequests = async (req, res) => {
  try {
    const friendRequests = await FriendRequest.find({ receiver: req.user._id })
      .populate('sender', 'username email') // Populate sender data (you can include more fields as needed)
      .exec();
    res.status(200).json(friendRequests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching friend requests' });
  }
};
