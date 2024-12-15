// src/redux/reducers/storyReducer.js

const initialState = {
    stories: [],
    loading: false,
    error: null,
  };
  
  const storyReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_STORIES_REQUEST':
        return { ...state, loading: true };
      case 'FETCH_STORIES_SUCCESS':
        return { ...state, loading: false, stories: action.payload };
      case 'FETCH_STORIES_FAIL':
        return { ...state, loading: false, error: action.payload };
      case 'ADD_STORY':
        return { ...state, stories: [action.payload, ...state.stories] }; // Adds a new story to the front
      case 'DELETE_STORY':
        return {
          ...state,
          stories: state.stories.filter((story) => story.id !== action.payload),
        }; // Deletes a story by id
      default:
        return state;
    }
  };
  
  export default storyReducer;
  