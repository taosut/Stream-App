// External Imports
import React from 'react';
import { Link } from 'react-router-dom';

// Internal Imports
import GoogleAuth from './GoogleAuth';

class Header extends React.Component {
  render() {
    return (
      <div className="ui secondary pointing menu">
        {/* Left Menu */}
        <Link className="item" to="/">
          Stream
        </Link>

        {/* Right Menu */}
        <div className="right menu">
          <Link className="item" to="/">
            All Streams
          </Link>
          <GoogleAuth />
        </div>
      </div>
    );
  }
};

export default Header;