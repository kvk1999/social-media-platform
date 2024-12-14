import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Protect middleware to check for authentication
const protect = (req, res, next) => {
    let token;

    // Check for token in authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]; // Extract token from Bearer header
    }

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }

    try {
        // Verify token with secret
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user info to request object
        next(); // Proceed to the next middleware/route handler
    } catch (error) {
        res.status(401).json({ message: 'Not authorized, invalid token' });
    }
};

export default protect;  // Export as default