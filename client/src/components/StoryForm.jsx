// /src/components/StoryForm.jsx
import React, { useState } from 'react';

const StoryForm = ({ onSubmit }) => {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');

  const handleFileChange = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (image && description) {
      onSubmit({ image, description });
      setImage(null);
      setDescription('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <input
        type="file"
        onChange={handleFileChange}
        className="mb-4"
        accept="image/*"
      />
      {image && <img src={image} alt="Preview" className="mb-4 rounded-md" />}
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Add a description"
        className="w-full p-2 border border-gray-300 rounded-lg mb-4"
        rows="4"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600"
      >
        Post Story
      </button>
    </form>
  );
};

export default StoryForm;
