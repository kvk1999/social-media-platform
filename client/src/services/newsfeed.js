import React, { useState, useEffect } from 'react';
import { fetchNewsFeed } from '../utils/api'; // Import API function for fetching newsfeed
import axios from '../utils/api'; // Import axios for POST and DELETE requests

const NewsFeed = () => {
  const [posts, setPosts] = useState([]);
  const [newPostContent, setNewPostContent] = useState('');
  const [error, setError] = useState(null);

  // Fetch newsfeed posts when component mounts
  useEffect(() => {
    fetchNewsFeed()
      .then((response) => {
        setPosts(response.data); // Assuming response.data contains the posts
      })
      .catch((err) => {
        setError('Failed to load posts');
        console.error(err);
      });
  }, []);

  // Handle creating a new post
  const handleCreatePost = () => {
    if (!newPostContent) return; // Prevent empty posts

    axios
      .post('/newsfeed', { content: newPostContent })
      .then((response) => {
        setPosts([response.data, ...posts]); // Add new post to the front of the feed
        setNewPostContent(''); // Clear the input field
      })
      .catch((err) => {
        setError('Failed to create post');
        console.error(err);
      });
  };

  // Handle deleting a post
  const handleDeletePost = (postId) => {
    axios
      .delete(`/newsfeed/${postId}`)
      .then(() => {
        setPosts(posts.filter((post) => post.id !== postId)); // Remove deleted post from state
      })
      .catch((err) => {
        setError('Failed to delete post');
        console.error(err);
      });
  };

  return (
    <div className="newsfeed">
      <h1 className="text-2xl font-semibold mb-4">Newsfeed</h1>

      {/* Error message */}
      {error && <div className="text-red-500">{error}</div>}

      {/* Create new post */}
      <div className="mb-4">
        <textarea
          value={newPostContent}
          onChange={(e) => setNewPostContent(e.target.value)}
          placeholder="What's on your mind?"
          className="w-full p-2 border rounded-md"
        />
        <button
          onClick={handleCreatePost}
          className="mt-2 p-2 bg-blue-500 text-white rounded-md"
        >
          Post
        </button>
      </div>

      {/* Display posts */}
      {posts.length === 0 ? (
        <p>No posts available</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} className="post mb-4 p-4 border rounded-md">
            <p>{post.content}</p>
            <button
              onClick={() => handleDeletePost(post.id)}
              className="mt-2 p-1 bg-red-500 text-white rounded-md"
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default NewsFeed;
