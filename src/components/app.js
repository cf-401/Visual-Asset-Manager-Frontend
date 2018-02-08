import React from 'react';
// import { Route } from 'react-router-dom';

import FileData from './file-data/FileDataContainer';
import LogInContainer from './log-in/log-in-container';
import Header from './header/header-container.js'

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <FileData />
        <LogInContainer />
      </React.Fragment>
    );
  }
}

export default App;
