import { useState, useEffect } from 'react';
import axios from 'axios';

const useStories = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStories = async () => {
    try {
      const response = await axios.get('/api/stories');
      setStories(response.data);
    } catch (err) {
      setError(err.response ? err.response.data.message : 'Failed to load stories');
    } finally {
      setLoading(false);
    }
  };

  const addStory = async (content) => {
    try {
      const response = await axios.post('/api/stories', { content });
      setStories([response.data, ...stories]);
    } catch (err) {
      setError(err.response ? err.response.data.message : 'Failed to create story');
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

  return { stories, loading, error, addStory };
};

export default useStories;
