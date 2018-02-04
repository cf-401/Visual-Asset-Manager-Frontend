import React from 'react';
import { render } from 'react-dom';
import App from './components/app';

render(
  <React.Fragment>
    <h1>Hello World!</h1>
    <App />
  </React.Fragment>,
  document.getElementById('root'),
);
