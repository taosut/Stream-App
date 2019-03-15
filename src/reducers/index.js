// External Imports
import { combineReducers } from 'redux';

// Internal Imports
import authReducer from './authReducer';

export default combineReducers({
  auth: authReducer
});