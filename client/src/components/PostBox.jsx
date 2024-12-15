import React, { useState } from 'react';

const PostBox = () => {
  const [postContent, setPostContent] = useState("");

  const handlePostSubmit = () => {
    if (postContent.trim()) {
      console.log("Post submitted:", postContent);
      setPostContent(""); // Clear the input field after submission
    } else {
      alert("Post cannot be empty!");
    }
  };

  return (
    <div className="bg-white p-4 shadow-md rounded-lg">
      {/* Heading */}
      <h2 className="text-lg font-semibold mb-3">What's Happening?</h2>
      
      {/* Textarea for user input */}
      <textarea
        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-3"
        rows="3"
        placeholder="Share your thoughts..."
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
      />

      {/* Buttons for Post and Media Upload */}
      <div className="flex justify-between items-center">
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          onClick={handlePostSubmit}
        >
          Post
        </button>

        <label className="cursor-pointer text-blue-500 hover:underline">
          <input type="file" className="hidden" />
          Add Media
        </label>
      </div>
    </div>
  );
};

export default PostBox;
