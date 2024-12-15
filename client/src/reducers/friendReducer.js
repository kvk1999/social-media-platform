// src/redux/reducers/friendReducer.js

const initialState = {
    friends: [],
    friendRequests: [],
    loading: false,
    error: null,
  };
  
  const friendReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_FRIENDS_REQUEST':
        return { ...state, loading: true };
      case 'FETCH_FRIENDS_SUCCESS':
        return { ...state, loading: false, friends: action.payload };
      case 'FETCH_FRIENDS_FAIL':
        return { ...state, loading: false, error: action.payload };
      case 'FETCH_FRIEND_REQUESTS_REQUEST':
        return { ...state, loading: true };
      case 'FETCH_FRIEND_REQUESTS_SUCCESS':
        return { ...state, loading: false, friendRequests: action.payload };
      case 'FETCH_FRIEND_REQUESTS_FAIL':
        return { ...state, loading: false, error: action.payload };
      case 'SEND_FRIEND_REQUEST':
        return { ...state, friendRequests: [...state.friendRequests, action.payload] };
      case 'ACCEPT_FRIEND_REQUEST':
        return {
          ...state,
          friends: [...state.friends, action.payload],
          friendRequests: state.friendRequests.filter(
            (request) => request.id !== action.payload.id
          ),
        };
      case 'REJECT_FRIEND_REQUEST':
        return {
          ...state,
          friendRequests: state.friendRequests.filter(
            (request) => request.id !== action.payload.id
          ),
        };
      case 'REMOVE_FRIEND':
        return {
          ...state,
          friends: state.friends.filter((friend) => friend.id !== action.payload),
        }; // Removes a friend by id
      default:
        return state;
    }
  };
  
  export default friendReducer;
  