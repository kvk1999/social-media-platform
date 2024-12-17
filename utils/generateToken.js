import jwt from "jsonwebtoken";

const generateToken = (userId, res) => {
  // Generate JWT token
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "15d" });

  // Set the token as an HTTP-only cookie
  res.cookie("token", token, {
    httpOnly: true, // Ensures the cookie cannot be accessed by client-side JavaScript
    secure: process.env.NODE_ENV === "production", // Cookie only sent over HTTPS in production
    sameSite: "strict", // Prevents CSRF attacks
    maxAge: 3600000, // Cookie expires in 1 hour
  });

  return token; // Optional: Return the token for including it in the JSON response
};

export default generateToken;
