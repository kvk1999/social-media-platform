const Reel = require('../models/reelsModel');

// Create a new reel
const createReel = async (req, res) => {
  try {
    const { title, description } = req.body;
    const videoUrl = `/uploads/${req.file.filename}`; // Assuming the video file is uploaded
    const thumbnailUrl = req.body.thumbnailUrl || ''; // Optional thumbnail

    const newReel = new Reel({
      title,
      description,
      videoUrl,
      thumbnailUrl,
      createdBy: req.user ? req.user._id : null, // Optional user linking
    });

    await newReel.save();
    res.status(201).json({ message: 'Reel created successfully', reel: newReel });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create reel', error: error.message });
  }
};

// Get all reels
const getReels = async (req, res) => {
  try {
    const reels = await Reel.find().sort({ createdAt: -1 }); // Latest first
    res.status(200).json(reels);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch reels', error: error.message });
  }
};

// Get a single reel by ID
const getReelById = async (req, res) => {
  try {
    const reel = await Reel.findById(req.params.id);
    if (!reel) {
      return res.status(404).json({ message: 'Reel not found' });
    }
    res.status(200).json(reel);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch reel', error: error.message });
  }
};

// Update a reel
const updateReel = async (req, res) => {
  try {
    const updatedReel = await Reel.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return the updated document
    });
    if (!updatedReel) {
      return res.status(404).json({ message: 'Reel not found' });
    }
    res.status(200).json({ message: 'Reel updated successfully', reel: updatedReel });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update reel', error: error.message });
  }
};

// Delete a reel
const deleteReel = async (req, res) => {
  try {
    const deletedReel = await Reel.findByIdAndDelete(req.params.id);
    if (!deletedReel) {
      return res.status(404).json({ message: 'Reel not found' });
    }
    res.status(200).json({ message: 'Reel deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete reel', error: error.message });
  }
};

module.exports = {
  createReel,
  getReels,
  getReelById,
  updateReel,
  deleteReel,
};
