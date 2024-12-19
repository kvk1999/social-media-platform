const mongoose = require('mongoose');

const reelSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  videoUrl: {
    type: String,
    required: true,
  },
  thumbnailUrl: {
    type: String,
    default: '',
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Optional: If you link reels to users
    required: false,
  },
}, { timestamps: true });

module.exports = mongoose.model('Reel', reelSchema);
