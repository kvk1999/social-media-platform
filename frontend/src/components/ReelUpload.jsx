import React, { useState, useContext } from 'react';
import { ReelsContext } from '../context/PostContext';
import axios from 'axios';

const ReelUpload = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [video, setVideo] = useState(null);
  const { fetchReels } = useContext(ReelsContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('video', video);

    try {
      await axios.post('/api/reels', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      fetchReels();
      setTitle('');
      setDescription('');
      setVideo(null);
    } catch (error) {
      console.error('Error uploading reel:', error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg p-6 max-w-lg mx-auto mt-6"
    >
      <h2 className="text-xl font-bold mb-4">Upload Reel</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />
      <input
        type="file"
        accept="video/*"
        onChange={(e) => setVideo(e.target.files[0])}
        className="w-full p-2 mb-4 border rounded"
        required
      />
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Upload
      </button>
    </form>
  );
};

export default ReelUpload;
