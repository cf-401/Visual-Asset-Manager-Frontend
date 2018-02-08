import React from 'react';
import { Route } from 'react-router-dom';

import FileData from './file-data/FileDataContainer';
import LogInContainer from './log-in/log-in-container';
<<<<<<< HEAD
import Header from './header/header-container.js'
=======
import Profile from './profile/container';
>>>>>>> master

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
<<<<<<< HEAD
        <Header />
=======

        <Route exact path="/" component={LogInContainer} />
        <Route exact path="/profile" component={Profile} />
>>>>>>> master
        <FileData />

      </React.Fragment>
    );
  }
}

export default App;
