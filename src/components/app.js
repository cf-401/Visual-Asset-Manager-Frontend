import React from 'react';
import { Route } from 'react-router-dom';

// import LogInContainer from './log-in/log-in-container';
import FileData from '../containers/FileData';

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <FileData />
      </React.Fragment>
    );
  }
}

export default App;
