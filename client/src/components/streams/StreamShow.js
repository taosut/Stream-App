// External
import React from 'react';
import { connect } from 'react-redux';
import flv from 'flv.js';

// Internal
import { fetchStream } from '../../actions';

class StreamShow extends React.Component {
  constructor(props) {
    super(props);

    this.videoRef = React.createRef();
  }

  // When the component first get renders, this is called. (One time)
  componentDidMount() {
    const { id } = this.props.match.params;

    this.props.fetchStream(id);

    this.buildPlayer();
  }

  // When the component gets re-rendered, this is called.
  // componentDidMount() is only going to be called once when the component is rendered to the screen.
  // Just in case we do not yet have access to this.props.stream, and we are going to try to fetch it on the fly.
  // We need to have some place to call buildPlayer() after we successfully fetch the stream.
  componentDidUpdate() {
    this.buildPlayer();
  }

  // When component is dismissed, this is called.
  componentWillUnmount() {
    // Tells flvPlayer to stop streaming and detach.
    this.flvPlayer.destroy();
  }

  buildPlayer() {
    const { id } = this.props.match.params;

    // If we already set up the player before or if stream is not fetched,
    // we don't want to set up the player.
    if (this.flvPlayer || !this.props.stream) {
      return;
    }

    // Set up the player.
    this.flvPlayer = flv.createPlayer({
      type: 'flv',
      url: `http://localhost:8000/live/${id}.flv`
    });

    // this.videoRef.current is the referencing <video />
    this.flvPlayer.attachMediaElement(this.videoRef.current);
    this.flvPlayer.load();
  }

  render() {
    if (!this.props.stream) {
      return (
        <div>Loading...</div>
      );
    }

    // Cleaner Code
    const { title, description } = this.props.stream;

    return (
      <div>
        {/* We need to get a reference to the video element that actually gets created
            on the screen. The ref system in react is how we get access/reference to an 
            actual DOM element that gets created inside our DOM tree. (All the jsx are not
            actual html elements; they are jsx elements that eventually become to represent
            a html element.) In order to get a reference to this video element, we are
            going to create a constructor method on the top of this class. */}
        <video  ref={this.videoRef} style={{ width: '100%' }} controls={true} />
        <h1>{title}</h1>
        <h5>{description}</h5>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { fetchStream })(StreamShow);