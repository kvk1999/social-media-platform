import API from './api';

export const fetchStories = async () => {
  const response = await API.get('/stories');
  return response.data;
};

export const addStory = async (storyData) => {
  const response = await API.post('/stories', storyData);
  return response.data;
};

export const deleteStory = async (storyId) => {
  const response = await API.delete(`/stories/${storyId}`);
  return response.data;
};
