import React from 'react';
import { Link } from 'react-router-dom';

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
        </div>
      </div>
    );
  }
};

export default Header;