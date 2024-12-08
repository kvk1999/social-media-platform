const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    media: [
        {
            url: String,
            type: {
                type: String,
                enum: ['image', 'video'],
                required: true,
            },
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 86400, // 24 hours
    },
});

const Story = mongoose.model('Story', storySchema);

module.exports = Story;
