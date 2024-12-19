import express from "express";
import { isAuth } from "../middlewares/isAuth.js";
import {
  followandUnfollowUser,
  myProfile,
  updatePassword,
  updateProfile,
  userFollowerandFollowingData,
  userProfile,
  getUserProfile,
} from "../controllers/userControllers.js";
import uploadFile from "../middlewares/multer.js";

const router = express.Router();

router.get("/me", isAuth, myProfile);
router.get("/:id", isAuth, userProfile);
router.post("/:id", isAuth, updatePassword);
router.put("/:id", isAuth, uploadFile, updateProfile);  // Correct usage
router.post("/follow/:id", isAuth, followandUnfollowUser);
router.get("/followdata/:id", isAuth, userFollowerandFollowingData);
router.get('/profile', isAuth, getUserProfile);  // Use isAuth middleware

export default router;
