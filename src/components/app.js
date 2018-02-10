import React from 'react';
import { Route } from 'react-router-dom';

import LogInContainer from './log-in/log-in-container';
import Header from './header/header-container';
import Profile from './profile/container';
import FileDataContainer from './file-data/FileDataContainer';


class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <Route exact path="/" component={FileDataContainer} />
        <Route exact path="/profile" component={Profile} />
      </React.Fragment>
    );
  }
}

export default App;
