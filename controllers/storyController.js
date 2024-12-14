import Story from '../models/Story.js';

/**
 * Create a new story
 * @route POST /api/v1/stories
 */
export const createStory = async (req, res, next) => {
    const { image, text } = req.body;

    try {
        const newStory = new Story({
            user: req.user.id, // Authenticated user
            image,
            text,
        });

        const savedStory = await newStory.save();
        res.status(201).json({ success: true, message: 'Story created successfully', story: savedStory });
    } catch (error) {
        next(error);
    }
};

/**
 * Fetch all stories
 * @route GET /api/v1/stories
 */
export const getAllStories = async (req, res, next) => {
    try {
        const stories = await Story.find().populate('user', 'username avatar');
        res.status(200).json({ success: true, stories });
    } catch (error) {
        next(error);
    }
};

// Get Story By ID
export const getStoryById = async (req, res, next) => {
    const { id } = req.params;

    try {
        const story = await Story.findById(id).populate('user', 'username avatar');
        if (!story) {
            return res.status(404).json({ success: false, message: 'Story not found' });
        }
        res.status(200).json({ success: true, story });
    }
    catch (error) {
        next(error);
    }
}

/**
 * Delete a story
 * @route DELETE /api/v1/stories/:id
 */
export const deleteStory = async (req, res, next) => {
    const { id } = req.params;

    try {
        const story = await Story.findById(id);
        if (!story) {
            return res.status(404).json({ success: false, message: 'Story not found' });
        }

        if (story.user.toString() !== req.user.id) {
            return res.status(403).json({ success: false, message: 'You are not authorized to delete this story' });
        }

        await story.remove();
        res.status(200).json({ success: true, message: 'Story deleted successfully' });
    } catch (error) {
        next(error);
    }
};
