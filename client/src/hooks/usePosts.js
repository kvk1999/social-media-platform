import { useState, useEffect } from 'react';
import axios from 'axios';

const usePosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('/api/posts');
      setPosts(response.data);
    } catch (err) {
      setError(err.response ? err.response.data.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const createPost = async (content) => {
    try {
      const response = await axios.post('/api/posts', { content });
      setPosts([response.data, ...posts]);
    } catch (err) {
      setError(err.response ? err.response.data.message : 'Failed to create post');
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return { posts, loading, error, createPost };
};

export default usePosts;
