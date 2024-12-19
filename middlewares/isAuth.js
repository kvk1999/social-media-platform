// isAuth.js
import jwt from "jsonwebtoken";

export const isAuth = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Authentication failed. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Ensure the JWT_SECRET is defined in .env
    req.user = decoded; // Attach user information to the request
    next(); // Allow the request to continue
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};
