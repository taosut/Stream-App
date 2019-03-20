// External Imports
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// Internal Imports
import { fetchStreams } from '../../actions';

class StreamList extends React.Component {
  componentDidMount() {
    // Call fetchStream action-creator.
    // The action-creator fetchStreams makes a network request to json-server
    // to retrieve the entire array the form:
    // [
    //    {
    //      id: STREAM_ID,
    //      title: STREAM_TITLE,
    //      description: STREAM_DESCRIPTION,
    //      userId: SIGNED_IN_USER_ID
    //    },
    //    ...
    // ]
    this.props.fetchStreams();
  }

  renderAdmin(stream) {
    if (stream.userId === this.props.currentUserId) {
      return (
        <div className="right floated content">
          <Link to={`/streams/edit/${stream.id}`} className="ui button primary">Edit</Link>
          <button className="ui button negative">Delete</button>
        </div>
      );
    }
  }

  renderList() {
    // this.props.streams is an array as a result from mapStateToProps.
    // We can use the .map() js method to style each stream with jsx.
    return this.props.streams.map((stream) => {
      // jsx
      return (
        <div className="item" key={stream.id}>
          {/* renderAdmin() is called here to correctly style the two buttons in the right place*/}
          {this.renderAdmin(stream)}
          <i className="large middle aligned icon camera" />
          <div className="content">
            {stream.title}
            <div className="description">{stream.description}</div>
          </div>
        </div>
      );
    });
  }

  renderCreate() {
    if (this.props.isSignedIn) {
      return (
        <div style={{ textAlign: 'right' }}>
          <Link to="/streams/new" className="ui button primary">Create Stream</Link>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <h2>Streams</h2>
        <div className="ui celled list">
          {this.renderList()}
        </div>
        { this.renderCreate() }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  // Object.values gets rid of the key, and turns each value in the object
  // into an element of the returned array.
  return {
    // state.streams is the entire state object inside of streamReducer.
    // e.g. { id#: { id, title, description, userId }, {...} }
    // We convert this into an array using Object.values() method.
    // It simply gets rid of the 'key', leaving the 'value' to become elements.
    // e.g. [ {id, title, description, userId}, {...} ]
    streams: Object.values(state.streams),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn
  }
};

export default connect(mapStateToProps, { fetchStreams: fetchStreams })(StreamList);