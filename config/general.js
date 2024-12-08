module.exports = {
    serverPort: process.env.PORT || 3001,  // Default to port 5000 if not set in .env
    environment: process.env.NODE_ENV || 'development',  // Default to 'development' if not set
};
