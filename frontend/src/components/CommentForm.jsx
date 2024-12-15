// /src/components/CommentForm.jsx
import React, { useState } from 'react';

const CommentForm = ({ onSubmit }) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim()) {
      onSubmit(content);
      setContent('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center p-4 bg-gray-100 rounded-lg">
      <textarea
        className="w-full p-2 border border-gray-300 rounded-lg mr-4"
        placeholder="Write a comment..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows="2"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600"
      >
        Comment
      </button>
    </form>
  );
};

export default CommentForm;
