import React from 'react';

class GoogleAuth extends React.Component {
  componentDidMouth() {
    window.gapi.load('client:auth2', () => {
      // After auth2 has been successfully loaded.
      window.gapi.client.init({
        clientId: '278670877252-fkqmti21t758d97t3qll0cf3s79pq6i3.apps.googleusercontent.com',
        scope: 'email'
      });
    });
  }

  render() {
    return (
      <div>Google Auth</div>
    );
  }
};

export default GoogleAuth;