import React from 'react';
import { connect } from 'react-redux';
import { fetchStream } from '../../actions';

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

  render() {
    if (!this.props.stream) {
      return (
        <div>Loading...</div>
      );
    }

    return (
      <div>{this.props.stream.title}</div>
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
    stream: state.streams[ownProps.match.params.id]
  };
};

export default connect(mapStateToProps, {fetchStream: fetchStream})(StreamEdit);