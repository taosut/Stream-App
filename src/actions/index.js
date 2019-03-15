// Action Creators:
//  1. signIn(): called by onAuthChange() after user has successfully logged in.
//  2. signOut: called by onAuthChange() after user has successfully logged out.

// * Don't forget the 'export' keyword in front of each action creator.

export const signIn = () => {
  return {
    type: 'SIGN_IN'
  };
};

export const signOut = () => {
  return {
    type: 'SIGN_OUT'
  };
};