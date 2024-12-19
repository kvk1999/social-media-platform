const express = require('express');
const multer = require('multer');
const {
  createReel,
  getReels,
  getReelById,
  updateReel,
  deleteReel,
} = require('../controllers/reelsController');

const router = express.Router();

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

// Routes
// POST /api/reels - Create a new reel
router.post('/', upload.single('video'), createReel);

// GET /api/reels - Get all reels
router.get('/', getReels);

// GET /api/reels/:id - Get a single reel by ID
router.get('/:id', getReelById);

// PUT /api/reels/:id - Update a reel
router.put('/:id', updateReel);

// DELETE /api/reels/:id - Delete a reel
router.delete('/:id', deleteReel);

module.exports = router;
