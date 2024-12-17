import { User } from "../models/userModel.js";
import TryCatch from "../utils/Trycatch.js";
import generateToken from "../utils/generateToken.js";
import getDataUrl from "../utils/urlGenrator.js";
import bcrypt from "bcrypt";
import cloudinary from "cloudinary";
import { validationResult } from "express-validator";
import { successResponse, errorResponse } from "../utils/responseHandler.js";  // Assuming responseHandler.js file exists

// **REGISTER USER**
export const registerUser = TryCatch(async (req, res) => {
  const { name, email, password, gender } = req.body;
  const file = req.file;

  // Validate input fields
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return errorResponse(res, 400, "Validation errors", errors.array());
  }

  // Ensure profile picture is provided
  if (!file) {
    return errorResponse(res, 400, "Profile picture is required");
  }

  // Check if user already exists
  let user = await User.findOne({ email });
  if (user) {
    return errorResponse(res, 400, "User already exists");
  }

  // Upload profile picture to Cloudinary
  const fileUrl = getDataUrl(file); // Convert file to data URL
  const myCloud = await cloudinary.v2.uploader.upload(fileUrl.content);

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user
  user = await User.create({
    name,
    email,
    password: hashedPassword,
    gender,
    profilePic: {
      id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

  // Generate JWT token and set it as a cookie
  const token = generateToken(user._id, res);

  // Send success response
  successResponse(res, 201, "User registered successfully", {
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      gender: user.gender,
      profilePic: user.profilePic,
    },
    token, // Return token explicitly
  });
});

// **LOGIN USER**
export const loginUser = TryCatch(async (req, res) => {
  const { email, password } = req.body;

  // Validate input fields
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return errorResponse(res, 400, "Validation errors", errors.array());
  }

  // Check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    return errorResponse(res, 400, "Invalid email or password");
  }

  // Compare passwords
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return errorResponse(res, 400, "Invalid email or password");
  }

  // Generate JWT token and set it as a cookie
  const token = generateToken(user._id, res);

  // Send success response
  successResponse(res, 200, "User logged in successfully", {
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      gender: user.gender,
      profilePic: user.profilePic,
    },
    token, // Return token explicitly
  });
});



// Logout User
export const logoutUser = TryCatch((req, res) => {
  res.cookie("token", "", { maxAge: 0 });  // Clear token cookie
  successResponse(res, 200, "Logged out successfully");
});
