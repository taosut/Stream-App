import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';

const PageOne = () => {
  return (
    <div>
      Page One
      <Link to="/pagetwo">Navigate to Page Two</Link>
    </div>
  );
};

const PageTwo = () => {
  return (
    <div>
      Page Two
      <Link to="/">Navigate to Page One</Link>
    </div>
  );
};

class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Route path="/" exact component={PageOne} />
            <Route path="/pagetwo" component={PageTwo} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
};

export default App;