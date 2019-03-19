import React from 'react';
import { connect } from 'react-redux';
import { fetchStreams } from '../../actions';

class StreamList extends React.Component {
  componentDidMount() {
    // Call action-creator.
    this.props.fetchStreams();
  }

  renderList() {
    return this.props.streams.map((stream) => {
      // jsx
      return (
        <div className="item" key={stream.id}>
          <i className="large middle aligned icon camera" />
          <div className="content">
            {stream.title}
            <div className="description">{stream.description}</div>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <h2>Streams</h2>
        <div className="ui celled list">
          {this.renderList()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  // Object.values gets rid of the key, and turns each value in the object
  // into an element of the returned array.
  return { streams: Object.values(state.streams) }
};

export default connect(mapStateToProps, { fetchStreams: fetchStreams })(StreamList);