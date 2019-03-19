// Array-based Approach
const streamReducer = (state = [], action) => {
  switch(action.type) {
    case EDIT_STREAM:
      return state.map(stream => {
        // Find the stream that currently being updated.
        if (stream.id === action.payload.id) {
          // Update the { id, title, description } of this stream
          // based on the submitted form (from action-creator).
          return action.payload;
        } else {
          // If this is not the stream that's being edited,
          // then return the original information without any change.
          return stream;
        }
      })

    default:
      return state;
  }
};

// Object-based Approach
const streamReducer = (state = {}, action) => {
  switch(action.type) {
    case EDIT_STREAM:
      // Create a new object.
      // const newState = { ...state };
      // newState[action.payload.id] = action.payload;
      // return newState;
      return { ...state, [action.payload.id]: action.payload };

    default:
      return state;
  }
}