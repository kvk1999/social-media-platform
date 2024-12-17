import jwt from "jsonwebtoken";

const generateToken = (userId, res) => {
  // Create a JWT token with a 1-hour expiration time
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1h" });

  // Set the token as an HTTP-only cookie with secure options
  res.cookie("token", token, {
    httpOnly: true, // Can't be accessed by JavaScript on the frontend
    secure: process.env.NODE_ENV === "production", // Ensure the cookie is sent over HTTPS in production
    sameSite: "strict", // Protects against cross-site request forgery
    maxAge: 3600000, // Token will expire in 1 hour (3600000 ms)
  });
};

export default generateToken;
