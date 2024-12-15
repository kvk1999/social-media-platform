// /src/components/ProfilePictureUpload.jsx
import React, { useState } from 'react';

const ProfilePictureUpload = ({ onUpload }) => {
  const [image, setImage] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (image) {
      onUpload(image);
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <div>
        <img
          src={image || '/assets/profile-placeholder.png'}
          alt="Profile Preview"
          className="w-32 h-32 rounded-full border-4 border-gray-300 mb-4"
        />
        <input
          type="file"
          onChange={handleFileChange}
          className="mb-4"
        />
      </div>
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600"
      >
        Upload
      </button>
    </div>
  );
};

export default ProfilePictureUpload;
