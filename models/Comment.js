import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
    {
        post: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post',
            required: true,
        }, // The post this comment is associated with
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        }, // The user who made the comment
        text: {
            type: String,
            required: true,
            maxlength: 500, // Restrict the length of a comment
        },
        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            }, // Array of users who liked the comment
        ],
    },
    {
        timestamps: true, // Automatically add createdAt and updatedAt fields
    }
);

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;