import React from 'react';

const StoryBox = () => {
  const handleStoryUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("Story uploaded:", file.name);
      // Process the file upload logic here
    }
  };

  return (
    <div className="bg-white p-4 shadow-md rounded-lg mb-4">
      <h2 className="text-lg font-semibold mb-2">Create a Story</h2>
      <div className="flex items-center justify-between">
        <label className="bg-blue-500 text-white py-2 px-4 rounded-lg cursor-pointer hover:bg-blue-600">
          <input
            type="file"
            accept="image/*,video/*"
            className="hidden"
            onChange={handleStoryUpload}
          />
          Upload Story
        </label>
        <p className="text-gray-500 text-sm">Share your moments with friends!</p>
      </div>
    </div>
  );
};

export default StoryBox;
