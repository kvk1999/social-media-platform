import mongoose from "mongoose";

// Schema for Post
const postSchema = new mongoose.Schema({
  caption: {
    type: String,
    required: true,
    trim: true,
  },
  post: {
    id: {
      type: String,  // Cloudinary public ID for image/video
      required: true,
    },
    url: {
      type: String,  // Cloudinary URL for image/video
      required: true,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  type: {
    type: String,
    enum: ['post', 'reel'],
    required: true,
  },
}, {
  timestamps: true,  // Automatically add createdAt and updatedAt fields
});

// Create a Post model
const Post = mongoose.model('Post', postSchema);

export { Post };
