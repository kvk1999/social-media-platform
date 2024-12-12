import Post from '../models/Post.js'; // Import your Post model (assuming you're using MongoDB with Mongoose)

// Get all posts
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();  // Fetch all posts from the database
    res.status(200).json(posts);      // Send the posts as a response
  } catch (error) {
    res.status(500).json({ message: error.message });  // Handle any errors
  }
};

// Get a single post by ID
export const getPost = async (req, res) => {
  const { postId } = req.params; // Extract postId from the request parameters

  try {
    const post = await Post.findById(postId); // Find the post by ID in the database
    if (!post) {
      return res.status(404).json({ message: 'Post not found' }); // If the post doesn't exist
    }
    res.status(200).json(post); // Send the post details as a response
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle any errors
  }
};

// Create a new post
export const createPost = async (req, res) => {
  const { title, content, author } = req.body;  // Extract data from the request body

  try {
    const newPost = new Post({
      title,
      content,
      author,
    });

    const savedPost = await newPost.save(); // Save the new post to the database
    res.status(201).json(savedPost); // Return the newly created post
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle any errors
  }
};

// Update a post by ID
export const updatePost = async (req, res) => {
  const { postId } = req.params; // Extract postId from the request parameters
  const updates = req.body; // Extract the updated data from the request body

  try {
    const updatedPost = await Post.findByIdAndUpdate(postId, updates, { new: true }); // Update the post

    if (!updatedPost) {
      return res.status(404).json({ message: 'Post not found' }); // If the post doesn't exist
    }

    res.status(200).json(updatedPost); // Return the updated post
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle any errors
  }
};

// Delete a post by ID
export const deletePost = async (req, res) => {
  const { postId } = req.params; // Extract postId from the request parameters

  try {
    const deletedPost = await Post.findByIdAndDelete(postId); // Delete the post from the database

    if (!deletedPost) {
      return res.status(404).json({ message: 'Post not found' }); // If the post doesn't exist
    }

    res.status(200).json({ message: 'Post deleted successfully' }); // Return success message
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle any errors
  }
};

// Like a post
export const likePost = async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await Post.findByIdAndUpdate(
      postId,
      { $inc: { likes: 1 } },  // Increment the likes
      { new: true }  // Return the updated post
    );

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json(post);  // Return updated post with new likes count
  } catch (error) {
    res.status(500).json({ message: 'Error liking the post', error });
  }
};

// Unlike a post
export const unlikePost = async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await Post.findByIdAndUpdate(
      postId,
      { $inc: { likes: -1 } },  // Decrement the likes
      { new: true }  // Return the updated post
    );

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json(post);  // Return updated post with new likes count
  } catch (error) {
    res.status(500).json({ message: 'Error unliking the post', error });
  }
};