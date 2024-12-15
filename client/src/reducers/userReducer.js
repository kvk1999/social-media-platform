// src/redux/reducers/userReducer.js

const initialState = {
    user: null,        // To store user data
    loading: false,    // To handle loading state
    error: null,       // To store any errors
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_USER_REQUEST':
        return { ...state, loading: true };
      case 'FETCH_USER_SUCCESS':
        return { ...state, loading: false, user: action.payload };  // Store user data on success
      case 'FETCH_USER_FAIL':
        return { ...state, loading: false, error: action.payload };  // Store error on failure
      case 'UPDATE_USER_PROFILE_REQUEST':
        return { ...state, loading: true };
      case 'UPDATE_USER_PROFILE_SUCCESS':
        return { ...state, loading: false, user: action.payload };  // Update user data on success
      case 'UPDATE_USER_PROFILE_FAIL':
        return { ...state, loading: false, error: action.payload };  // Store error on failure
      default:
        return state;
    }
  };
  
  export default userReducer;
  