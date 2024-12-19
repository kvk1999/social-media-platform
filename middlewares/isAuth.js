import jwt from "jsonwebtoken";

export const isAuth = (req, res, next) => {
  // Get the token from the Authorization header, which should be in the format "Bearer <token>"
  const token = req.header("Authorization")?.split(" ")[1]; // Splitting to get the token after "Bearer"

  if (!token) {
    return res.status(401).json({ message: "Authentication failed. No token provided." });
  }

  try {
    // Verify the token using the JWT_SECRET environment variable
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Ensure the JWT_SECRET is defined in .env
    req.user = decoded; // Attach the decoded user info to the request object
    next(); // Continue to the next middleware or route handler
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};
