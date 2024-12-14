import axios from "../utils/api";

export const fetchStories = () => axios.get("/stories");

export const addStory = (storyData) => axios.post("/stories", storyData);

export const deleteStory = (storyId) => axios.delete(`/stories/${storyId}`);
