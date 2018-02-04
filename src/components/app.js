import React from 'react';
// import { Route } from 'react-router-dom';

import FileData from './file-data/FileDataContainer';
import LogInContainer from './log-in/log-in-container';

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <FileData />
        <LogInContainer />
      </React.Fragment>
    );
  }
}

export default App;
