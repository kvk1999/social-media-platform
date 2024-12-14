import mongoose from 'mongoose';

// Check if the model is already defined, if not, define it
const User = mongoose.models.User || mongoose.model('User', new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  // Other fields for your user schema
}));

export default User;
