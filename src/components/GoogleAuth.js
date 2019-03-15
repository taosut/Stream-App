import React from 'react';

class GoogleAuth extends React.Component {
  // isSignedIn initialized to 'null' because we don't know if user is signed in or not.
  state = { isSignedIn: null };

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
        this.setState({ isSignedIn: this.auth.isSignedIn.get() });

        // Whenever the user's sign-in status is changed, listen calls
        // onAuthChange() and updates the state variable 'isSignedIn'.
        this.auth.isSignedIn.listen(this.onAuthChange);
      });
    });
  }

  onAuthChange = () => {
    this.setState({ isSignedIn: this.auth.isSignedIn.get() });
  }

  onSignIn = () => {
    this.auth.signIn();
  }

  onSignOut = () => {
    this.auth.signOut();
  }

  // Helper method to check user signed-in state.
  renderAuthButton() {
    if (this.state.isSignedIn === null) {
      return null;
    } else if (this.state.isSignedIn === true) {
      return (
        // <div>I am signed in.</div>
        <button onClick={ this.onSignOut } className="ui google red button">
          <i className="google icon"></i>
          Sign Out
        </button>
      );
    } else {
      return (
        // <div>I am not signed in.</div>
        <button onClick={ this.onSignIn } className="ui button red google">
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

export default GoogleAuth;