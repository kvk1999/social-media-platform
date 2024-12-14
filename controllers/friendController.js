import FriendRequest from '../models/FriendRequest.js';
import User from '../models/user.js';

// Send a friend request
export const sendFriendRequest = async (req, res) => {
    const { userId } = req.params;

    try {
        const sender = req.user.id;
        const receiver = userId;

        // Check if a friend request already exists
        const existingRequest = await FriendRequest.findOne({ sender, receiver });
        if (existingRequest) {
            return res.status(400).json({ message: 'Friend request already sent.' });
        }

        // Create a new friend request
        const friendRequest = new FriendRequest({ sender, receiver });
        await friendRequest.save();

        res.status(201).json({ message: 'Friend request sent.', friendRequest });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred.', error });
    }
};

// Accept a friend request
export const acceptFriendRequest = async (req, res) => {
    const { requestId } = req.params;

    try {
        const request = await FriendRequest.findById(requestId);
        if (!request) {
            return res.status(404).json({ message: 'Friend request not found.' });
        }

        // Add both users as friends
        const user = await User.findById(req.user.id);
        const sender = await User.findById(request.sender);

        if (!user || !sender) {
            return res.status(404).json({ message: 'User not found.' });
        }

        user.friends.push(sender.id);
        sender.friends.push(user.id);

        await user.save();
        await sender.save();

        // Remove the friend request after accepting
        await FriendRequest.findByIdAndDelete(requestId);

        res.status(200).json({ message: 'Friend request accepted.' });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred.', error });
    }
};

// Decline a friend request
export const declineFriendRequest = async (req, res) => {
    const { requestId } = req.params;

    try {
        const request = await FriendRequest.findById(requestId);
        if (!request) {
            return res.status(404).json({ message: 'Friend request not found.' });
        }

        await FriendRequest.findByIdAndDelete(requestId);

        res.status(200).json({ message: 'Friend request declined.' });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred.', error });
    }
};

// Remove a friend
export const removeFriend = async (req, res) => {
    const { friendId } = req.params;

    try {
        const user = await User.findById(req.user.id);
        const friend = await User.findById(friendId);

        if (!user || !friend) {
            return res.status(404).json({ message: 'User not found.' });
        }

        user.friends = user.friends.filter(id => id.toString() !== friendId);
        friend.friends = friend.friends.filter(id => id.toString() !== user.id);

        await user.save();
        await friend.save();

        res.status(200).json({ message: 'Friend removed successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred.', error });
    }
};

// Get all incoming friend requests
export const getFriendRequests = async (req, res) => {
    try {
        const friendRequests = await FriendRequest.find({ receiver: req.user.id }).populate('sender', 'username email');

        res.status(200).json({ friendRequests });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred.', error });
    }
};

// Get all friends of the authenticated user
export const getFriends = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('friends', 'username email');

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.status(200).json({ friends: user.friends });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred.', error });
    }
};
