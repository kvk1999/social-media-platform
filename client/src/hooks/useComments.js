import { useState, useEffect } from 'react';
import axios from 'axios';

const useComments = (postId) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`/api/posts/${postId}/comments`);
      setComments(response.data);
    } catch (err) {
      setError(err.response ? err.response.data.message : 'Failed to load comments');
    } finally {
      setLoading(false);
    }
  };

  const addComment = async (content) => {
    try {
      const response = await axios.post(`/api/posts/${postId}/comments`, { content });
      setComments([response.data, ...comments]);
    } catch (err) {
      setError(err.response ? err.response.data.message : 'Failed to add comment');
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  return { comments, loading, error, addComment };
};

export default useComments;
