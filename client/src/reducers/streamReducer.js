// External Imports
import _ from 'lodash';

// Internal Imports
import { 
  CREATE_STREAM,
  FETCH_STREAMS,
  FETCH_STREAM,
  DELETE_STREAM,
  EDIT_STREAM 
} from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case CREATE_STREAM:
      // Adds a new property to the state object.
      // * [action.payload.id] is the key for the new property to be created inside state object.
      // * action.payload is the object returned from the createStream action-creator.
      //   which is going to be the value of the new property.
      // {
      //    SOME_NUMBER: { 
      //                    id: SOME_NUMBER,
      //                    title: SOME_TITLE,
      //                    description: SOME_DESC,
      //                    userId: SOME_USERID
      //                 }
      // }
      return { ...state, [action.payload.id]: action.payload };

    // Require lodash library
    // _.mapKeys() takes the action.payload array and returns
    // an object with keys assigned to each element in action.payload.
    // The key is the value 'id' in each of the original array elements.
    case FETCH_STREAMS:
      return {...state, ..._.mapKeys(action.payload, 'id')}

    case FETCH_STREAM:
      return { ...state, [action.payload.id]: action.payload };

    // Require lodash library.
    case DELETE_STREAM:
      return _.omit(state, action.payload);

    case EDIT_STREAM:
      return { ...state, [action.payload.id]: action.payload };

    default:
      return state;
  }
}