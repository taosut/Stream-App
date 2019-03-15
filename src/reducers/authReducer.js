const INITIAL_STATE = {
  isSignedIn: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SIGN_IN':
      // WARNING: DO NOT return state.isSignedIn = true;
      return { ...state, isSignedIn: true };
    case 'SIGN_OUT':
      return { ...state, isSignedIn: false };
    default:
      return state;
  }
};