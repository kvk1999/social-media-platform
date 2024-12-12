import Newsfeed from "../models/NewsFeed.js";

// Get all newsfeed posts
export const getAllNewsfeedPosts = async (req, res) => {
  try {
    const posts = await Newsfeed.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching newsfeed posts", error });
  }
};

// Create a new post
export const createNewsfeedPost = async (req, res) => {
  const { title, content, author } = req.body;
  try {
    const newPost = new Newsfeed({ title, content, author });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ message: "Error creating post", error });
  }
};

// Delete a post
export const deleteNewsfeedPost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Newsfeed.findByIdAndDelete(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting post", error });
  }
};
