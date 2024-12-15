import React, { useEffect, useState } from "react";
import { fetchPosts, createPost, deletePost } from "../services/postService";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [newPostContent, setNewPostContent] = useState("");

  // Fetch posts on component mount
  useEffect(() => {
    const loadPosts = async () => {
      try {
        const fetchedPosts = await fetchPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Error loading posts:", error);
      }
    };

    loadPosts();
  }, []);

  // Handle creating a new post
  const handleCreatePost = async () => {
    if (!newPostContent.trim()) return;

    const newPost = { content: newPostContent, author: "Current User" }; // Adjust author dynamically
    try {
      const createdPost = await createPost(newPost);
      setPosts([createdPost, ...posts]); // Add to the top of the feed
      setNewPostContent(""); // Clear input field
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  // Handle deleting a post
  const handleDeletePost = async (postId) => {
    try {
      await deletePost(postId);
      setPosts(posts.filter((post) => post.id !== postId)); // Remove from the feed
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div className="space-y-4">
      {/* Create Post */}
      <div className="bg-white p-4 shadow-md rounded-lg border border-gray-200">
        <textarea
          className="w-full p-2 border rounded-lg mb-2"
          rows="3"
          placeholder="What's on your mind?"
          value={newPostContent}
          onChange={(e) => setNewPostContent(e.target.value)}
        ></textarea>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          onClick={handleCreatePost}
        >
          Post
        </button>
      </div>

      {/* Render Posts */}
      {posts.map((post) => (
        <div
          key={post.id}
          className="bg-white p-4 shadow-md rounded-lg border border-gray-200"
        >
          <h3 className="font-bold">{post.author}</h3>
          <p>{post.content}</p>
          <button
            className="text-red-500 mt-2"
            onClick={() => handleDeletePost(post.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default Feed;
