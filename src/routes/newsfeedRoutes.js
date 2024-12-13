import express from "express";
import {
  getAllNewsfeedPosts,
  createNewsfeedPost,
  deleteNewsfeedPost,
} from "../controllers/newsfeedController.js";

const router = express.Router();

// Route to get all newsfeed posts
router.get("/all", getAllNewsfeedPosts);

// Route to create a new post
router.post("/", createNewsfeedPost);

// Route to delete a post
router.delete("/:id", deleteNewsfeedPost);

export default router;
