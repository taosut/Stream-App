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
        this.setState({ isSignedIn: this.auth.isSignedIn.get() });
      });
    });
  }

  // Helper method to check user signed-in state.
  renderAuthButton() {
    if (this.state.isSignedIn === null) {
      return (
        <div>I don't know if we are signed in.</div>
      );
    } else if (this.state.isSignedIn === true) {
      return (
        <div>I am signed in.</div>
      );
    } else {
      return (
        <div>I am not signed in.</div>
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