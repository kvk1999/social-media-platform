module.exports = {
    jwtSecret: process.env.JWT_SECRET || 'your-jwt-secret-key',  // Secret key for JWT
    jwtExpiry: '1h' // Token expiry time
};
