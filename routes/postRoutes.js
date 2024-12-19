import express from "express";
import { isAuth } from "../middlewares/isAuth.js"; // Authentication middleware
import {
  commentonPost,
  deleteComment,
  deletePost,
  editCaption,
  getAllPosts,
  likeUnlikePost,
  newPost, // Controller for creating new post
} from "../controllers/postControllers.js"; // Controller methods for post actions
import uploadFile from "../middlewares/multer.js"; // Multer middleware for file upload

const router = express.Router();

// Route to create a new post (requires authentication and file upload handling)
router.post("/new", isAuth, uploadFile, newPost);

// Route to edit post caption (requires authentication)
router.put("/:id", isAuth, editCaption);

// Route to delete post (requires authentication)
router.delete("/:id", isAuth, deletePost);

// Route to get all posts (requires authentication)
router.get("/all", isAuth, getAllPosts);

// Route to like or unlike a post (requires authentication)
router.post("/like/:id", isAuth, likeUnlikePost);

// Route to comment on a post (requires authentication)
router.post("/comment/:id", isAuth, commentonPost);

// Route to delete a comment (requires authentication)
router.delete("/comment/:id", isAuth, deleteComment);

export default router;
