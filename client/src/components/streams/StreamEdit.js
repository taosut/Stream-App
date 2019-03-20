import React from 'react';
import { connect } from 'react-redux';
// Change #1: import editStream action-creator.
import { fetchStream, editStream } from '../../actions';
// Change #2: import StreamForm component.
import StreamForm from './StreamForm';
// Change #6: import lodash
import _ from 'lodash';

class StreamEdit extends React.Component {
  componentDidMount() {
    // Call action-creator fetchStream
    const currentStreamId = this.props.match.params.id;

    // The action-creator gets the :id from url params.
    // Then it creates a network request to db.json and obtains the stream with this id.
    // Then it dispatches the payload with this stream to streamReducer.
    // The reducer updates/adds this stream property inside its state object.
    this.props.fetchStream(currentStreamId);
  }

  // Change #3: Create a onSubmit callback function to pass into StreamForm.
  onSubmit = (formValues) => {
    // Change #8: Call the editStream action-creator instead of just printing out the formValues.
    // console.log(formValues);
    
    // Problem: After the PUT request, we are missing userId inside our reducer state object.
    this.props.editStream(this.props.stream.id, formValues);
  }

  render() {
    if (!this.props.stream) {
      return (
        <div>Loading...</div>
      );
    }

    return (
      // Change #4: Delete the the <div> that prints stream title. And
      //            call the StreamForm instance with the callback onSubmit function.
      // <div>{this.props.stream.title}</div>
      <div>
        <h3>Edit a Stream</h3>
        {/* Change #5: Pass in a prop called 'initialValues' (redux-form keyword). */}
        {/*            The outer brackets indicate that we're trying to write js code. */}
        {/*            The inner brackets indicate that we're trying to create an object. */}
        {/*            The reason that we're creating a title and description key is because */}
        {/*            we have two Field elements and their name prop is title and description. */}
        <StreamForm 
          // initialValues={{ title: this.props.stream.title, description: this.props.stream.description }} 
          
          // Change #7: Equivalent to the commented line above, but using lodash method.
          initialValues = {_.pick(this.props.stream, 'title', 'description')}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

// The first argument state refers to the object inside combineReducers().
// The second argument gets access to all the props of the current component.
const mapStateToProps = (state, ownProps) => {
  return {
    // We need to get access to props.match.params.id.
    // * Unexpected behavior: stream is null if user loads to this route first,
    //   instead of clicking the 'edit' button from StreamList.
    // * Solution: call fetchStream action-creator first.
    stream: state.streams[ownProps.match.params.id]
  };
};

// Change #5: Pass in editStream action-creator to connect()().
export default connect(mapStateToProps, { 
  fetchStream: fetchStream,
  editStream: editStream
})(StreamEdit);