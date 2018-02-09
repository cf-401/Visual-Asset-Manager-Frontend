import React from 'react';
import { connect } from 'react-redux';

import LogInContainer from '../log-in/log-in-container';

import { renderIf } from '../../lib/helper-functions/render-if';

class SignInModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className="overlay">
        <div className="modal">
          <LogInContainer toggleModal={this.props.toggleModal} />
        </div>
      </div>
    );
  }
}

export default SignInModal;
