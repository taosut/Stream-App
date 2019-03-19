// Action Creators:
//  1. signIn(): called by onAuthChange() after user has successfully logged in.
//  2. signOut: called by onAuthChange() after user has successfully logged out.

// * Don't forget the 'export' keyword in front of each action creator.
// The reducer can access action.type and action.payload.
import streams from '../apis/streams';
import history from '../history';
import { 
  SIGN_IN, 
  SIGN_OUT, 
  CREATE_STREAM,
  FETCH_STREAMS,
  FETCH_STREAM,
  DELETE_STREAM,
  EDIT_STREAM 
} from './types';

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

// formValues:
// {
//   description: ""
//   title: ""
// }
export const createStream = (formValues) => {
  // Create async action-creator; use redux-thunk.
  // Return an arrow function from our action-creator.
  return async (dispatch, getState) => {
    // getState: has access to redux store.
    // Get state object property 'userId' from authReducer.
    // Note: getState is a function!
    const { userId } = getState().auth;

    // POST request with axios.
    // Passing in all the formValues. (example: title, description)
    const response = await streams.post('/streams', { ...formValues, userId: userId });

    // Manually dispatch action.
    // response.data contains the { id, description, title } of the stream
    // just created.
    dispatch({ type: CREATE_STREAM, payload: response.data });

    // Programmatic Navigation back to StreamList route.
    history.push('/');
  };
};

export const fetchStreams = () => {
  return async (dispatch) => {
    // Make GET request to '/streams' using our axios instance.
    const response = await streams.get('/streams');

    dispatch({ type: FETCH_STREAMS, payload: response.data });
  };
};

export const fetchStream = (id) => {
  return async (dispatch) => {
    const response = await streams.get(`/streams/${id}`);
    
    dispatch({ type: FETCH_STREAM, payload: response.data });
  };
};

export const editStream = (id, formValues) => {
  return async (dispatch) => {
    const response = await streams.put(`/streams/${id}`, formValues);

    dispatch({type: EDIT_STREAM, payload: response.data});
  };
};

export const deleteStream = (id) => {
  return async (dispatch) => {
    // We don't get any response.
    await streams.delete(`/streams/${id}`);

    dispatch({ type: DELETE_STREAM, payload: id });
  };
};
