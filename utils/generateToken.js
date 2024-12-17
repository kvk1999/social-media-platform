import jwt from "jsonwebtoken";

const generateToken = (userId, res) => {
  // Create a JWT token
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1h" });

  // Set the token as an HTTP-only cookie
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Only use secure cookies in production
    sameSite: "strict",
    maxAge: 3600000, // Token expiry: 1 hour
  });

  // Return the token explicitly (optional)
  return token;
};

export default generateToken;
