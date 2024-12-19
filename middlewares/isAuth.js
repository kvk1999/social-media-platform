import jwt from 'jsonwebtoken';
import { User } from '../models/userModel.js';

export const isAuth = async (req, res, next) => {
  try {
    // Check for token in cookies
    let token = req.cookies.token;

    // Alternatively, check for token in the Authorization header (Bearer token)
    if (!token && req.header('Authorization')) {
      token = req.header('Authorization').replace('Bearer ', '');
    }

    if (!token) {
      return res.status(403).json({ message: "Unauthorized. No token provided." });
    }

    // Verify the token
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedData) {
      return res.status(400).json({
        message: "Token expired or invalid.",
      });
    }

    // Attach the user to the request object
    req.user = await User.findById(decodedData.id);

    // Proceed to the next middleware or route
    next();

  } catch (error) {
    res.status(500).json({
      message: "Please login to access this resource.",
    });
  }
};
