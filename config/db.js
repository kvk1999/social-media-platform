const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // No need to include useNewUrlParser or useUnifiedTopology
        await mongoose.connect(process.env.MONGO_URL);
        console.log('MongoDB connected successfully!');
    } catch (error) {
        console.error('Database connection failed:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
