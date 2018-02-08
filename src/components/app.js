import React from 'react';
import { Route } from 'react-router-dom';

import FileData from './file-data/FileDataContainer';
import LogInContainer from './log-in/log-in-container';
import Header from './header/header-container';
import Profile from './profile/container';

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Header />

        <Route exact path="/profile" component={Profile} />
        <FileData />

      </React.Fragment>
    );
  }
}

export default App;
