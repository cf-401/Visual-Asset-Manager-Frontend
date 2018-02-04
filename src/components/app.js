import React from 'react';
import { Route } from 'react-router-dom';

import LogInContainer from './log-in/log-in-container';

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <LogInContainer />
      </React.Fragment>
    );
  }
}

export default App;
