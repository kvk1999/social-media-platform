import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../services/postservice';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const postsData = await fetchPosts();
        console.log(postsData);  // Log the fetched posts
        if (Array.isArray(postsData)) {
          setPosts(postsData);  // Set posts if response is an array
        } else {
          setError('Invalid data format received');
        }
      } catch (error) {
        setError('Failed to load posts');
      } finally {
        setLoading(false);
      }
    };

    getPosts();  // Fetch posts on component mount
  }, []);

  return (
    <div>
      <h1>Home Page</h1>

      {loading && <p>Loading posts...</p>}
      {error && <p>{error}</p>}

      <div>
        {Array.isArray(posts) && posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} style={{ margin: '20px 0', borderBottom: '1px solid #ccc' }}>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <Link to={`/post/${post.id}`}>Read More</Link>
            </div>
          ))
        ) : (
          <p>No posts available.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
