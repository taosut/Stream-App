// Action Creators:
//  1. signIn(): called by onAuthChange() after user has successfully logged in.
//  2. signOut: called by onAuthChange() after user has successfully logged out.

// * Don't forget the 'export' keyword in front of each action creator.
// The reducer can access action.type and action.payload.

import { SIGN_IN, SIGN_OUT } from './types';
import streams from '../apis/streams';

export const signIn = (userId) => {
  return {
    type: SIGN_IN,
    payload: userId
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT
  };
};

export const createStream = (formValues) => {
  // Create async action-creator; use redux-thunk.
  // Return an arrow function from our action-creator.
  return async (dispatch) => {
    // POST request with axios.
    // Passing in all the formValues. (example: title, description)
    streams.post('/streams', formValues);
  }
}