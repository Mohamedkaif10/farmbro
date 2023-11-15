// src/reducers.js
import { combineReducers } from 'redux';

// Your reducers go here
const authReducer = (state = { user: null }, action) => {
  // Handle authentication-related actions here
  return state;
};

const farmerReducer = (state = { crop: '', landSize: '' }, action) => {
  // Handle farmer-related actions here
  return state;
};

// Combine all reducers into a root reducer
const rootReducer = combineReducers({
  auth: authReducer,
  farmer: farmerReducer,
});

export default rootReducer;
