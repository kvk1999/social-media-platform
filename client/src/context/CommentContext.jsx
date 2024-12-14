// /src/context/CommentContext.js
import React, { createContext, useState, useEffect } from 'react';

const CommentContext = createContext();

export const CommentProvider = ({ children }) => {
  const [comments, setComments] = useState([]);

  // Simulate fetching comments from an API
  useEffect(() => {
    const fetchComments = async () => {
      const response = await fetch('/api/v1/comments');
      const data = await response.json();
      setComments(data);
    };
    fetchComments();
  }, []);

  const addComment = (newComment) => {
    setComments([newComment, ...comments]);
  };

  const deleteComment = (commentId) => {
    setComments(comments.filter(comment => comment.id !== commentId));
  };

  return (
    <CommentContext.Provider value={{ comments, addComment, deleteComment }}>
      {children}
    </CommentContext.Provider>
  );
};

export default CommentContext;
