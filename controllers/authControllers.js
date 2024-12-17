import { User } from "../models/userModel.js";
import TryCatch from "../utils/Trycatch.js";
import generateToken from "../utils/generateToken.js";
import getDataUrl from "../utils/urlGenrator.js";
import bcrypt from "bcrypt";
import cloudinary from "cloudinary";
import { validationResult } from "express-validator";
import { successResponse, errorResponse } from "../utils/responseHandler.js";  // Assuming responseHandler.js file exists

// Register User
export const registerUser = TryCatch(async (req, res) => {
  const { name, email, password, gender } = req.body;
  const file = req.file;

  // Validate input fields
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  if (!file) {
    return res.status(400).json({
      message: "Profile picture is required",
    });
  }

  // Check if user already exists
  let user = await User.findOne({ email });
  if (user) {
    return errorResponse(res, 400, "User already exists");
  }

  // Handle file upload to Cloudinary
  const fileUrl = getDataUrl(file);
  const hashPassword = await bcrypt.hash(password, 10);
  const myCloud = await cloudinary.v2.uploader.upload(fileUrl.content);

  // Create new user
  user = await User.create({
    name,
    email,
    password: hashPassword,
    gender,
    profilePic: {
      id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

  // Generate and send JWT token
  generateToken(user._id, res);

  // Send success response
  successResponse(res, 201, "User registered successfully", user);
});

// Login User
export const loginUser = TryCatch(async (req, res) => {
  const { email, password } = req.body;

  // Check if user exists
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return errorResponse(res, 400, "Invalid email or password");
  }

  // Generate and send JWT token
  generateToken(user._id, res);

  // Send success response
  successResponse(res, 200, "User logged in successfully", user);
});

// Logout User
export const logoutUser = TryCatch((req, res) => {
  res.cookie("token", "", { maxAge: 0 });  // Clear token cookie
  successResponse(res, 200, "Logged out successfully");
});
