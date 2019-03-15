// Action Creators:
//  1. signIn(): called by onAuthChange() after user has successfully logged in.
//  2. signOut: called by onAuthChange() after user has successfully logged out.

// * Don't forget the 'export' keyword in front of each action creator.
// The reducer can access action.type and action.payload.

import { SIGN_IN, SIGN_OUT } from './types';

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