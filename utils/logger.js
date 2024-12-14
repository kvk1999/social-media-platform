import morgan from 'morgan';

// Custom token definitions for additional logging
morgan.token('body', (req) => JSON.stringify(req.body));
morgan.token('user', (req) => (req.user ? JSON.stringify(req.user) : 'Unauthenticated'));

// Define the logging format
const format = ':method :url :status - :response-time ms | User: :user | Body: :body';

// Middleware to log HTTP requests
const logger = morgan(format, {
    skip: (req, res) => process.env.NODE_ENV === 'test', // Skip logging during tests
    stream: process.stdout, // Output logs to the console
});

export default logger;
