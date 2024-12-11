import Comment from '../models/Comment.js'; // Import your Comment model

// Create a new comment
export const createComment = async (req, res) => {
  const { postId, content, userId } = req.body;  // Extract data from the request body

  try {
    const newComment = new Comment({
      postId,
      content,
      userId,
    });

    const savedComment = await newComment.save();  // Save the comment to the database
    res.status(201).json(savedComment);  // Send the created comment as the response
  } catch (error) {
    res.status(500).json({ message: error.message });  // Handle any errors
  }
};

// Get all comments for a specific post
export const getComments = async (req, res) => {
  const { postId } = req.params;  // Get the postId from the request parameters

  try {
    const comments = await Comment.find({ postId });  // Find comments by postId
    res.status(200).json(comments);  // Send the comments as the response
  } catch (error) {
    res.status(500).json({ message: error.message });  // Handle any errors
  }
};

// Get a single comment by ID
export const getComment = async (req, res) => {
  const { commentId } = req.params;  // Get the commentId from the request parameters

  try {
    const comment = await Comment.findById(commentId);  // Find the comment by ID
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });  // Handle comment not found
    }
    res.status(200).json(comment);  // Send the comment as the response
  } catch (error) {
    res.status(500).json({ message: error.message });  // Handle any errors
  }
};

// Update a comment
export const updateComment = async (req, res) => {
  const { commentId } = req.params;  // Get the commentId from the request parameters
  const { content } = req.body;  // Get the updated content from the request body

  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      { content },
      { new: true }  // Return the updated comment
    );
    if (!updatedComment) {
      return res.status(404).json({ message: 'Comment not found' });  // Handle comment not found
    }
    res.status(200).json(updatedComment);  // Send the updated comment as the response
  } catch (error) {
    res.status(500).json({ message: error.message });  // Handle any errors
  }
};

// Delete a comment
export const deleteComment = async (req, res) => {
  const { commentId } = req.params;  // Get the commentId from the request parameters

  try {
    const deletedComment = await Comment.findByIdAndDelete(commentId);  // Delete the comment by ID
    if (!deletedComment) {
      return res.status(404).json({ message: 'Comment not found' });  // Handle comment not found
    }
    res.status(200).json({ message: 'Comment deleted successfully' });  // Return success message
  } catch (error) {
    res.status(500).json({ message: error.message });  // Handle any errors
  }
};
