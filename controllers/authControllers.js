import { User } from "../models/userModel.js";
import TryCatch from "../utils/Trycatch.js";
import generateToken from "../utils/generateToken.js";
import getDataUrl from "../utils/urlGenrator.js";
import bcrypt from "bcrypt";
import cloudinary from "cloudinary";

export const registerUser = TryCatch(async (req, res) => {
  const { name, email, password, gender } = req.body;

  const file = req.file;

  if (!name || !email || !password || !gender || !file) {
    return res.status(400).json({
      message: "Please give all values",
    });
  }

  let user = await User.findOne({ email });

  if (user)
    return res.status(400).json({
      message: "User Already Exist",
    });

  const fileUrl = getDataUrl(file);

  const hashPassword = await bcrypt.hash(password, 10);

  const myCloud = await cloudinary.v2.uploader.upload(fileUrl.content);

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

  generateToken(user._id, res);

  res.status(201).json({
    message: "User Registered",
    user,
  });
});

// Login Controller
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found!" });
    }

    // Compare provided password with the hashed password in the database
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Invalid password!" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id }, // Payload with the user ID
      process.env.JWT_SECRET, // Secret key for JWT
      { expiresIn: '1h' } // Set token expiration (1 hour in this case)
    );

    // Return token to the user (store in cookies or send in the response body)
    res.cookie('token', token, { 
      httpOnly: true, // Make the cookie accessible only through HTTP requests
      secure: process.env.NODE_ENV === 'production', // Set to true if using HTTPS
      maxAge: 3600000 // Token expires in 1 hour
    });

    // Optionally, send the token in the response body
    // res.json({ token });

    return res.status(200).json({ message: "Login successful!", token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const logoutUser = TryCatch((req, res) => {
  res.cookie("token", "", { maxAge: 0 });

  res.json({
    message: "Logged out successfully",
  });
});

