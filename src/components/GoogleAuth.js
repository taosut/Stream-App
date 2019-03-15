// External Imports
import React from 'react';
import { connect } from 'react-redux';

// Internal Imports
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {
  // isSignedIn initialized to 'null' because we don't know if user is signed in or not.
  // However, this state variable is not convienient for other components to access.
  // We want to centralize this variable with redux for the sake of future implementations.
  // state = { isSignedIn: null };

  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      // After auth2 has been successfully loaded.
      window.gapi.client.init({
        clientId: '278670877252-fkqmti21t758d97t3qll0cf3s79pq6i3.apps.googleusercontent.com',
        scope: 'email'
      }).then(() => {
        // Executed after gapi is successfully initialized.
        this.auth = window.gapi.auth2.getAuthInstance();

        // Get initial status when we first intialize the gapi library.
        // this.setState({ isSignedIn: this.auth.isSignedIn.get() });

        // Update the 'isSignedIn' inside reducer by calling action-creator.
        this.onAuthChange(this.auth.isSignedIn.get());

        // Whenever the user's sign-in status is changed, listen calls
        // onAuthChange() and updates the state variable 'isSignedIn'.
        this.auth.isSignedIn.listen(this.onAuthChange);
      });
    });
  }

  // This method takes in a boolean argument of whether the user is signed in or not.
  // We can obtain this value by calling google api: gapi.auth2.getAuthInstance().isSignedIn.get().
  onAuthChange = (isSignedIn) => {
    // The 'connect' module converts our action creators into props of this class.
    // If the user is signed in, then call the signIn() action creator.
    // If the user is not signed in, then call the signOut action creator.
    if (isSignedIn) {
      // Sets 'isSignedIn' to true.
      this.props.signIn();
    } else {
      // Sets 'isSignedIn' to false.
      this.props.signOut();
    }
    // this.setState({ isSignedIn: this.auth.isSignedIn.get() });
  }

  onSignInClick = () => {
    this.auth.signIn();
  }

  onSignOutClick = () => {
    this.auth.signOut();

    // Forget about permission that user granted us.
    // Next time login will ask user for permission again.
    this.auth.disconnect();
  }

  // Helper method to check user signed-in state.
  // Invoked by render() everytime 'isSignedIn' value is changed.
  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn === true) {
      return (
        // <div>I am signed in.</div>
        <button onClick={ this.onSignOutClick } className="ui google red button">
          <i className="google icon"></i>
          Sign Out
        </button>
      );
    } else {
      return (
        // <div>I am not signed in.</div>
        <button onClick={ this.onSignInClick } className="ui button red google">
        <i className="google icon"></i>
        Sign In with Google
        </button>
      );
    }
  }

  render() {
    return (
      <div>{this.renderAuthButton()}</div>
    );
  }
};

const mapStateToProps = (state) => {
  // isSignedIn will be be either null, true, or false according to the reducer definition.
  return { isSignedIn: state.auth.isSignedIn };
}

// The first argument of maps all reducers as props of this class.
// The second argument maps all the action-creators as props of this class.
export default connect(mapStateToProps, { signIn: signIn, signOut: signOut })(GoogleAuth);