import { User } from "../models/userModel.js";
import TryCatch from "../utils/Trycatch.js";
import generateToken from "../utils/generateToken.js";
import getDataUrl from "../utils/urlGenrator.js";
import bcrypt from "bcrypt";
import cloudinary from "cloudinary";
import { validationResult } from "express-validator";
import { successResponse, errorResponse } from "../utils/responseHandler.js";  // Assuming responseHandler.js file exists

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

  // Generate JWT token
  const token = generateToken(user._id, res);

  // Include the token in a cookie
  res.cookie("token", token, { httpOnly: true, secure: true, sameSite: 'Strict', maxAge: 3600000 }); // 1 hour expiration

  // Send success response with token
  successResponse(res, 201, "User registered successfully", { user, token });
});

// Login User
export const loginUser = TryCatch(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user)
    return res.status(400).json({
      message: "Invalid Credentials",
    });

  const comparePassword = await bcrypt.compare(password, user.password);

  if (!comparePassword)
    return res.status(400).json({
      message: "Invalid Credentials",
    });

  // Generate the token and send it as a cookie
  generateToken(user._id, res);

  // Include the token in the response body along with user data
  res.json({
    success: true,
    message: "User logged in successfully",
    data: {
      profilePic: user.profilePic,
      _id: user._id,
      name: user.name,
      email: user.email,
      gender: user.gender,
      followers: user.followers,
      followings: user.followings,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    },
    token: res.cookies.token,  // This will include the token in the response
  });
});


// Logout User
export const logoutUser = TryCatch((req, res) => {
  res.cookie("token", "", { maxAge: 0 });  // Clear token cookie
  successResponse(res, 200, "Logged out successfully");
});
