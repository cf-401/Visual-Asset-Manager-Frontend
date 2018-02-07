import React from 'react';
import {connect} from 'react-redux';

import LogIn from '../log-in/log-in.js'
import { renderIf } from '../../lib/helper-functions/render-if';

import '../signin-modal.scss';

class SignInModal extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      init: true,
      formType: 'signin',
    };
  }
this.handleLoggedIn = this.handleLoggedIn.bind(this);
}


handleLoggedIn(){
  this.setState([e.target.id]: e.target.value)
}


render(){

  return(
    <div className="overlay">
      <div className="modal">
        if (handleLoggedIn) {
          return LogIn[renderSignInForm]
        } else {
          return LogIn[renderSignUpForm]
        }

//conditional for signin & signup
        // if new user, LogIn.renderSignUpForm
        // if db user, LogIn.renderSignInForm

// {renderIf()}

      </div>
    </div>
  )
}

export default SignInModal;
