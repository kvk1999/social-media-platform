// /src/components/PostForm.jsx
import React, { useState } from 'react';

const PostForm = ({ onSubmit }) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim()) {
      onSubmit(content);
      setContent('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md mb-6">
      <textarea
        className="w-full p-4 border border-gray-300 rounded-lg mb-4"
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows="4"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600"
      >
        Post
      </button>
    </form>
  );
};

export default PostForm;
