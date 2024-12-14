import mongoose from 'mongoose';

const storySchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        image: { type: String, required: true },
        text: { type: String, maxlength: 300 },
    },
    { timestamps: true }
);

const Story = mongoose.model('Story', storySchema);

export default Story;