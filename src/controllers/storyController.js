import Story from '../models/Story.js'; // Import the Story model

// Create a new story
export const createStory = async (req, res) => {
  const { userId, content, imageUrl } = req.body;  // Get data from the request body

  try {
    const newStory = new Story({
      userId,
      content,
      imageUrl,
    });

    const savedStory = await newStory.save();  // Save the new story to the database
    res.status(201).json(savedStory);  // Send the created story as the response
  } catch (error) {
    res.status(500).json({ message: error.message });  // Handle any errors
  }
};

// Get all stories
export const getStories = async (req, res) => {
  try {
    const stories = await Story.find();  // Get all stories from the database
    res.status(200).json(stories);  // Send the stories as the response
  } catch (error) {
    res.status(500).json({ message: error.message });  // Handle any errors
  }
};

// Get a single story by ID
export const getStory = async (req, res) => {
  const { storyId } = req.params;  // Get storyId from the request parameters

  try {
    const story = await Story.findById(storyId);  // Find story by ID
    if (!story) {
      return res.status(404).json({ message: 'Story not found' });  // Handle story not found
    }
    res.status(200).json(story);  // Send the story as the response
  } catch (error) {
    res.status(500).json({ message: error.message });  // Handle any errors
  }
};

// Update a story
export const updateStory = async (req, res) => {
  const { storyId } = req.params;  // Get storyId from the request parameters
  const { content, imageUrl } = req.body;  // Get updated content and imageUrl from the request body

  try {
    const updatedStory = await Story.findByIdAndUpdate(
      storyId,
      { content, imageUrl },
      { new: true }  // Return the updated story
    );
    if (!updatedStory) {
      return res.status(404).json({ message: 'Story not found' });  // Handle story not found
    }
    res.status(200).json(updatedStory);  // Send the updated story as the response
  } catch (error) {
    res.status(500).json({ message: error.message });  // Handle any errors
  }
};

// Delete a story
export const deleteStory = async (req, res) => {
  const { storyId } = req.params;  // Get storyId from the request parameters

  try {
    const deletedStory = await Story.findByIdAndDelete(storyId);  // Delete the story by ID
    if (!deletedStory) {
      return res.status(404).json({ message: 'Story not found' });  // Handle story not found
    }
    res.status(200).json({ message: 'Story deleted successfully' });  // Return success message
  } catch (error) {
    res.status(500).json({ message: error.message });  // Handle any errors
  }
};
