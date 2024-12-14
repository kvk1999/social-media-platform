import mongoose from 'mongoose'; // Import mongoose for MongoDB interaction
import { MONGODB_URI } from './utils/config.js'; // Import the MongoDB URI from your configuration
import app from './app.js'; // Import the Express application

// Log the MONGODB_URI to ensure it's loaded correctly
console.log('MONGODB_URI:', MONGODB_URI);

// Connect to the MongoDB database
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log('Error connecting to MongoDB:', error));
        // Start the server once the database connection is successful
        const PORT = process.env.PORT || 3001; // Use the port from environment variables or default to 3001
        app.listen(PORT, () => {
            console.log(`Server running @ http://localhost:${PORT}`);
    })    