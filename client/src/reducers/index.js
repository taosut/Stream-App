// External Imports
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

// Internal Imports
import authReducer from './authReducer';
import streamReducer from './streamReducer';

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  streams: streamReducer
});