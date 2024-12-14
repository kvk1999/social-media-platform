// Middleware to handle unknown endpoints (404)
export const unknownEndpoint = (req, res) => {
    res.status(404).json({ error: 'Unknown endpoint' });
};

// Global error handler for uncaught errors
export const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
};
