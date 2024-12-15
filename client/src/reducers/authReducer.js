// src/redux/reducers/authReducer.js

const initialState = {
    isAuthenticated: false,
    user: null,
    loading: false,
    error: null,
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN_REQUEST':
        return { ...state, loading: true };
      case 'LOGIN_SUCCESS':
        return { ...state, loading: false, isAuthenticated: true, user: action.payload };
      case 'LOGIN_FAIL':
        return { ...state, loading: false, error: action.payload };
      case 'REGISTER_REQUEST':
        return { ...state, loading: true };
      case 'REGISTER_SUCCESS':
        return { ...state, loading: false, isAuthenticated: true, user: action.payload };
      case 'REGISTER_FAIL':
        return { ...state, loading: false, error: action.payload };
      case 'LOGOUT':
        return { ...state, isAuthenticated: false, user: null };
      default:
        return state;
    }
  };
  
  export default authReducer;
  