import React from 'react';
import { Route } from 'react-router-dom';

import LogInContainer from './log-in/log-in-container';
import Profile from './profile/container';

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Route exact path="/" component={LogInContainer} />
        <Route exact path="/profile" component={Profile} />
      </React.Fragment>
    );
  }
}

export default App;
