// isAuth.js
import jwt from 'jsonwebtoken';  // Importing the JWT library

// Middleware function to check if the user is authenticated
export const isAuth = (req, res, next) => {
  const token = req.header("Authorization");  // Look for token in the Authorization header

  if (!token) {
    return res.status(401).json({ message: "Authentication failed. No token provided." });
  }

  try {
    // Verify the token using the JWT_SECRET (from environment variables)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // If the token is valid, attach the user information to the request
    req.user = decoded;

    // Call the next middleware or route handler
    next();
  } catch (err) {
    // If there's an error verifying the token, return a 401 Unauthorized status
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};
