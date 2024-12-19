import { Post } from "../models/postModel.js";
import TryCatch from "../utils/Trycatch.js";
import getDataUrl from "../utils/urlGenrator.js";
import cloudinary from "cloudinary";
import multer from "multer";  // Importing multer for file upload handling

// Setting up multer storage for file uploads
const storage = multer.memoryStorage();  // Store files in memory
const upload = multer({ storage: storage });  // Create multer middleware

// Function for handling new posts (file upload + creation)
export const newPost = [upload.single('file'), TryCatch(async (req, res) => { // Use multer middleware for file upload
  const { caption } = req.body;
  const ownerId = req.user._id;

  const file = req.file;  // Get file from request (uploaded file)
  const fileUrl = getDataUrl(file);  // Get the data URL for file upload

  let option;

  const type = req.query.type;
  if (type === "reel") {
    option = {
      resource_type: "video", // If it's a reel (video), specify video type
    };
  } else {
    option = {};  // Default option for image post
  }

  // Upload file to Cloudinary
  const myCloud = await cloudinary.v2.uploader.upload(fileUrl.content, option);

  // Create new post in the database
  const post = await Post.create({
    caption,
    post: {
      id: myCloud.public_id,  // Store Cloudinary file ID
      url: myCloud.secure_url,  // Store Cloudinary file URL
    },
    owner: ownerId,
    type,
  });

  res.status(201).json({
    message: "Post created",
    post,
  });
})];

// Function for deleting a post
export const deletePost = TryCatch(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post)
    return res.status(404).json({
      message: "No post with this id",
    });

  // Ensure the user is the post owner
  if (post.owner.toString() !== req.user._id.toString())
    return res.status(403).json({
      message: "Unauthorized",
    });

  // Delete file from Cloudinary
  await cloudinary.v2.uploader.destroy(post.post.id);

  // Delete post from database
  await post.deleteOne();

  res.json({
    message: "Post Deleted",
  });
});

// Function to get all posts
export const getAllPosts = TryCatch(async (req, res) => {
  const posts = await Post.find({ type: "post" })
    .sort({ createdAt: -1 })
    .populate("owner", "-password")  // Exclude password from owner details
    .populate({
      path: "comments.user",
      select: "-password",  // Exclude password from comments' user details
    });

  const reels = await Post.find({ type: "reel" })
    .sort({ createdAt: -1 })
    .populate("owner", "-password")
    .populate({
      path: "comments.user",
      select: "-password",
    });

  res.json({ posts, reels });
});

// Function to like/unlike a post
export const likeUnlikePost = TryCatch(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post)
    return res.status(404).json({
      message: "No Post with this id",
    });

  // Toggle like status
  if (post.likes.includes(req.user._id)) {
    const index = post.likes.indexOf(req.user._id);
    post.likes.splice(index, 1);  // Remove like
    await post.save();
    res.json({ message: "Post Unlike" });
  } else {
    post.likes.push(req.user._id);  // Add like
    await post.save();
    res.json({ message: "Post liked" });
  }
});

// Function to comment on a post
export const commentonPost = TryCatch(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post)
    return res.status(404).json({
      message: "No Post with this id",
    });

  post.comments.push({
    user: req.user._id,
    name: req.user.name,
    comment: req.body.comment,
  });

  await post.save();

  res.json({
    message: "Comment Added",
  });
});

// Function to delete a comment from a post
export const deleteComment = TryCatch(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post)
    return res.status(404).json({
      message: "No Post with this id",
    });

  if (!req.query.commentId)
    return res.status(404).json({
      message: "Please provide comment id",
    });

  const commentIndex = post.comments.findIndex(
    (item) => item._id.toString() === req.query.commentId.toString()
  );

  if (commentIndex === -1) {
    return res.status(400).json({
      message: "Comment not found",
    });
  }

  const comment = post.comments[commentIndex];

  // Allow post owner or comment author to delete the comment
  if (
    post.owner.toString() === req.user._id.toString() ||
    comment.user.toString() === req.user._id.toString()
  ) {
    post.comments.splice(commentIndex, 1);
    await post.save();
    return res.json({
      message: "Comment deleted",
    });
  } else {
    return res.status(400).json({
      message: "You are not allowed to delete this comment",
    });
  }
});

// Function to edit the caption of a post
export const editCaption = TryCatch(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post)
    return res.status(404).json({
      message: "No Post with this id",
    });

  // Ensure the user is the post owner
  if (post.owner.toString() !== req.user._id.toString())
    return res.status(403).json({
      message: "You are not the owner of this post",
    });

  post.caption = req.body.caption;

  await post.save();

  res.json({
    message: "Post updated",
  });
});
